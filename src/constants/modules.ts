import { 
  Scale, LineChart, Stethoscope, BookOpen, Shield, Zap, Users, Globe, 
  MessageSquare, FolderSearch, ClipboardList, Calendar, Database, 
  BarChart3, Heart, Brain, GraduationCap, Laptop, Landmark, Receipt, 
  Activity, Pill, FileText, ShoppingBag, Truck, Package,
  MapPin, Box, TrendingUp, CreditCard
} from "lucide-vue-next";

export const DOMAINS = [
  {
    id: "law",
    name: "Pháp Lý",
    desc: "Hệ sinh thái quản trị văn phòng luật toàn diện: Từ nhân sự, lịch trình đến tự động hóa hồ sơ.",
    icon: Scale,
    color: "text-blue-400",
    themeColor: "blue",
    shadow: "shadow-blue-500/20",
    features: [
      { title: "Quản lý Nhân sự & Phòng ban", desc: "Tối ưu hóa sơ đồ tổ chức, quản trị nhân lực và phân quyền chuyên sâu cho các phòng ban.", icon: Users },
      { title: "Sắp xếp & Đặt lịch làm việc", desc: "Hệ thống xếp lịch thông minh, đặt lịch tư vấn và quản lý thời gian biểu của luật sư.", icon: Calendar },
      { title: "Trao đổi & Chat nội bộ", desc: "Kênh giao tiếp bảo mật, tức thời dành riêng cho đội ngũ luật sư và cộng sự trong vụ án.", icon: MessageSquare },
      { title: "Kho Lưu trữ & Mẫu đơn", desc: "Thư viện lưu trữ tài liệu tập trung với kho biểu mẫu pháp lý chuẩn hóa toàn diện.", icon: FolderSearch },
      { title: "Quản lý Hồ sơ Vụ án", desc: "Số hóa toàn bộ tiến trình tố tụng, theo dõi trạng thái và cảnh báo thời hạn tự động.", icon: ClipboardList },
      { title: "Tự động hóa Văn bản", desc: "Tạo các hợp đồng, đơn từ phức tạp trong vài giây với công cụ soạn thảo thông minh.", icon: Zap },
      { title: "Cổng Khách hàng Bảo mật", desc: "Nâng tầm dịch vụ với cổng thông tin dành riêng cho khách hàng VIP, bảo mật tuyệt đối.", icon: Shield },
      { title: "Tra cứu & Index Án lệ", desc: "Công cụ tìm kiếm mạnh mẽ trên toàn bộ cơ sở dữ liệu và kho án lệ quốc gia tích hợp.", icon: Globe }
    ]
  },
  {
    id: "finance",
    name: "Tài Chính",
    desc: "Nền tảng quản trị tài chính doanh nghiệp và đầu tư chuyên sâu, bảo mật tối ưu.",
    icon: LineChart,
    color: "text-emerald-400",
    themeColor: "emerald",
    shadow: "shadow-emerald-500/20",
    features: [
      { title: "Quản lý Dòng tiền", desc: "Theo dõi dòng tiền ra vào theo thời gian thực with hệ thống phân loại giao dịch tự động.", icon: Receipt },
      { title: "Phân tích Đầu tư", desc: "Công cụ phân tích hiệu suất danh mục đầu tư đa kênh với các chỉ số tài chính chuyên sâu.", icon: BarChart3 },
      { title: "Kiểm toán & Tuân thủ", desc: "Tự động hóa báo cáo kiểm toán và đảm bảo tuân thủ các quy định tài chính quốc tế.", icon: Shield },
      { title: "Quản trị Rủi ro", desc: "Hệ thống cảnh báo sớm và đánh giá rủi ro dựa trên dữ liệu thị trường trực tiếp.", icon: Activity },
      { title: "Kết nối Gateway", desc: "Tích hợp liền mạch với các cổng thanh toán và hệ thống ngân hàng hàng đầu thế giới.", icon: Landmark },
      { title: "Quản lý Đa Tài sản", desc: "Danh mục quản lý tập trung cho cổ phiếu, ngoại hối, tiền điện tử và bất động sản.", icon: Database },
      { title: "Cổng Nhà đầu tư VIP", desc: "Trải nghiệm đặc quyền dành cho các nhà đầu tư lớn với báo cáo và kênh chat riêng.", icon: Users },
      { title: "Báo cáo Tự động", desc: "Xuất báo cáo tài chính, thuế và P&L chuyên nghiệp chỉ với một cú click chuột.", icon: FileText }
    ]
  },
  {
    id: "medical",
    name: "Y Tế",
    desc: "Số hóa toàn diện vận hành phòng khám và bệnh viện hiện đại chuẩn quốc tế.",
    icon: Stethoscope,
    color: "text-cyan-400",
    themeColor: "cyan",
    shadow: "shadow-cyan-500/20",
    features: [
      { title: "Hồ sơ Bệnh án EMR", desc: "Hệ thống bệnh án điện tử tập trung, bảo mật và dễ dàng truy xuất lịch sử điều trị.", icon: Database },
      { title: "Đặt lịch & Phân ca", desc: "Tối ưu hóa lịch khám của bác sĩ và đặt lịch hẹn trực tuyến cho bệnh nhân.", icon: Calendar },
      { title: "Quản lý Kho Dược", desc: "Kiểm soát tồn kho dược phẩm, vật tư y tế và cảnh báo hạn sử dụng tự động.", icon: Pill },
      { title: "Khám bệnh Từ xa", desc: "Nền tảng Telemedicine tích hợp Video Call và đơn thuốc điện tử chuẩn xác.", icon: Laptop },
      { title: "Phân tích Y khoa", desc: "Ứng dụng AI trong phân tích dữ liệu lâm sàng và hỗ trợ đưa ra phác đồ điều trị.", icon: Brain },
      { title: "Theo dõi Sức khỏe", desc: "Kết nối dữ liệu từ các thiết bị đeo thông minh để giám sát sức khỏe bệnh nhân liên tục.", icon: Activity },
      { title: "Chăm sóc Khách hàng", desc: "Tự động nhắc lịch tái khám, gửi lời chúc và chiến dịch khảo sát hài lòng.", icon: Heart },
      { title: "Quản lý Bảo hiểm", desc: "Xử lý hồ sơ bảo hiểm y tế và thanh toán điện tử nhanh chóng, minh bạch.", icon: Shield }
    ]
  },
  {
    id: "education",
    name: "Giáo Dục",
    desc: "Hệ thống quản lý giáo dục thông minh, kết nối tri thức toàn cầu.",
    icon: BookOpen,
    color: "text-orange-400",
    themeColor: "orange",
    shadow: "shadow-orange-500/20",
    features: [
      { title: "Quản lý Đào tạo", desc: "Thiết kế lộ trình học tập, quản lý khóa học và phân bổ tài nguyên giảng dạy.", icon: GraduationCap },
      { title: "Hệ thống E-Learning", desc: "Nền tảng học trực tuyến tương tác cao với hỗ trợ video, bài kiểm tra và cấp chứng chỉ.", icon: Laptop },
      { title: "Quản lý Học viên", desc: "Theo dõi tiến độ học tập, điểm số và hồ sơ rèn luyện của sinh viên toàn diện.", icon: Users },
      { title: "Cổng Phụ huynh", desc: "Kênh kết nối thời gian thực giữa nhà trường và gia đình để giám sát việc học.", icon: MessageSquare },
      { title: "Kho Học liệu Số", desc: "Thư viện tài liệu số hóa khổng lồ, hỗ trợ truy cập đa thiết bị mọi lúc mọi nơi.", icon: FolderSearch },
      { title: "Tuyển sinh & Marketing", desc: "Công cụ quản lý phễu tuyển sinh và các chiến dịch quảng bá thương hiệu giáo dục.", icon: Zap },
      { title: "Phân tích Học thuật", desc: "Báo cáo đánh giá năng lực học viên và hiệu quả giảng dạy của giáo viên.", icon: BarChart3 },
      { title: "Quản trị Tài chính", desc: "Quản lý học phí, học bổng và các khoản chi phí vận hành cơ sở giáo dục.", icon: Landmark }
    ]
  },
  {
    id: "retail",
    name: "Bán Lẻ",
    desc: "Nền tảng quản trị bán lẻ đa kênh, tối ưu hóa trải nghiệm khách hàng và vận hành.",
    icon: ShoppingBag,
    color: "text-rose-400",
    themeColor: "rose",
    shadow: "shadow-rose-500/20",
    features: [
      { title: "Quản lý Kho hàng", desc: "Theo dõi tồn kho đa điểm, cảnh báo nhập hàng và tối ưu hóa vòng quay hàng tồn.", icon: Database },
      { title: "Hệ thống Omni-channel", desc: "Kết nối đồng bộ cửa hàng vật lý và các sàn TMĐT (Shopee, Lazada, TikTok Shop).", icon: Globe },
      { title: "Phân tích Bán hàng", desc: "Báo cáo doanh thu, lợi nhuận và xu hướng tiêu dùng theo thời gian thực.", icon: TrendingUp },
      { title: "Khách hàng Thân thiết", desc: "Hệ thống CRM quản lý loyalty, tích điểm và cá nhân hóa khuyến mãi.", icon: Heart },
      { title: "Quản lý POS", desc: "Giao diện bán hàng tại quầy mượt mà, hỗ trợ đa phương thức thanh toán.", icon: CreditCard },
      { title: "Quản lý Chuỗi cửa hàng", desc: "Giám sát vận hành và hiệu quả của toàn bộ hệ thống chi nhánh từ xa.", icon: Users },
      { title: "Tự động hóa Marketing", desc: "Gửi thông báo ưu đãi và nhắc nhở mua hàng tự động qua đa kênh.", icon: Zap },
      { title: "Tích hợp Thanh toán", desc: "Liên kết trực tiếp với các cổng thanh toán ví điện tử và ngân hàng.", icon: Landmark }
    ]
  },
  {
    id: "logistics",
    name: "Vận Tải",
    desc: "Giải pháp quản trị chuỗi cung ứng và vận tải thông minh, minh bạch hóa quy trình.",
    icon: Truck,
    color: "text-indigo-400",
    themeColor: "indigo",
    shadow: "shadow-indigo-500/20",
    features: [
      { title: "Quản lý Đội xe", desc: "Theo dõi lộ trình, nhiên liệu và lịch bảo trì bảo dưỡng phương tiện trực tuyến.", icon: Truck },
      { title: "Tối ưu hóa Lộ trình", desc: "Ứng dụng thuật toán AI để sắp xếp tuyến đường giao hàng ngắn nhất và tiết kiệm nhất.", icon: MapPin },
      { title: "Quản lý Kho vận (WMS)", desc: "Số hóa quy trình nhập xuất, đóng gói và lưu kho chuyên nghiệp.", icon: Box },
      { title: "Theo dõi Đơn hàng", desc: "Hệ thống Tracking thời gian thực cho hành khách và chủ hàng thông qua App.", icon: Activity },
      { title: "Quản lý Đơn vị vận chuyển", desc: "Điều phối đơn hàng cho các bên vận chuyển thứ 3 và đối soát tự động.", icon: Package },
      { title: "Phân tích Hiệu suất", desc: "Đo lường KPI giao hàng, tỷ lệ đúng giờ và chi phí logistics trên từng đơn hàng.", icon: BarChart3 },
      { title: "Thanh toán & Đối soát", desc: "Hệ thống quản lý COD và thanh toán cước vận tải minh bạch, chính xác.", icon: Receipt },
      { title: "Truy xuất Blockchain", desc: "Ứng dụng blockchain để đảm bảo tính minh bạch và chống giả mạo trong chuỗi cung ứng.", icon: Shield }
    ]
  }
];
