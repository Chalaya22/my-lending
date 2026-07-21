from pathlib import Path
import json
import re

ROOT = Path(__file__).parent.parent

print("=" * 70)

for file in ROOT.rglob("*.html"):

    text = file.read_text(encoding="utf-8")

    blocks = re.findall(
        r'<script type="application/ld\+json">(.*?)</script>',
        text,
        flags=re.DOTALL,
    )

    for block_number, block in enumerate(blocks, start=1):

        try:
            json.loads(block)

        except json.JSONDecodeError as e:

            print(f"\n📄 {file.relative_to(ROOT)}")
            print(f"JSON-LD блок №{block_number}")
            print(f"Ошибка: {e.msg}")
            print(f"Строка: {e.lineno}")
            print(f"Колонка: {e.colno}")

            lines = block.splitlines()

            start = max(0, e.lineno - 3)
            end = min(len(lines), e.lineno + 2)

            print("\nКонтекст:\n")

            for i in range(start, end):

                prefix = ">>>" if i + 1 == e.lineno else "   "

                print(f"{prefix} {i+1:3}: {lines[i]}")

            print("\n" + "-" * 70)