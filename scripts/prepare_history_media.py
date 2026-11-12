"""Prepare locally supplied archives for the game without altering source files.

Usage: python scripts/prepare_history_media.py <catalog-directory>
Requires Pillow. The output includes source provenance and optimized WebP copies.
"""
import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DESCRIPTIONS = {
    'LS01': 'Những thuyền nhỏ, tàu và công trình ven sông gợi bối cảnh cảng Sài Gòn cuối thế kỷ XIX. Hồ sơ lưu trữ để dấu hỏi ở khoảng niên đại 1890–1900.',
    'LS02': 'Cảnh bến cảng với Nhà Rồng và những thuyền neo đậu, giúp hình dung không gian Sài Gòn đầu thế kỷ XX.',
    'LS03': 'Ảnh toàn thân tàu hơi nước Amiral Latouche-Tréville, gắn với mốc lên đường ngày 5/6/1911; chưa xác định ngày chụp ảnh.',
    'LS04': 'Mặt đứng khách sạn Parker tại Boston. Bảo tàng giới thiệu địa điểm này trong những năm Nguyễn Tất Thành lao động ở nước ngoài.',
    'LS05': 'Ảnh địa điểm khách sạn Carlton tại London. Xe cộ và biển quảng cáo thuộc thời kỳ sau, vì vậy ảnh chỉ dùng để nhận diện địa điểm.',
    'LS06': 'Ảnh của Eugène Atget ghi lại mặt tiền một cửa quán Paris. Tư liệu tham khảo cảnh quan đô thị, không xác nhận Nguyễn Ái Quốc từng đến cửa quán này.',
    'LS07': 'Danh thiếp giới thiệu nghề làm ảnh của Nguyễn Ái Quốc, góp phần tìm hiểu cuộc sống lao động và hoạt động tại Paris giai đoạn 1919–1923.',
    'LS08': 'Ảnh hiện vật viên gạch sưởi được bảo tàng giới thiệu, bổ sung góc nhìn về điều kiện sinh hoạt trong thời gian Nguyễn Ái Quốc ở Paris.',
    'LS09': 'Ảnh ngôi nhà số 9 ngõ Compoint gắn với nơi ở của Nguyễn Ái Quốc trong giai đoạn 1921–1923, phù hợp với thẻ hoạt động ở Paris năm 1922.',
    'LS10': 'Bố cục tư liệu đặt tờ Yêu sách bằng tiếng Pháp cạnh phần trích, diễn giải tiếng Việt. Người chơi có thể đối chiếu với nội dung mốc tháng 6/1919.',
    'LS11': 'Chân dung Nguyễn Ái Quốc tại Pháp, được bảo tàng ghi niên đại năm 1920, bổ trợ cho hai mốc tháng Bảy và Đại hội Tours.',
    'LS12': 'Ảnh trích phần Luận cương về vấn đề dân tộc và thuộc địa trên báo L’Humanité. Phần giải thích của thẻ giúp đọc nội dung khi chữ trên bản ảnh nhỏ và mờ.',
    'LS13': 'Toàn cảnh hội trường Đại hội lần thứ XVIII Đảng Xã hội Pháp tại Tours, tháng 12/1920. Đây là không gian sự kiện lịch sử, không phải nhóm bạn của An.',
    'LS14': 'Nguyễn Ái Quốc đứng phát biểu giữa các đại biểu tại Đại hội Tours. Ảnh được trình bày như tư liệu của sự kiện có thật.',
    'LS15': 'Bản quét trang báo Le Paria số 2 với đầu báo và các cột bài viết. Số này ra ngày 1/5/1922, sau số đầu tiên một tháng.',
    'LS16': 'Ảnh chụp về sau của địa chỉ số 16 phố Jacques Calot, Paris, nơi đặt trụ sở đầu tiên của Le Paria; không dùng như cảnh đường phố năm 1922.',
    'LS17': 'Chân dung Nguyễn Ái Quốc tại Liên Xô năm 1923 theo chú thích của bảo tàng, bổ trợ cho chặng học tập và hoạt động quốc tế.',
    'LS18': 'Bản ảnh bài báo của Nguyễn Ái Quốc đăng trên báo Sự thật ngày 27/1/1924, thuộc chặng hoạt động ở Liên Xô.',
    'LS19': 'Ảnh mặt ngoài khách sạn Trung tâm tại Moskva. Bảo tàng gắn địa điểm với hoạt động dự Đại hội V Quốc tế Cộng sản năm 1924.',
    'LS20': 'Nguyễn Ái Quốc chụp cùng một số đại biểu Đại hội V Quốc tế Cộng sản; chú thích bảo tàng ghi tháng 7/1924.',
    'LS21': 'Trang báo Thanh Niên ngày 3/10/1926, dùng để nhận diện tờ báo trong thẻ về công tác tuyên truyền và đào tạo khởi đầu từ năm 1925.',
    'LS22': 'Mặt ngoài ngôi nhà trên đường Văn Minh, Quảng Châu, gắn với trụ sở Hội Việt Nam Cách mạng Thanh niên và các lớp huấn luyện giai đoạn 1925–1927.',
    'LS23': 'Bìa sách Đường Kách mệnh, tác phẩm tập hợp bài giảng của Nguyễn Ái Quốc và xuất bản năm 1927. Giữ nguyên tên sách và dấu nhận diện của nguồn.',
    'LS24': 'Bản ảnh hai văn kiện Chánh cương vắn tắt và Sách lược vắn tắt, bổ trợ việc tìm hiểu Cương lĩnh đầu tiên vào đầu năm 1930.',
    'LS25': 'Chân dung Nguyễn Ái Quốc năm 1930 theo chú thích bảo tàng. Ảnh giúp nhận diện nhân vật lịch sử ở chặng cuối của trò chơi.',
}

# Backgrounds are explicitly archival documents, never asserted to depict An.
BACKGROUNDS = ['LS01', 'LS03', 'LS04', 'LS06', 'LS10', 'LS12',
               'LS13', 'LS15', 'LS20', 'LS22', 'LS23', 'LS24']
NOTES = [
    'Ảnh khoảng 1890–1900, gợi bối cảnh cảng Sài Gòn; không phải ảnh năm 1911.',
    'Ảnh con tàu gắn với chuyến đi năm 1911; không xác nhận chụp ngày 5/6/1911.',
    'Tư liệu địa điểm lao động tại Boston; ngày chụp chưa xác định. Khu lao động của An là hư cấu.',
    'Paris: ảnh năm 1900, bản in năm 1910; tham khảo cảnh quan cho chặng trước tháng 6/1919.',
    'Bản tư liệu Yêu sách năm 1919, gồm tiếng Pháp và phần trích, diễn giải tiếng Việt.',
    'Trích Luận cương trên L’Humanité tháng 7/1920; không phải toàn bộ trang báo.',
    'Đại hội Tours tháng 12/1920. An và bạn bè không phải các đại biểu trong ảnh.',
    'Le Paria số 2, ngày 1/5/1922; số đầu ra ngày 1/4/1922.',
    'Ảnh đại biểu tháng 7/1924, thuộc chặng 1923–1924; không phải thời điểm đến Nga năm 1923.',
    'Tư liệu địa điểm tại Quảng Châu; chưa xác định ngày chụp, không phải ảnh một buổi học năm 1925.',
    'Bìa Đường Kách mệnh, xuất bản năm 1927; bản ảnh do bảo tàng công bố.',
    'Bản ảnh văn kiện tháng 2/1930; không phải ảnh chụp Hội nghị thành lập Đảng.',
]


def prepare(directory: Path):
    catalog = json.loads((directory / 'danh_muc_anh.json').read_text(encoding='utf-8-sig'))
    target = ROOT / 'public/images/history'
    target.mkdir(parents=True, exist_ok=True)
    assets = []
    for item in catalog['assets']:
        source_path = directory / item['file']
        digest = hashlib.sha256(source_path.read_bytes()).hexdigest()
        if digest != item['sha256']:
            raise ValueError(f"Source checksum differs: {item['id']}")
        original = ImageOps.exif_transpose(Image.open(source_path)).convert('RGB')
        preview = original.copy()
        preview.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
        preview.save(target / f"{item['id']}.webp", 'WEBP', quality=88, method=6)
        large = original.copy()
        large.thumbnail((2600, 2600), Image.Resampling.LANCZOS)
        has_large = large.size != preview.size
        if has_large:
            large.save(target / f"{item['id']}-large.webp", 'WEBP', quality=92, method=6)
        source = catalog['sources'][item['source_id']]
        assets.append({
            'id': item['id'], 'title': item['title'],
            'src': f"images/history/{item['id']}.webp",
            'largeSrc': f"images/history/{item['id']}{'-large' if has_large else ''}.webp",
            'width': preview.width, 'height': preview.height,
            'type': item['type'], 'period': item['historical_period'],
            'photoDate': item['photo_or_digitization_date'],
            'caption': item['suggested_caption'], 'description': DESCRIPTIONS[item['id']],
            'caution': item['cautions'],
            'source': {'name': source['name'], 'title': source['title'],
                       'url': item['source_page'], 'imageUrl': item['image_url'],
                       'credit': item.get('source_label'), 'rights': item['rights_status']},
            'original': {'file': item['file'], 'width': item['width'],
                         'height': item['height'], 'sha256': digest},
        })
    stages = []
    for i, mapping in enumerate(catalog['stage_mapping']):
        stages.append({'order': mapping['stage'], 'theme': mapping['theme'],
                       'assetIds': mapping['asset_ids'], 'backgroundId': BACKGROUNDS[i],
                       'layout': 'landscape' if i in (0, 1, 6, 8) else 'document',
                       'backgroundNote': NOTES[i]})
    result = {'version': 1, 'catalogDate': catalog['researched_on'],
              'assets': assets, 'stages': stages}
    (ROOT / 'src/content/history-media.json').write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    total = sum(p.stat().st_size for p in target.glob('*.webp'))
    lines = [
        '# Ảnh tư liệu trong trò chơi · 12/11/2026', '',
        '25 ảnh được lấy từ bộ tư liệu người dùng cung cấp. 12 mốc hình ảnh dùng chung cho '
        'ba kịch bản Người lên đường, Người ghi chép và Người kết nối (36 màn).', '',
        'Nguồn ảnh, chú thích, mô tả, niên đại, lưu ý và tình trạng quyền sử dụng nằm trong '
        '`src/content/history-media.json`; giao diện đọc trực tiếp dữ liệu này. '
        'Nguồn sự kiện trong `story.json` được trình bày riêng với nguồn ảnh.', '',
        '## Ánh xạ nền và thẻ lịch sử', '',
        '| Màn ở cả ba tuyến | Chủ đề | Ảnh nền | Thư viện trong thẻ |',
        '|---|---|---|---|',
    ]
    for stage in stages:
        lines.append(f"| {stage['order']:02} | {stage['theme']} | {stage['backgroundId']} | {', '.join(stage['assetIds'])} |")
    lines += ['', '## Danh mục và nguồn ảnh', '',
              '| Mã | Nội dung | Nguồn đăng / hồ sơ |', '|---|---|---|']
    for asset in assets:
        lines.append(f"| {asset['id']} | {asset['title']} | [{asset['source']['name']}]({asset['source']['url']}) |")
    lines += [
        '', '## Cách trình bày', '',
        '- Ảnh nền được gắn nhãn tư liệu bối cảnh, có chú thích về ngày ảnh và nguồn ngay dưới khung. '
        'Ảnh ngang có thể được cắt khung theo màn hình; ảnh văn kiện được đặt trọn trang. '
        'Thẻ lịch sử và cửa sổ phóng lớn luôn hiển thị toàn bộ ảnh, gồm viền và dấu nguồn.',
        '- Các nhân vật, lời thoại, đạo cụ và ending của An tiếp tục là minh họa hư cấu. '
        'Nút khám phá đạo cụ nằm dưới ảnh, không đặt lên người hay hiện vật trong tư liệu thật.',
        '- Le Paria là số 2 ngày 1/5/1922. Ảnh báo Thanh Niên là số ngày 3/10/1926, '
        'không phải số đầu ngày 21/6/1925. Ảnh Paris của Atget chụp năm 1900, bản in năm 1910. '
        'Ảnh địa điểm chưa rõ ngày chụp được ghi rõ.', '',
        '## Ảnh do người dùng chụp', '',
        'Đã duyệt 31 ảnh trong `dataset/Scene image/`. Các ảnh về chiến tranh, '
        'trưng bày vũ khí, phong trào phản chiến, nhà tù, Nguyễn Thị Định và '
        'Tuyên ngôn Độc lập chủ yếu liên quan thời kỳ sau 1945. Chưa chọn ảnh nào '
        'cho khung 1911–1930 để tránh ghép sai thời kỳ; các tệp gốc được giữ nguyên.', '',
        '## Tệp ảnh và tái tạo', '',
        f'- Ảnh được đóng gói trong `public/images/history/`: tổng {total / 1024 / 1024:.2f} MiB, '
        'bản thường tối đa 1280 px, bản lớn tối đa 2600 px. Không phóng quá độ phân giải gốc.',
        '- Chỉ đổi kích thước và mã hóa WebP; không tô màu, phục chế, xóa chữ hay dấu nguồn. '
        'SHA-256 và kích thước ảnh nguồn được lưu trong metadata; script kiểm tra hash trước khi xử lý.',
        '- Cần Python và Pillow để tái tạo, không cần các công cụ này để chạy game:', '',
        '```powershell',
        "python scripts/prepare_history_media.py 'D:\\Lịch sử đảng\\output\\Anh_tu_lieu_game_1911_1930'",
        '```', '',
        'Tình trạng quyền sử dụng được giữ đúng danh mục gốc; việc ghi nguồn không đồng nghĩa '
        'mọi ảnh đều có giấy phép mở. Bản tích hợp này nằm trong dự án cục bộ, chưa xuất bản công khai.', '',
    ]
    (ROOT / 'docs/Anh_tu_lieu.md').write_text('\n'.join(lines), encoding='utf-8')
    print(f"Prepared {len(assets)} assets, {len(stages)} stages; {total / 1024 / 1024:.2f} MiB")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('catalog_directory', type=Path)
    prepare(parser.parse_args().catalog_directory)
