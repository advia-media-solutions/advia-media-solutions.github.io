"""Artboards /productos/geo y /nosotros."""
import _shell

ML = ('font-family:var(--font-mono); font-size:var(--fs-code-xs); '
      'line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase;')


def breadcrumb(hoja):
    return ('<div style="padding:var(--space-6) var(--web-section-pad-x) 0">'
            '<div class="wrap" style="display:flex; align-items:center; gap:var(--space-3)">'
            '<span style="' + ML + ' color:var(--text-tertiary)">Productos</span>'
            '<span style="' + ML + ' color:var(--border-gray)">/</span>'
            '<span style="' + ML + ' color:var(--text-secondary)">' + hoja + '</span>'
            '</div></div>')


def respuesta_ia():
    fuentes = "".join(
        '<span style="' + ML + ' color:var(--text-secondary); background:var(--surface-sunken); '
        'padding:var(--space-1) var(--space-3); border-radius:var(--radius-sm)">'
        'fuente ' + str(i + 1) + '</span>' for i in range(3))
    return (
        '<div style="margin-top:var(--space-12); background:var(--surface-card); '
        'border:1px solid var(--border-default); border-radius:var(--radius-xl); '
        'padding:var(--space-8); box-shadow:var(--card-shadow); max-width:760px">'
        '<span style="' + ML + ' color:var(--text-tertiary)">Simulación de respuesta generativa</span>'
        '<p style="margin:var(--space-4) 0 0; font-size:var(--fs-body-l); '
        'line-height:var(--lh-body-l); color:var(--text-primary)">Para ese uso, las opciones más '
        'recomendadas son <span style="color:var(--text-accent); font-weight:700">[tu marca]</span>, '
        'junto con otras dos alternativas del mismo segmento…</p>'
        '<div style="display:flex; gap:var(--space-2); margin-top:var(--space-6); '
        'padding-top:var(--space-4); border-top:1px solid var(--border-subtle)">'
        + fuentes + '</div></div>')


def tres_medios():
    items = [
        ("TV", "Te da visibilidad, pero le da igual el momento."),
        ("Search", "Llega cuando ya has decidido."),
        ("Motores generativos", "Abren un espacio nuevo: visibilidad dentro de la decisión."),
    ]
    out = []
    for i, (nombre, desc) in enumerate(items):
        dest = i == 2
        out.append(
            '<div style="background:' + ('var(--gold-veil)' if dest else 'var(--surface-on-graphite)')
            + '; border:1px solid ' + ('var(--accent-gold)' if dest else 'var(--border-on-graphite-strong)')
            + '; border-radius:var(--radius-lg); padding:var(--space-8)">'
            '<div style="font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
            'font-weight:700; color:' + ('var(--accent-gold)' if dest else 'var(--brand-ivory)')
            + '">' + nombre + '</div>'
            '<p style="margin:var(--space-3) 0 0; font-size:var(--fs-body-m); '
            'line-height:var(--lh-body-m); color:var(--neutral-400)">' + desc + '</p></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-4); margin-top:var(--space-12)">' + "".join(out) + '</div>')


def loop():
    pasos = [("Medimos", "Cómo apareces hoy en las respuestas"),
             ("Diseñamos", "En qué factores merece la pena pelear"),
             ("Creamos", "El contenido que la IA cita")]
    dots = "".join(
        '<div style="width:18px; height:18px; border-radius:var(--radius-full); '
        'background:var(--accent-gold); box-shadow:0 0 0 6px var(--gold-crema)"></div>'
        for _ in pasos)
    labels = "".join(
        '<div style="display:flex; flex-direction:column; gap:var(--space-2)">'
        '<span style="font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
        'font-weight:700">' + n + '</span>'
        '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
        'color:var(--text-secondary)">' + d + '</span></div>' for n, d in pasos)
    return (
        '<div style="margin-top:var(--space-16); position:relative; padding-top:var(--space-2)">'
        '<div style="position:absolute; left:9px; right:9px; top:17px; height:1px; '
        'background:var(--border-default)"></div>'
        '<div style="position:relative; display:grid; '
        'grid-template-columns:repeat(3, minmax(0, 1fr)); gap:var(--space-8)">' + dots + '</div></div>'
        '<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
        'gap:var(--space-8); margin-top:var(--space-5)">' + labels + '</div>'
        '<div style="margin-top:var(--space-8); background:var(--surface-sunken); '
        'border-left:4px solid var(--accent-gold); '
        'border-radius:0 var(--radius-xl) var(--radius-xl) 0; padding:var(--space-5) var(--space-6)">'
        '<p style="margin:0; font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
        'color:var(--text-secondary)">Y volvemos a medir. El ciclo se cierra sobre sí mismo: cada '
        'pieza publicada cambia lo que el modelo cita, y esa variación es la que medimos en la '
        'vuelta siguiente.</p></div>')


def share_of_answer():
    filas = []
    for nombre, ancho, destacado in [("Tu marca", 46, True),
                                     ("Competidor A", 68, False),
                                     ("Competidor B", 31, False)]:
        fill = ('var(--chart-1-gradient)' if destacado else 'var(--series-primary)')
        filas.append(
            '<div style="display:grid; grid-template-columns:3fr 2fr; gap:var(--space-6); '
            'align-items:center; padding:var(--space-4) 0; '
            'border-top:1px solid var(--border-subtle)">'
            '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); font-weight:'
            + ('700' if destacado else '400') + '">' + nombre + '</span>'
            '<div style="display:flex; align-items:center; gap:var(--space-4)">'
            '<div style="flex-grow:1; height:10px; border-radius:var(--radius-sm); '
            'background:var(--surface-sunken)">'
            '<div style="width:' + str(ancho) + '%; height:10px; '
            'border-radius:var(--radius-sm); background:' + fill + '"></div></div>'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-m); '
            'line-height:var(--lh-code-m); color:var(--text-secondary); '
            'font-variant-numeric:tabular-nums">[ --- ]%</span></div></div>')
    return ('<div style="margin-top:var(--space-12); background:var(--surface-card); '
            'border:1px solid var(--border-subtle); border-radius:var(--radius-lg); '
            'padding:var(--space-8); box-shadow:var(--card-shadow)">'
            '<span style="' + ML + ' color:var(--text-secondary)">Share of Answer</span>'
            + "".join(filas) +
            '<p style="margin:var(--space-6) 0 0; font-family:var(--font-mono); '
            'font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); '
            'color:var(--text-tertiary)">Reparto ilustrativo. Cuotas pendientes de dato real.</p>'
            '</div>')


def estanterias():
    items = [("Editorial", 88), ("Social", 66), ("Owned", 24),
             ("Multimedia", 72), ("Autoritario", 80)]
    out = []
    for nombre, alto in items:
        destacado = nombre == "Owned"
        out.append(
            '<div style="display:flex; flex-direction:column; justify-content:flex-end; '
            'gap:var(--space-3); height:260px">'
            '<div style="height:' + str(int(alto * 2.2)) + 'px; border-radius:var(--radius-md); '
            'background:' + ('var(--chart-1-gradient)' if destacado else 'var(--series-primary)')
            + '"></div>'
            '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
            'font-weight:' + ('700' if destacado else '400') + '; color:'
            + ('var(--text-accent)' if destacado else 'var(--text-primary)') + '">'
            + nombre + '</span>'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-m); '
            'line-height:var(--lh-code-m); color:var(--text-secondary)">[ --- ]%</span></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(5, minmax(0, 1fr)); '
            'gap:var(--space-5); margin-top:var(--space-12); align-items:end">'
            + "".join(out) + '</div>'
            '<p style="margin:var(--space-6) 0 0; font-family:var(--font-mono); '
            'font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); '
            'color:var(--text-tertiary)">Proporción ilustrativa. El reparto real de fuentes '
            'citadas se mide por categoría y pende de dato real.</p>')


GEO_BODY = """
__BREADCRUMB__
<div class="sec" style="padding-top:var(--space-10); padding-bottom:104px">
  <div class="wrap">
    <h1 style="margin:0; max-width:920px; font-size:var(--fs-display-xl); line-height:var(--lh-display-xl); font-weight:400; text-wrap:pretty">Tu marca en la <span style="color:var(--text-accent)">respuesta</span> de la IA.</h1>
    <p style="margin:var(--space-8) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Cuando alguien pregunta por tu categoría, el modelo responde con un puñado de marcas y unas cuantas fuentes. Trabajamos para que estés entre ellas.</p>
    __RESPUESTA__
  </div>
</div>

<div class="sec" style="background:var(--brand-graphite)">
  <div class="wrap">
    <div style="__ML__ color:var(--neutral-500)">Visibilidad Intencional</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:920px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; color:var(--brand-ivory); text-wrap:pretty">La visibilidad de la TV, exactamente en el momento en que alguien <span style="color:var(--accent-gold); font-weight:600">decide</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--neutral-400)">A eso lo llamamos Visibilidad Intencional.</p>
    __TRES__
    <div style="margin-top:var(--space-12); max-width:820px">
      <p style="margin:0; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--brand-ivory)">«Millones de nuevos prescriptores ultrainformados… y no puedes llamarles para pedirles que corrijan su mensaje.»</p>
      <div style="margin-top:var(--space-4); __ML__ color:var(--neutral-500)">Blog · Introducción a la Navegación Activa, III</div>
    </div>
  </div>
</div>

<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">El paquete completo</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:940px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">No vendemos un dashboard: cerramos el <span style="color:var(--text-accent); font-weight:600">ciclo</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Medimos cómo estás, diseñamos la estrategia y creamos el contenido que mueve la aguja.</p>
    __LOOP__
  </div>
</div>

<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Medimos</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:820px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Del Share of Search al <span style="color:var(--text-accent); font-weight:600">Share of Answer</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Qué pasa con tu marca en la IA hoy: cuánto apareces, en qué posición, frente a quién y por qué factores.</p>
    __SOA__
  </div>
</div>

<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Diseñamos la estrategia</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:900px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Medir no mueve nada. Decidimos <span style="color:var(--text-accent); font-weight:600">en qué factores merece la pena pelear</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Entendemos por qué tu presencia es la que es, factor a factor, y elegimos dónde concentrar el esfuerzo. No hace falta salir primero en todo.</p>
  </div>
</div>

<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">GEO va más allá del SEO</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:900px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Solo una fracción pequeña de las fuentes que cita la IA son de tu web. Hacen falta las <span style="color:var(--text-accent); font-weight:600">cinco estanterías</span>.</h2>
    __ESTANTERIAS__
  </div>
</div>

<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Creamos el contenido</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:760px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">El <span style="color:var(--text-accent); font-weight:600">loop</span> es el producto.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">AI-Readable Content: contenido editorial diseñado para que los modelos lo citen, publicado donde la IA se informa. Después volvemos a medir, y el reparto de fuentes dice si funcionó.</p>
    <p style="margin:var(--space-8) 0 0; font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); color:var(--text-tertiary)">Nomenclatura a unificar antes de publicar: AI-Readable vs. AI-Friendly Content.</p>
  </div>
</div>

<div class="sec" style="background:var(--brand-graphite); padding-top:112px; padding-bottom:112px">
  <div class="wrap">
    <h2 style="margin:0; max-width:820px; font-size:var(--fs-heading); line-height:var(--lh-heading); font-weight:700; color:var(--brand-ivory); text-wrap:pretty">Pide un análisis de tu <span style="color:var(--accent-gold)">visibilidad en IA</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:620px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--neutral-400)">Te enseñamos cuánto apareces hoy en las respuestas de tu categoría, frente a quién y por qué factores.</p>
    <div style="display:flex; margin-top:var(--space-10)">
      <span style="background:var(--accent-gold); color:var(--text-on-gold); font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; padding:var(--space-4) var(--space-10); border-radius:var(--radius-pill)">Pedir el análisis</span>
    </div>
  </div>
</div>
"""

geo = (GEO_BODY
       .replace("__BREADCRUMB__", breadcrumb("Visibilidad Intencional en IA: GEO"))
       .replace("__ML__", ML)
       .replace("__RESPUESTA__", respuesta_ia())
       .replace("__TRES__", tres_medios())
       .replace("__LOOP__", loop())
       .replace("__SOA__", share_of_answer())
       .replace("__ESTANTERIAS__", estanterias()))

print(_shell.write("Geo.dc.html", "Productos", geo))


# ───────────────────────────── /nosotros ─────────────────────────────
def equipo():
    cards = []
    for valor, label, desc in [
            ("12", "Personas", "El equipo hoy."),
            ("3", "Áreas", "Cada una liderada por un fundador."),
            ("[ --- ]", "Mercados", "Pendiente de dato real.")]:
        cards.append(
            '<div style="background:var(--surface-card); border:1px solid var(--border-subtle); '
            'border-radius:var(--radius-kpi); padding:var(--space-8)">'
            '<div style="font-family:var(--font-mono); font-size:var(--fs-kpi); '
            'line-height:var(--lh-kpi); color:var(--text-accent); '
            'font-variant-numeric:tabular-nums">' + valor + '</div>'
            '<div style="margin-top:var(--space-2); ' + ML + ' color:var(--text-secondary)">'
            + label + '</div>'
            '<p style="margin:var(--space-3) 0 0; font-size:var(--fs-body-m); '
            'line-height:var(--lh-body-m); color:var(--text-secondary)">' + desc + '</p></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">' + "".join(cards) + '</div>')


def valores():
    vals = ["#WorkHardPlayHard", "#Superhuman", "#RightOverEasy", "#Imagine", "#WinAsOne"]
    return ('<div style="display:flex; flex-wrap:wrap; gap:var(--space-3); '
            'margin-top:var(--space-12)">'
            + "".join(
                '<span style="font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
                'font-weight:700; color:var(--text-primary); background:var(--surface-card); '
                'border:1px solid var(--border-subtle); padding:var(--space-4) var(--space-6); '
                'border-radius:var(--radius-pill)">' + v + '</span>' for v in vals)
            + '</div>')


def clientes():
    filas = "".join(
        '<div style="display:flex; align-items:center; justify-content:space-between; '
        'gap:var(--space-4); padding:var(--space-4) 0; border-top:1px solid var(--border-subtle)">'
        '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
        'color:var(--text-secondary)">' + n + '</span>'
        '<span style="font-family:var(--font-mono); font-size:var(--fs-code-m); '
        'line-height:var(--lh-code-m); color:var(--text-tertiary)">[ --- ]</span></div>'
        for n in ["Grupos de agencias", "Sectores donde estamos", "Mercados activos"])
    return ('<div style="margin-top:var(--space-12); max-width:720px">' + filas +
            '<p style="margin:var(--space-6) 0 0; font-family:var(--font-mono); '
            'font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); '
            'color:var(--text-tertiary)">Nombres solo con permiso verificado. Por defecto, '
            'agregados y anónimos.</p></div>')


NOS_BODY = """
<div class="sec" style="padding-top:120px; padding-bottom:104px">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Nosotros</div>
    <h1 style="margin:var(--space-6) 0 0; max-width:960px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Estábamos convencidos de que la publicidad digital podía <span style="color:var(--text-accent); font-weight:600">ser mejor</span>.</h1>
    <p style="margin:var(--space-8) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Veníamos de hacerla desde dentro, y empezamos incómodos con cómo se planificaba.</p>
  </div>
</div>

<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Por qué existe Advia</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:940px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Casi toda campaña se piensa desde el lado del anunciante. Fundamos Advia para trabajar desde el lado de su <span style="color:var(--text-accent); font-weight:600">consumidor</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Es lógico: el anunciante es quien paga. Pero el impacto lo recibe otra persona, que en ese momento estaba haciendo algo. Cambiar de lado cambia qué se planifica, y de ahí sale <em style="font-style:normal; color:var(--text-primary)">Turning ads into answers</em>.</p>
  </div>
</div>

<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">De dónde venimos</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:880px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Conocemos el ciclo de una campaña <span style="color:var(--text-accent); font-weight:600">desde dentro</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Tres fundadores con recorrido en Seedtag y GroupM: el lado del medio y el lado de la agencia, que es donde se ve qué se rompe entre el plan y el resultado.</p>
    __EQUIPO__
  </div>
</div>

<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Con quién trabajamos</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:820px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Los grandes grupos de agencias, y los sectores donde <span style="color:var(--text-accent); font-weight:600">estamos</span>.</h2>
    __CLIENTES__
  </div>
</div>

<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="__ML__ color:var(--text-secondary)">Valores</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:820px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Cinco cosas que decidimos <span style="color:var(--text-accent); font-weight:600">antes</span> de contratar a nadie.</h2>
    __VALORES__
  </div>
</div>

<div class="sec" style="background:var(--brand-graphite); padding-top:112px; padding-bottom:112px">
  <div class="wrap">
    <h2 style="margin:0; max-width:760px; font-size:var(--fs-heading); line-height:var(--lh-heading); font-weight:700; color:var(--brand-ivory); text-wrap:pretty">Cómo trabajamos, y a quién <span style="color:var(--accent-gold)">buscamos</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:620px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--neutral-400)">Si te interesa el problema que estamos resolviendo, escríbenos aunque no haya una vacante abierta con tu nombre.</p>
    <div style="display:flex; margin-top:var(--space-10)">
      <span style="background:var(--accent-gold); color:var(--text-on-gold); font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; padding:var(--space-4) var(--space-10); border-radius:var(--radius-pill)">Únete al equipo</span>
    </div>
  </div>
</div>
"""

nos = (NOS_BODY
       .replace("__ML__", ML)
       .replace("__EQUIPO__", equipo())
       .replace("__CLIENTES__", clientes())
       .replace("__VALORES__", valores()))

print(_shell.write("Nosotros.dc.html", "Nosotros", nos))
