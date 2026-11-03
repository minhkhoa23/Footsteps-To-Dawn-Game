# PROMPT 2 — HOÀN THIỆN CỐT TRUYỆN VÀ XÂY DỰNG WEB APP

Bạn là người thiết kế game giáo dục, biên kịch tương tác, UI/UX Designer và kỹ sư phát triển web. Hãy xây dựng một web app hoàn chỉnh có thể chơi được bằng tiếng Việt, tên **“Hành trình tìm đường cứu nước”**, dành cho môn **Lịch sử Đảng Cộng sản Việt Nam**.

Prompt này độc lập và đã nhúng toàn bộ 3 kịch bản × 12 màn, 144 lựa chọn, chín ending, quy tắc điểm và nguồn lịch sử trong PHỤ LỤC. Đọc đầy đủ, rồi phát triển sản phẩm theo yêu cầu dưới đây. Hãy thực hiện đến một bản chạy được; bản kế hoạch và phần mô tả chỉ là bước chuẩn bị.

## A. Tầm nhìn và phạm vi

Trò chơi là hành trình phiêu lưu kể chuyện trong không gian 2D. Người chơi quan sát cảnh, khám phá sự vật/sự việc, đọc lời dẫn và hội thoại, rồi chọn một trong bốn phương án. Lựa chọn tạo hệ quả cụ thể, lưu dấu trong các màn sau và ảnh hưởng ending cuối lượt.

Nhân vật chính là **An**, một thanh niên hư cấu. Nhân vật phụ gồm Bác Tư, Lâm, Mai và Bình theo phụ lục. Cốt truyện lấy cảm hứng từ lịch sử Đảng và hành trình tìm đường cứu nước của Chủ tịch Hồ Chí Minh. Các nhân vật hư cấu không thay thế vai trò hoặc quyết định của nhân vật lịch sử.

MVP phải có đủ ba tuyến chơi, 36 màn và chín ending ngay trong dữ liệu ứng dụng. Thời lượng tham khảo 20–30 phút mỗi tuyến. Có thể tạm dừng và quay lại. Ưu tiên cho người chơi bắt đầu ngay, lưu trên trình duyệt; tài khoản và backend chỉ thêm khi thực sự có yêu cầu mới.

## B. Nguồn nội dung và nguyên tắc lịch sử

Phụ lục là bản nội dung đã được thống nhất. Giữ nguyên cấu trúc, tên tuyến, mốc chính, ý nghĩa bốn lựa chọn, điểm và điều kiện ending. Có thể trau chuốt lời dẫn/hội thoại và thêm chi tiết môi trường để chơi tự nhiên hơn, nhưng mọi bổ sung cần nhất quán với thời gian, nhân vật và hệ quả đã có.

Phân biệt rõ:

1. **Sự kiện có thật:** có thẻ lịch sử và nguồn gắn với dữ kiện cụ thể.
2. **Truyện của An:** cảnh, lời thoại và nhiệm vụ sáng tác.
3. **Ending hư cấu:** kết quả nhiệm vụ của An, không làm thay đổi sự kiện lịch sử.

Good ending phản ánh việc An hiểu và có phương hướng phù hợp với tiến trình lịch sử có thật; Neutral là nhiệm vụ hoàn thành một phần; Bad là thất bại của hành trình cá nhân hoặc nhóm của An. Dùng đúng thuật ngữ “Neutral ending”.

Đối chiếu niên đại, tên văn kiện, địa điểm và vai trò lịch sử bằng các nguồn trong phụ lục. Khi cần bổ sung, ưu tiên giáo trình, bảo tàng và tài liệu chính thức; ghi nguồn thực tế đã kiểm tra. Không tạo nguồn hoặc lời trích giả. Nếu không thể truy cập nguồn, phân biệt rõ phần đã có tư liệu với phần chưa kiểm chứng trước khi bổ sung dữ kiện.

Giữ mốc kết thúc ở năm 1930. Cảnh kết phải thể hiện còn chặng đường phía trước; các sự kiện của năm 1941 hoặc 1945 chỉ được nhắc như tư liệu ngoài giai đoạn nếu được ghi rõ, không dựng như điều vừa xảy ra trong lượt chơi.

Làm rõ sự khác nhau giữa **KT – câu hỏi kiến thức có một đáp án đúng** và **TH – lựa chọn tình huống trong truyện**. Với TH, giải thích hệ quả của cách làm đối với nhiệm vụ; không biến quy ước điểm thành một kết luận lịch sử về mọi lựa chọn đời sống.

## C. Luồng ba tuyến và phân nhánh

1. **Người lên đường:** tìm hiểu, lao động, học hỏi và xác định hướng đi.
2. **Người ghi chép:** tạo nhật ký có căn cứ, kiểm tra lời kể và tư liệu.
3. **Người kết nối:** duy trì nhóm học tập, phân công và giải quyết bất đồng.

Mỗi tuyến có đúng 12 màn theo thứ tự. Mỗi màn có đúng bốn phương án và một phản hồi riêng cho từng phương án. Sau phản hồi, mọi nhánh hội tụ ở màn tiếp theo; điểm, vật phẩm, quan hệ và lựa chọn cũ vẫn được lưu. Chỉ sau màn 12 mới xét ending.

Sau ending I hoặc II, mọi loại kết quả đều mở tuyến tiếp theo. Hiển thị “Một góc nhìn khác – trở lại điểm khởi đầu” khi mở lượt kể mới, vì ba tuyến có cùng khung lịch sử nhưng khác nhiệm vụ. Lượt mới đặt lại điểm, cờ kiến thức và trạng thái nhiệm vụ; vẫn giữ bộ sưu tập, lịch sử các lượt và các tuyến đã mở.

Chi tiết kế thừa từ ending trước chỉ đổi đoạn mở đầu hoặc đạo cụ gợi nhớ, không cộng điểm hoặc ép kết quả của tuyến sau. Sau tuyến III, mở chọn chơi lại, nhật ký và bộ sưu tập chín ending. Người chơi được hoàn thành nội dung học tập mà không cần cố đạt mọi ending Bad.

Các biến thể phải thay đổi tình huống, nhiệm vụ, phản hồi và lời thoại theo phụ lục. Khi chơi lại, có thể thêm biến thể cảnh hoặc đảo phương án, với dữ kiện lịch sử và nghĩa đáp án giữ nguyên.

## D. Engine lựa chọn và ending

Mỗi tuyến bắt đầu T = 0. Điểm có thể âm; giữ tổng thực tế để áp dụng đúng luật.

- TH: dùng chính xác điểm của từng phương án trong phụ lục, thuộc các mức +2, +1, 0, −1.
- KT: đúng +2, sai 0.
- Màn 6 và 12 có K6/K12, ghi nhận đáp án của lần chọn đầu tiên trong lượt.
- Good khi `T >= 18 && K6 && K12`.
- Neutral khi `T >= 8` và chưa đạt Good.
- Bad khi `T < 8`.
- Chỉ tính ending khi đủ 12 màn đã trả lời hợp lệ.

Mỗi phương án có ID ngữ nghĩa cố định độc lập với nhãn A/B/C/D trên giao diện. Nếu đảo thứ tự, phải giữ ánh xạ đúng giữa nội dung, điểm, đáp án, hệ quả và cờ. Lưu thứ tự đã đảo để khi tải lại trang các phương án không tự đổi chỗ.

Một màn chỉ được ghi nhận lựa chọn một lần trong cùng lượt. Sau khi bấm, khóa các nút, lưu kết quả và hiển thị hệ quả. Việc tải lại trang, bấm nhiều lần hoặc mở nhật ký rồi quay về phải giữ điểm chính xác. Đọc lại hoặc luyện tập câu sai không thay đổi kết quả lượt đã chốt; chơi lại có run ID mới.

Các điểm tương tác và thẻ nguồn không tự cộng điểm vào T. Những vật phẩm thiếu được thay bằng bản tham khảo phù hợp để người chơi vẫn đi tiếp; hệ quả lựa chọn cũ vẫn hiện trong tổng kết.

Ẩn T, cờ K6/K12 và điều kiện phân loại trong lúc lựa chọn. Phản hồi bằng câu chuyện và giải thích kiến thức. Ở màn tổng kết, hiển thị kết quả, ba lựa chọn ảnh hưởng và nội dung nên ôn, thay cho lời đánh giá con người người chơi.

## E. Hoàn thiện gói cốt truyện

Chuyển toàn bộ phụ lục thành dữ liệu có cấu trúc, với các trường tối thiểu:

- Campaign: ID, tên, mô tả, mục tiêu, mở đầu, 12 scene ID, điều kiện mở khóa.
- Scene: ID, thứ tự, loại KT/TH, tên, thời gian, địa điểm, phông nền, nhân vật, lời giới thiệu bối cảnh, hội thoại, tình huống/câu hỏi, bốn lựa chọn, scene kế tiếp.
- Choice: ID, nhãn gốc, nội dung, điểm, đúng/sai khi là KT, phản hồi riêng, thay đổi trạng thái/vật phẩm, mốc K6/K12 nếu có.
- Điều kiện lời thoại: dữ kiện từ lựa chọn trước và các phiên bản văn bản tương ứng.
- History card: dữ kiện, thời gian, nguồn, liên kết và phần phân biệt với truyện hư cấu.
- Ending: ID, loại, tiêu đề, lời kết, minh họa, quy tắc chọn ba khoảnh khắc và CTA tiếp theo.

Với từng màn, bổ sung vừa đủ chi tiết để triển khai: ít nhất một đoạn giới thiệu bối cảnh, các vật thể đáng chú ý, hội thoại tự nhiên, giải thích sau lựa chọn và thẻ kiến thức liên quan. Các mốc thời gian chuyển cảnh phải giúp người chơi nhận ra đã trôi qua nhiều năm.

Hoàn thiện các liên kết phản hồi xuyên màn được liệt kê trong phụ lục. Ví dụ, ghi chép ở I-03 được dùng lại ở I-08; lỗi dịch ở II-04 được nhắc khi biên soạn II-08; người được hỗ trợ ở III-03 có thể làm người đọc thử ở III-08.

Đưa dữ liệu nội dung ra khỏi component UI để có thể kiểm tra và sửa kịch bản mà không viết lại engine. Lưu riêng bản cốt truyện đã biên tập và danh mục nguồn.

## F. Thiết kế giao diện

Nếu có file Figma hoặc ảnh thiết kế do tôi cung cấp, dùng làm chuẩn về bố cục và mỹ thuật, đối chiếu các tương tác với yêu cầu gameplay. Nếu chưa có, tự thiết kế theo định hướng sau và tiếp tục triển khai.

- Minh họa 2D vẽ tay, nét mực, màu nước nhẹ và chất giấy; cảm giác một hành trình lịch sử.
- Bảng màu: giấy `#F5EAD6`, mực `#252B2E`, xanh than `#172D38`, đỏ trầm `#8D322A`, vàng đồng `#B58C49`.
- Nội dung dễ đọc, đầy đủ dấu tiếng Việt; gợi ý serif cho tiêu đề và Be Vietnam Pro hoặc sans-serif tương đương cho nội dung.
- Desktop ưu tiên khung cảnh lớn, nhân vật và phần hội thoại/lựa chọn rõ ràng. Mobile xếp dọc, có cuộn khi nội dung dài.
- Cảnh có sự vật tương tác; bấm vào mở thông tin ngắn. Dùng lại phông nền hợp lý nhưng thay đạo cụ, thời gian và nhân vật để phân biệt nhiệm vụ của các tuyến.
- Chuyển cảnh và hoạt ảnh nhẹ, hỗ trợ giảm chuyển động. Hiệu ứng gõ chữ cần có cách hiện toàn bộ đoạn ngay.
- Âm thanh môi trường và phản hồi có điều khiển bật/tắt. Nội dung vẫn chơi đủ khi tắt âm thanh.

Các trang/chế độ bắt buộc: trang chủ; giới thiệu; hướng dẫn; chọn tuyến; màn chơi; tạm dừng; bản đồ; nhật ký; thẻ lịch sử và nguồn; chín ending; bộ sưu tập; cài đặt; giới thiệu và tư liệu.

Màn chơi hiển thị tuyến hiện tại, màn x/12, thời gian/địa điểm, bối cảnh, hội thoại và bốn phương án. Sau chọn, hiển thị hệ quả, cập nhật vật phẩm và nút sang màn sau. Nhật ký mở/đóng mà không mất tiến trình.

Tạo trạng thái chờ, tải tài sản, lỗi tải ảnh, chưa có dữ liệu, lỗi lưu và lưu không tương thích. Giao diện phải có cách phục hồi hoặc tiếp tục rõ ràng. Xóa tiến trình hoặc bắt đầu lại lượt hiện tại cần hộp xác nhận nêu cụ thể phần bị ảnh hưởng.

Đảm bảo dùng được bằng chuột, cảm ứng và bàn phím; focus rõ; vùng chạm khoảng 44×44px; tương phản phù hợp; nhãn cho nút/icon; thông báo kết quả đọc được bằng công nghệ hỗ trợ. Kiểm tra màn nhỏ khoảng 360px và chữ được phóng to.

## G. Kỹ thuật và lưu tiến trình

Nếu workspace đã có ứng dụng, dùng cấu trúc và công nghệ phù hợp của dự án. Với dự án mới, có thể dùng React + TypeScript + Vite và giải pháp CSS phù hợp. Kiểm tra tài liệu chính thức khi cần xác định API hoặc phiên bản, chọn dependency vừa đủ và dễ chạy.

Kiến trúc tách ba phần: dữ liệu nội dung; engine trạng thái/điểm/ending; giao diện và tài sản. Các quyết định gameplay phải xác định được từ dữ liệu, không phụ thuộc AI sinh câu trả lời trong lúc chơi.

State tối thiểu gồm: phiên bản dữ liệu lưu; run ID; campaign ID; scene ID; phase; lựa chọn từng màn; thứ tự phương án hiển thị; tổng điểm; K6/K12; vật phẩm/cờ truyện; nhật ký; tuyến mở khóa; ending đã đạt; cài đặt; thời gian cập nhật. Có thể dùng các phase mở màn/đọc/chọn/hệ quả/hoàn thành, đặt tên nhất quán trong mã.

Lưu sau mỗi lựa chọn và khi đổi màn. Khi tải lại, phục hồi đúng phần đang đọc hoặc hệ quả đang xem. Việc ghi lựa chọn, điểm và phase cần nhất quán để không cộng điểm hai lần. Có kiểm tra dữ liệu lưu trước khi sử dụng và cơ chế xử lý phiên bản cũ hoặc dữ liệu hỏng.

MVP dùng lưu cục bộ và nói rõ giới hạn trên thiết bị/trình duyệt hiện tại. Nếu trình duyệt chặn lưu, cho phép chơi trong phiên và thông báo dễ hiểu. Có thể bổ sung xuất/nhập bản lưu nếu phù hợp phạm vi, nhưng phải hoàn thành chức năng cốt lõi trước.

Tạo danh mục tài sản: khoảng 12 bối cảnh cốt lõi dùng lại hợp lý, chân dung nhân vật, trạng thái vật phẩm, minh họa ending, icon và âm thanh. Dùng tài sản đã được phép, tự vẽ hoặc tạo minh họa phù hợp; ghi rõ nguồn/quyền sử dụng. Nếu chưa có công cụ tạo ảnh, dựng cảnh 2D bằng SVG/CSS/canvas đủ chi tiết để chơi được, giữ đúng vị trí nhân vật và vật thể. Tài sản dùng trong bản chạy cần ổn định, có fallback khi không tải được.

## H. Kiểm thử và tiêu chí nghiệm thu

1. Dữ liệu có đúng ba tuyến, mỗi tuyến 12 màn; mỗi màn bốn lựa chọn; đủ chín ending và nguồn liên quan.
2. Chơi đi xuyên được cả ba tuyến; mọi phương án vẫn đến màn kế tiếp và ending chỉ xuất hiện sau màn 12.
3. Kiểm tra các chuỗi Good/Bad mẫu trong phụ lục, với thứ tự phương án gốc hoặc ánh xạ ID tương ứng.
4. Chuỗi Good cho 24 điểm; đổi đáp án màn 6 sang sai cho 22 điểm nhưng Neutral; chuỗi Bad mẫu cho −7 điểm.
5. Kiểm tra ranh giới 7/8 và 17/18 điểm; các tổ hợp K6/K12 ở mức đủ điểm; mọi trường hợp chỉ nhận đúng một loại ending.
6. Bấm nhanh hai lần, tải lại ở phần hệ quả, mở/đóng nhật ký và quay lại trang không làm thay đổi điểm đã ghi nhận.
7. Tải lại ứng dụng phục hồi đúng lượt, màn, thứ tự đáp án và lựa chọn; bộ sưu tập được giữ khi bắt đầu tuyến mới.
8. Cả Good, Neutral và Bad của tuyến I/II đều mở được tuyến kế tiếp.
9. Mã nguồn xử lý dữ liệu lưu hỏng, ảnh lỗi và trường hợp không thể lưu mà vẫn có thông báo rõ.
10. Giao diện hoạt động trên desktop và mobile; chữ tiếng Việt không bị cắt; bàn phím, focus và chế độ giảm chuyển động hoạt động.
11. Hoàn thành kiểm tra kiểu dữ liệu, build và các kiểm thử có ý nghĩa cho engine điểm/ending/lưu tiến trình. Sửa các lỗi đã phát hiện trước khi bàn giao.

## I. Cách thực hiện và đầu ra

Trước tiên đối chiếu kịch bản và tạo bảng dữ liệu/các quyết định cần thiết, sau đó triển khai tuần tự tới bản chạy được. Tự chọn chi tiết hợp lý trong phạm vi yêu cầu. Nếu gặp giới hạn môi trường, hoàn thành phần độc lập và nêu chính xác phần chưa thực hiện.

Bàn giao:

- Web app có thể chơi đủ 36 màn với tài sản và tương tác thật.
- Mã nguồn, dữ liệu cốt truyện có cấu trúc và danh mục nguồn.
- Tài liệu cách chạy, cấu trúc chính, quy tắc ending và cách bổ sung màn.
- Tóm tắt kiểm thử đã chạy cùng kết quả thực tế.
- Liên kết xem thử hoặc hướng dẫn mở bản chạy trong môi trường hiện có.
- Những giới hạn còn lại, nếu có, được mô tả đúng với sản phẩm đã làm.

Đưa ứng dụng tới trạng thái có thể xem và kiểm tra. Việc xuất bản công khai hoặc kết nối dịch vụ bên ngoài thực hiện theo yêu cầu triển khai riêng của tôi.

## PHỤ LỤC — TOÀN BỘ KỊCH BẢN VÀ QUY TẮC ĐÃ THỐNG NHẤT

Đây là dữ liệu nội dung bắt buộc dùng để triển khai. Nội dung điểm và đường chơi mẫu phục vụ engine/kiểm thử, còn giao diện người chơi dùng lời dẫn, hội thoại, lựa chọn, hệ quả và giải thích tương ứng.

<!-- BEGIN_SHARED_STORY -->

### HÀNH TRÌNH TÌM ĐƯỜNG CỨU NƯỚC

Kịch bản game kể chuyện 2D kết hợp trắc nghiệm, dành cho môn Lịch sử Đảng Cộng sản Việt Nam.

#### 1. Cấu trúc toàn bộ trò chơi

Trò chơi gồm ba kịch bản, mỗi kịch bản có 12 màn liên tiếp và một màn kết thúc:

**Kịch bản I – Người lên đường → Ending I → Kịch bản II – Người ghi chép → Ending II → Kịch bản III – Người kết nối → Ending III.**

Mỗi màn có bốn lựa chọn. Lựa chọn tạo ra một kết quả cục bộ riêng, thay đổi vật phẩm, lời thoại hoặc cách nhân vật đến màn kế tiếp. Người chơi luôn đi đủ 12 màn; ending tổng thể chỉ được xét sau lựa chọn ở màn 12. Vì vậy, lựa chọn bất lợi không làm trò chơi kết thúc giữa chừng.

Ba kịch bản là ba lượt kể lại cùng giai đoạn lịch sử, theo nhiệm vụ khác nhau. Khi chuyển sang kịch bản mới, hiển thị rõ: “Một góc nhìn khác – trở lại điểm khởi đầu”. Đây không phải việc các sự kiện sau năm 1930 đột nhiên quay về năm 1911 trong cùng dòng thời gian.

- Lượt I: khám phá, lao động, học hỏi để xác định hướng đi.
- Lượt II: xây dựng một cuốn nhật ký lịch sử có căn cứ.
- Lượt III: duy trì một nhóm học tập và kết nối những người cùng chí hướng.
- Sau mỗi ending, nút “Tiếp tục hành trình” mở kịch bản kế tiếp. Có thể dừng và tiếp tục sau.
- Sau lượt III, mở chọn lại kịch bản, bộ sưu tập chín ending và nhật ký kiến thức.

Thời lượng gợi ý: 20–30 phút mỗi kịch bản. Không dùng đồng hồ đếm ngược bắt buộc.

#### 2. Nhân vật và ranh giới sáng tác

**An** là một thanh niên Việt Nam hư cấu, khoảng 20 tuổi khi bắt đầu hành trình. Nhân vật lấy cảm hứng từ khát vọng học hỏi và tìm đường cứu nước của thế hệ thanh niên yêu nước đầu thế kỷ XX. An có hành trình được hư cấu trong bối cảnh lịch sử; không phải bí danh của Chủ tịch Hồ Chí Minh và không thay thế vai trò của Người.

Nhân vật phụ hư cấu gồm:

- **Bác Tư:** người lao động lớn tuổi ở bến cảng, giúp An nhìn lại mục đích lên đường.
- **Lâm:** bạn lao động của An, ưu tiên sự ổn định trước khó khăn mưu sinh.
- **Mai:** người Việt ở Pháp, giúp An tiếp cận cộng đồng, báo chí và việc học.
- **Bình:** thanh niên trong nhóm học tập, thường đặt câu hỏi và yêu cầu giải thích.

Mọi lời thoại, thư riêng, nhiệm vụ, quan hệ và kết cục của những nhân vật trên đều do tác giả sáng tác. Không gán lời thoại hư cấu cho Chủ tịch Hồ Chí Minh hoặc trình bày An là người tham gia một hội nghị lịch sử có thật khi không có tư liệu.

**Good ending** tương ứng việc An hiểu và đi theo tiến trình nhận thức phù hợp với lịch sử có thật. **Neutral ending** là nhiệm vụ cá nhân mới hoàn thành một phần. **Bad ending** là nhiệm vụ cá nhân thất bại. Hai loại sau không thay đổi kết quả của các sự kiện lịch sử.

#### 3. Những mốc lịch sử dùng chung

Các hình ảnh, nhiệm vụ và lời dẫn xung quanh các mốc này là phần sáng tác. “Thẻ lịch sử” phải được trình bày riêng để người chơi phân biệt.

| Màn | Mốc kiến thức cần bảo toàn | Nguồn kiểm chứng |
|---|---|---|
| 1 | Bối cảnh thuộc địa và khát vọng tìm một con đường giải phóng dân tộc đầu thế kỷ XX. | [Tư liệu về lựa chọn lên đường](https://tphcm.chinhphu.vn/hieu-them-ve-lua-chon-lich-su-cua-lanh-tu-nguyen-ai-quoc-ho-chi-minh-10121374.htm) |
| 2 | Ngày 5/6/1911, Nguyễn Tất Thành rời bến cảng Sài Gòn trên tàu Amiral Latouche-Tréville, bắt đầu hành trình tìm đường cứu nước. | [Tư liệu về ngày ra đi](https://tphcm.chinhphu.vn/hieu-them-ve-lua-chon-lich-su-cua-lanh-tu-nguyen-ai-quoc-ho-chi-minh-10121374.htm) |
| 3 | Những năm bôn ba, Người lao động, quan sát đời sống ở nhiều nơi và tích lũy nhận thức thực tiễn. Không dựng một hành trình chi tiết tới từng cảng khi chưa có tư liệu. | [Khái quát hành trình](https://baochinhphu.vn/nhung-dau-moc-quan-trong-tren-hanh-trinh-tim-duong-cuu-nuoc-cua-bac-ho-10281133.htm) |
| 4 | Bối cảnh cộng đồng người Việt và phong trào công nhân tại Pháp; phân cảnh của An được đặt trước sự kiện tháng 6/1919. | [Tư liệu về thời kỳ hoạt động ở Pháp](https://baochinhphu.vn/ky-niem-121-nam-ngay-sinh-chu-tich-ho-chi-minh-va-100-nam-bac-ho-ra-di-tim-duong-cuu-nuoc-nguoi-viet-nam-yeu-nuoc-dau-tien-tim-thay-chu-nghia-mac-lenin-va-buoc-ngoat-cua-cach-mang-viet-nam-10278338.htm) |
| 5 | Ngày 18/6/1919, thay mặt những người Việt Nam yêu nước tại Pháp, Nguyễn Ái Quốc gửi bản Yêu sách của nhân dân An Nam đến Hội nghị Versailles, nêu những yêu cầu về quyền tự do, dân chủ và bình đẳng. | [Tư liệu về bản Yêu sách](https://baochinhphu.vn/ky-niem-121-nam-ngay-sinh-chu-tich-ho-chi-minh-va-100-nam-bac-ho-ra-di-tim-duong-cuu-nuoc-nguoi-viet-nam-yeu-nuoc-dau-tien-tim-thay-chu-nghia-mac-lenin-va-buoc-ngoat-cua-cach-mang-viet-nam-10278338.htm) |
| 6 | Tháng 7/1920, Nguyễn Ái Quốc đọc Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của Lênin trên báo L’Humanité. | [Biên niên các sự kiện tháng Bảy](https://btllang.mod.gov.vn/tin-tuc/tin-tong-hop/5210-chu-tich-ho-chi-minh-voi-nhung-su-kien-trong-thang-bay-qua-cac-nam-1890-1969-phan-1.html?showall=1) |
| 7 | Tháng 12/1920, tại Đại hội Tours, Nguyễn Ái Quốc tán thành gia nhập Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp. | [Tư liệu về bước ngoặt năm 1920](https://www.mpi.gov.vn/portal/pages/print.aspx?p=151192) |
| 8 | Báo Le Paria – Người cùng khổ ra số đầu ngày 1/4/1922; Nguyễn Ái Quốc có vai trò quan trọng trong việc tổ chức và hoạt động của tờ báo. | [Lịch sử biên niên Đảng, tập I](https://tulieuvankien.dangcongsan.vn/van-kien-tu-lieu-ve-dang/book/lich-su-dang/lich-su-bien-nien-dang-cong-san-viet-nam-tap-1-18) |
| 9 | Nguyễn Ái Quốc đến nước Nga Xô viết lần đầu ngày 30/6/1923; giai đoạn tiếp theo gắn với học tập và hoạt động trong phong trào cộng sản quốc tế. | [Tư liệu và hiện vật về chuyến đến năm 1923](https://baochinhphu.vn/hien-vat-quy-ve-bac-ho-sau-100-nam-nguoi-dat-chan-toi-lien-xo-102230630142401052.htm) |
| 10 | Hội Việt Nam Cách mạng Thanh niên được thành lập năm 1925 ở Quảng Châu. Báo Thanh niên ra số đầu ngày 21/6/1925. | [Tư liệu về Hội và công tác đào tạo](https://baotanglichsu.vn/vi/Articles/1001/19692/cuon-djuong-kach-menh-cua-nguyen-ai-quoc-su-xuat-hien-va-hanh-trinh.html); [Biên niên báo Thanh niên](https://baotanghochiminh.vn/tuan-bao-thanh-nien-co-quan-trung-uong-cua-tong-bo-hoi-viet-nam-cach-mang-thanh-nien-do-nguyen-ai-quoc-sang-lap-ra-so-dau-tien.htm) |
| 11 | Đường Kách mệnh xuất bản năm 1927, tập hợp các bài giảng của Nguyễn Ái Quốc trong công tác huấn luyện cán bộ tại Quảng Châu. | [Bảo tàng Lịch sử quốc gia: Đường Kách mệnh](https://baotanglichsuquocgia.vn/vi/Articles/1001/28315/sach-djuong-kach-menh.html) |
| 12 | Đầu năm 1930, Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất, thành lập Đảng Cộng sản Việt Nam và thông qua các văn kiện của Cương lĩnh đầu tiên. Ngày 3/2 là ngày kỷ niệm thành lập Đảng. | [Tư liệu về sự thành lập Đảng](https://tulieuvankien.dangcongsan.vn/ho-so-su-kien-nhan-chung/phong-trao-cong-san-cong-nhan-quoc-te/cac-dang-cong-san-cong-nhan/dang-cong-san-viet-nam-97) |

Kịch bản dừng ở năm 1930. Không dựng cảnh Việt Nam đã giành độc lập ở mốc này; cũng không đưa sự kiện Hồ Chí Minh trở về nước năm 1941 vào ending của năm 1930.

#### 4. Quy tắc lựa chọn, phân nhánh và ending

Mỗi kịch bản bắt đầu với **T = 0**, là điểm hoàn thành nhiệm vụ của lượt chơi. Điểm chỉ hiện trong tài liệu dành cho người làm game; người chơi thấy hệ quả, không thấy nhãn “đáp án tốt/xấu” trước khi chọn.

- Với **lựa chọn tình huống (TH)**: phương án đầy đủ +2; phương án có ích nhưng thiếu một phần +1; phương án không giải quyết nhiệm vụ +0; phương án làm sai lệch dữ kiện hoặc gây đổ vỡ nhiệm vụ −1. Đây là quy ước thiết kế, không phải phán xét một lựa chọn đời sống là sai về lịch sử.
- Với **câu hỏi kiến thức (KT)**: một đáp án đúng +2; ba đáp án sai +0. Sau khi chọn luôn giải thích đáp án đúng.
- Màn 6 và 12 của mỗi lượt là hai câu hỏi kiến thức then chốt. Ghi nhận **K6** và **K12** theo lần chọn đầu tiên.
- Đọc giải thích hoặc sửa đáp án trong chế độ ôn tập không làm thay đổi điểm lượt đã hoàn thành.
- **Good:** T ≥ 18 và K6 = đúng, K12 = đúng.
- **Neutral:** T ≥ 8 nhưng không đủ điều kiện Good.
- **Bad:** T < 8.
- Xét Good trước, rồi Neutral, cuối cùng Bad. Không có khoảng điểm bị bỏ sót.

Mỗi lựa chọn phải được lưu bằng mã kịch bản/màn/phương án. Vật phẩm có thể là bản đầy đủ, bản thiếu hoặc ghi chú cần sửa; thiếu vật phẩm không khóa màn tiếp theo. Nhân vật phụ có thể cung cấp một bản tham khảo để người chơi vẫn tiếp tục, nhưng kết quả lựa chọn cũ vẫn được giữ.

Các màn được nối bằng thẻ thời gian và bản đồ. Hành trình kéo dài nhiều năm, không trình bày như chuyến đi diễn ra trong vài ngày.

#### 5. Kịch bản I – NGƯỜI LÊN ĐƯỜNG

Mục tiêu: theo dõi quá trình An chuyển từ mong muốn giúp quê hương sang tìm hiểu, nhận thức và lựa chọn một hướng hoạt động có cơ sở.

##### I-01. Câu hỏi ở bến sông

**Bối cảnh 2D:** Sài Gòn trước ngày khởi hành năm 1911. Phía xa là cầu tàu và kho hàng; phía trước là một quán nước, đôi quang gánh, chiếc túi vải của An. Người lao động đi qua sau một ngày làm việc.

**Lời dẫn:** “An đã nghe nhiều lời giải thích về nỗi khổ của quê hương. Nhưng trước khi lựa chọn một hướng đi, anh muốn biết điều gì đang thực sự xảy ra quanh mình.”

**Bác Tư:** “Cháu muốn đi xa. Vậy cháu mang theo câu hỏi gì?”

**Tình huống TH:** An nên bắt đầu việc tìm hiểu từ đâu?

- **A. Hỏi chuyện nhiều người lao động và ghi lại những vấn đề họ gặp.** An có trang nhật ký đầu tiên với nhiều góc nhìn. **+2**.
- **B. Ghi lại hoàn cảnh của riêng gia đình mình.** An có động lực cụ thể nhưng tư liệu còn hẹp. **+1**.
- **C. Chờ một người khác đưa ra lời giải thích trọn vẹn.** Trang nhật ký vẫn trắng. **+0**.
- **D. Viết ngay một kết luận rồi bỏ qua những lời kể trái ý.** An hình thành ghi chép thiên lệch. **−1**.

**Hồi đáp:** “Một câu hỏi được đặt ra: vì sao người dân khổ, và cần hiểu những gì để giúp họ?”

**Nối I-02:** An đi về phía cảng. Cuốn sổ trong túi hiển thị đúng trạng thái người chơi vừa tạo: đầy đủ, hẹp, trắng hoặc thiên lệch.

##### I-02. Chuyến tàu và chiếc túi nhỏ

**Bối cảnh 2D:** Bến cảng với cầu lên tàu, dây neo, thùng gỗ và làn khói. Thẻ lịch sử giới thiệu mốc 5/6/1911; chuyến đi cụ thể của An là tình tiết hư cấu.

**Lời dẫn:** “Tiếng còi vang lên. Đi xa cần một cách mưu sinh, một cơ hội học hỏi và một mục đích để không đánh mất mình.”

**Lâm:** “Cậu định sống thế nào khi chưa biết tiếng và chưa quen ai?”

**Tình huống TH:** An chuẩn bị hành trình ra sao?

- **A. Dùng toàn bộ tiền dành dụm cho hành lý đẹp để dễ được chú ý.** Túi nặng hơn, kế hoạch mưu sinh vẫn thiếu. **+0**.
- **B. Tìm công việc phù hợp, chuẩn bị học tiếng và giữ cuốn sổ bên mình.** An có kế hoạch vừa lao động vừa học. **+2**.
- **C. Chỉ chuẩn bị cách kiếm sống trước mắt.** An có thể lên đường nhưng việc học dễ bị gác lại. **+1**.
- **D. Giao hết tiền cho người hứa bảo đảm thành công mà không hỏi điều kiện.** An mất một phần nguồn lực và buộc phải làm lại kế hoạch. **−1**.

**Hồi đáp:** Bác Tư đưa An một mảnh vải bọc sổ: “Điều cháu học được rồi sẽ cần một chỗ để giữ lại.”

**Nối I-03:** Bản đồ mở dần qua các chặng đường. Nếu chọn B, có thêm cảnh An học từ mới; các nhánh khác cho thấy anh phải xoay xở để bắt đầu việc học.

##### I-03. Những gương mặt bên kia biển

**Bối cảnh 2D:** Phân cảnh tổng hợp một khu lao động gần cảng trong những năm 1912–1917. Thùng hàng, bảng ca làm việc và bàn ăn tập thể là các điểm có thể bấm xem. Không gắn phân cảnh hư cấu với một cảng có thật cụ thể.

**Lời dẫn:** “Ở nơi xa lạ, An gặp những người khác màu da và tiếng nói. Anh nhận ra đời sống của họ có những khó khăn vừa quen thuộc vừa khác với quê nhà.”

**Người bạn lao động:** “Cậu định viết gì về chúng tôi?”

**Tình huống TH:** An lựa chọn cách quan sát nào?

- **A. Chỉ nhìn phố xá giàu có rồi kết luận mọi người đều sung túc.** Nhật ký bỏ sót đời sống phía sau khu cảng. **+0**.
- **B. Chỉ trò chuyện với người cùng quê.** An thu được lời kể hữu ích nhưng chưa hiểu nhiều nhóm khác. **+1**.
- **C. Kết luận tính cách mọi người từ quốc tịch của họ.** Một người bạn phản đối; cuộc trò chuyện dừng lại. **−1**.
- **D. Hỏi về công việc, thu nhập và đời sống của nhiều người, rồi so sánh.** An có trang ghi chép đối chiếu đầu tiên. **+2**.

**Hồi đáp:** Máy quay chuyển từ biển hiệu sáng đèn sang bàn ăn của người lao động. Nhật ký cập nhật những gì An thực sự đã tìm hiểu.

**Nối I-04:** Nhiều năm trôi qua. An đến Pháp với một cuốn sổ đã có dấu vết của những lựa chọn trước.

##### I-04. Căn phòng có ngọn đèn

**Bối cảnh 2D:** Pháp, trước tháng 6/1919. Một căn phòng trọ nhỏ có bàn gỗ, sách học tiếng, thư nhà và tờ báo. Mai đang sắp xếp chỗ cho buổi đọc chung.

**Lời dẫn:** “Công việc chiếm phần lớn thời gian. Những trang chữ khó đọc buộc An lựa chọn cách sử dụng buổi tối của mình.”

**Mai:** “Cậu muốn hiểu tờ báo, hay chỉ muốn biết người khác nói nó viết gì?”

**Tình huống TH:** An sẽ học như thế nào?

- **A. Học tiếng đều đặn, đọc báo và thảo luận những điều chưa rõ.** An dần có thể đối chiếu thông tin trực tiếp. **+2**.
- **B. Bỏ việc đọc vì thấy khó, chỉ chờ người khác kể lại.** An tiếp tục phụ thuộc vào lời truyền miệng. **+0**.
- **C. Học một số từ cần cho công việc rồi tạm gác phần còn lại.** Việc mưu sinh thuận lợi hơn, khả năng đọc tư liệu còn hạn chế. **+1**.
- **D. Giả vờ đã hiểu để nhận giải thích thay cho mọi người.** Một bản tóm tắt sai khiến nhóm phải làm lại. **−1**.

**Hồi đáp:** Mai đưa một bản chú giải từ khó. Nếu I-03 chọn C, cô nhắc An lắng nghe người khác trước khi kết luận; nếu I-03 chọn D, cô dùng chính ghi chép của anh làm ví dụ học đọc.

**Nối I-05:** Một bản tin về Hội nghị Versailles được đặt lên bàn đọc.

##### I-05. Tờ giấy mang tám yêu cầu

**Bối cảnh 2D:** Pháp, tháng 6/1919. Trên bàn có bản giới thiệu Yêu sách của nhân dân An Nam, phong bì và bản đồ Versailles. An đọc tin về hoạt động của Nguyễn Ái Quốc, không được dựng là tác giả bản Yêu sách.

**Lời dẫn:** “Một văn bản ngắn đưa những yêu cầu về quyền của người dân thuộc địa đến diễn đàn quốc tế.”

**Mai:** “Đọc kỹ nội dung trước khi viết điều cậu mong nó có.”

**Câu hỏi KT:** Nội dung nào phản ánh đúng bản Yêu sách năm 1919?

- **A. Tuyên bố Việt Nam đã trở thành một nước độc lập.** Sai; An đã nhầm yêu cầu với một kết quả chưa xảy ra. **+0**.
- **B. Quyết định thành lập Đảng Cộng sản Việt Nam.** Sai; đây là sự kiện của giai đoạn sau. **+0**.
- **C. Nêu những yêu cầu về quyền tự do, dân chủ và bình đẳng cho nhân dân An Nam.** Đúng; An hoàn thành thẻ kiến thức. **+2**.
- **D. Ban hành một hiệp ước quân sự giữa Việt Nam và Pháp.** Sai; bản Yêu sách không phải hiệp ước quân sự. **+0**.

**Giải thích sau chọn:** Phân biệt điều được yêu cầu, việc gửi văn bản và việc yêu cầu có được thực hiện hay không. Mở thẻ lịch sử màn 5 và nguồn kiểm chứng.

**Nối I-06:** An giữ lại câu hỏi: “Nếu lời yêu cầu chưa đem lại điều mong muốn, cần tiếp tục tìm hiểu con đường nào?”

##### I-06. Trang báo tháng Bảy

**Bối cảnh 2D:** Pháp, tháng 7/1920. Đêm muộn, ánh đèn chiếu lên một trang báo và các mẩu ghi chú. Chỉ dùng trích đoạn có nguồn khi đưa văn bản lịch sử thật vào hình.

**Lời dẫn:** “An đọc phần giới thiệu một văn bản bàn trực tiếp về vấn đề dân tộc và thuộc địa. Những quan sát rời rạc bắt đầu có thêm khung lý giải.”

**Bình:** “Văn bản nào gắn với bước chuyển nhận thức của Nguyễn Ái Quốc vào thời điểm này?”

**Câu hỏi KT – mốc K6:**

- **A. Đường Kách mệnh.** Sai mốc; tác phẩm được xuất bản năm 1927. **+0**, K6 = sai.
- **B. Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của Lênin.** Đúng. **+2**, K6 = đúng.
- **C. Tuyên ngôn Độc lập của Việt Nam năm 1945.** Sai mốc; sự kiện này còn ở tương lai so với phân cảnh. **+0**, K6 = sai.
- **D. Luận cương chính trị tháng 10/1930.** Sai mốc và nhầm văn kiện. **+0**, K6 = sai.

**Giải thích sau chọn:** Đây là mốc nhận thức quan trọng trong hành trình của Nguyễn Ái Quốc. Việc An đọc, hỏi và ghi chú là phần kể chuyện sáng tác, không phải một chứng cứ lịch sử về nhân vật có thật.

**Nối I-07:** Nếu đúng, An mang một sơ đồ ghi chú tới buổi đọc tin tiếp theo. Nếu sai, Bình đưa bản đối chiếu mốc thời gian; người chơi vẫn sang màn 7.

##### I-07. Tin từ Tours

**Bối cảnh 2D:** Tháng 12/1920. Nhóm của An đọc tin và xem hình minh họa về Đại hội Tours. Không đặt An vào ghế đại biểu hoặc để anh bỏ phiếu thay nhân vật lịch sử.

**Lời dẫn:** “Một quyết định tổ chức đánh dấu bước chuyển từ tìm hiểu sang lựa chọn con đường hoạt động.”

**Bình:** “Điều gì đã diễn ra tại Đại hội Tours liên quan đến Nguyễn Ái Quốc?”

**Câu hỏi KT:**

- **A. Thành lập Hội Việt Nam Cách mạng Thanh niên.** Sai; nhầm với năm 1925. **+0**.
- **B. Thành lập Đảng Cộng sản Việt Nam.** Sai; nhầm với năm 1930. **+0**.
- **C. Quyết định rời bến cảng Sài Gòn.** Sai; nhầm với mốc năm 1911. **+0**.
- **D. Tán thành gia nhập Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp.** Đúng. **+2**.

**Giải thích sau chọn:** Mở thẻ lịch sử màn 7. Sự kiện năm 1920 và sự kiện thành lập Đảng tại Việt Nam phải nằm ở hai vị trí khác nhau trên dòng thời gian.

**Nối I-08:** An tự hỏi: “Những điều đã hiểu cần được chia sẻ thế nào để người khác có thể cùng trao đổi?” Bản đồ và thẻ thời gian chuyển đến năm 1922.

##### I-08. Một bài viết, nhiều tiếng nói

**Bối cảnh 2D:** Pháp, năm 1922. Một bàn đọc báo có Le Paria, các bản nháp hư cấu của nhóm An và lọ mực. Nhiệm vụ không khẳng định bài viết của An đã xuất hiện trên tờ báo có thật.

**Lời dẫn:** “An muốn viết về đời sống người lao động. Nhưng một bài viết có sức thuyết phục cần nhiều hơn sự giận dữ.”

**Mai:** “Người đọc sẽ dựa vào đâu để tin điều cậu kể?”

**Tình huống TH:** Nhóm chỉ còn một buổi để hoàn thành bài đọc nội bộ.

- **A. Thêm những chi tiết chưa xảy ra để câu chuyện gây chú ý hơn.** Người được phỏng vấn phát hiện sai lệch và rút lời đồng ý cho dùng lời kể. **−1**.
- **B. Dùng một lời kể có thật nhưng chưa đối chiếu thêm.** Bài có giá trị bước đầu, phạm vi chứng minh còn hẹp. **+1**.
- **C. Đối chiếu các ghi chép, nêu rõ nguồn và phân biệt sự kiện với nhận xét.** Nhóm có bài đọc đáng tin cậy. **+2**.
- **D. Chỉ viết một khẩu hiệu chung, không đưa thông tin cụ thể.** Bài hoàn thành nhưng không giúp người đọc hiểu tình huống. **+0**.

**Hồi đáp:** Nếu I-03 có bản đối chiếu, Mai đặt hai trang sổ cũ cạnh bản nháp. Nếu không, cô đưa một tư liệu tham khảo; kết quả thiếu sót ở màn cũ vẫn được lưu.

**Nối I-09:** Câu hỏi của An chuyển từ “làm sao kể lại” sang “làm sao hiểu và vận dụng”. Các chặng đường tiếp theo hiện trên bản đồ.

##### I-09. Học để trở về với thực tiễn

**Bối cảnh 2D:** Không gian học tập được hư cấu trong bối cảnh nước Nga Xô viết, giai đoạn 1923–1924. Bàn có sơ đồ xã hội, sách và những ghi chú về quê hương. Không xác nhận An học cùng lớp hoặc dự cùng hội nghị với Nguyễn Ái Quốc.

**Lời dẫn:** “Một mô hình có thể đem lại kinh nghiệm quý. Nhưng quê hương An có hoàn cảnh riêng cần được hiểu.”

**Bình:** “Học được điều hay rồi, chúng ta có thể làm hệt mọi chi tiết ở bất cứ đâu không?”

**Tình huống TH:** An chuẩn bị bản ghi chú áp dụng điều đã học.

- **A. Tóm tắt đúng nội dung nhưng chưa liên hệ với điều kiện ở Việt Nam.** Bản ghi chú có kiến thức, còn thiếu phần vận dụng. **+1**.
- **B. So sánh điều đã học với hoàn cảnh quê hương, ghi rõ điểm cần khảo sát thêm.** An có bản liên hệ giữa lý luận và thực tiễn. **+2**.
- **C. Chờ một công thức sẵn có giải quyết toàn bộ vấn đề.** Bản kế hoạch chưa được bắt đầu. **+0**.
- **D. Sao chép mọi biện pháp và bỏ đi các thông tin không phù hợp.** Đề xuất của An không trả lời được những câu hỏi của nhóm. **−1**.

**Hồi đáp:** Người đọc thấy trên bàn hai tập ghi chú: điều học được và điều còn phải tìm hiểu. Nhánh B nối chúng bằng các đường giải thích; các nhánh còn lại hiện phần còn thiếu.

**Nối I-10:** Thẻ thời gian sang năm 1925. An tới Quảng Châu trong tuyến truyện hư cấu để tiếp tục việc học và kết nối.

##### I-10. Tờ báo trên bàn học

**Bối cảnh 2D:** Quảng Châu, năm 1925. Căn phòng của nhóm học tập có bảng viết, sách, bản đồ và hình giới thiệu số đầu báo Thanh niên.

**Lời dẫn:** “Kiến thức bắt đầu được truyền đạt có tổ chức. An gặp những thanh niên cũng đang chuẩn bị hành trang để hoạt động.”

**Bình:** “Báo Thanh niên ra số đầu ngày 21/6/1925 gắn với tổ chức nào?”

**Câu hỏi KT:**

- **A. Hội Việt Nam Cách mạng Thanh niên.** Đúng. **+2**.
- **B. Đảng Cộng sản Việt Nam đã thành lập từ năm 1911.** Sai cả tổ chức gắn với mốc và niên đại. **+0**.
- **C. Hội nghị Versailles.** Sai; đây không phải tổ chức xuất bản tờ báo. **+0**.
- **D. Đại hội Tours năm 1920.** Sai; nhầm sự kiện, địa điểm và thời điểm. **+0**.

**Giải thích sau chọn:** Mở thẻ lịch sử màn 10, giới thiệu vai trò của báo chí và việc đào tạo thanh niên trong công tác chuẩn bị về tư tưởng, tổ chức.

**Nối I-11:** Sau buổi học, An nhận nhiệm vụ chuẩn bị một phần trình bày cho nhóm; thời gian chuyển tới năm 1927.

##### I-11. Điều đã học có đến được với người nghe?

**Bối cảnh 2D:** Quảng Châu, năm 1927. Bàn có phần giới thiệu Đường Kách mệnh, vở bài học của An và chiếc bảng nhỏ. Nhóm An chuẩn bị một buổi đọc; không dựng đây là một lớp có thật do Nguyễn Ái Quốc trực tiếp giảng nếu không dùng tư liệu.

**Lời dẫn:** “An đã đi xa và đọc nhiều. Giờ đây, một người bạn chỉ hỏi một câu giản dị: điều ấy liên quan gì đến cuộc sống của chúng tôi?”

**Lâm:** “Cậu giải thích bằng điều chúng ta từng thấy được không?”

**Tình huống TH:** An chọn cách trình bày thế nào?

- **A. Chê người nghe không đủ hiểu biết và từ chối câu hỏi.** Một thành viên rời buổi đọc; nhóm mất sự tin cậy. **−1**.
- **B. Đọc đúng phần tóm tắt nhưng chưa có ví dụ.** Người nghe nhớ được vài ý, chưa rõ cách liên hệ. **+1**.
- **C. Hứa mọi khó khăn sẽ tự biến mất ngay sau một buổi học.** Buổi nói chuyện kết thúc với những kỳ vọng thiếu cơ sở. **+0**.
- **D. Giải thích bằng ví dụ có thật trong ghi chép và để mọi người hỏi lại.** Nhóm hiểu rõ hơn, cùng sửa điểm còn thiếu. **+2**.

**Hồi đáp:** Nếu I-08 chọn A, Mai yêu cầu An kiểm lại ví dụ trước khi dùng; nếu chọn C, cô mang bản ghi có nguồn vào buổi học. Lựa chọn hiện tại cho phép tiến bộ nhưng không xóa lựa chọn cũ.

**Nối I-12:** Thẻ thời gian đi qua các biến chuyển cuối thập niên 1920. Đầu năm 1930, nhóm nhận tin về Hội nghị hợp nhất.

##### I-12. Một con đường được xác định

**Bối cảnh 2D:** Đầu năm 1930. Một phòng đọc tin của nhóm An, cạnh cửa sổ nhìn ra phố. Bản đồ đánh dấu Hồng Kông; giữa bàn là dòng thời gian của cả hành trình. An không được dựng là người chủ trì hoặc quyết định kết quả hội nghị.

**Lời dẫn:** “Những câu hỏi từ bến sông đã đi qua nhiều năm lao động, học tập và lựa chọn. Giờ An cần hiểu ý nghĩa của mốc lịch sử vừa được ghi thêm.”

**Mai:** “Đặt sự kiện này vào cả hành trình, cậu thấy điều gì?”

**Câu hỏi KT – mốc K12:** Nhận định nào phù hợp với sự ra đời của Đảng Cộng sản Việt Nam đầu năm 1930?

- **A. Việt Nam ngay lập tức giành được độc lập và không còn nhiệm vụ nào phía trước.** Sai; nhầm mốc thành lập Đảng với thắng lợi giành độc lập sau này. **+0**, K12 = sai.
- **B. Sự kiện diễn ra hoàn toàn riêng lẻ, không có quá trình chuẩn bị.** Sai; bỏ qua quá trình chuẩn bị về tư tưởng, chính trị và tổ chức. **+0**, K12 = sai.
- **C. Sự kiện đánh dấu việc thống nhất tổ chức lãnh đạo và xác lập đường lối qua Cương lĩnh đầu tiên, gắn với quá trình chuẩn bị trước đó.** Đúng. **+2**, K12 = đúng.
- **D. Mốc này chỉ là việc đổi tên của một tờ báo.** Sai; không phản ánh sự thành lập một chính đảng. **+0**, K12 = sai.

**Giải thích sau chọn:** Mở thẻ lịch sử màn 12. Chốt rõ: đây là bước ngoặt trong quá trình cách mạng, chưa phải cảnh kết thúc toàn bộ cuộc đấu tranh giành độc lập.

**Nối ending:** Máy quay lùi khỏi bàn. Hình ảnh cuốn sổ, bài viết và nhóm bạn thay đổi theo lịch sử lựa chọn, sau đó áp dụng quy tắc Good/Neutral/Bad.

##### Ba ending của kịch bản I

**I-GOOD – Ánh sáng trên con đường**

Hình ảnh: Cuốn sổ được mở, những trang ghi chép nối thành một bản đồ. An ngồi cùng nhóm bạn, bắt đầu một kế hoạch học tập và hoạt động tiếp theo. Trên lớp thông tin lịch sử, các mốc có thật hiện đúng thứ tự.

Lời kết: “An chưa thể biết hết những thử thách phía trước. Nhưng mong muốn giúp quê hương đã có thêm hiểu biết, phương hướng và những người cùng bước. Câu hỏi ở bến sông vẫn còn đó, giờ đã trở thành một việc cần làm mỗi ngày.”

Ý nghĩa: An hoàn thành mục tiêu của tuyến truyện; tiến trình lịch sử được giữ đúng. Không tuyên bố An tạo ra các thành tựu của nhân vật lịch sử.

**I-NEUTRAL – Ngọn đèn còn sáng**

Hình ảnh: An ở lại bàn đọc sau khi bạn bè ra về. Cuốn sổ có nhiều trang hoàn chỉnh, vài phần còn dấu hỏi. Một lá thư mời tiếp tục học nằm cạnh đèn.

Lời kết: “Chuyến đi đã thay đổi An, nhưng chưa phải câu hỏi nào anh cũng hiểu đến nơi. Anh chưa sẵn sàng nhận nhiệm vụ lớn hơn. Buổi học ngày mai vẫn còn một chỗ dành cho anh.”

Ý nghĩa: Có tiến bộ và thiện chí nhưng thiếu kiến thức then chốt hoặc chưa hoàn thành đủ nhiệm vụ. Không mô tả đây là kết cục có thật của Hồ Chí Minh.

**I-BAD – Cuốn sổ khép lại**

Hình ảnh: Những ghi chép thiếu căn cứ chồng lên nhau; chiếc ghế bên cạnh An trống. Anh cất cuốn sổ và trở lại công việc mưu sinh, chưa thực hiện được mục tiêu ban đầu.

Lời kết: “An đã đi qua nhiều nơi, nhưng các câu hỏi chưa được theo đuổi đến cùng. Những quyết định vội và lời hứa bỏ dở khiến hành trình riêng của anh dừng lại ở ngưỡng cửa. Ngoài kia, dòng lịch sử vẫn tiếp tục.”

Ý nghĩa: Thất bại của hành trình cá nhân. Không có cảnh lịch sử dân tộc bị thay đổi bởi một lượt chơi.

**Chuyển lượt II:** Cuốn sổ trên màn hình trở thành vật mở đầu tuyến mới. Nhãn: “Một góc nhìn khác – Người ghi chép”. Nếu lượt I Good, sổ có mục lục tham khảo; nếu Neutral, có dấu trang; nếu Bad, có một trang mới để bắt đầu lại. Các chi tiết này không cộng điểm và không quyết định ending lượt II.

#### 6. Kịch bản II – NGƯỜI GHI CHÉP

Đây là một lượt kể khác, trở lại bối cảnh khởi đầu. An có mục tiêu xuyên suốt: xây dựng một cuốn nhật ký để người khác có thể hiểu và kiểm tra những gì anh đã thấy, đã đọc. Các phông nền và mốc lịch sử tương ứng màn 1–12 ở bảng nguồn; nhiệm vụ, lời thoại và kết quả dưới đây thay cho lượt I.

T = 0; K6 = chưa có; K12 = chưa có. Mỗi màn tự động nối sang màn có số tiếp theo sau phần phản hồi. Chỉ II-12 chuyển sang ending.

##### II-01. Ai đang kể câu chuyện? — TH

**Dàn cảnh:** Quán nước đầu hành trình. Bác Tư đặt ba mẩu lời kể xuống bàn: một chuyện tận mắt thấy, một chuyện được nghe lại, một lời đồn.

**Bác Tư:** “Cháu chép chúng giống nhau, người đọc biết tin vào đâu?”

- **A. Chỉ ghi lại lời mình tận mắt nghe, chưa phân loại phần còn lại.** Có một ghi chép dùng được, vẫn thiếu hệ thống. **+1**.
- **B. Chép cả ba như sự thật đã xác nhận.** Nhật ký không chỉ rõ mức độ tin cậy. **+0**.
- **C. Ghi người kể, thời điểm và phân biệt tận mắt thấy với nghe lại.** An tạo trang quy ước cho cả cuốn sổ. **+2**.
- **D. Viết tên một nhân chứng nổi tiếng không hề có mặt để lời kể đáng tin hơn.** Nhật ký có một nguồn bị ngụy tạo. **−1**.

**Phản hồi và nối:** Một biểu tượng nguồn xuất hiện cạnh trang đầu. An mang cách ghi đó tới bến cảng ở II-02.

##### II-02. Một sự kiện, hai lớp thông tin — TH

**Dàn cảnh:** Cầu tàu. An có thẻ tư liệu về chuyến ra đi lịch sử và trang kể về chuyến đi hư cấu của chính mình.

**Lâm:** “Cậu sẽ viết hai chuyện ấy chung một dòng sao?”

- **A. Đặt hai khung riêng: dữ kiện có nguồn và trải nghiệm hư cấu của An.** Người đọc phân biệt được lịch sử với câu chuyện. **+2**.
- **B. Bỏ toàn bộ thời gian, địa điểm cho đỡ phải đối chiếu.** Trang sổ khó dùng để học lịch sử. **+0**.
- **C. Viết rằng An chính là người thực hiện mọi sự kiện lịch sử.** Nhật ký đánh tráo vai trò nhân vật. **−1**.
- **D. Ghi đúng mốc lịch sử nhưng chưa dẫn nguồn.** Dữ kiện dùng được, phần kiểm chứng còn thiếu. **+1**.

**Phản hồi và nối:** Bản đồ chuyến đi xuất hiện. Nếu đã phân lớp, hai màu đánh dấu đi riêng trên bản đồ; các nhánh khác có chú thích cần hoàn thiện. Sang II-03.

##### II-03. Ba lời kể ở khu cảng — TH

**Dàn cảnh:** Bàn ăn người lao động. Ba người kể những trải nghiệm khác nhau về giờ làm và tiền công.

**Người bạn lao động:** “Chuyện của tôi không hoàn toàn giống chuyện của anh ấy.”

- **A. Sửa lời kể để cả ba giống hệt một kết luận đã viết sẵn.** Hai nhân chứng không đồng ý với bản ghi. **−1**.
- **B. Giữ khác biệt, hỏi hoàn cảnh từng người và ghi giới hạn của việc so sánh.** An có ba hồ sơ có thể đối chiếu. **+2**.
- **C. Ghi nguyên một lời kể có sự đồng ý của người nói.** Có tư liệu tốt nhưng phạm vi hẹp. **+1**.
- **D. Chọn câu chuyện kịch tính nhất và coi là đại diện mọi nơi.** Nhật ký vượt quá điều tư liệu cho phép kết luận. **+0**.

**Phản hồi và nối:** Ba chân dung hiện cạnh ba trang sổ, không bị ép thành một trải nghiệm duy nhất. Thẻ thời gian đưa An tới căn phòng đọc ở II-04.

##### II-04. Một dòng dịch chưa chắc đúng — TH

**Dàn cảnh:** Pháp, trước tháng 6/1919. An đang dịch một mẩu tin để nhóm đọc chung; có một từ anh chưa hiểu.

**Mai:** “Chỗ nào chưa chắc, cứ để chúng ta cùng xem.”

- **A. Bỏ qua cả bài vì có một từ khó.** Nhóm chưa có bản đọc. **+0**.
- **B. Dịch phần hiểu được, đánh dấu phần còn chờ kiểm tra.** Có bản nháp trung thực nhưng chưa đầy đủ. **+1**.
- **C. Đoán nghĩa rồi nói mình đã kiểm tra.** Một nhận định sai lan vào ghi chép chung. **−1**.
- **D. Tra cứu, hỏi người đọc được văn bản và giữ chú giải từ khó.** Nhóm có bản đọc được kiểm tra. **+2**.

**Phản hồi và nối:** Từ khó trở thành một thẻ từ vựng. Bản giới thiệu Yêu sách xuất hiện ở II-05.

##### II-05. Tiêu đề nào không làm sai tư liệu? — KT

**Dàn cảnh:** Bàn biên soạn mục năm 1919. An phải đặt một tiêu đề mô tả bản Yêu sách.

**Mai:** “Tiêu đề ngắn, nhưng không được viết một kết quả chưa xảy ra.”

- **A. Việt Nam giành độc lập ngay tại Versailles.** Sai; nhầm kết quả. **+0**.
- **B. Những yêu cầu về quyền tự do, dân chủ và bình đẳng của nhân dân An Nam.** Đúng. **+2**.
- **C. Đại hội thành lập Đảng Cộng sản Pháp năm 1919.** Sai; nhầm sự kiện và mốc thời gian. **+0**.
- **D. Bản điều lệ của Hội Việt Nam Cách mạng Thanh niên.** Sai; nhầm loại văn bản và giai đoạn. **+0**.

**Phản hồi và nối:** Hiện đáp án, giải thích và nguồn của mốc 5. An mở trang “những câu hỏi còn tiếp tục” ở II-06.

##### II-06. Tấm thẻ bị xếp sai — KT, mốc K6

**Dàn cảnh:** Trang sổ về Luận cương của Lênin đang nằm giữa bốn ngăn thời gian.

**Bình:** “Muốn hiểu hành trình, trước tiên phải đặt đúng thời điểm.”

**Câu hỏi:** Mốc nào gắn với việc Nguyễn Ái Quốc đọc bản Luận cương về vấn đề dân tộc và thuộc địa?

- **A. Ngày ra đi năm 1911.** Sai. **+0**, K6 = sai.
- **B. Hội nghị Versailles năm 1919.** Sai. **+0**, K6 = sai.
- **C. Ngày ra số đầu báo Thanh niên năm 1925.** Sai. **+0**, K6 = sai.
- **D. Tháng 7/1920.** Đúng. **+2**, K6 = đúng.

**Phản hồi và nối:** Hiện thẻ lịch sử màn 6. Nếu sai, trang sổ được gắn chú thích sửa; điểm và lựa chọn ban đầu được giữ. Sang II-07.

##### II-07. Hai Đảng, hai mốc — KT

**Dàn cảnh:** Bàn sắp dòng thời gian tại mục Tours. An thấy hai thẻ: Đảng Cộng sản Pháp và Đảng Cộng sản Việt Nam.

**Bình:** “Giống nhau một phần tên gọi không có nghĩa là cùng một sự kiện.”

**Câu hỏi:** Thẻ nào thuộc sự kiện Tours tháng 12/1920?

- **A. Nguyễn Ái Quốc tham gia sáng lập Đảng Cộng sản Pháp.** Đúng. **+2**.
- **B. Nguyễn Ái Quốc chủ trì Hội nghị thành lập Đảng Cộng sản Việt Nam.** Sai mốc. **+0**.
- **C. Báo Thanh niên ra số đầu tại Quảng Châu.** Sai sự kiện. **+0**.
- **D. Đường Kách mệnh được xuất bản.** Sai sự kiện. **+0**.

**Phản hồi và nối:** Thẻ đúng vào ngăn 1920. Ngăn 1930 vẫn để trống chờ phần sau. Sang II-08, năm 1922.

##### II-08. Lời trích và lời của mình — TH

**Dàn cảnh:** An đang làm một bản đọc nội bộ sau khi tìm hiểu báo Người cùng khổ. Bản nháp có lời của một người bạn và nhận xét riêng của An.

**Mai:** “Đoạn nào người ấy nói, đoạn nào cậu rút ra?”

- **A. Giữ nguyên lời kể, nhưng chưa giải thích bối cảnh.** Bản đọc trung thực, thông tin chưa đủ. **+1**.
- **B. Đánh dấu lời trích, ghi người nói và tách nhận xét của mình.** Người đọc có thể kiểm tra cách diễn giải. **+2**.
- **C. Bỏ mọi dấu phân biệt để văn bản trôi chảy hơn.** Ranh giới nguồn và nhận xét bị mờ. **+0**.
- **D. Biến nhận xét riêng thành một câu nói của nhân vật lịch sử.** Một lời nói hư cấu bị gán sai tác giả. **−1**.

**Phản hồi và nối:** Hai màu chú giải xuất hiện trên bản nháp. Nếu II-04 chọn C, Mai còn yêu cầu kiểm lại bản dịch cũ. Sang II-09.

##### II-09. Bảng so sánh còn một cột trống — TH

**Dàn cảnh:** Không gian nghiên cứu giai đoạn 1923–1924. An có bảng “kinh nghiệm đã đọc – điều kiện quê hương – điều cần khảo sát”.

**Bình:** “Cột cuối trống vì chúng ta đã biết hết, hay vì chưa hỏi đủ?”

- **A. Xóa cột cuối để bảng trông hoàn chỉnh.** Các câu hỏi thực tế bị bỏ sót. **+0**.
- **B. Điền những con số tự nghĩ ra cho đủ trang.** Bảng có dữ liệu không có căn cứ. **−1**.
- **C. Đối chiếu nguồn và giữ rõ những điểm chưa thể kết luận.** Bảng giúp nhóm biết cần tìm hiểu gì tiếp. **+2**.
- **D. Hoàn thành phần tóm tắt lý luận, để phần liên hệ ở trạng thái nháp.** Có nền tảng nhưng nhiệm vụ chưa trọn vẹn. **+1**.

**Phản hồi và nối:** Các dấu hỏi được trình bày như công việc cần làm, không bị che đi. Bảng so sánh được mang đến lượt học ở II-10.

##### II-10. Dòng ngày tháng dưới tờ báo — KT

**Dàn cảnh:** Quảng Châu. An hoàn thành trang giới thiệu báo Thanh niên.

**Bình:** “Hãy chọn mốc ra số đầu trước khi khóa trang này.”

- **A. 5/6/1911.** Sai; nhầm với mốc ra đi. **+0**.
- **B. 18/6/1919.** Sai; nhầm với bản Yêu sách. **+0**.
- **C. 3/2/1930.** Sai; nhầm với ngày kỷ niệm thành lập Đảng. **+0**.
- **D. 21/6/1925.** Đúng. **+2**.

**Phản hồi và nối:** Hiện nguồn của báo Thanh niên. An mở mục “tài liệu huấn luyện” ở II-11, với thẻ thời gian 1927.

##### II-11. Giới thiệu một cuốn sách — TH

**Dàn cảnh:** An viết lời giới thiệu cho phần tìm hiểu Đường Kách mệnh của nhóm.

**Lâm:** “Người chưa đọc cuốn sách cần biết điều gì đầu tiên?”

- **A. Nêu đúng tác giả, thời điểm, nguồn gốc bài giảng và vai trò của tác phẩm; ghi nguồn.** Trang giới thiệu đầy đủ, có thể kiểm chứng. **+2**.
- **B. Ghi đúng tên sách, tác giả và năm xuất bản.** Trang đúng thông tin cơ bản nhưng chưa giải thích ý nghĩa. **+1**.
- **C. Gán cuốn sách cho An để cuốn nhật ký hấp dẫn hơn.** Trang giới thiệu sai tác giả. **−1**.
- **D. Chỉ mô tả bìa và màu giấy.** Người đọc chưa hiểu nội dung học tập. **+0**.

**Phản hồi và nối:** Nếu II-08 chọn D, hiện thêm ghi chú cần sửa về cách ghi tác giả. An chuẩn bị trang cuối ở II-12.

##### II-12. Dòng kết của cuốn nhật ký — KT, mốc K12

**Dàn cảnh:** Đầu năm 1930. An viết đoạn tổng kết giai đoạn đã theo dõi.

**Mai:** “Đừng để trang cuối phủ nhận cả quá trình trong những trang trước.”

**Câu hỏi:** Nhận định nào đúng về quá trình dẫn tới sự ra đời của Đảng Cộng sản Việt Nam?

- **A. Chỉ cần xuất bản một tờ báo là tự động có một chính đảng.** Sai; giản lược quá trình chuẩn bị. **+0**, K12 = sai.
- **B. Có quá trình chuẩn bị về tư tưởng, chính trị và tổ chức, gắn với hoạt động của Nguyễn Ái Quốc và sự phát triển của các phong trào.** Đúng. **+2**, K12 = đúng.
- **C. Hội nghị Versailles năm 1919 đã trực tiếp thành lập Đảng Cộng sản Việt Nam.** Sai mốc và sự kiện. **+0**, K12 = sai.
- **D. Mốc 1930 có nghĩa mọi mục tiêu giải phóng dân tộc đã hoàn thành ngay.** Sai; nhầm bước ngoặt với kết quả cuối cùng. **+0**, K12 = sai.

**Phản hồi và nối:** Đóng trang, xét ending. Những mục từng thiếu nguồn hoặc sai mốc vẫn xuất hiện trong phần tổng kết cần ôn lại.

##### Ba ending của kịch bản II

**II-GOOD – Cuốn sổ có người đọc**

Hình ảnh: Nhóm bạn dùng cuốn nhật ký như một bản hướng dẫn đọc; các trang có nguồn, mốc và chú giải. Dòng thời gian lịch sử giữ nguyên.

Lời kết: “An không viết để mình trở thành nhân vật lớn nhất trong câu chuyện. Anh viết để người đến sau hiểu được điều đã xảy ra, nhận ra điều chưa chắc và tiếp tục đặt câu hỏi. Cuốn sổ rời khỏi tay anh, bắt đầu một hành trình khác.”

**II-NEUTRAL – Bản thảo bên cửa sổ**

Hình ảnh: Mai đặt các dấu trang vào những mục còn thiếu. An mở lại bản nháp thay vì gửi nó như bản hoàn chỉnh.

Lời kết: “Cuốn sổ đã có nhiều trang hữu ích. Vài mốc còn nhầm, vài nhận xét còn cần chứng minh. An giữ lại bản thảo để sửa, chấp nhận rằng một câu chuyện đáng tin cần thêm công sức.”

**II-BAD – Những dòng chữ không còn được tin**

Hình ảnh: Các lời kể bị sửa và nguồn bị gán sai hiện cạnh bản đối chiếu. Nhóm ngừng dùng cuốn nhật ký của An.

Lời kết: “Những trang giấy từng đầy chữ, nhưng thiếu điều khiến người đọc có thể tin: sự trung thực với điều đã biết và điều chưa biết. Nhiệm vụ ghi chép dừng lại. Lịch sử không đổi; bản thảo của An cần được bắt đầu lại.”

**Chuyển lượt III:** Nhãn “Một góc nhìn khác – Người kết nối”. Good để lại thư mời chia sẻ bản đọc; Neutral để lại danh sách câu hỏi; Bad để lại tờ hướng dẫn kiểm chứng. Tất cả đều chỉ thay đổi đoạn mở đầu, không cộng điểm hoặc khóa lựa chọn lượt III.

#### 7. Kịch bản III – NGƯỜI KẾT NỐI

Lượt kể thứ ba trở lại điểm khởi đầu. An phải xây dựng và duy trì một nhóm học tập nhỏ trong suốt hành trình. Các nhân vật, nhóm và nhiệm vụ đều là hư cấu; không gọi đây là tổ chức lịch sử do An thành lập. Bảng mốc và nguồn ở phần 3 vẫn áp dụng.

Mỗi màn thêm một vấn đề về sự tin cậy, phân công, lắng nghe hoặc truyền đạt. T = 0; K6 và K12 đặt lại. III-01 nối III-02 và tiếp tục tới III-12; không có kết thúc sớm.

##### III-01. Hai lý do để lên đường — TH

**Dàn cảnh:** Quán nước đầu hành trình. An muốn tìm hiểu xã hội; Lâm lo tiền gửi về gia đình.

**Lâm:** “Nếu chỉ nói đến một việc lớn, ai sẽ lo bữa ăn trước mắt?”

- **A. Giúp Lâm sắp xếp công việc trước mắt, chưa trao đổi mục đích lâu dài.** Có sự hỗ trợ nhưng chưa hình thành việc chung. **+1**.
- **B. Lắng nghe hoàn cảnh của Lâm và cùng tìm cách vừa mưu sinh vừa giữ việc học.** Hai người có một thỏa thuận có thể thực hiện. **+2**.
- **C. Tránh nói chuyện vì mục đích hai người khác nhau.** Không có kế hoạch phối hợp. **+0**.
- **D. Chê trách Lâm trước mọi người vì lo cho gia đình.** Lâm mất tin cậy, ngừng chia sẻ. **−1**.

**Phản hồi và nối:** Vật phẩm là một tờ thỏa thuận, bản hẹn tạm hoặc trang trắng. Nó trở thành chi tiết trên bàn ở III-02.

##### III-02. Ai giữ lời hẹn? — TH

**Dàn cảnh:** Bến cảng. An và Lâm cần chia thời gian lao động, học tiếng và ghi chép trong chuyến đi.

**Lâm:** “Nếu một người mệt hoặc bận ca, việc học sẽ ra sao?”

- **A. Không bàn trước, đợi có chuyện rồi xử lý.** Kế hoạch dễ bị bỏ quên. **+0**.
- **B. Hứa mình sẽ làm hết để người khác không cần tham gia.** An sớm quá tải, lời hẹn bị bỏ dở. **−1**.
- **C. Chia việc rõ nhưng chưa có cách thay nhau khi bận.** Công việc tiến triển, dễ ngắt quãng. **+1**.
- **D. Chia việc vừa sức và thống nhất cách báo lại, thay nhau khi cần.** Hai người có lịch sinh hoạt bền vững hơn. **+2**.

**Phản hồi và nối:** Nếu III-01 chọn D, Lâm chỉ nhận một việc nhỏ để thử lại sự tin cậy. Sang III-03 qua bản đồ nhiều năm lao động.

##### III-03. Người bạn nói một tiếng khác — TH

**Dàn cảnh:** Khu lao động bên cảng. Một người bạn mới muốn tham gia bàn đọc nhưng chưa hiểu tiếng của nhóm.

**Người bạn:** “Tôi không hiểu hết, nhưng tôi có một chuyện muốn kể.”

- **A. Dùng câu ngắn, hình vẽ và người hỗ trợ ngôn ngữ để cùng trao đổi.** Người bạn tham gia được và bổ sung một góc nhìn mới. **+2**.
- **B. Tiếp tục nói thật nhanh như cũ.** Người bạn không theo kịp buổi đọc. **+0**.
- **C. Đưa một bản tóm tắt đơn giản, hẹn nghe chuyện vào dịp sau.** Có hỗ trợ bước đầu, phần trao đổi còn thiếu. **+1**.
- **D. Quy kết rằng người ấy không hiểu vì không đáng được tham gia.** Một thành viên khác phản đối và rời nhóm. **−1**.

**Phản hồi và nối:** Bàn đọc thêm hoặc thiếu một chiếc ghế theo lựa chọn. Nhóm tiếp tục tới bối cảnh Pháp ở III-04.

##### III-04. Buổi đọc đầu tiên — TH

**Dàn cảnh:** Căn phòng của Mai, trước tháng 6/1919. Người đọc tốt muốn đi nhanh; người mới học cần thời gian.

**Mai:** “Chúng ta muốn đọc hết một tờ báo, hay muốn mọi người cùng hiểu được điều đang đọc?”

- **A. Để người đọc nhanh chế giễu người mới học.** Hai người ngại quay lại buổi sau. **−1**.
- **B. Chia nhóm theo khả năng nhưng chưa có phần trao đổi chung.** Mỗi nhóm tiến bộ riêng, liên hệ còn yếu. **+1**.
- **C. Chọn đoạn vừa sức, giải thích từ khó và dành lượt hỏi cho từng người.** Buổi đọc có sự tham gia của cả nhóm. **+2**.
- **D. Hoãn vô thời hạn cho tới khi mọi người có trình độ như nhau.** Buổi học chưa diễn ra. **+0**.

**Phản hồi và nối:** Những câu hỏi còn lại được ghi lên bảng. Một câu dẫn vào bản Yêu sách ở III-05.

##### III-05. Trả lời một lời đồn — KT

**Dàn cảnh:** Nhóm đọc tin về bản Yêu sách năm 1919. Một người hỏi có phải việc gửi văn bản đã lập tức đem lại độc lập hay không.

**Câu hỏi:** An nên trả lời bằng nhận định nào đúng với dữ kiện?

- **A. Đúng, chỉ cần gửi văn bản là Việt Nam đã độc lập.** Sai; nhầm yêu cầu với kết quả. **+0**.
- **B. Bản Yêu sách là quyết định thành lập Đảng Cộng sản Việt Nam.** Sai; nhầm sự kiện. **+0**.
- **C. Văn bản không liên quan đến quyền của người dân An Nam.** Sai về nội dung. **+0**.
- **D. Bản Yêu sách nêu các yêu cầu về quyền; việc gửi văn bản không đồng nghĩa mục tiêu giải phóng dân tộc đã đạt được.** Đúng. **+2**.

**Phản hồi và nối:** Hiện thẻ nguồn để mọi người cùng đọc, thay vì yêu cầu tin vào riêng An. Sang III-06.

##### III-06. Một câu hỏi tại bàn đọc — KT, mốc K6

**Dàn cảnh:** Tháng 7/1920. Nhóm tìm hiểu vì sao Luận cương của Lênin có vị trí quan trọng trong hành trình nhận thức của Nguyễn Ái Quốc.

**Bình:** “Nội dung nào trực tiếp gắn với câu hỏi mà Người đang theo đuổi?”

- **A. Vấn đề dân tộc và thuộc địa, gắn với việc tìm con đường giải phóng dân tộc.** Đúng. **+2**, K6 = đúng.
- **B. Lịch tàu chở hàng từ châu Âu về Sài Gòn.** Sai; nhầm loại nội dung. **+0**, K6 = sai.
- **C. Một bản tuyên bố Việt Nam đã độc lập từ năm 1920.** Sai dữ kiện. **+0**, K6 = sai.
- **D. Điều lệ của Đảng Cộng sản Việt Nam đã ra đời từ năm 1911.** Sai sự kiện và thời điểm. **+0**, K6 = sai.

**Phản hồi và nối:** Hiện giải thích của mốc 6. Nếu III-04 có buổi đọc chung tốt, Bình liên hệ với câu hỏi cũ trên bảng; nếu không, Mai tóm tắt lại để người chơi vẫn theo dõi được. Sang III-07.

##### III-07. Nhầm tên trên bản đồ — KT

**Dàn cảnh:** Cuối năm 1920. An phải đặt biểu tượng sự kiện Tours lên bản đồ để giải thích cho nhóm.

**Câu hỏi:** Nội dung nào nên nằm cạnh biểu tượng Tours?

- **A. Hội Việt Nam Cách mạng Thanh niên ra đời ở Quảng Châu.** Sai địa điểm và mốc. **+0**.
- **B. Hội nghị hợp nhất thành lập Đảng Cộng sản Việt Nam.** Sai sự kiện. **+0**.
- **C. Nguyễn Ái Quốc tán thành Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp.** Đúng. **+2**.
- **D. Số đầu báo Thanh niên được xuất bản.** Sai sự kiện. **+0**.

**Phản hồi và nối:** Bản đồ giữ rõ Pháp và các mốc châu Á ở giai đoạn sau. Nhóm sang nhiệm vụ mới ở III-08, năm 1922.

##### III-08. Tờ đọc không tìm được người đọc — TH

**Dàn cảnh:** Sau khi tìm hiểu báo Người cùng khổ, nhóm làm một bản thông tin nội bộ. Người viết dùng nhiều từ khó; người đọc nói mình không hiểu.

**Mai:** “Chúng ta cần giữ nội dung chính xác và giúp người đọc tiếp cận được nó.”

- **A. Giữ nguyên rồi trách người đọc không cố gắng.** Bản đọc không được sử dụng. **+0**.
- **B. Thêm một bảng giải nghĩa ngắn nhưng chưa thử với người đọc.** Bản tin dễ tiếp cận hơn một phần. **+1**.
- **C. Bỏ những dữ kiện không vừa khẩu hiệu, dù làm thay đổi nghĩa.** Nội dung bị sai lệch. **−1**.
- **D. Viết lại bằng câu rõ, giữ nguồn và nhờ người đọc thử để kiểm tra cách hiểu.** Nhóm có bản tin vừa đúng vừa dễ đọc. **+2**.

**Phản hồi và nối:** Nếu III-03 có người bạn mới, người ấy trở thành một người đọc thử trong cảnh này; nếu không, Mai đảm nhận vai trò đó. Sang III-09.

##### III-09. Những việc không thể giao hết cho một người — TH

**Dàn cảnh:** Giai đoạn nghiên cứu 1923–1924. Nhóm cần đọc, đối chiếu, viết tóm tắt và trình bày liên hệ thực tế.

**Bình:** “Nếu An vắng mặt một buổi, chúng ta có tiếp tục được không?”

- **A. Chia việc theo khả năng, cùng kiểm tra và luân phiên trình bày.** Nhóm có thể tiếp tục khi một người bận. **+2**.
- **B. Chia việc rõ nhưng mọi kiểm tra vẫn phụ thuộc riêng An.** Nhiệm vụ tiến triển, còn một điểm dễ gián đoạn. **+1**.
- **C. Không chia việc để tránh phải bàn bạc.** Nhiều phần chưa ai làm. **+0**.
- **D. Nhận mọi công việc rồi ghi tên mình lên phần do người khác hoàn thành.** Nhóm mất tin cậy và phải phân công lại. **−1**.

**Phản hồi và nối:** Sơ đồ nhiệm vụ hiện nhiều bàn làm việc hoặc một chồng việc quá tải. Thẻ thời gian sang Quảng Châu năm 1925 ở III-10.

##### III-10. Học để chuẩn bị điều gì? — KT

**Dàn cảnh:** Nhóm An tìm hiểu vai trò công tác đào tạo của Hội Việt Nam Cách mạng Thanh niên.

**Bình:** “Các lớp huấn luyện và việc truyền bá kiến thức có ý nghĩa gì trong giai đoạn chuẩn bị?”

- **A. Chỉ phục vụ một hoạt động giải trí, không liên quan đến tổ chức.** Sai. **+0**.
- **B. Góp phần đào tạo cán bộ, truyền bá lý luận và chuẩn bị điều kiện về tư tưởng, tổ chức cho phong trào.** Đúng. **+2**.
- **C. Có nghĩa Đảng Cộng sản Việt Nam đã ra đời từ năm 1925.** Sai mốc. **+0**.
- **D. Có thể thay thế toàn bộ hoạt động thực tiễn bằng việc học thuộc tên sách.** Sai về ý nghĩa và phương pháp. **+0**.

**Phản hồi và nối:** Hiện nguồn của mốc 10. Nhóm chuẩn bị buổi đọc tài liệu ở III-11, năm 1927.

##### III-11. Mâu thuẫn trước buổi học — TH

**Dàn cảnh:** Buổi tìm hiểu Đường Kách mệnh. Hai thành viên hiểu khác nhau một ý trong bản tóm tắt do An viết.

**Lâm:** “Nếu hai người hiểu khác nhau, chúng ta chọn ai đúng bằng cách nào?”

- **A. Bỏ qua vì tranh luận luôn là việc vô ích.** Điểm hiểu khác vẫn tồn tại. **+0**.
- **B. Chọn người thân với An hơn và yêu cầu người kia im lặng.** Một thành viên rời nhóm, bản tóm tắt không được kiểm tra. **−1**.
- **C. Cùng trở về văn bản và nguồn, để từng người giải thích rồi sửa bản tóm tắt.** Nhóm giải quyết bất đồng bằng căn cứ. **+2**.
- **D. Tạm dừng điểm tranh luận, ghi lại để nhờ người am hiểu hỗ trợ.** Giữ được buổi học nhưng vấn đề chưa giải quyết. **+1**.

**Phản hồi và nối:** Nếu III-09 từng nhận hết công, Bình đề nghị lập lại bảng phân công; nếu đã luân phiên tốt, một bạn khác chủ trì việc kiểm tra. Sang III-12 với tin đầu năm 1930.

##### III-12. Hiểu đúng ý nghĩa của sự thống nhất — KT, mốc K12

**Dàn cảnh:** Nhóm An nhận tin về sự thành lập Đảng. Mỗi người cầm một phần dòng thời gian, ghép thành bức tranh chung.

**Mai:** “Từ quá trình trước đó, ý nghĩa nào cần được ghi vào trang tổng kết?”

- **A. Việc thống nhất tổ chức có nghĩa mọi khác biệt thực tế tự biến mất ngay.** Sai; kết luận vượt quá dữ kiện. **+0**, K12 = sai.
- **B. Chỉ cần đổi tên, không cần đường lối hay quá trình chuẩn bị.** Sai. **+0**, K12 = sai.
- **C. Sự kiện không liên quan đến phong trào công nhân và phong trào yêu nước.** Sai; tách sự kiện khỏi điều kiện lịch sử. **+0**, K12 = sai.
- **D. Sự ra đời của một chính đảng thống nhất cùng Cương lĩnh đầu tiên tạo bước ngoặt về tổ chức lãnh đạo và đường lối cho cách mạng Việt Nam.** Đúng. **+2**, K12 = đúng.

**Phản hồi và nối:** Mở nguồn mốc 12, chốt thời điểm 1930. Sau đó xét ending của nhóm hư cấu, không cho lựa chọn của An thay đổi kết quả hội nghị lịch sử.

##### Ba ending của kịch bản III

**III-GOOD – Những ngọn đèn cùng sáng**

Hình ảnh: Nhiều bàn đọc trong một căn phòng được thắp sáng. Các thành viên tự tổ chức buổi tiếp theo, An trở thành một người tham gia trong số họ. Phía ngoài lớp truyện là dòng thời gian lịch sử đúng mốc.

Lời kết: “Điều An giữ được không chỉ là một câu trả lời. Đó là những người có thể cùng học, cùng kiểm tra và tiếp tục công việc khi anh không có mặt. Hành trình riêng đã trở thành một nỗ lực chung.”

**III-NEUTRAL – Một bàn đọc còn mở**

Hình ảnh: Nhóm nhỏ vẫn gặp nhau; vài ghế còn trống, vài câu hỏi vẫn nằm trên bảng. Kế hoạch lớn hơn chưa được thông qua.

Lời kết: “Nhóm chưa đủ vững để đi xa như dự định. Nhưng những người ở lại đã thống nhất một việc vừa sức: tiếp tục học và sửa điều chưa hiểu. Chiếc bàn chưa khép lại.”

**III-BAD – Những lá thư không người nhận**

Hình ảnh: An đặt các thư mời lên bàn; lịch hẹn đã qua nhưng không còn buổi gặp chung. Những lựa chọn làm mất tin cậy được nhắc lại bằng các khung hình ngắn.

Lời kết: “An đã có lời kêu gọi, nhưng không giữ được việc lắng nghe, sự công bằng và những lời đã hứa. Nhóm của anh tan rã trước khi hoàn thành mục tiêu. Dòng lịch sử vẫn tiếp tục qua công sức của những con người khác.”

**Sau ending III:** Mở bộ sưu tập chín ending và lựa chọn chơi lại. Không bắt buộc người chơi đạt đủ ending Bad để hoàn thành nội dung học tập.

#### 8. Cách tạo biến thể và phản hồi xuyên màn

##### Các khác biệt bắt buộc giữa ba kịch bản

| Thành phần | Người lên đường | Người ghi chép | Người kết nối |
|---|---|---|---|
| Mục tiêu xuyên suốt | Tìm hiểu và xác định hướng đi | Hoàn thiện nhật ký có căn cứ | Duy trì nhóm học tập |
| Vật phẩm trung tâm | Sổ hành trình | Bộ hồ sơ nguồn và bản thảo | Sổ hẹn và bảng phân công |
| Xung đột chủ đạo | Mưu sinh, học hỏi, quan sát | Kiểm chứng, dịch, ghi nguồn | Lắng nghe, hợp tác, giữ tin cậy |
| Phần việc thay đổi thực sự | Chuẩn bị hành trình và vận dụng điều học | Biên soạn và sửa tư liệu | Tạo điều kiện để nhóm cùng tham gia |
| Ending Good | Có phương hướng và kế hoạch tiếp tục | Có bản đọc đáng tin để chia sẻ | Nhóm có khả năng tự duy trì |
| Ending Neutral | Tiếp tục học, chưa sẵn sàng nhận việc lớn | Bản thảo chờ sửa | Nhóm còn hoạt động trong phạm vi nhỏ |
| Ending Bad | Hành trình cá nhân bỏ dở | Bản thảo không còn được tin | Nhóm tan rã |

##### Phản hồi bắt buộc cho lựa chọn trước

Không chỉ đổi câu chúc mừng sau khi chọn. Dùng ít nhất các liên kết sau:

- I-03 → I-04 và I-08: bản ghi quan sát trở thành tài liệu để học đọc hoặc viết bài; thiếu bản ghi thì nhận tài liệu tham khảo và lời nhắc.
- I-06 → I-07: sơ đồ đúng hoặc bảng đối chiếu sửa sai xuất hiện trên bàn.
- I-08 → I-11: bài có nguồn được dùng làm ví dụ; bài bịa chi tiết phải được kiểm tra lại.
- II-01 → II-03: biểu tượng ghi nguồn được dùng lại hoặc đánh dấu đang thiếu.
- II-04 → II-08: lỗi dịch cũ trở thành nhiệm vụ đối chiếu bổ sung.
- II-08 → II-11: cách ghi tác giả và lời trích được nhắc lại trong trang giới thiệu sách.
- III-01 → III-02: mức sẵn sàng chia sẻ việc của Lâm thay đổi trong hội thoại.
- III-03 → III-08: người bạn được hỗ trợ tham gia đọc thử; nếu chưa kết nối được, Mai thay vai.
- III-09 → III-11: buổi kiểm tra do một thành viên khác chủ trì hoặc An phải đề nghị phân công lại.

Các nhánh đều trở lại màn kế tiếp trong chuỗi. Điểm, vật phẩm và phản hồi giữ dấu vết của nhánh, không đặt lại sau khi hội tụ.

##### Khi chơi lại một kịch bản đã hoàn thành

- Có thể đổi thời tiết, thời điểm trong ngày hoặc góc máy nếu không ảnh hưởng dữ kiện.
- Có thể chọn một trong hai cách diễn đạt câu hỏi với cùng ý nghĩa và đáp án.
- Được đảo vị trí phương án; phải đi kèm mã phương án cố định để chấm đúng.
- Không thay niên đại, địa điểm, vai trò nhân vật hoặc nội dung sự kiện lịch sử để tạo “độ ngẫu nhiên”.
- Biến thể hình ảnh và đảo đáp án chỉ bổ sung cho ba tuyến nhiệm vụ đã viết ở trên; không được coi đó là toàn bộ nội dung chơi lại.

#### 9. Định dạng một màn chơi để bàn giao thiết kế

Một màn cần có: mã màn; tên; mốc thời gian; phông nền; nhân vật; vật thể có thể bấm; lời dẫn; hội thoại; loại KT/TH; câu hỏi; bốn lựa chọn; phản hồi từng lựa chọn; điểm; vật phẩm/trạng thái được lưu; điều kiện đổi lời thoại; nguồn của thẻ lịch sử; mã màn tiếp theo.

Trình tự hiển thị thống nhất:

1. Thẻ địa điểm và thời gian.
2. Khung cảnh 2D và lời dẫn, có nút xem thêm sự vật/sự việc.
3. Hội thoại, sau đó bốn lựa chọn.
4. Khóa lựa chọn sau khi bấm để tránh cộng điểm nhiều lần.
5. Đoạn diễn biến riêng của phương án và cập nhật vật phẩm.
6. Với KT, hiện đáp án và giải thích. Với TH, giải thích hệ quả của lựa chọn trong nhiệm vụ.
7. Cho phép mở thẻ lịch sử có nguồn.
8. Nút tiếp tục sang màn kế hoặc màn ending.

Lưu trò chơi sau bước 5. Khi trở lại, mở đúng màn/phản hồi đã hoàn thành; không cộng điểm lần nữa. Mỗi kịch bản lưu điểm và lựa chọn riêng. Bộ sưu tập ending được giữ giữa các lượt.

#### 10. Các đường chơi mẫu để kiểm tra logic

| Kịch bản | Chuỗi chọn đạt 24 điểm và Good | Chuỗi chọn đạt Bad |
|---|---|---|
| I | A – B – D – A – C – B – D – C – B – A – D – C | D – D – C – D – A – A – A – A – D – B – A – A |
| II | C – A – B – D – B – D – A – B – C – D – A – B | D – C – A – C – A – A – B – D – B – A – C – A |
| III | B – D – A – C – D – A – C – D – A – B – C – D | D – B – D – A – A – B – A – C – D – A – B – A |

Trong mỗi chuỗi Good, nếu đổi riêng lựa chọn ở màn 6 sang một đáp án sai và giữ các màn khác, tổng điểm còn 22 nhưng K6 sai: ending phải là Neutral. Nếu đổi cả màn 6 và 12 sang sai, tổng điểm còn 20: vẫn là Neutral. Quy tắc này cho thấy điểm cao không bù được hai mốc kiến thức then chốt.

Các đường Bad mẫu có điểm −7, không kết thúc sớm; người chơi vẫn hoàn thành màn 12 rồi nhận ending. Sau đó vẫn được mở kịch bản kế tiếp như các nhóm ending khác.

Khi tổng kết, hiển thị lựa chọn đã xảy ra, ba khoảnh khắc có ảnh hưởng lớn trong lượt và các thẻ kiến thức cần ôn. Không dùng lời phán xét con người người chơi hoặc gọi một câu trả lời sai là sự phản bội.

<!-- END_SHARED_STORY -->
