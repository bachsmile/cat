# Tài liệu Nghiệp vụ Chi tiết Module Wedding (Phía Người dùng)

Hệ thống cung cấp giải pháp tạo và quản lý thiệp mời điện tử chuyên nghiệp. Dưới đây là mô tả chi tiết các luồng xử lý và nghiệp vụ kỹ thuật.

---

## 1. Luồng Đặt hàng (4 Bước Chi tiết)

### Bước 1: Lựa chọn Gói dịch vụ & Giao diện

- **Danh sách mẫu (Themes):**
  - `elegant` (Hạnh Phúc): Giao diện hiện đại, tối giản.
  - `classic` (Sắc Hồng): Giao diện dạng sách lật truyền thống.
  - `royal` (Hoàng Gia): Giao diện sang trọng, quý phái.
- **Tính năng Xem thử (Preview Theme):**
  - Khi click "Xem thử", hệ thống mở `WcoCardPreviewModal`.
  - Data truyền vào là `SAMPLE_DATA` (Họ tên mẫu: Thành Vinh - Thanh Thanh). Mục đích để người dùng thấy animation và bố cục của thiệp.
- **Giá dịch vụ:** Mỗi theme có một đơn giá riêng (Ví dụ: 2000đ, 3000đ, 5000đ).

### Bước 2: Nhập liệu thông tin Lễ cưới (Wedding Data)

Hệ thống yêu cầu nhập các trường thông tin sau:

1.  **Thông tin cặp đôi:** Tên Chú rể, Cô dâu.
2.  **Thông tin gia đình:** Họ tên cha mẹ nhà trai, nhà gái (Sử dụng ghi lên thiệp).
3.  **Lễ cưới (Ceremony):** Ngày dương lịch, ngày âm lịch, giờ tổ chức.
4.  **Tiệc cưới (Wedding Party):** Ngày dương lịch, ngày âm lịch, giờ mời tiệc.
5.  **Địa điểm & Bản đồ:**
    - Nhập địa chỉ chi tiết nhà hàng/tư gia.
    - Google Maps: Hệ thống tự động generate link nhúng (`https://maps.google.com/maps?q=[Address]&output=embed`).
6.  **Mừng cưới (QR Payment):** Thông tin số tài khoản hoặc lời chúc để generate QR mừng cưới.
7.  **Xem trước thực tế (Live Preview):**
    - Nút "Xem trước thiệp" sẽ lấy **dòng dữ liệu thực tế** người dùng vừa nhập để render vào thiệp.
    - Giúp người dùng kiểm tra lỗi chính tả trước khi đặt hàng.

### Bước 3: Cấu hình Gói & Tính toán chi phí

- **Số lượng (Quantity):** Người dùng nhập số lượng thiệp muốn tạo (Ví dụ: 500 thiệp).
- **Loại dịch vụ (Delivery Type):**
  - `static` (Thiệp tĩnh): 1 link duy nhất cho tất cả khách.
  - `auto` (Thiệp tự động): Mỗi khách 1 link cá nhân hóa nội dung.
- **Công thức tính tiền:**
  ```
  Tổng tiền = (Đơn giá mẫu * Số lượng) + (Phí dịch vụ tự động * Số lượng)
  Trong đó: Phí dịch vụ tự động mặc định là 500đ/thiệp.
  ```

### Bước 4: Danh sách Khách mời & Thanh toán

- **Quản lý Guest List qua Excel:**
  - Chỉ khả dụng khi chọn gói `auto`.
  - Phải chứa đúng các cột: `name` (Tên khách - bắt buộc), `phone` (SĐT), `email`, `address`.
  - **Validate:** API `/wedding/validate-guests` sẽ kiểm tra tính hợp lệ của từng dòng dữ liệu (đúng định dạng SĐT, Email).
- **Thanh toán (Payment):**
  - Hiển thị mã QR ngân hàng của hệ thống.
  - Người dùng tải lên ảnh chụp màn hình chuyển khoản (Base64 string).
  - Lưu vào trường `paymentReceipt` trong Database.

---

## 2. Quản lý Đơn hàng & Trạng thái (Order Tracking)

Trang hiển thị đơn hàng (`/wedding/my-order`) cho phép quản lý vòng đời đơn:

- **Bộ lọc/Danh sách:** Hiển thị theo thời gian từ mới nhất đến cũ nhất.
- **Vòng đời Trạng thái (Status Lifecycle):**
  1.  `pending`: Vừa tạo đơn, chờ Admin kiểm tra ảnh chuyển khoản.
  2.  `confirmed`: Admin đã xác nhận tiền, hệ thống đang chuẩn bị tài nguyên.
  3.  `completed`: Admin duyệt hoàn thành. Lúc này người dùng mới thấy nút "Xem danh sách thiệp mời".
  4.  `cancelled`: Đơn bị hủy do sai thông tin hoặc chưa thanh toán.

---

## 3. Nghiệp vụ Mã hóa & Tạo Link mời (Invitation Links)

Đây là nghiệp vụ quan trọng nhất sau khi đơn hàng `completed`:

### Cơ chế tạo Mã (Code Generation) - Phía Backend

Khi người dùng yêu cầu danh sách thiệp, Backend thực hiện:

- Dựa vào `orderId` và vị trí khách mời (`guestIndex`) trong mảng `guestList`.
- Tạo chuỗi Payload: `${orderId}|${guestIndex}`.
- Mã hóa Buffer chuỗi này sang định dạng `base64url`.
- Kết quả là một chuỗi ngắn không dấu (Ví dụ: `dWxpZDEyM3ww`).

### Cấu trúc Link mời

- Format: `[Tên miền]/invitation/[Mã Base64]`
- Ví dụ: `https://wedding.huongviet.com/invitation/dWxpZDEyM3ww`

### Thao tác người dùng

- Người dùng có thể copy toàn bộ danh sách link từ giao diện "Đơn hàng của tôi".
- Hệ thống cung cấp danh sách dạng: `Nguyễn Văn A: [Link]`. Người dùng chỉ cần copy-paste vào Zalo gửi cho khách.

---

## 4. Xử lý Trang Thiệp mời Công khai (Public View)

Khi khách mời click vào link mời:

1.  **Decode:** Hệ thống lấy `code` từ URL, giải mã ngược lại để lấy được `orderId` và `guestIndex`.
2.  **Fetch Data:** Lấy thông tin lễ cưới từ đơn hàng và thông tin khách mời tương ứng.
3.  **Authentication:** Đây là trang công khai nên **không yêu cầu người dùng đăng nhập**.
4.  **Personalized UI:**
    - Hiển thị lớp phủ (Overlay) chào mừng: "Thân mời [Tên khách mời]".
    - Nội dung trong thiệp (Phong bì, Lời mời) tự động chèn tên khách vào vị trí phù hợp.
    - Ví dụ: "Trân trọng kính mời Anh Nguyễn Văn A đến dự tiệc..."

---

## 5. Danh mục API & Payload tham khảo

### Tạo đơn hàng (POST `/wedding/orders`)

```json
{
  "planId": "theme_elegant",
  "templateId": "elegant",
  "quantity": 100,
  "unitPrice": 2000,
  "serviceFee": 500,
  "totalAmount": 250000,
  "deliveryType": "auto",
  "weddingData": {
    "groomName": "Văn A",
    "brideName": "Thị B",
    "ceremonyDate": "2024-12-12",
    "address": "Phú Nhuận, HCM"
  },
  "guestList": [
    { "name": "Nguyễn Văn C", "phone": "090..." },
    { "name": "Lê Thị D", "phone": "091..." }
  ],
  "paymentReceipt": "data:image/png;base64,..."
}
```

### Lấy danh sách link (GET `/wedding/orders/:id/invitations`)

- Trả về mảng các object: `{ name: "...", code: "...", link: "/invitation/..." }`.
- Sử dụng để render phía người dùng.

### Xem thiệp (GET `/wedding/invitation/:code`)

- Trả về đầy đủ thông tin để render thiệp mà không cần token.
