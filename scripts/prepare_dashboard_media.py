"""Prepare optimized WebP images for the War Remnants Museum Dashboard from dataset/Dashboard."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / 'dataset' / 'Dashboard'
OUT_DIR = ROOT / 'public' / 'images' / 'dashboard'

MAPPING = [
    ('IMG_2769.png', 'dashboard-01'),
    ('IMG_2787.png', 'dashboard-02'),
    ('IMG_2780.png', 'dashboard-03'),
]


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for filename, slug in MAPPING:
        src = SRC_DIR / filename
        if not src.exists():
            raise FileNotFoundError(f"Missing {src}")
        img = ImageOps.exif_transpose(Image.open(src)).convert('RGB')

        preview = img.copy()
        preview.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
        preview_path = OUT_DIR / f"{slug}.webp"
        preview.save(preview_path, 'WEBP', quality=86, method=6)

        large = img.copy()
        large.thumbnail((2000, 2000), Image.Resampling.LANCZOS)
        large_path = OUT_DIR / f"{slug}-large.webp"
        large.save(large_path, 'WEBP', quality=90, method=6)

        print(
            f"{slug}: preview={preview.size} ({preview_path.stat().st_size // 1024} KB), "
            f"large={large.size} ({large_path.stat().st_size // 1024} KB)"
        )


if __name__ == '__main__':
    main()
