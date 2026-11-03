# Hành trình tìm đường cứu nước

Web app kể chuyện lịch sử bằng tiếng Việt, dùng React + TypeScript + Vite. Ba tuyến **Người lên đường**, **Người ghi chép**, **Người kết nối** có tổng cộng 36 màn, 144 lựa chọn và 9 ending. Cốt truyện theo tài liệu trong `docs/Prompt_02_Cot_truyen_va_Xay_dung_Web_App.md`; bố cục, màu và cảnh bến cảng theo bản mẫu trong ZIP đã cung cấp.

## Setup trên Windows bằng Conda

Ứng dụng chạy bằng **Node.js 24 và npm**. Python 3.12 chỉ dùng khi biên dịch lại cốt truyện bằng `npm run content`; chơi game, kiểm thử và build đều chạy bằng Node.js. File [environment.yml](environment.yml) tạo môi trường Conda riêng chứa cả hai công cụ; các thư viện React/Vite được cài bằng npm trong thư mục dự án.

Không cần database, backend, khóa API hoặc file `.env`. Môi trường Conda và file cấu hình `.env` là hai khái niệm khác nhau.

### 1. Mở terminal tại dự án

Mở **Anaconda PowerShell Prompt** từ Start Menu, hoặc PowerShell đã sử dụng được lệnh `conda`:

```powershell
Set-Location 'D:\Footsteps-To-Dawn-Game'
conda --version
```

Nếu dùng **Anaconda Prompt** dạng Command Prompt, lệnh chuyển thư mục tương ứng là:

```bat
cd /d D:\Footsteps-To-Dawn-Game
```

Các lệnh `conda`, `node`, `python` và `npm` bên dưới dùng được ở cả hai loại terminal.

### 2. Tạo môi trường — chỉ làm lần đầu

```powershell
conda env create --file environment.yml
conda activate footsteps-to-dawn
node --version
npm --version
python --version
```

Kết quả mong đợi: Node.js `v24.x`, npm có phiên bản và Python `3.12.x`. Khi active thành công, terminal thường có tiền tố `(footsteps-to-dawn)`. Môi trường do Conda quản lý, không nằm trong `node_modules`.

Nếu môi trường `footsteps-to-dawn` đã tồn tại, bỏ qua lệnh tạo và dùng `conda activate footsteps-to-dawn`. Khi chủ động cập nhật theo `environment.yml`, chạy:

```powershell
conda env update --name footsteps-to-dawn --file environment.yml
```

### 3. Cài thư viện JavaScript

Tại thư mục chứa `package.json` và `package-lock.json`, chạy:

```powershell
npm ci
```

Lệnh này cài đúng các phiên bản trong lockfile vào `node_modules`. Cần Internet cho lần tải gói đầu tiên. Chạy lại khi tải dự án sang máy khác hoặc khi `package-lock.json` thay đổi; không cần cài lại mỗi lần mở game.

### 4. Chạy hệ thống

```powershell
npm run dev -- --port 5173 --strictPort
```

Giữ terminal này mở và truy cập **[http://127.0.0.1:5173/](http://127.0.0.1:5173/)**. Vite tự cập nhật giao diện khi sửa mã nguồn. Nhấn **Ctrl+C** trong terminal để dừng máy chủ.

Mỗi lần mở terminal mới, chỉ cần:

```powershell
Set-Location 'D:\Footsteps-To-Dawn-Game'
conda activate footsteps-to-dawn
npm run dev -- --port 5173 --strictPort
```

Sau khi dừng máy chủ, có thể thoát môi trường bằng `conda deactivate`.

### Chạy bằng `conda run` nếu không muốn activate

Tại thư mục dự án:

```powershell
conda run --no-capture-output --name footsteps-to-dawn npm ci
conda run --no-capture-output --name footsteps-to-dawn npm run dev -- --port 5173 --strictPort
```

Cách này cũng hữu ích nếu terminal nhận lệnh `conda` nhưng `conda activate` chưa hoạt động. Với bản Anaconda hiện có trên máy này, nếu PowerShell không tìm thấy lệnh `conda`, có thể gọi đường dẫn đầy đủ:

```powershell
& 'E:\Anaconda\Scripts\conda.exe' run --no-capture-output --name footsteps-to-dawn npm run dev -- --port 5173 --strictPort
```

Đường dẫn `E:\Anaconda` là vị trí cài trên máy hiện tại; thay lại nếu cài Anaconda/Miniconda ở nơi khác.

## Chạy không dùng Conda

Nếu máy đã có Node.js 24 kèm npm, có thể chạy trực tiếp:

```powershell
Set-Location 'D:\Footsteps-To-Dawn-Game'
node --version
npm ci
npm run dev -- --port 5173 --strictPort
```

Chỉ cần Python nếu chạy lệnh biên dịch lại nội dung. File JSON cốt truyện sẵn có đã đủ để chạy ứng dụng.

## Kiểm thử, build và xem bản production

Sau khi active môi trường và cài thư viện:

```powershell
npm test
npm run build
npm run preview -- --port 4173 --strictPort
```

- `npm test`: kiểm tra dữ liệu, điểm, ending và lưu/khôi phục tiến trình.
- `npm run build`: kiểm tra TypeScript rồi tạo bản production trong `dist/`.
- `npm run preview`: phục vụ bản đã build tại [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Chạy build trước khi preview, và build lại sau khi sửa mã nguồn.
- `npm run content`: tạo lại JSON cốt truyện và tài liệu từ phụ lục Markdown; chỉ cần khi sửa nội dung nguồn. Lệnh này ghi lại các file được sinh trong `src/content/` và `docs/`.

Cũng có thể chạy từng lệnh bằng `conda run --no-capture-output --name footsteps-to-dawn`, ví dụ `conda run --no-capture-output --name footsteps-to-dawn npm test`.

Không mở `index.html` hoặc `dist/index.html` bằng cách nhấp đúp; dùng máy chủ dev/preview để nạp module đúng cách. Bản production có thể phục vụ bằng máy chủ tĩnh; chưa có bước xuất bản công khai trong quy trình này.

## Setup đã kiểm tra trên máy hiện tại

Ngày 04/11/2026, đã tạo môi trường từ `environment.yml` và kiểm tra thực tế:

| Thành phần | Phiên bản / kết quả |
|---|---|
| Conda | 24.11.3 |
| Môi trường | `footsteps-to-dawn` tại `E:\Anaconda\envs\footsteps-to-dawn` |
| Node.js | v24.22.1, thực thi từ môi trường Conda |
| npm | 11.19.1 |
| Python | 3.12.16, thực thi từ môi trường Conda |
| `npm ci` | Cài thư viện thành công theo lockfile |
| `npm test` | 19/19 kiểm thử đạt |
| `npm run build` | TypeScript và build production thành công |

Các lệnh xác minh được chạy bằng `conda run --no-capture-output --name footsteps-to-dawn`. Phiên bản bản vá có thể khác khi tạo lại sau này vì `environment.yml` giữ nhánh Node.js 24 và Python 3.12.

## Xử lý lỗi thường gặp

| Hiện tượng | Cách xử lý |
|---|---|
| `conda` không được nhận diện | Mở Anaconda PowerShell Prompt/Anaconda Prompt, hoặc dùng đường dẫn đầy đủ như ví dụ trên. |
| `conda activate` yêu cầu `conda init` | Dùng terminal Anaconda đã cấu hình sẵn hoặc cách `conda run`; không cần sửa PowerShell profile để chạy dự án. |
| Môi trường đã tồn tại | Dùng `conda activate footsteps-to-dawn`, không tạo lại. |
| `npm.ps1 cannot be loaded` | Dùng `npm.cmd` thay `npm`, ví dụ `npm.cmd ci` và `npm.cmd run dev -- --port 5173 --strictPort`. |
| Node quá cũ hoặc vẫn chạy nhầm Node hệ thống | Kiểm tra `node --version`; dùng `conda run --name footsteps-to-dawn node --version` và chạy các lệnh qua `conda run`. Trong PowerShell có thể xem vị trí bằng `Get-Command node`. |
| Không tìm thấy `package.json` | Chuyển về `D:\Footsteps-To-Dawn-Game` trước khi chạy npm. |
| `vite`/thư viện chưa được tìm thấy | Chạy `npm ci` tại thư mục dự án. |
| `Port 5173 is already in use` | Nếu bản game đã chạy, mở địa chỉ hiện có. Hoặc dừng terminal đang chạy bằng Ctrl+C; nếu cần một bản khác, dùng `--port 5174 --strictPort` và mở địa chỉ được in ra. |
| Không tải được gói Conda/npm | Kiểm tra mạng hoặc proxy đang dùng, rồi thử lại; giữ `environment.yml` và `package-lock.json`. |
| Game trông như mất tiến trình khi đổi địa chỉ/cổng | Bản lưu phụ thuộc trình duyệt và địa chỉ truy cập. `localhost`, `127.0.0.1` và mỗi cổng là các nơi lưu khác nhau; xuất/nhập JSON trong Cài đặt để chuyển bản lưu. |

Tham khảo chính thức: [quản lý môi trường Conda](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-environments.html), [hướng dẫn Vite](https://vite.dev/guide/). Dùng `conda env create` để tương thích với Conda 24.11.3 đang có trên máy này.

## Nội dung và cấu trúc

- `src/content/story.json`: dữ liệu ba tuyến, 36 màn, ID ngữ nghĩa của lựa chọn, điểm, phản hồi, vật phẩm, điều kiện xuyên màn, 12 thẻ nguồn và 9 lời kết.
- `src/content/index.ts`: kiểu dữ liệu và tra cứu nội dung.
- `src/engine.ts`: engine thuần, ghi nhận lần chọn đầu, chuyển màn, chốt ending, kiểm tra bản lưu.
- `src/App.tsx`: trang chủ, giới thiệu, hướng dẫn, màn chơi, chọn tuyến, tạm dừng, bản đồ, nhật ký, ôn tập, nguồn, bộ sưu tập và cài đặt.
- `src/components/`: minh họa SVG, chân dung, icon, hộp thoại native có quản lý focus.
- `src/audio.ts`: âm thanh tổng hợp tùy chọn.
- `tests/engine.test.ts`: các đường mẫu, ranh giới, dữ liệu, tính bất biến và khôi phục tiến trình.
- `scripts/build_content.py`: biên dịch phụ lục được cung cấp thành dữ liệu và tài liệu biên tập. Chạy `npm run content` khi thay bản nội dung gốc.

Tài liệu: [cốt truyện biên tập](docs/Cot_truyen_bien_tap.md), [nguồn lịch sử](docs/Nguon_lich_su.md), [danh mục tài sản](docs/Tai_san.md), [kết quả kiểm tra](docs/Kiem_thu.md).

## Luật lựa chọn và ending

Mỗi lượt bắt đầu T = 0, giữ cả điểm âm. TH dùng đúng điểm −1/0/+1/+2 trong phụ lục; KT có một đáp án đúng +2, còn lại 0. Chỉ khi đã trả lời đủ 12 màn mới chốt:

- Good: T ≥ 18 và đúng cả K6 lẫn K12 ở lần chọn đầu.
- Neutral: T ≥ 8 và chưa đạt Good.
- Bad: T < 8.

T, cờ kiến thức và điều kiện phân loại không hiện trong lúc lựa chọn. Màn tổng kết hiển thị ba khoảnh khắc và các thẻ nên ôn. Các kết thúc chỉ thuộc nhiệm vụ hư cấu của An; dòng lịch sử giữ nguyên, dừng ở năm 1930.

Mọi kết quả của tuyến I/II đều mở tuyến tiếp theo. Lượt mới chỉ kế thừa một đạo cụ/lời mở đầu, không cộng điểm. Ôn tập nằm riêng trong nhật ký, không đổi lượt đã chốt. Chơi lại tạo run ID mới.

## Lưu và phục hồi

Ứng dụng lưu cục bộ bằng `localStorage`, khóa `footsteps-to-dawn.v1`. Mỗi lần chọn hoặc chuyển màn tạo một trạng thái hoàn chỉnh gồm phase, lựa chọn, thứ tự phương án, điểm, cờ, vật phẩm và nhật ký. Chọn lại hay bấm tiếp hai lần không được ghi nhận thêm.

Bản lưu được kiểm tra phiên bản, ID, thứ tự, tổng điểm và các dữ kiện dẫn xuất khi tải. Bản hỏng/không tương thích được giữ nguyên cho đến khi người dùng chọn phục hồi hoặc tạo bản lưu mới. Nếu trình duyệt chặn lưu hoặc hết dung lượng, lượt chơi tiếp tục trong bộ nhớ và hiện thông báo xuất bản lưu. Thay đổi từ tab khác sẽ tạm ngừng ghi để tránh ghi đè.

Cài đặt có xuất/nhập JSON; nhập bản lưu, bắt đầu lại hoặc xóa dữ liệu có hộp xác nhận rõ phạm vi. Không tự đồng bộ giữa thiết bị hoặc trình duyệt. Xóa dữ liệu trình duyệt/chế độ riêng tư có thể làm mất tiến trình.

## Bổ sung hoặc sửa màn

Chỉnh dữ liệu bên ngoài UI. Giữ nguyên `choice.id` khi chỉ đổi nhãn/vị trí, và đồng bộ ID tham chiếu ở `conditions`. Mỗi tuyến hiện có đúng 12 màn; engine coi 6/12 là mốc kiến thức, nên đổi cấu trúc này cần cập nhật luật và kiểm thử. Đảo phương án chỉ đổi `optionOrders`; nội dung, điểm và hệ quả luôn tra qua ID.

Sửa nguồn Markdown rồi chạy `npm run content` sẽ tạo lại JSON cùng tài liệu cốt truyện và nguồn. Các đoạn biên tập bổ sung nằm trong script; tránh sửa trực tiếp file sinh rồi chạy script làm mất thay đổi. Khi thay cấu trúc/lược đồ nội dung đã phát hành, tăng `dataVersion` hoặc bổ sung migration và kiểm thử tương ứng.

## Giới hạn của MVP

Minh họa SVG hình học có chất giấy, dùng lại cảnh và biến thể đạo cụ/ánh sáng; chưa có bộ tranh vẽ tay và chín tranh ending độc lập. Âm thanh là tổng hợp. Câu chuyện hiển thị ngay, không có hiệu ứng gõ chữ. Chưa có backend, đăng nhập, PWA offline hoặc đồng bộ đám mây. Thời lượng 20–30 phút là gợi ý nội dung, chưa được đo bằng nghiên cứu người chơi. Kích thước 360px và chế độ chữ lớn đã được kiểm tra; chưa có kiểm thử trực tiếp bằng trình đọc màn hình hoặc thiết bị cảm ứng thật.
