from pathlib import Path
from datetime import date

# -----------------------------
# Настройки
# -----------------------------

BASE_URL = "https://chalaya22.github.io/my-lending"

ROOT = Path(__file__).parent

EXCLUDED_FILES = {
    "404.html",
}

EXCLUDED_DIRS = {
    ".git",
    ".github",
    ".vscode",
    "__pycache__",
}

# -----------------------------
# Поиск HTML-файлов
# -----------------------------

urls = []

for html in ROOT.rglob("*.html"):

    if any(part in EXCLUDED_DIRS for part in html.parts):
        continue

    if html.name in EXCLUDED_FILES:
        continue

    relative = html.relative_to(ROOT).as_posix()

    # Главная сайта
    if relative == "index.html":
        url = BASE_URL + "/"

    # index внутри папок
    elif relative.endswith("/index.html"):
        folder = relative[:-10]
        url = f"{BASE_URL}/{folder}/"

    else:
        url = f"{BASE_URL}/{relative}"

    urls.append(url)

urls = sorted(set(urls))

# -----------------------------
# Создание XML
# -----------------------------

today = date.today().isoformat()

xml = []

xml.append('<?xml version="1.0" encoding="UTF-8"?>')
xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for url in urls:

    if url == BASE_URL + "/":
        priority = "1.0"
    elif url.endswith("/index.html"):
        priority = "0.9"
    elif url.endswith("/"):
        priority = "0.9"
    else:
        priority = "0.8"

    xml.append("  <url>")
    xml.append(f"    <loc>{url}</loc>")
    xml.append(f"    <lastmod>{today}</lastmod>")
    xml.append("    <changefreq>weekly</changefreq>")
    xml.append(f"    <priority>{priority}</priority>")
    xml.append("  </url>")

xml.append("</urlset>")

# -----------------------------
# Сохранение
# -----------------------------

output = ROOT / "sitemap.xml"

output.write_text(
    "\n".join(xml),
    encoding="utf-8"
)

print()
print("========================================")
print(" Sitemap successfully generated!")
print("========================================")
print(f" Pages found : {len(urls)}")
print(f" Saved to    : {output}")
print("========================================")