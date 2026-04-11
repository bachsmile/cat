<template>
  <CpHomeView
    :hero="heroData"
    :features="features"
    :cards="cardsData"
    :images="imagesData"
    :footer="footerData"
  />
</template>

<script setup lang="ts">
import CpHomeView, { type Card } from "@/components/page/CpHomeView.vue";
import {
  Target as TargetIcon,
  ShoppingBag as ShopIcon,
  Mic2 as MicIcon,
  Wind as WindIcon,
  Flower2 as FlowerIcon,
  Leaf as LeafIcon,
  Zap as ZapIcon,
  Gift as GiftIcon,
  Menu as MenuIcon,
} from "lucide-vue-next";

// Images
import heroLeaf2 from "@/assets/images/NT-2.jpg";
import footerBg from "@/assets/images/AdobeStock_316206806.jpeg";
import bgTexture2 from "@/assets/images/AdobeStock_2.png";
import sectionBg from "@/assets/images/pp3.png";
import heroBg from "@/assets/images/nt5.jpg";
import cardImg3 from "@/assets/images/nt3.webp";

const heroData = {
  title: 'Rennale<br /><span class="text-[#faff2e]">Renuelly</span>',
  subtitle:
    "Chăm sóc sức khỏe từ thiên nhiên. Khám phá bộ sưu tập sản phẩm hữu cơ thuần khiết, được tinh tuyển để mang lại cân bằng cho thân - tâm - trí.",
  bgImage: heroBg,
  ctaText: "Heses Roge",
};

const features = [
  {
    icon: TargetIcon,
    label: "Exelgaris",
    desc: "Công nghệ chiết xuất lạnh tối ưu dưỡng chất thảo mộc rừng tự nhiên.",
  },
  {
    icon: ShopIcon,
    label: "Narcommersi",
    desc: "Hệ thống vận tải xanh kết nối trực tiếp từ vùng nguyên liệu.",
  },
  {
    icon: MicIcon,
    label: "Cleorews",
    desc: "Đội ngũ tư vấn sức khỏe chuyên sâu phục vụ 24/7 toàn hệ thống.",
  },
  {
    icon: WindIcon,
    label: "Waohe sloa",
    desc: "Bao bì sinh học phân hủy hoàn toàn không gây hại môi trường.",
  },
];

const cardsData: Card[] = [
  {
    id: "seador",
    type: "card",
    color: "emerald",
    icon: FlowerIcon,
    title: "Stare Seador",
    desc: "Chiết xuất tinh túy biển sâu giúp phục hồi cấu trúc da từ bên trong và cấp ẩm tức thì.",
  },
  {
    id: "teavrt",
    type: "card",
    color: "slate",
    icon: LeafIcon,
    iconBgClass: "bg-[#1e2a24]",
    title: "Teavrt",
    desc: "Hỗn hợp trà thảo mộc ủ núi cao mang lại sức sống và thanh lọc cơ thể suốt ngày dài.",
  },
  {
    id: "vouse",
    type: "card",
    color: "amber",
    icon: ZapIcon,
    iconBgClass: "bg-[#4d3a24]",
    title: "Vousehuiercs",
    desc: "Bộ sưu tập phụ kiện chăm sóc tâm hồn mang thiết kế tối giản và năng lượng tích cực.",
  },
  {
    id: "img1",
    type: "image",
    image: cardImg3,
  },
  {
    id: "fias",
    type: "card",
    color: "rose",
    icon: GiftIcon,
    title: "Ssoci Fias te",
    desc: "Lựa chọn hoàn hảo cho những dịp đặc biệt with sự kết hợp tinh tế của thiên nhiên.",
  },
  {
    id: "bliss",
    type: "card",
    color: "indigo",
    icon: MenuIcon,
    iconBgClass: "bg-[#3c2d4d]",
    title: "Blisstdare",
    desc: "Nền tảng hỗ trợ setup và vận hành cửa hàng chuyên doanh thực phẩm hữu cơ trọn gói.",
  },
];

const imagesData = {
  bgTexture: bgTexture2,
  sectionBg: sectionBg,
  heroLeaf: heroLeaf2,
  footerBg: footerBg,
};

const footerData = {
  tag: "Pestres 1",
  title: "Organic Lifestyle Studio",
  bgColor: "#1e3a24",
  textColor: "#fdfaf5",
};
</script>
