# Kết quả kiểm tra

## Tích hợp ảnh tư liệu · 12/11/2026

- `npm test`: **22/22 đạt**, gồm 19 kiểm thử engine và 3 kiểm thử metadata ảnh, độ phủ 36 màn/12 thẻ, tệp WebP, nguồn, niên đại và dung lượng.
- `npm run build`: **đạt**, TypeScript và bản production được tạo thành công.
- Kiểm tra trực tiếp đủ 36 màn qua UI, lần lượt ba tuyến I → II → III. Mỗi màn có ảnh nền theo mốc, chú thích về thời điểm ảnh và liên kết nguồn. Các tuyến vẫn mở và hoàn thành đúng luồng.
- Duyệt 29 lượt hiển thị ảnh trong 12 thư viện, phủ đủ 25 ảnh riêng: ảnh tải thành công, tiêu đề và nguồn đổi đúng khi chọn thumbnail. Các ảnh dùng chung xuất hiện ở nhiều thẻ phù hợp.
- Kiểm tra phóng lớn LS01, báo Thanh Niên và bản quét Le Paria. Bản lớn LS15 tải từ tệp WebP 1860 × 2600, chỉ tải khi mở. Nhấn Esc đóng cửa sổ ảnh, giữ thẻ lịch sử và trả focus về nút mở ảnh.
- Ở viewport 360 × 800, kiểm tra ảnh nền, thẻ lịch sử, nguồn dài và chế độ chữ lớn: chiều rộng trang là 345px sau thanh cuộn, `scrollWidth` cũng là 345px; vùng nội dung hộp thoại 328px không tràn ngang.
- Các nút khám phá đạo cụ hoạt động ở phần dưới ảnh; hình trong cửa sổ đạo cụ là SVG minh họa, tránh gán đồ vật trong tư liệu thật cho An. Ending vẫn dùng minh họa hư cấu.
- Console trình duyệt không ghi nhận cảnh báo hoặc lỗi trong phiên kiểm tra. Ảnh được đóng gói cục bộ; liên kết nguồn chỉ dùng để xem xuất xứ.
- Đã duyệt 31 ảnh người dùng chụp. Chưa dùng ảnh nào do nội dung chủ yếu ở giai đoạn sau 1945, ngoài khung 1911–1930 của trò chơi.

Tổng 27 tệp WebP (25 bản thường và 2 bản lớn), khoảng 5,47 MiB. Tệp nguồn bên ngoài dự án và ảnh người dùng chụp được giữ nguyên. Dữ liệu chơi thử được đưa về trạng thái mới trước bàn giao. Chưa kiểm tra trên thiết bị cảm ứng thật hoặc bằng trình đọc màn hình.

## Kiểm tra nền tảng · 04/11/2026

## Tự động

`npm test`: **19/19 bài kiểm tra đạt** trên Node.js 24.11.0.

| Nhóm | Kết quả thực tế |
|---|---|
| Dữ liệu | 3 tuyến × 12 màn, 144 ID lựa chọn riêng, 12 thẻ lịch sử, 9 ending; mỗi KT đúng một đáp án |
| Đường mẫu ba tuyến | Good = 24; Bad = −7; đã kiểm tra thứ tự gốc và thứ tự đảo |
| Mốc K6/K12 | Sai riêng K6 = 22 điểm và Neutral; sai cả hai = 20 và Neutral |
| Ranh giới | 7/8, 17/18 và mọi tổ hợp hai cờ kiến thức đều đúng quy tắc |
| Hội tụ nhánh | Duyệt cả 144 phương án; mọi lựa chọn tới màn kế tiếp, chỉ màn 12 được chốt ending |
| Ghi nhận một lần | Chọn lặp, nhấp từ màn cũ, bấm tiếp lặp không tăng điểm hoặc bỏ màn |
| Khôi phục | Giữ đúng phase hệ quả, ID lựa chọn, thứ tự phương án và tổng điểm |
| Mở tuyến | Good, Neutral, Bad đều mở tuyến kế; bắt đầu lượt mới giữ bộ sưu tập và lịch sử |
| Bản lưu | Từ chối JSON hỏng, phiên bản lạ, điểm/cờ/ID/thứ tự/nhật ký/vật phẩm không nhất quán |
| Chặn lưu | Mô phỏng lỗi đọc và hết dung lượng; vẫn chọn và chơi được trong bộ nhớ |
| Kế thừa | Lời thoại dùng lựa chọn ngữ nghĩa ở màn trước, không cộng thêm điểm |

`npm run build`: **đạt** kiểm tra TypeScript và build production bằng Vite. Không có lỗi kiểu dữ liệu. Tệp production được tạo trong `dist/`.

## Kiểm tra trực tiếp trên trình duyệt

Địa chỉ thử: `http://127.0.0.1:5173/` (HTTP 200). Kiểm tra bằng trình duyệt trong ứng dụng Codex.

- Chơi liên tục đủ 36 màn qua UI: I → Good “Ánh sáng trên con đường”; II → Good “Cuốn sổ có người đọc”; III → Neutral “Một bàn đọc còn mở” khi sai mốc 6.
- Mỗi lần chọn hiện hệ quả và khóa bốn nút. Không có ending trước màn 12.
- Tải lại tại phần hệ quả I-01 giữ nguyên lựa chọn và trạng thái khóa.
- Mở/đóng nhật ký bằng Esc không mất phần hệ quả. Focus trở về điều khiển đã mở cửa sổ.
- Trang mở đầu tuyến mới có nhãn góc nhìn khác và đạo cụ kế thừa; điểm của lượt trước không mang sang.
- Ôn lại câu III-06 trong nhật ký, đóng và tải lại: kết quả vẫn là Neutral và vẫn có một thẻ cần ôn.
- Bộ sưu tập có chín ô; sau ba lượt thử có đúng ba ending đã mở.
- Xuất JSON bằng nút cài đặt, nhập lại chính tệp vừa xuất, xác nhận nhập: giữ đủ ba ending và lịch sử lượt.
- Kiểm tra hộp xác nhận bắt đầu lại, mô tả rõ lượt bị thay và phần dữ liệu được giữ.
- Desktop ở viewport mặc định khoảng 1264px; mobile override 360 × 800. Nội dung tiếng Việt hiển thị đủ, bố cục xếp dọc và cuộn được.
- Ở 360px, bật chữ lớn và giảm chuyển động: `scrollWidth` bằng `clientWidth` (345px sau thanh cuộn), không cuộn ngang. Focus nhìn rõ khi đóng hộp thoại bằng bàn phím.

## Giới hạn kiểm chứng

Chưa đo thời lượng bằng người chơi, chưa thử thiết bị cảm ứng thật hoặc trình đọc màn hình. Chưa có kiểm tra tự động độ tương phản toàn bộ UI. Lỗi trình duyệt chặn lưu được kiểm tra qua adapter engine; không thay cấu hình bảo mật của trình duyệt người dùng. Cảnh SVG không phụ thuộc tệp ảnh tải ngoài nên không có ca ảnh raster hỏng. Liên kết nguồn gốc về Tours tại mpi.gov.vn timeout; đã ghi trạng thái và bổ sung biên niên chính thức.

Dữ liệu chơi thử được đưa về trạng thái mới trước bàn giao; không cài sẵn các tuyến hoặc ending đã mở cho người chơi.
