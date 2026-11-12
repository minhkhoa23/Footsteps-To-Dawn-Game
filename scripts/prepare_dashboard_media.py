"""Prepare optimized WebP images for the War Remnants Museum Dashboard from dataset folders."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DATASET = ROOT / 'dataset'
OUT_DIR = ROOT / 'public' / 'images' / 'dashboard'

# (relative_path_in_dataset, output_slug, max_dim)
ASSETS = [
    # Hero & Chuyên đề 1: Không gian ngoài trời (Outdoor Weapons & Architecture)
    ('museum introduction/IMG_2826.png', 'outdoor-01', 1600),
    ('museum introduction/IMG_2819.png', 'outdoor-02', 1280),
    ('museum introduction/IMG_2821.png', 'outdoor-03', 1280),
    ('museum introduction/IMG_2822.png', 'outdoor-04', 1280),
    ('museum introduction/IMG_2823.png', 'outdoor-05', 1280),

    # Chuyên đề 2: Thế giới ủng hộ Việt Nam & Ngoại giao Hòa bình (World Support & Diplomacy)
    ('Dashboard/IMG_2769.png', 'dashboard-01', 1400),
    ('museum introduction/IMG_2790.png', 'world-02', 1200),
    ('Scene image/IMG_2792.png', 'world-03', 1200),
    ('Scene image/IMG_2773.png', 'world-04', 1200),
    ('Scene image/IMG_2774.png', 'world-05', 1200),

    # Chuyên đề 3: Sự thật lịch sử, Quy mô chiến tranh & Hiện vật vũ khí (Historical Truths & Weapons)
    ('Scene image/IMG_2809.png', 'truth-01', 1200),
    ('museum introduction/IMG_2803.png', 'truth-02', 1200),
    ('museum introduction/IMG_2781.png', 'truth-03', 1400),
    ('Dashboard/IMG_2787.png', 'dashboard-02', 1400),
    ('Dashboard/IMG_2780.png', 'dashboard-03', 1400),

    # Chuyên đề 4: Hậu quả Chất độc Da cam / Dioxin (Agent Orange / Dioxin Aftermath)
    ('museum introduction/IMG_2788.png', 'dioxin-01', 1200),
    ('Scene image/IMG_2797.png', 'dioxin-02', 1200),
    ('Scene image/IMG_2796.png', 'dioxin-03', 1200),
    ('museum introduction/IMG_2794.png', 'dioxin-04', 1200),
    ('Scene image/IMG_2795.png', 'dioxin-05', 1200),

    # Chuyên đề 5: Chế độ lao tù & Ý chí chiến sĩ cách mạng (Prison System & Resilience)
    ('Scene image/IMG_2828.png', 'prison-01', 1200),
    ('Scene image/IMG_2834.png', 'prison-02', 1200),
    ('Scene image/IMG_2835.png', 'prison-03', 1200),
    ('Scene image/IMG_2839.png', 'prison-04', 1200),
    ('Scene image/IMG_2832.png', 'prison-05', 1200),

    # Chuyên đề 6: Ký ức kháng chiến & Ống kính phóng viên chiến trường (Resistance & War Photojournalism)
    ('museum introduction/IMG_2760.png', 'press-01', 1400),
    ('Scene image/IMG_2755.png', 'press-02', 1200),
    ('museum introduction/IMG_2812.png', 'press-03', 1200),
    ('Scene image/IMG_2816.png', 'press-04', 1200),
    ('museum introduction/IMG_2815.png', 'press-05', 1200),
]


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    total_bytes = 0
    for rel_path, slug, max_dim in ASSETS:
        src = DATASET / rel_path
        if not src.exists():
            raise FileNotFoundError(f"Missing {src}")
        img = ImageOps.exif_transpose(Image.open(src)).convert('RGB')

        preview = img.copy()
        preview.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
        preview_path = OUT_DIR / f"{slug}.webp"
        preview.save(preview_path, 'WEBP', quality=82, method=6)
        size = preview_path.stat().st_size
        total_bytes += size

        # Keep -large.webp for the 3 core dashboard slugs for backwards test compatibility
        if slug.startswith('dashboard-'):
            large = img.copy()
            large.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
            large_path = OUT_DIR / f"{slug}-large.webp"
            large.save(large_path, 'WEBP', quality=88, method=6)
            total_bytes += large_path.stat().st_size

        print(f"{slug}: {preview.size} ({size // 1024} KB)")

    print(f"Total bundled size in public/images/dashboard: {total_bytes / (1024 * 1024):.2f} MiB")


if __name__ == '__main__':
    main()
