# Danh mục tài sản

Ngày 12/11/2026, nền 36 màn và 12 thẻ lịch sử đã được tích hợp bộ 25 ảnh tư liệu do người dùng cung cấp. Ảnh có mô tả, chú thích, niên đại, nguồn đăng, lưu ý và tình trạng quyền dùng. Xem [danh mục ảnh và ánh xạ từng mốc](Anh_tu_lieu.md). Ảnh WebP được đóng gói trong `public/images/history/`; không phụ thuộc hotlink từ trang nguồn để hiển thị.

Nhân vật, đạo cụ, trang chủ và ending giữ minh họa SVG nội bộ. Bảng dưới mô tả các cảnh minh họa dùng cho phần khám phá đạo cụ; nền chính của các màn dùng tư liệu được liệt kê trong danh mục ảnh.

| Mã bối cảnh | Thành phần phân biệt | Màn dùng chung cho ba tuyến |
|---|---|---|
| riverside | Bến sông, bàn trà, túi vải, An | 01 |
| departure | Tàu hơi nước, cầu tàu, khói, sổ hành trình | 02 |
| workers | Bảng ca lao động, khu cảng, ánh sáng buổi tối | 03 |
| attic | Cửa sổ, đèn, bàn học tiếng | 04 |
| petition | Trang Yêu sách năm 1919, bản đồ | 05 |
| july | Trang báo tháng Bảy, ánh đèn đêm | 06 |
| tours | Bản đồ Tours, bảng niên đại 1920 | 07 |
| press | Bản đọc nội bộ và dụng cụ in minh họa | 08 |
| study | Bảng so sánh, sơ đồ, ghi chép năm 1923 | 09 |
| classroom | Bảng học tập, báo Thanh niên, bạn đọc | 10 |
| book | Trang Đường Kách mệnh năm 1927, đèn đêm | 11 |
| reunion | Bảng tổng kết 1930, dòng thời gian | 12 |

- `src/components/HarborScene.tsx`: cảnh bến cảng dựa trên mã trong ZIP người dùng cung cấp; đã bổ sung bàn trà, bảng ca làm, các biến thể và ID SVG riêng.
- `src/components/SceneArt.tsx`: chọn ảnh nền theo mốc; giữ cảnh trong phòng, đạo cụ và năm chân dung An/Bác Tư/Lâm/Mai/Bình tự dựng cho ứng dụng. Chân dung chỉ minh họa nhân vật hư cấu.
- `src/components/HistoricalMedia.tsx`: trình bày nền ảnh, thư viện, chú thích, nguồn và cửa sổ phóng lớn. Ảnh trong thẻ và cửa sổ lớn giữ trọn khung, không xóa dấu nguồn. Nút đạo cụ hư cấu đặt riêng dưới ảnh.
- Ending: ba trạng thái ánh sáng, bàn học và sự hiện diện của bạn đọc được dùng cho chín lời kết. Mỗi kết thúc có lời mô tả minh họa riêng trong dữ liệu. Bộ tranh chín ending độc lập chưa được vẽ riêng.
- `src/components/Icon.tsx`: nét icon SVG dựa trên bản mẫu được cung cấp.
- `public/favicon.svg`: biểu tượng la bàn tự dựng.
- `src/audio.ts`: gió/không gian và tiếng phản hồi tạo trực tiếp bằng Web Audio, không có bản ghi âm bên ngoài. Mặc định tắt.
- Phông Lora và Be Vietnam Pro được gọi từ Google Fonts; có phông serif/sans-serif hệ thống dự phòng khi mất kết nối. Không cần mạng để dựng các cảnh SVG; lần mở ứng dụng vẫn cần máy chủ cung cấp HTML/JS/CSS.

Quyền đối với bản mẫu ZIP và cốt truyện được giữ theo tài liệu người dùng cung cấp; không tự tuyên bố có giấy phép phân phối công khai cho tài liệu gốc. Tình trạng quyền sử dụng của 25 ảnh được lưu theo danh mục nguồn, không coi việc có chú thích là bằng chứng ảnh có giấy phép mở. Các phần SVG và âm thanh mới không dùng tài sản tải từ kho bên ngoài. Chưa xuất bản công khai.
