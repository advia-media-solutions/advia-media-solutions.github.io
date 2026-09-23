"""Artboards /productos (hub) y /productos/paid-media."""
import _shell

ARROW = ('<svg class="icon" viewBox="0 -960 960 960" aria-hidden="true">'
         '<path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z"/></svg>')
ML = ('font-family:var(--font-mono); font-size:var(--fs-code-xs); '
      'line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase;')


def door(text, dark=False):
    color = "var(--accent-gold)" if dark else "var(--text-accent)"
    return (f'<span style="display:inline-flex; align-items:center; gap:var(--space-2); '
            f'color:{color}; font-size:var(--fs-button); line-height:var(--lh-button); '
            f'font-weight:700">{text}{ARROW}</span>')


def breadcrumb(hoja):
    return ('<div style="display:flex; align-items:center; gap:var(--space-3); '
            'padding:var(--space-6) var(--web-section-pad-x) 0">'
            '<div class="wrap" style="display:flex; align-items:center; gap:var(--space-3); '
            'width:100%">'
            '<span style="' + ML + ' color:var(--text-tertiary)">Productos</span>'
            '<span style="' + ML + ' color:var(--border-gray)">/</span>'
            '<span style="' + ML + ' color:var(--text-secondary)">' + hoja + '</span>'
            '</div></div>')


# ───────────────────────────── /productos ─────────────────────────────
CANALES = [
    ("Open Web", "Hay inventario. La presencia se compra.", "Paid Media", True),
    ("YouTube", "Hay inventario. La presencia se compra.", "Paid Media", True),
    ("Redes sociales", "Canal de descubrimiento. La presencia se fabrica.", "GEO", False),
    ("Respuestas de los LLMs", "No hay inventario. La presencia se fabrica.", "GEO", False),
]


def puente():
    celdas = []
    for nombre, desc, badge, comprada in CANALES:
        bcol = 'var(--text-accent)' if comprada else 'var(--info)'
        bbg = 'var(--gold-crema)' if comprada else 'var(--info-bg)'
        celdas.append(
            '<div style="background:var(--surface-card); border:1px solid var(--border-subtle); '
            'border-radius:var(--radius-lg); padding:var(--space-6); display:flex; '
            'flex-direction:column; gap:var(--space-3)">'
            '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
            'font-weight:700">' + nombre + '</span>'
            '<p style="margin:0; flex-grow:1; font-size:var(--fs-body-s); '
            'line-height:var(--lh-body-s); color:var(--text-secondary)">' + desc + '</p>'
            '<span style="align-self:flex-start; ' + ML + ' color:' + bcol + '; background:'
            + bbg + '; padding:var(--space-1) var(--space-3); '
            'border-radius:var(--radius-sm)">' + badge + '</span></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); '
            'gap:var(--space-4); margin-top:var(--space-12)">' + "".join(celdas) + '</div>')


def producto_split(label, titulo, texto, items, cta):
    filas = "".join(
        '<div style="display:flex; align-items:center; gap:var(--space-3); '
        'padding:var(--space-4) 0; border-top:1px solid var(--border-subtle)">'
        '<span style="font-family:var(--font-mono); font-size:var(--fs-code-m); '
        'line-height:var(--lh-code-m); color:var(--text-accent)">'
        + "{:02d}".format(i + 1) + '</span>'
        '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m)">'
        + it + '</span></div>' for i, it in enumerate(items))
    return (
        '<div style="display:grid; grid-template-columns:3fr 2fr; gap:var(--space-12); '
        'align-items:start; margin-top:var(--space-12)">'
        '<div>'
        '<span style="' + ML + ' color:var(--text-secondary)">' + label + '</span>'
        '<h3 style="margin:var(--space-4) 0 0; font-size:var(--fs-subheading); '
        'line-height:var(--lh-subheading); font-weight:700; text-wrap:pretty">' + titulo + '</h3>'
        '<p style="margin:var(--space-4) 0 var(--space-8); max-width:560px; '
        'font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">'
        + texto + '</p>' + door(cta) + '</div>'
        '<div style="background:var(--surface-card); border:1px solid var(--border-subtle); '
        'border-radius:var(--radius-xl); padding:var(--space-6) var(--space-8)">'
        + filas + '</div></div>')


PROD_BODY = """
<div class="sec" style="padding-top:120px; padding-bottom:104px">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Las activaciones</div>
    <h1 style="margin:var(--space-6) 0 0; max-width:960px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">La Navegación Activa ocurre en todos los canales donde tu consumidor busca. Cada canal funciona <span style="color:var(--text-accent); font-weight:600">distinto</span>.</h1>
    <p style="margin:var(--space-8) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Esta página no lista productos: explica por qué hay dos antes de que elijas puerta.</p>
  </div>
</div>

<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">El puente</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:880px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">En unos canales la presencia se <span style="color:var(--text-accent); font-weight:600">compra</span>; en otros se <span style="color:var(--text-accent); font-weight:600">fabrica</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Donde hay inventario, se puja por él. Donde no lo hay, la única vía es ser la fuente que el modelo cita. Por eso hay dos productos.</p>
    __PUENTE__
    <p style="margin:var(--space-8) 0 0; font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); color:var(--text-tertiary)">Pendiente de confirmar: cómo se activa redes sociales y si la lista de canales se cierra aquí.</p>
  </div>
</div>

<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    __PAID__
  </div>
</div>

<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    __GEO__
  </div>
</div>

<div class="sec" style="background:var(--brand-graphite); padding-top:112px; padding-bottom:112px">
  <div class="wrap">
    <h2 style="margin:0; max-width:860px; font-size:var(--fs-heading); line-height:var(--lh-heading); font-weight:700; color:var(--brand-ivory); text-wrap:pretty">Precampaña: dónde aparecerías <span style="color:var(--accent-gold)">antes de activar</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:620px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--neutral-400)">Nos cuentas el objetivo, simulamos el recorrido de tu target y te enseñamos las fuentes donde aparecerías.</p>
    <div style="display:flex; margin-top:var(--space-10)">
      <span style="background:var(--accent-gold); color:var(--text-on-gold); font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; padding:var(--space-4) var(--space-10); border-radius:var(--radius-pill)">Pedir una precampaña</span>
    </div>
  </div>
</div>
"""

prod = (PROD_BODY
        .replace("__ML__", ML)
        .replace("__PUENTE__", puente())
        .replace("__PAID__", producto_split(
            "Donde la presencia se compra",
            "Navegación Activa en Paid Media",
            "Campañas en Open Web y YouTube, dentro del recorrido de decisión: aparecemos en "
            "las fuentes que tu consumidor consulta mientras compara.",
            ["Territorios", "Producto", "Local"],
            "Ver el producto"))
        .replace("__GEO__", producto_split(
            "Donde la presencia se fabrica",
            "Visibilidad Intencional en IA: GEO",
            "Medimos cómo estás en las respuestas de los modelos, diseñamos la estrategia y "
            "creamos el contenido que la IA cita.",
            ["Medimos", "Diseñamos la estrategia", "Creamos el contenido"],
            "Ver el producto")))

print(_shell.write("Productos.dc.html", "Productos", prod))


# ───────────────────────── /productos/paid-media ─────────────────────────
TIPOS = [
    ("01", "Territorios", "Capitalizar un territorio que la marca aspira a conquistar."),
    ("02", "Producto", "De los primeros síntomas de necesidad a la compra."),
    ("03", "Local", "El comportamiento de búsqueda en torno a una ciudad o una región."),
]


def tipos():
    out = []
    for num, titulo, desc in TIPOS:
        out.append(
            '<div style="background:var(--surface-card); border:1px solid var(--border-subtle); '
            'border-radius:var(--radius-xl); padding:var(--space-8); display:flex; '
            'flex-direction:column; gap:var(--space-4); box-shadow:var(--card-shadow)">'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-l); '
            'line-height:var(--lh-code-l); color:var(--text-accent)">' + num + '</span>'
            '<div style="font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
            'font-weight:700">' + titulo + '</div>'
            '<p style="margin:0; flex-grow:1; font-size:var(--fs-body-m); '
            'line-height:var(--lh-body-m); color:var(--text-secondary)">' + desc + '</p>'
            '<div style="padding-top:var(--space-4); border-top:1px solid var(--border-subtle)">'
            '<span style="' + ML + ' color:var(--text-tertiary)">Verticales</span>'
            '<div style="margin-top:var(--space-2); font-family:var(--font-mono); '
            'font-size:var(--fs-code-m); line-height:var(--lh-code-m); '
            'color:var(--text-secondary)">[ --- ]</div></div></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">' + "".join(out) + '</div>')


def canales():
    def panel(nombre, desc):
        slots = "".join(
            '<div style="display:flex; align-items:center; justify-content:space-between; '
            'gap:var(--space-4); padding:var(--space-4) 0; '
            'border-top:1px solid var(--border-subtle)">'
            '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
            'color:var(--text-secondary)">Formato ' + str(i + 1) + '</span>'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-m); '
            'line-height:var(--lh-code-m); color:var(--text-tertiary)">[ --- ]</span></div>'
            for i in range(3))
        return ('<div style="background:var(--surface-card); border:1px solid '
                'var(--border-subtle); border-radius:var(--radius-xl); padding:var(--space-8)">'
                '<div style="font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
                'font-weight:700">' + nombre + '</div>'
                '<p style="margin:var(--space-3) 0 var(--space-4); font-size:var(--fs-body-m); '
                'line-height:var(--lh-body-m); color:var(--text-secondary)">' + desc + '</p>'
                + slots + '</div>')
    return ('<div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">'
            + panel("Open Web", "Donde se compara: medios especializados, comparativas y "
                                "artículos de prueba.")
            + panel("YouTube", "Donde se resuelve la duda larga: reviews, comparativas en "
                               "vídeo y demostraciones.")
            + '</div>')


def funnel():
    seg = ('<div style="flex-grow:{}; background:{}; color:{}; padding:var(--space-6); '
           'border-radius:{}; display:flex; flex-direction:column; gap:var(--space-2)">'
           '<span style="{} color:{}">{}</span>'
           '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
           'font-weight:600">{}</span></div>')
    barra = ('<div style="display:flex; gap:var(--space-2); margin-top:var(--space-12)">'
             + seg.format(2, 'var(--surface-sunken)', 'var(--text-secondary)',
                          'var(--radius-lg) var(--radius-sm) var(--radius-sm) var(--radius-lg)',
                          ML, 'var(--text-tertiary)', 'Awareness',
                          'Brand-day, skins')
             + seg.format(3, 'var(--brand-graphite)', 'var(--brand-ivory)', 'var(--radius-sm)',
                          ML, 'var(--accent-gold)', 'Advia',
                          'De la parte baja de awareness a la consideración')
             + seg.format(2, 'var(--surface-sunken)', 'var(--text-secondary)',
                          'var(--radius-sm) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
                          ML, 'var(--text-tertiary)', 'Performance',
                          'Conversión pura')
             + '</div>')
    kpis = "".join(
        '<span style="' + ML + ' color:var(--text-secondary); background:var(--surface-sunken); '
        'padding:var(--space-2) var(--space-4); border-radius:var(--radius-sm)">' + k + '</span>'
        for k in ["Reach", "Viewability", "VTR", "CTR", "Qualified Visits"])
    return (barra + '<div style="display:flex; flex-wrap:wrap; gap:var(--space-2); '
            'margin-top:var(--space-6)">' + kpis + '</div>')


def rinde():
    cards = []
    for label, desc in [("Viewability", "vs. benchmark de mercado"),
                        ("VTR", "vs. benchmark de mercado"),
                        ("Tiempo de atención", "media por impacto")]:
        cards.append(
            '<div style="background:var(--surface-card); border:1px solid var(--border-subtle); '
            'border-radius:var(--radius-kpi); padding:var(--space-8)">'
            '<span style="' + ML + ' color:var(--text-secondary)">' + label + '</span>'
            '<div style="margin:var(--space-3) 0 var(--space-2); font-family:var(--font-mono); '
            'font-size:var(--fs-kpi); line-height:var(--lh-kpi); color:var(--text-primary); '
            'font-variant-numeric:tabular-nums">[ --- ]</div>'
            '<span style="font-size:var(--fs-body-s); line-height:var(--lh-body-s); '
            'color:var(--text-secondary)">' + desc + '</span></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">' + "".join(cards) + '</div>')


PAID_BODY = """
__BREADCRUMB__
<div class="sec" style="padding-top:var(--space-10); padding-bottom:104px">
  <div class="wrap">
    <h1 style="margin:0; max-width:940px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Impactamos a tu consumidor mientras busca para <span style="color:var(--text-accent); font-weight:600">decidir</span>.</h1>
    <p style="margin:var(--space-8) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Campañas en Open Web y YouTube colocadas sobre las fuentes que Vera ha visto en el recorrido de decisión de tu target.</p>
  </div>
</div>

<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Tres tipos de Navegación Activa</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:880px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">No todas las decisiones empiezan en el mismo <span style="color:var(--text-accent); font-weight:600">sitio</span>.</h2>
    __TIPOS__
  </div>
</div>

<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Los canales</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:820px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Dónde ocurre cada tipo de navegación, y qué formatos usamos en cada <span style="color:var(--text-accent); font-weight:600">canal</span>.</h2>
    __CANALES__
  </div>
</div>

<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Dónde encajamos</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:880px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Ni reach puro ni performance puro: el tramo donde se <span style="color:var(--text-accent); font-weight:600">descartan marcas</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">La parte del funnel que casi nadie cose: desde la parte baja de awareness hasta la consideración, cuando tu consumidor ya está comparando y todavía puede cambiar de opinión.</p>
    __FUNNEL__
  </div>
</div>

<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Cómo rinde</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:880px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">La navegación activa es más lenta y más <span style="color:var(--text-accent); font-weight:600">atenta</span> que el scroll.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Quien está comparando lee, compara y vuelve. Eso se nota en viewability y en VTR.</p>
    __RINDE__
    <p style="margin:var(--space-8) 0 0; font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); color:var(--text-tertiary)">Cifras agregadas de campañas activadas. Pendientes de dato real.</p>
  </div>
</div>

<div class="sec" style="background:var(--brand-graphite); padding-top:112px; padding-bottom:112px">
  <div class="wrap">
    <h2 style="margin:0; max-width:900px; font-size:var(--fs-heading); line-height:var(--lh-heading); font-weight:700; color:var(--brand-ivory); text-wrap:pretty">Precampaña: te enseñamos dónde aparecerías <span style="color:var(--accent-gold)">antes de activar</span>.</h2>
    <div style="display:flex; margin-top:var(--space-10)">
      <span style="background:var(--accent-gold); color:var(--text-on-gold); font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; padding:var(--space-4) var(--space-10); border-radius:var(--radius-pill)">Pedir una precampaña</span>
    </div>
  </div>
</div>
"""

paid = (PAID_BODY
        .replace("__BREADCRUMB__", breadcrumb("Navegación Activa en Paid Media"))
        .replace("__ML__", ML)
        .replace("__TIPOS__", tipos())
        .replace("__CANALES__", canales())
        .replace("__FUNNEL__", funnel())
        .replace("__RINDE__", rinde()))

print(_shell.write("PaidMedia.dc.html", "Productos", paid))
