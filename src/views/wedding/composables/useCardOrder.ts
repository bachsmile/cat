import { ref, computed } from 'vue';
import { useToast } from '@/composables/useToast';
import { weddingApi } from '@/api/wedding';
import { createWalletTransaction, getWalletStatus } from '@/api/wallet';

// Template images
import wd1 from '@/assets/images/wd1.jpg';
import wd2 from '@/assets/images/wd2.jpg';
import elegantImg from '@/assets/images/wedding_couple_elegant.png';

export interface CardTheme {
  id: string;
  name: string;
  desc: string;
  price: number;
  priceLabel: string;
  image: string;
}

export interface GuestRow {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export type ModalStep = 'plan' | 'theme' | 'info' | 'purchase' | 'payment' | 'success';

export function useCardOrder(emit: any) {
  const { showToast } = useToast();

  const step = ref<ModalStep>('plan');
  const isSubmitting = ref(false);

  // Plan selection
  const selectedPlanId = ref('');
  const selectedPlanLabel = ref('');

  // Step 1 - Theme
  const selectedTheme = ref<CardTheme | null>(null);

  // Step 2 - Wedding Info
  const weddingData = ref({
    groomName: '',
    brideName: '',
    groomParents: '',
    brideParents: '',
    ceremonyDate: '',
    ceremonyTime: '',
    partyDate: '',
    partyTime: '',
    qrPaymentUrl: '',
    address: '',
    mapLat: 0,
    mapLng: 0,
    mapPlaceId: '',
  });

  // Step 3 - Purchase
  const quantity = ref<number>(100);
  const deliveryType = ref<'static' | 'auto'>('static');
  const guestList = ref<GuestRow[]>([]);
  const guestValidation = ref<{ valid: boolean; errors: string[] } | null>(null);
  const isValidatingGuests = ref(false);

  // Step 4 - Payment
  const paymentReceipt = ref('');
  const paymentReceiptFile = ref<File | null>(null);
  const walletBalance = ref(0);
  const isWalletBalanceLoading = ref(false);

  // Themes
  const CARD_THEMES: CardTheme[] = [
    { id: 'elegant', name: 'Hanh Phuc', desc: 'Tinh te & Hien dai', price: 500, priceLabel: '500d/thiep', image: elegantImg },
    { id: 'classic', name: 'Sac Hong', desc: 'Ngot ngao & Lang man', price: 800, priceLabel: '800d/thiep', image: wd2 },
    { id: 'royal', name: 'Hoang Gia', desc: 'Sang trong & Quy phai', price: 1200, priceLabel: '1.200d/thiep', image: wd1 },
  ];

  // Computed pricing
  const unitPrice = computed(() => selectedTheme.value?.price || 0);
  const autoFee = computed(() => deliveryType.value === 'auto' ? 500 : 0);
  const totalPerCard = computed(() => unitPrice.value + autoFee.value);
  const totalPrice = computed(() => totalPerCard.value * quantity.value);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

  const shouldUseWalletPayment = computed(() => walletBalance.value >= totalPrice.value && totalPrice.value > 0);

  // Step validations
  const canGoToInfo = computed(() => !!selectedTheme.value);
  const canGoToPurchase = computed(() => {
    const d = weddingData.value;
    return d.groomName && d.brideName && d.ceremonyDate && d.partyDate && d.address;
  });
  const canGoToPayment = computed(() => {
    return quantity.value > 0 && guestValidation.value?.valid === true;
  });
  const canFinish = computed(() => shouldUseWalletPayment.value || !!paymentReceiptFile.value || !!paymentReceipt.value);

  // Navigation
  const selectPlan = (planId: string, label: string) => {
    selectedPlanId.value = planId;
    selectedPlanLabel.value = label;
    step.value = 'theme';
  };

  const selectTheme = (theme: CardTheme) => {
    selectedTheme.value = theme;
  };

  const goBack = () => {
    const flow: ModalStep[] = ['plan', 'theme', 'info', 'purchase', 'payment'];
    const idx = flow.indexOf(step.value);
    if (idx > 0) step.value = flow[idx - 1] as ModalStep;
  };

  const goNext = () => {
    const flow: ModalStep[] = ['plan', 'theme', 'info', 'purchase', 'payment'];
    const idx = flow.indexOf(step.value);
    if (idx >= 0 && idx < flow.length - 1) {
      const nextStep = flow[idx + 1] as ModalStep;
      step.value = nextStep;
      if (nextStep === 'payment') {
        void loadWalletBalance();
      }
    }
  };

  // Excel guest import
  const downloadTemplate = () => {
    const headers = ['Ho va ten,So dien thoai,Email,Dia chi'];
    const sample = ['Nguyen Van A,0901234567,a@gmail.com,123 Duong ABC'];
    const csv = [headers, sample].join('\n');
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mau_danh_sach_khach_moi.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || '';
      const lines = text.split('\n').filter(l => l.trim());
      const guests: GuestRow[] = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;
        const cols = line.split(',');
        guests.push({
          name: (cols[0] || '').trim(),
          phone: (cols[1] || '').trim(),
          email: (cols[2] || '').trim(),
          address: (cols[3] || '').trim(),
        });
      }
      guestList.value = guests;
      guestValidation.value = null;
    };
    reader.readAsText(file);
  };

  const validateGuests = async () => {
    isValidatingGuests.value = true;
    try {
      const res = await weddingApi.validateGuests(guestList.value);
      guestValidation.value = res.data;
      if (res.data.valid) {
        showToast('Danh sach khach moi hop le!', 'success');
      } else {
        showToast(`Co ${res.data.errors.length} loi can sua`, 'error');
      }
    } catch {
      const errors: string[] = [];
      guestList.value.forEach((g, i) => {
        if (!g.name) errors.push(`Dong ${i + 1}: Thieu ten`);
        if (!g.phone && !g.email) errors.push(`Dong ${i + 1}: Can SDT hoac Email`);
      });
      guestValidation.value = { valid: errors.length === 0, errors };
    } finally {
      isValidatingGuests.value = false;
    }
  };

  // Payment receipt
  const handleReceiptUpload = (file: File) => {
    paymentReceiptFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      paymentReceipt.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const getVndWalletToken = () => localStorage.getItem('wallet_token_VND') || undefined;

  const loadWalletBalance = async () => {
    isWalletBalanceLoading.value = true;
    try {
      const res = await getWalletStatus('VND');
      const balance = Number(res?.balance ?? res?.data?.balance ?? 0);
      walletBalance.value = Number.isFinite(balance) ? balance : 0;
    } catch {
      walletBalance.value = 0;
    } finally {
      isWalletBalanceLoading.value = false;
    }
  };

  const payByWallet = async () => {
    const token = getVndWalletToken();
    await createWalletTransaction(
      {
        assetSymbol: 'VND',
        type: 'withdraw',
        quantity: totalPrice.value,
        price: 1,
        total: totalPrice.value,
        source: `Thanh toan don thiep cuoi (${selectedTheme.value?.name || 'Wedding Card'})`,
      },
      token,
    );
  };

  // Final submit
  const submitOrder = async () => {
    isSubmitting.value = true;
    try {
      if (shouldUseWalletPayment.value) {
        await payByWallet();
      }

      const orderData = {
        planId: selectedPlanId.value,
        templateId: selectedTheme.value?.id,
        quantity: quantity.value,
        unitPrice: unitPrice.value,
        serviceFee: autoFee.value * quantity.value,
        totalAmount: totalPrice.value,
        deliveryType: deliveryType.value,
        weddingData: { ...weddingData.value },
        guestList: guestList.value,
        paymentReceipt: shouldUseWalletPayment.value ? '' : paymentReceipt.value,
        paymentMethod: shouldUseWalletPayment.value ? 'wallet' : 'bank_transfer',
      };

      await weddingApi.createOrder(orderData);

      if (shouldUseWalletPayment.value) {
        walletBalance.value = Math.max(0, walletBalance.value - totalPrice.value);
      }

      step.value = 'success';
      showToast('Don hang da duoc tao thanh cong!', 'success');
      emit('orderCreated');
    } catch {
      showToast('Loi khi thanh toan/tao don hang. Vui long thu lai.', 'error');
    } finally {
      isSubmitting.value = false;
    }
  };

  const resetAll = () => {
    step.value = 'plan';
    selectedPlanId.value = '';
    selectedTheme.value = null;
    weddingData.value = { groomName: '', brideName: '', groomParents: '', brideParents: '', ceremonyDate: '', ceremonyTime: '', partyDate: '', partyTime: '', qrPaymentUrl: '', address: '', mapLat: 0, mapLng: 0, mapPlaceId: '' };
    quantity.value = 100;
    deliveryType.value = 'static';
    guestList.value = [];
    guestValidation.value = null;
    paymentReceipt.value = '';
    paymentReceiptFile.value = null;
    walletBalance.value = 0;
    isWalletBalanceLoading.value = false;
  };

  return {
    step, isSubmitting, selectedPlanId, selectedPlanLabel,
    selectedTheme, weddingData, quantity, deliveryType,
    guestList, guestValidation, isValidatingGuests,
    paymentReceipt, paymentReceiptFile, walletBalance, isWalletBalanceLoading,
    CARD_THEMES, unitPrice, autoFee, totalPerCard, totalPrice,
    formatPrice, canGoToInfo, canGoToPurchase, canGoToPayment, canFinish, shouldUseWalletPayment,
    selectPlan, selectTheme, goBack, goNext,
    downloadTemplate, importExcel, validateGuests,
    handleReceiptUpload, submitOrder, resetAll, loadWalletBalance,
  };
}
