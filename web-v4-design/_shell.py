"""Chasis compartido de los artboards: extrae helmet, nav y footer de Main.dc.html."""
import re
import pathlib

ROOT = pathlib.Path(__file__).parent
MAIN = (ROOT / "_chassis.html").read_text(encoding="utf-8")

HELMET = re.search(r"<helmet>[\s\S]*?</helmet>", MAIN).group(0)
NAV = re.search(
    r"<!--@@NAV@@-->[\s\S]*?(?=<!--@@FOOTER@@-->)",
    MAIN,
).group(0)
FOOTER = re.search(
    r"<!--@@FOOTER@@-->[\s\S]*",
    MAIN,
).group(0)

# La nav marca la página activa: subrayado dorado 2px + texto grafito.
ACTIVE = (
    'style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
    'color:var(--text-primary); font-weight:600; padding-bottom:var(--space-1); '
    'border-bottom:2px solid var(--accent-gold)"'
)
INACTIVE = (
    'style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
    'color:var(--text-secondary)"'
)


def nav_for(item):
    """Devuelve la nav con `item` en estado activo."""
    if item is None:
        return NAV
    target = f">{item}</span>"
    out = []
    for line in NAV.split("\n"):
        if line.rstrip().endswith(target) and INACTIVE in line:
            line = line.replace(INACTIVE, ACTIVE)
        out.append(line)
    return "\n".join(out)


HEAD = """<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
"""

TAIL = """
</x-dc>
</body>
</html>
"""


def write(name, nav_item, body):
    path = ROOT / name
    path.write_text(
        HEAD + HELMET + "\n\n" + nav_for(nav_item) + body + FOOTER + TAIL,
        encoding="utf-8",
    )
    return path
