"""Artboard /tecnologia — Vera, el cómo (how, parte 2)."""
import _shell

ARROW = ('<svg class="icon" viewBox="0 -960 960 960" aria-hidden="true">'
         '<path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z"/></svg>')

MONO_LABEL = ('font-family:var(--font-mono); font-size:var(--fs-code-xs); '
              'line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase;')


def chip(text):
    return ('<span style="font-family:var(--font-mono); font-size:var(--fs-code-xs); '
            'line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; '
            'color:var(--text-secondary); background:var(--surface-sunken); '
            'padding:var(--space-1) var(--space-3); border-radius:var(--radius-sm)">'
            + text + '</span>')


TARJETAS = [
    ("01", "Le damos un rol a cada agente", ["Sociodemo", "Interés", "Decisión"],
     "El contexto de decisión es la clave: dirige toda su navegación. Miles de agentes "
     "humanizados, no una persona inventada."),
    ("02", "Le damos herramientas", ["Buscadores", "Plataformas", "LLMs"],
     "Cada agente busca como buscaría su perfil real. Las herramientas determinan lo que "
     "podemos ver: por eso el mapa cubre Google, YouTube y las respuestas de IA."),
    ("03", "Recogemos lo que han hecho", ["Sites", "Vídeos", "Fuentes"],
     "Analizamos el recorrido completo y cualificamos cada touchpoint: dónde ocurrió, "
     "con qué intención y con qué autoridad."),
]


def tarjetas():
    out = []
    for num, titulo, chips, texto in TARJETAS:
        out.append(
            '<div style="background:var(--surface-card); border:1px solid var(--border-subtle); '
            'border-radius:var(--radius-xl); padding:var(--space-8); display:flex; '
            'flex-direction:column; gap:var(--space-4); box-shadow:var(--card-shadow)">'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-m); '
            'line-height:var(--lh-code-m); color:var(--text-accent)">' + num + '</span>'
            '<div style="font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
            'font-weight:700; text-wrap:pretty">' + titulo + '</div>'
            '<div style="display:flex; flex-wrap:wrap; gap:var(--space-2)">'
            + "".join(chip(c) for c in chips) + '</div>'
            '<p style="margin:0; font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
            'color:var(--text-secondary)">' + texto + '</p></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">' + "".join(out) + '</div>')


FUENTES = [
    ("Medio de motor · artículo comparativo", "Open Web", 82),
    ("YouTube · review de producto", "YouTube", 64),
    ("Respuestas de IA · consulta de compra", "LLM", 53),
    ("Medio generalista · sección de pruebas", "Open Web", 38),
]


def mapa():
    filas = []
    for nombre, canal, ancho in FUENTES:
        filas.append(
            '<div style="display:grid; grid-template-columns:3fr 2fr; gap:var(--space-6); '
            'align-items:center; padding:var(--space-4) 0; '
            'border-top:1px solid var(--border-subtle)">'
            '<div style="display:flex; flex-direction:column; gap:var(--space-1)">'
            '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
            'font-weight:600">' + nombre + '</span>'
            '<span style="' + MONO_LABEL + ' color:var(--text-tertiary)">' + canal + '</span></div>'
            '<div style="display:flex; align-items:center; gap:var(--space-4)">'
            '<div style="flex-grow:1; height:8px; border-radius:var(--radius-sm); '
            'background:var(--surface-sunken)">'
            '<div style="width:' + str(ancho) + '%; height:8px; '
            'border-radius:var(--radius-sm); background:var(--chart-1-gradient)"></div></div>'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-m); '
            'line-height:var(--lh-code-m); color:var(--text-secondary); '
            'font-variant-numeric:tabular-nums">[ --- ]%</span></div></div>')
    return (
        '<div style="margin-top:var(--space-12); background:var(--surface-card); '
        'border:1px solid var(--border-subtle); border-radius:var(--radius-lg); '
        'padding:var(--space-8); box-shadow:var(--card-shadow)">'
        '<div style="display:flex; align-items:baseline; justify-content:space-between; '
        'gap:var(--space-4); padding-bottom:var(--space-4)">'
        '<span style="' + MONO_LABEL + ' color:var(--text-secondary)">Mapa · vista de producto</span>'
        '<span style="' + MONO_LABEL + ' color:var(--text-tertiary)">Cuota de navegación</span></div>'
        + "".join(filas) +
        '<p style="margin:var(--space-6) 0 0; font-family:var(--font-mono); '
        'font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); color:var(--text-tertiary)">'
        'Fuentes de ejemplo. Cuotas pendientes de dato real.</p></div>')


CUADRANTES = [
    ("High intent · Low impact", ["SEO", "SEM (Google, Bing)"], False),
    ("High intent · High impact", ["Advia"], True),
    ("Low intent · Low impact", ["Retargeting", "Contextual semántica"], False),
    ("Low intent · High impact", ["Open Exchange", "Native Ads", "Social Ads"], False),
]


def cuadrante():
    celdas = []
    for titulo, items, destacado in CUADRANTES:
        if destacado:
            wrapper = ('background:var(--brand-graphite); border:1px solid var(--brand-graphite);')
            tl, il = 'color:var(--accent-gold);', 'color:var(--brand-ivory); font-weight:700;'
        else:
            wrapper = ('background:var(--surface-card); border:1px solid var(--border-subtle);')
            tl, il = 'color:var(--text-tertiary);', 'color:var(--text-secondary);'
        celdas.append(
            '<div style="' + wrapper + ' border-radius:var(--radius-lg); padding:var(--space-8); '
            'min-height:200px; display:flex; flex-direction:column; gap:var(--space-4)">'
            '<span style="' + MONO_LABEL + ' ' + tl + '">' + titulo + '</span>'
            '<div style="display:flex; flex-direction:column; gap:var(--space-2)">'
            + "".join('<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
                      + il + '">' + i + '</span>' for i in items)
            + '</div></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); '
            'gap:var(--space-4); margin-top:var(--space-12)">' + "".join(celdas) + '</div>')


def ciclo():
    def panel(label, titulo, items, dark):
        bg = 'var(--brand-graphite)' if dark else 'var(--surface-card)'
        bd = 'var(--brand-graphite)' if dark else 'var(--border-subtle)'
        lc = 'var(--accent-gold)' if dark else 'var(--text-accent)'
        tc = 'var(--brand-ivory)' if dark else 'var(--text-primary)'
        sc = 'var(--neutral-400)' if dark else 'var(--text-secondary)'
        filas = "".join(
            '<div style="display:flex; align-items:center; gap:var(--space-3); '
            'padding:var(--space-3) 0; border-top:1px solid ' +
            ('var(--border-on-graphite)' if dark else 'var(--border-subtle)') + '">'
            '<span style="width:6px; height:6px; border-radius:var(--radius-full); '
            'background:var(--accent-gold)"></span>'
            '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); color:'
            + sc + '">' + i + '</span></div>' for i in items)
        return ('<div style="background:' + bg + '; border:1px solid ' + bd + '; '
                'border-radius:var(--radius-xl); padding:var(--space-8)">'
                '<span style="' + MONO_LABEL + ' color:' + lc + '">' + label + '</span>'
                '<div style="margin:var(--space-3) 0 var(--space-4); '
                'font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
                'font-weight:700; color:' + tc + '">' + titulo + '</div>' + filas + '</div>')
    return ('<div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">'
            + panel("Antes · pre", "Forecast antes de invertir",
                    ["Forecast por KPI", "Top sites del recorrido", "Audience map"], False)
            + panel("Después · post", "El porqué de cada resultado",
                    ["Intent score", "Calidad de impacto", "Qué cambiar en la siguiente"], True)
            + '</div>')


BODY = """
<!-- ══════════════════════ 1 · HERO ══════════════════════ -->
<div class="sec" style="padding-top:120px; padding-bottom:104px">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">La máquina</div>
    <h1 style="margin:var(--space-6) 0 0; max-width:960px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty"><span style="color:var(--text-accent); font-weight:600">Vera</span>: miles de simulaciones de navegación con consumidores sintéticos.</h1>
    <p style="margin:var(--space-8) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">La pregunta que responde esta página: cómo se construye el mapa de la Navegación Activa.</p>
  </div>
</div>

<!-- ══════════════════════ 2-4 · EL BUILD DE LAS TRES TARJETAS ══════════════════════ -->
<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Cómo se construye</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:880px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Un rol, unas herramientas, y todo lo que hicieron por el <span style="color:var(--text-accent); font-weight:600">camino</span>.</h2>
    __TARJETAS__
    <p style="margin:var(--space-8) 0 0; font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); color:var(--text-tertiary)">Las tres tarjetas se construyen una a una con el scroll y se colapsan en el mapa. Este es el estado final, y el fallback estático para crawlers y LLMs.</p>
  </div>
</div>

<!-- ══════════════════════ 5 · EL MAPA ══════════════════════ -->
<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">El resultado</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:900px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Análisis predictivo y detallado de la navegación de tu target. Y, sobre todo, <span style="color:var(--text-accent); font-weight:600">comprable</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">El mapa se convierte en un inventario activable donde posicionar la marca: cada parada del recorrido es una fuente que se puede comprar.</p>
    __MAPA__
  </div>
</div>

<!-- ══════════════════════ 6 · EL CUADRANTE ══════════════════════ -->
<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Dónde encaja en un plan de medios</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:820px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Intención × impacto: Advia ocupa el cuadrante <span style="color:var(--text-accent); font-weight:600">vacío</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">El search llega con intención, pero con poco espacio para el impacto de marca. El display tiene impacto, pero llega sin intención detrás.</p>
    __CUADRANTE__
  </div>
</div>

<!-- ══════════════════════ 7 · ANTES Y DESPUÉS ══════════════════════ -->
<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Antes y después de la campaña</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:760px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Es un <span style="color:var(--text-accent); font-weight:600">ciclo</span>, no un informe.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Antes de invertir ves el forecast por KPI y las fuentes donde vas a aparecer. Después, el porqué de cada resultado y qué cambiar en la siguiente activación.</p>
    __CICLO__
  </div>
</div>

<!-- ══════════════════════ 8 · BRAND SAFETY ══════════════════════ -->
<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Brand safety por diseño</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:860px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">La seguridad es consecuencia del <span style="color:var(--text-accent); font-weight:600">método</span>, no una lista negra.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Los agentes solo navegan entornos relevantes al producto. Lo que no forma parte del recorrido de decisión no llega al mapa, así que tampoco llega al plan.</p>
    <div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:var(--space-6); margin-top:var(--space-12)">
      <div style="background:var(--surface-card); border:1px solid var(--border-default); border-radius:var(--radius-lg); padding:var(--space-8)">
        <span style="__ML__ color:var(--text-accent)">Entra en el mapa</span>
        <p style="margin:var(--space-3) 0 0; font-size:var(--fs-body-m); line-height:var(--lh-body-m); color:var(--text-secondary)">Los entornos que el agente visita de verdad al resolver su decisión de compra.</p>
      </div>
      <div style="background:var(--surface-sunken); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:var(--space-8)">
        <span style="__ML__ color:var(--text-tertiary)">No aparece</span>
        <p style="margin:var(--space-3) 0 0; font-size:var(--fs-body-m); line-height:var(--lh-body-m); color:var(--text-secondary)">Todo lo demás. No hace falta excluirlo: nunca estuvo en el recorrido.</p>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════ 9 · CTA ══════════════════════ -->
<div class="sec" style="background:var(--brand-graphite); padding-top:112px; padding-bottom:112px">
  <div class="wrap">
    <h2 style="margin:0; max-width:760px; font-size:var(--fs-heading); line-height:var(--lh-heading); font-weight:700; color:var(--brand-ivory); text-wrap:pretty">Ver <span style="color:var(--accent-gold)">Vera</span> en acción.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:620px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--neutral-400)">Te enseñamos el mapa de navegación de tu target sobre una categoría real, con las fuentes y el forecast por KPI.</p>
    <div style="display:flex; margin-top:var(--space-10)">
      <span style="background:var(--accent-gold); color:var(--text-on-gold); font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; padding:var(--space-4) var(--space-10); border-radius:var(--radius-pill)">Pedir una demo</span>
    </div>
  </div>
</div>
"""

body = (BODY
        .replace("__ML__", MONO_LABEL)
        .replace("__TARJETAS__", tarjetas())
        .replace("__MAPA__", mapa())
        .replace("__CUADRANTE__", cuadrante())
        .replace("__CICLO__", ciclo()))

print(_shell.write("Tecnologia.dc.html", "Tecnología", body))
