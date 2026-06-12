"""One-off: convert the images used on the page to resized WebP for faster loading."""
import os, glob
from PIL import Image

# (path, max_width, quality). Height scales to keep aspect ratio.
jobs = [
    ("assets/img/collage/collage.png", 2200, 80),
    ("assets/img/team/gruppenbild_jubel.jpg", 1800, 80),
    ("assets/img/bundesliga/buli_aligned.jpg", 1800, 80),
    ("assets/img/map/map_annotated.png", 1500, 80),
    ("assets/img/instagram_mockup/Screenshot 2026-06-12 162106.png", 600, 82),
    ("assets/img/instagram_mockup/Screenshot 2026-06-12 162141.png", 600, 82),
    ("assets/img/instagram_mockup/Screenshot 2026-06-12 162208.png", 600, 82),
]
# All crew portraits -> 720px wide WebP
for p in glob.glob("assets/img/portraits/*.jpg"):
    jobs.append((p, 720, 80))

total_before = total_after = 0
for path, maxw, q in jobs:
    if not os.path.exists(path):
        print("MISSING", path); continue
    im = Image.open(path)
    before = os.path.getsize(path)
    if im.width > maxw:
        h = round(im.height * maxw / im.width)
        im = im.resize((maxw, h), Image.LANCZOS)
    out = os.path.splitext(path)[0] + ".webp"
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    if has_alpha:
        im = im.convert("RGBA")
    else:
        im = im.convert("RGB")
    im.save(out, "WEBP", quality=q, method=6)
    after = os.path.getsize(out)
    total_before += before; total_after += after
    print(f"{path}: {before//1024} KB -> {after//1024} KB  ({im.width}x{im.height})")

print(f"\nTOTAL: {total_before//1024} KB -> {total_after//1024} KB "
      f"({100*total_after/total_before:.0f}% of original)")
