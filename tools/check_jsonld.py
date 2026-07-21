from pathlib import Path
import json
import re

ROOT = Path(__file__).parent.parent

errors = []

for file in ROOT.rglob("*.html"):

    text = file.read_text(encoding="utf-8")

    blocks = re.findall(
        r'<script type="application/ld\+json">(.*?)</script>',
        text,
        flags=re.DOTALL,
    )

    for i, block in enumerate(blocks, start=1):
        try:
            json.loads(block)
        except Exception as e:
            errors.append((file, i, str(e)))

print("=" * 60)

if not errors:
    print("✅ Все JSON-LD корректны!")
else:
    print(f"❌ Найдено ошибок: {len(errors)}\n")

    for file, n, err in errors:
        print(file.relative_to(ROOT))
        print(f"Блок №{n}")
        print(err)
        print("-" * 60)