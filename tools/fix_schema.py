from pathlib import Path
import re

ROOT = Path(__file__).parent.parent  # корень сайта

changed = 0

for file in ROOT.rglob("*.html"):

    text = file.read_text(encoding="utf-8")

    original = text

    # Меняем "@type": "Product" -> "@type": "Thing"
    text = re.sub(
        r'"@type"\s*:\s*"Product"',
        '"@type": "Thing"',
        text
    )

    # Удаляем блок brand
    text = re.sub(
        r',\s*"brand"\s*:\s*\{\s*"@type"\s*:\s*"Brand"\s*,\s*"name"\s*:\s*"[^"]*"\s*\}',
        '',
        text,
        flags=re.DOTALL
    )

    if text != original:
        file.write_text(text, encoding="utf-8")
        changed += 1
        print(f"✓ {file.relative_to(ROOT)}")

print()
print("=" * 40)
print(f"Исправлено файлов: {changed}")
print("=" * 40)