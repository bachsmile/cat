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
  Wallet,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  CreditCard,
  History,
  PieChart,
  Layers,
  Zap,
} from "lucide-vue-next";

// Finance-related assets
import finBanner from "@/assets/images/fn3.jpeg";
import fzToken from "@/assets/images/fz-token.png";
import footerBg from "@/assets/images/ft1.png";
import sectionBg from "@/assets/images/pp2.png"; // Different texture for Finance
import featureLeaf from "@/assets/images/NT-2.jpg";

const bgTexture = "rgb(96 90 126)";
const heroData = {
  title:
    'Tài chính Thông minh<br /><span class="text-[#34d399]">Vững bước Tương lai</span>',
  subtitle:
    "Giải pháp quản lý dòng tiền đột phá, tích hợp trí tuệ nhân tạo để tối ưu hóa mọi quyết định đầu tư và chi tiêu của cá nhân & doanh nghiệp.",
  bgImage: finBanner,
  ctaText: "Bắt đầu quản lý",
  onCtaClick: () => console.log("Finance CTA Clicked"),
};

const features = [
  {
    icon: BarChart3,
    label: "Báo cáo Thông minh",
    desc: "Hệ thống tự động phân tích và đưa ra các biểu đồ trực quan về sức khỏe tài chính.",
  },
  {
    icon: ShieldCheck,
    label: "Bảo mật Tuyệt đối",
    desc: "Công nghệ mã hóa đa lớp đảm bảo an toàn cho mọi giao dịch và tài khoản.",
  },
  {
    icon: TrendingUp,
    label: "Tối ưu Đầu tư",
    desc: "AI hỗ trợ gợi ý các danh mục đầu tư tiềm năng dựa trên hồ sơ rủi ro của bạn.",
  },
  {
    icon: Zap,
    label: "Giao dịch Tức thì",
    desc: "Xử lý hàng triệu lệnh giao dịch trong chớp mắt với độ trễ cực thấp.",
  },
];

const cardsData: Card[] = [
  {
    id: "wallet",
    type: "card",
    color: "emerald",
    icon: Wallet,
    title: "Ví Điện Tử",
    desc: "Quản lý đa ví, hỗ trợ cả tài sản số và tiền tệ truyền thống một cách liền mạch.",
  },
  {
    id: "transactions",
    type: "card",
    color: "slate",
    icon: History,
    iconBgClass: "bg-[#1e2a24]",
    title: "Lịch sử Giao dịch",
    desc: "Theo dõi chi tiết mọi biến động số dư với tính năng lọc thông minh theo danh mục.",
  },
  {
    id: "planning",
    type: "card",
    color: "amber",
    icon: PieChart,
    iconBgClass: "bg-[#4d3a24]",
    title: "Lập Kế hoạch",
    desc: "Xây dựng mục tiêu tài chính dài hạn và thiết lập ngân sách chi tiêu hàng tháng.",
  },
  {
    id: "token-img",
    type: "image",
    image: fzToken, // Using fz-token image
  },
  {
    id: "cards",
    type: "card",
    color: "rose",
    icon: CreditCard,
    title: "Thẻ & Liên kết",
    desc: "Tích hợp thẻ ngân hàng và các dịch vụ thanh toán phổ biến chỉ trong một bước.",
  },
  {
    id: "analysis",
    type: "card",
    color: "indigo",
    icon: Layers,
    iconBgClass: "bg-[#8A6A72]",
    title: "Phân tích Chuyên sâu",
    desc: "Dịch vụ tư vấn tài chính chuyên biệt từ các chuyên gia hàng đầu và trợ lý AI.",
  },
];

const imagesData = {
  bgTexture: bgTexture,
  sectionBg: sectionBg,
  heroLeaf: featureLeaf,
  footerBg: footerBg,
};

const footerData = {
  tag: "FINZO FINANCE",
  title: "Smart Financial Management System",
  bgColor: "rgb(36 30 67)",
  textColor: "#e2e8f0",
};
</script>
