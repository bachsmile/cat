<template>
  <div class="wedding-home-wrapper">
    <CpHomeView
      :hero="heroData"
      :features="features"
      :cards="cardsData"
      :images="imagesData"
      :footer="footerData"
      :navItems="navItems"
    />

    <!-- Wedding Card Order Modal -->
    <WeddingCardOrderModal
      v-model="showOrderModal"
      @orderCreated="checkOrders"
    />

    <!-- Album Creation Modal -->
    <CnModal
      v-model="showAlbumModal"
      title="Khởi tạo Album Kỷ Niệm"
      width="800px"
      color="rose"
    >
      <div class="p-8 flex flex-col gap-6">
        <p class="text-gray-500 font-medium italic">
          Thêm các khoảnh khắc tuyệt vời nhất của bạn để chia sẻ cùng người
          thân.
        </p>

        <div
          class="grid grid-cols-3 gap-4 min-h-[300px] border-2 border-dashed border-rose-100 rounded-[2rem] p-6 bg-rose-50/20"
        >
          <div
            v-for="(img, idx) in newAlbumImages"
            :key="idx"
            class="aspect-square rounded-2xl overflow-hidden shadow-md relative group"
          >
            <img :src="img" class="w-full h-full object-cover" />
            <button
              @click="removeImg(idx)"
              class="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>

          <button
            @click="addPlaceholderImg"
            class="aspect-square rounded-2xl border-2 border-dashed border-rose-200 flex flex-col items-center justify-center gap-2 text-rose-300 hover:bg-rose-50 hover:text-rose-400 transition-all"
          >
            <Camera :size="32" />
            <span class="text-[10px] font-black uppercase tracking-widest"
              >Thêm ảnh</span
            >
          </button>
        </div>

        <div class="flex justify-end gap-4 mt-4">
          <CnButton variant="text" color="rose" @click="showAlbumModal = false"
            >Hủy</CnButton
          >
          <CnButton
            color="rose"
            :disabled="newAlbumImages.length === 0"
            @click="publishAlbum"
          >
            Tạo & Xem Link
          </CnButton>
        </div>
      </div>
    </CnModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CpHomeView, { type Card } from "@/components/page/CpHomeView.vue";
import WeddingCardOrderModal from "./modals/WeddingCardOrderModal.vue";
import { weddingApi } from "@/api/wedding";
import { CnModal, CnButton } from "glass-studio-ui-pro";
import {
  Mail,
  Calendar,
  Users,
  Gift,
  Camera,
  Music,
  MapPin,
  Sparkles,
  Layout,
  Package,
  Home,
} from "lucide-vue-next";

// Wedding-themed assets
import weddingHero from "@/assets/images/wd2.jpg";
import sectionBg from "@/assets/images/pp1.jpeg";
import featureLeaf from "@/assets/images/NT-2.jpg";
import footerBg from "@/assets/images/ft1.png";

// Placeholder images for demo
import demo1 from "@/assets/images/nt4.jpg";
import demo2 from "@/assets/images/fn2.jpg";

const router = useRouter();
const showOrderModal = ref(false);
const showAlbumModal = ref(false);
const existingOrders = ref<any[]>([]);
const newAlbumImages = ref<string[]>([]);

const checkOrders = async () => {
  try {
    const res = await weddingApi.getMyOrders();
    existingOrders.value = res.data;
  } catch (e) {
    console.error("Failed to fetch orders", e);
  }
};

onMounted(() => {
  checkOrders();
});

const handleThiépClick = () => {
  showOrderModal.value = true;
};

const navItems = [
  { label: "Trang chủ", icon: Home, to: "/wedding" },
  { label: "Đơn hàng", icon: Package, to: "/wedding/my-order" },
  { label: "Tạo thiệp", icon: Mail, onClick: handleThiépClick },
];

const addPlaceholderImg = () => {
  const demos = [demo1, demo2];
  const selected = demos[Math.floor(Math.random() * demos.length)];
  if (selected) {
    newAlbumImages.value.push(selected);
  }
};

const removeImg = (idx: number) => {
  newAlbumImages.value.splice(idx, 1);
};

const publishAlbum = () => {
  const randomId = Math.random().toString(36).substring(7).toUpperCase();
  router.push(`/wedding/album?id=W-${randomId}`);
};

const bgTexture = "rgb(250 245 245)";

const heroData = {
  title:
    'Ngày Chung Đôi<br /><span class="text-[#ff80ab]">Khoảnh Khắc Mãi Mãi</span>',
  subtitle:
    "Nâng tầm ngày trọng đại nhất cuộc đời bạn với nền tảng quản lý đám cưới thông minh. Từ sơ đồ chỗ ngồi đến danh sách quà tặng, mọi thứ đều nằm trong tầm tay.",
  bgImage: weddingHero,
  ctaText: "Lên kế hoạch ngay",
  onCtaClick: handleThiépClick,
};

const features = [
  {
    icon: Calendar,
    label: "Lịch Trình Hoàn Hảo",
    desc: "Quản lý timelines chi tiết cho lễ dạm ngõ, lễ đính hôn và ngày cưới chính thức.",
  },
  {
    icon: Users,
    label: "Quản Lý Khách Mời",
    desc: "Theo dõi danh sách khách mời, phản hồi RSVP và sắp xếp sơ đồ bàn tiệc thông minh.",
  },
  {
    icon: Mail,
    label: "Thiệp Mời Điện Tử",
    desc: "Tạo và gửi thiệp mời digital sang trọng với tính năng theo dõi lượt mở thiệp.",
  },
  {
    icon: MapPin,
    label: "Vị Trí Tổ Chức",
    desc: "Tích hợp bản đồ dẫn đường và thông tin chi tiết về không gian sảnh tiệc.",
  },
];

const cardsData: Card[] = [
  {
    id: "wedding-card",
    type: "card",
    color: "rose",
    icon: Layout,
    iconBgClass: "bg-[#4a1e30]",
    iconSize: 56,
    title: "Thiệp Cưới",
    desc: "Bắt đầu hành trình tạo nên tấm thiệp mời điện tử độc bản của riêng bạn.",
    onClick: handleThiépClick,
  },
  {
    id: "registry",
    type: "card",
    color: "rose",
    icon: Gift,
    iconBgClass: "bg-[#4a1e30]",
    iconSize: 56,
    title: "Danh Sách Quà Tặng",
    desc: "Tạo danh sách mong muốn và giúp khách mời dễ dàng lựa chọn món quà ý nghĩa nhất.",
  },
  {
    id: "gallery",
    type: "card",
    color: "amber",
    icon: Camera,
    iconBgClass: "bg-[#4d3a24]",
    iconSize: 56,
    title: "Kho Ảnh Kỷ Niệm",
    desc: "Bấm để tạo album ảnh và bắt đầu hành trình lưu giữ những khoảnh khắc đẹp nhất.",
    onClick: () => (showAlbumModal.value = true),
  },
  {
    id: "my-order",
    type: "card",
    color: "emerald",
    icon: Sparkles,
    iconBgClass: "bg-[#1a3d2a]",
    iconSize: 56,
    title: "Đơn Hàng Của Tôi",
    desc: "Theo dõi trạng thái đơn hàng, xem danh sách thiệp mời đã tạo và gửi link cho khách.",
    onClick: () => router.push("/wedding/my-order"),
  },
  {
    id: "music",
    type: "card",
    color: "indigo",
    icon: Music,
    iconBgClass: "bg-[#1e1a3d]",
    iconSize: 56,
    title: "Playlist Âm Nhạc",
    desc: "Lựa chọn những giai điệu lãng mạn cho từng phân đoạn của buổi tiệc.",
  },
  {
    id: "visual-img",
    type: "image",
    image: sectionBg,
  },
  {
    id: "budget",
    type: "card",
    color: "emerald",
    icon: Sparkles,
    iconBgClass: "bg-[#1e4a2e]",
    iconSize: 56,
    title: "Dự Trù Ngân Sách",
    desc: "Kiểm soát chi phí minh bạch và tối ưu hóa ngân sách cho từng dịch vụ.",
  },
];

const imagesData = {
  bgTexture: bgTexture,
  sectionBg: sectionBg,
  heroLeaf: featureLeaf,
  footerBg: footerBg,
};

const footerData = {
  tag: "FOREVER TOGETHER",
  title: "Building Your Dream Wedding Journey",
  bgColor: "#4a1e30",
  textColor: "#fce4ec",
};
</script>
