"""Refresh local CSS/JS URLs when their contents change."""
from pathlib import Path
import hashlib
import re

site = Path(__file__).resolve().parent.parent / "site"
pattern = re.compile(r'(\b(?:href|src)=")([^"?#]+\.(?:css|js))(?:\?[^"#]*)?(" )'.replace('" ', '"'))
for page in site.glob("*.html"):
    def version(match):
        asset = page.parent / match.group(2)
        if not asset.is_file() or not asset.resolve().is_relative_to(site):
            return match.group(0)
        digest = hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
        return f'{match.group(1)}{match.group(2)}?v={digest}{match.group(3)}'
    original = page.read_text(encoding="utf-8")
    updated = pattern.sub(version, original)
    if updated != original:
        page.write_text(updated, encoding="utf-8")
        print(f"Versioned assets: {page.name}")
