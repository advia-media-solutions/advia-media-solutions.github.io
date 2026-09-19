"""Home · dirección A+ (Instrumento) con el mensaje reencuadrado en la respuesta."""
import re
import _shell

ML = ('font-family:var(--font-mono); font-size:var(--fs-code-xs); '
      'line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase;')
ARROW = ('<svg class="icon" viewBox="0 -960 960 960" aria-hidden="true">'
         '<path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z"/></svg>')
PADX = 'padding-left:var(--web-section-pad-x); padding-right:var(--web-section-pad-x);'

LOGO_LIGHT = re.search(r'<svg width="106"[\s\S]*?</svg>', _shell.FOOTER).group(0)


def door(text, gold="var(--text-accent)"):
    return ('<span style="display:inline-flex; align-items:center; gap:var(--space-2); color:'
            + gold + '; font-size:var(--fs-button); line-height:var(--lh-button); '
            'font-weight:700">' + text + ARROW + '</span>')


def nav_oscura():
    links = "".join(
        '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
        'color:var(--neutral-400)">' + i + '</span>'
        for i in ["Navegación Activa", "Tecnología", "Productos", "Nosotros", "Blog"])
    return ('<div style="position:relative; z-index:2; border-bottom:1px solid '
            'var(--border-on-graphite)">'
            '<div style="max-width:var(--web-content-width); margin:0 auto; ' + PADX +
            ' height:76px; display:flex; align-items:center; justify-content:space-between; '
            'gap:var(--space-8)">' + LOGO_LIGHT +
            '<div style="display:flex; align-items:center; gap:var(--space-6)">' + links +
            '<span style="background:var(--accent-gold); color:var(--text-on-gold); '
            'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
            'padding:var(--space-3) var(--space-6); border-radius:var(--radius-pill)">Hablemos'
            '</span></div></div></div>')


def trama():
    """Retícula de líneas finas: textura de instrumento, no decoración."""
    lineas = "".join(
        '<line x1="%d" y1="0" x2="%d" y2="1200" style="stroke:var(--brand-ivory); '
        'stroke-width:1; opacity:.05" />' % (x, x) for x in range(80, 1440, 80))
    return ('<svg viewBox="0 0 1440 1200" width="100%" height="100%" '
            'preserveAspectRatio="none" aria-hidden="true">' + lineas + '</svg>')


PREGUNTAS = [
    ("¿qué SUV híbrido rinde mejor en ciudad?", True),
    ("auriculares para correr que aguanten la lluvia", False),
    ("¿me compensa cambiar de tarifa este año?", False),
    ("seguro de coche para conductor novel", True),
    ("¿qué portátil aguanta edición de vídeo?", False),
    ("opiniones de quien ya lo tiene", False),
]


def banda_preguntas():
    chips = []
    for texto, dest in PREGUNTAS:
        chips.append(
            '<span style="display:inline-flex; align-items:center; gap:var(--space-3); '
            'font-family:var(--font-mono); font-size:var(--fs-code-m); '
            'line-height:var(--lh-code-m); color:'
            + ('var(--brand-ivory)' if dest else 'var(--neutral-500)') +
            '; border:1px solid ' + ('var(--accent-gold)' if dest
                                     else 'var(--border-on-graphite-strong)') +
            '; padding:var(--space-2) var(--space-5); border-radius:var(--radius-pill)">'
            + ('<span style="width:6px; height:6px; border-radius:var(--radius-full); '
               'background:var(--accent-gold)"></span>' if dest else '')
            + texto + '</span>')
    return ('<div style="position:relative; z-index:2; margin-top:var(--space-20); '
            'border-top:1px solid var(--border-on-graphite); '
            'background:var(--surface-on-graphite)">'
            '<div style="max-width:var(--web-content-width); margin:0 auto; ' + PADX +
            ' padding-top:var(--space-8); padding-bottom:var(--space-8)">'
            '<span style="' + ML + ' color:var(--neutral-500)">Lo que se pregunta antes de decidir</span>'
            '<div style="display:flex; flex-wrap:wrap; gap:var(--space-3); '
            'margin-top:var(--space-5)">' + "".join(chips) + '</div>'
            '<p style="margin:var(--space-5) 0 0; ' + ML + ' color:var(--neutral-500)">'
            'Preguntas ilustrativas de un recorrido de decisión real.</p></div></div>')


def panel_momento():
    def fila(label, titulo, texto, dest):
        return ('<div style="padding:var(--space-6) 0; border-top:1px solid var(--border-subtle)">'
                '<span style="' + ML + ' color:'
                + ('var(--text-accent)' if dest else 'var(--text-tertiary)') + '">'
                + label + '</span>'
                '<div style="margin:var(--space-2) 0 var(--space-2); '
                'font-size:var(--fs-body-m); line-height:var(--lh-body-m); font-weight:700">'
                + titulo + '</div>'
                '<p style="margin:0; font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
                'color:var(--text-secondary)">' + texto + '</p></div>')
    return ('<div style="background:var(--surface-inset); border:1px solid var(--border-subtle); '
            'border-radius:var(--radius-2xl); padding:var(--space-4) var(--space-8) var(--space-8)">'
            + fila("Navegación pasiva", "Elige el algoritmo",
                   "El contenido llega solo. No había pregunta, así que no hay nada que responder.",
                   False)
            + fila("Navegación activa", "Eliges tú",
                   "Hay una duda concreta y una búsqueda detrás. Aquí una marca puede servir de algo.",
                   True) + '</div>')


PASOS = [
    ("Perfil", "Sociodemo, interés y contexto de decisión: eso dirige toda su navegación."),
    ("Herramientas", "Buscadores, plataformas y LLMs. Cada agente busca como buscaría su perfil real."),
    ("Touchpoints", "Recogemos el recorrido entero y cualificamos cada parada."),
]


def pasos_vera():
    filas = []
    for i, (titulo, texto) in enumerate(PASOS):
        filas.append(
            '<div style="display:grid; grid-template-columns:auto 1fr; gap:var(--space-5); '
            'padding-bottom:var(--space-8)">'
            '<div style="display:flex; flex-direction:column; align-items:center; gap:var(--space-2)">'
            '<span style="width:14px; height:14px; border-radius:var(--radius-full); '
            'background:var(--accent-gold)"></span>'
            + ('<span style="flex-grow:1; width:1px; background:var(--border-on-graphite-strong)">'
               '</span>' if i < len(PASOS) - 1 else '') + '</div>'
            '<div style="padding-top:0">'
            '<div style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
            'font-weight:700; color:var(--brand-ivory)">' + titulo + '</div>'
            '<p style="margin:var(--space-2) 0 0; font-size:var(--fs-body-m); '
            'line-height:var(--lh-body-m); color:var(--neutral-400)">' + texto + '</p></div></div>')
    return "".join(filas)


def panel_mapa():
    filas = []
    for nombre, canal, ancho in [("Medio de motor · comparativa", "Open Web", 82),
                                 ("YouTube · review de producto", "Vídeo", 64),
                                 ("Respuestas de IA · consulta de compra", "LLM", 53),
                                 ("Medio generalista · sección de pruebas", "Open Web", 38)]:
        filas.append(
            '<div style="display:flex; flex-direction:column; gap:var(--space-2); '
            'padding:var(--space-4) 0; border-top:1px solid var(--border-on-graphite)">'
            '<div style="display:flex; align-items:baseline; justify-content:space-between; '
            'gap:var(--space-4)">'
            '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
            'color:var(--brand-ivory)">' + nombre + '</span>'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-m); '
            'line-height:var(--lh-code-m); color:var(--neutral-400)">[ --- ]%</span></div>'
            '<div style="display:flex; align-items:center; gap:var(--space-3)">'
            '<div style="flex-grow:1; height:6px; border-radius:var(--radius-sm); '
            'background:var(--surface-on-graphite)">'
            '<div style="width:' + str(ancho) + '%; height:6px; border-radius:var(--radius-sm); '
            'background:var(--chart-1-gradient)"></div></div>'
            '<span style="' + ML + ' color:var(--neutral-500)">' + canal + '</span></div></div>')
    return ('<div style="background:var(--surface-on-graphite); '
            'border:1px solid var(--border-on-graphite-strong); '
            'border-radius:var(--radius-2xl); padding:var(--space-8)">'
            '<div style="display:flex; align-items:baseline; justify-content:space-between; '
            'gap:var(--space-4); padding-bottom:var(--space-4)">'
            '<span style="' + ML + ' color:var(--accent-gold)">Dónde va a preguntar</span>'
            '<span style="' + ML + ' color:var(--neutral-500)">Cuota del recorrido</span></div>'
            + "".join(filas) +
            '<p style="margin:var(--space-6) 0 0; ' + ML + ' color:var(--neutral-500)">'
            'Fuentes de ejemplo. Cuotas pendientes de dato real.</p></div>')


SUPERFICIES = [
    ("01", "Buscador", "Compara opciones y descarta candidatos.",
     "Un contenido que resuelve la duda", "GEO"),
    ("02", "Web abierta", "Lee análisis, pruebas y comparativas.",
     "Un anuncio dentro del artículo que ya estaba leyendo", "Paid Media"),
    ("03", "Vídeo", "Busca la review larga antes de cerrar.",
     "Tu marca en el momento en que se decide", "Paid Media"),
    ("04", "Respuesta de la IA", "Pregunta directamente qué le conviene.",
     "Una cita del modelo entre las marcas que recomienda", "GEO"),
]


def superficies():
    filas = []
    for num, sitio, que, forma, producto in SUPERFICIES:
        filas.append(
            '<div style="display:grid; grid-template-columns:auto 3fr 4fr auto; '
            'gap:var(--space-8); align-items:center; padding:var(--space-6) 0; '
            'border-top:1px solid var(--border-subtle)">'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-m); '
            'line-height:var(--lh-code-m); color:var(--text-accent)">' + num + '</span>'
            '<div>'
            '<div style="font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
            'font-weight:700">' + sitio + '</div>'
            '<p style="margin:var(--space-1) 0 0; font-size:var(--fs-body-m); '
            'line-height:var(--lh-body-m); color:var(--text-secondary)">' + que + '</p></div>'
            '<div style="border-left:2px solid var(--accent-gold); padding-left:var(--space-5)">'
            '<span style="' + ML + ' color:var(--text-tertiary)">La respuesta toma la forma de</span>'
            '<p style="margin:var(--space-2) 0 0; font-size:var(--fs-body-l); '
            'line-height:var(--lh-body-l); color:var(--text-primary)">' + forma + '</p></div>'
            '<span style="' + ML + ' color:var(--text-secondary); background:var(--surface-sunken); '
            'padding:var(--space-2) var(--space-4); border-radius:var(--radius-sm)">'
            + producto + '</span></div>')
    return "".join(filas)


def bloques_producto():
    def bloque(label, titulo, texto, oscuro):
        bg = 'var(--brand-graphite)' if oscuro else 'var(--surface-card)'
        bd = 'var(--brand-graphite)' if oscuro else 'var(--border-default)'
        tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
        sc = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
        lc = 'var(--accent-gold)' if oscuro else 'var(--text-secondary)'
        return ('<div style="background:' + bg + '; border:1px solid ' + bd + '; '
                'border-radius:var(--radius-2xl); padding:var(--space-10); display:flex; '
                'flex-direction:column; gap:var(--space-4)">'
                '<span style="' + ML + ' color:' + lc + '">' + label + '</span>'
                '<div style="font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
                'font-weight:700; color:' + tc + '; text-wrap:pretty">' + titulo + '</div>'
                '<p style="margin:0; flex-grow:1; font-size:var(--fs-body-m); '
                'line-height:var(--lh-body-m); color:' + sc + '">' + texto + '</p>'
                + door("Ver el producto", "var(--accent-gold)") + '</div>')
    return ('<div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">'
            + bloque("Donde la respuesta se compra", "Navegación Activa en Paid Media",
                     "Hay inventario en esa parada, así que se puja por él: campañas en Open Web "
                     "y YouTube colocadas sobre las fuentes del recorrido.", False)
            + bloque("Donde la respuesta se fabrica", "Visibilidad Intencional en IA: GEO",
                     "No hay inventario que comprar: la única vía es ser la fuente que el modelo "
                     "cita. Medimos, decidimos dónde pelear y creamos ese contenido.", True)
            + '</div>')


BODY = (
    # ═══════════════ 1 · HERO ═══════════════
    '<div style="position:relative; background:var(--brand-graphite); overflow:hidden">'
    '<div style="position:absolute; top:0; left:0; right:0; bottom:0; '
    'background:radial-gradient(70% 60% at 12% 0%, var(--gold-veil) 0%, transparent 70%)"></div>'
    '<div style="position:absolute; top:0; left:0; right:0; bottom:0">' + trama() + '</div>'
    + nav_oscura() +
    '<div style="position:relative; z-index:2; max-width:var(--web-content-width); '
    'margin:0 auto; ' + PADX + ' padding-top:var(--space-20); padding-bottom:0">'
    '<div style="' + ML + ' color:var(--accent-gold)">Advia · Navegación Activa</div>'
    '<h1 style="margin:var(--space-8) 0 0; max-width:1000px; font-size:var(--fs-display-xl); '
    'line-height:var(--lh-display-xl); font-weight:400; color:var(--brand-ivory); '
    'text-wrap:pretty">Turning ads into <span style="color:var(--accent-gold)">answers</span>.</h1>'
    '<p style="margin:var(--space-8) 0 0; max-width:660px; font-size:var(--fs-body-l); '
    'line-height:var(--lh-body-l); color:var(--neutral-400)">Cuando alguien busca para decidir, '
    'hay una respuesta que le sirve. Trabajamos para que sea la de tu marca, y para que llegue '
    'con la forma que admite ese momento.</p>'
    '<div style="display:flex; gap:var(--space-4); margin-top:var(--space-10)">'
    '<span style="background:var(--accent-gold); color:var(--text-on-gold); '
    'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
    'padding:var(--space-4) var(--space-8); border-radius:var(--radius-pill)">'
    'Cuéntanos tu objetivo</span>'
    '<span style="border:1px solid var(--border-on-graphite-strong); color:var(--brand-ivory); '
    'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
    'padding:var(--space-4) var(--space-8); border-radius:var(--radius-pill)">'
    'Por qué existe Advia</span></div></div>'
    + banda_preguntas() + '</div>'

    # ═══════════════ 2 · EL MOMENTO ═══════════════
    '<div class="sec">'
    '<div class="wrap" style="display:grid; grid-template-columns:3fr 2fr; '
    'gap:var(--space-16); align-items:center">'
    '<div>'
    '<div style="' + ML + ' color:var(--text-secondary)">El momento</div>'
    '<h2 style="margin:var(--space-5) 0 0; font-size:var(--fs-display-l); '
    'line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Una marca aporta valor '
    'cuando responde a lo que alguien está <span style="color:var(--text-accent); '
    'font-weight:600">buscando</span>.</h2>'
    '<p style="margin:var(--space-6) 0 var(--space-8); font-size:var(--fs-body-l); '
    'line-height:var(--lh-body-l); color:var(--text-secondary)">A ese momento lo llamamos '
    'Navegación Activa. Es el único en el que una marca puede dejar de interrumpir y empezar a '
    'servir de algo.</p>'
    + door("Qué es la Navegación Activa") + '</div>'
    + panel_momento() + '</div></div>'

    # ═══════════════ 3 · VERA ═══════════════
    '<div class="sec" style="background:var(--brand-graphite)">'
    '<div class="wrap">'
    '<div style="' + ML + ' color:var(--neutral-500)">La máquina</div>'
    '<h2 style="margin:var(--space-5) 0 0; max-width:900px; font-size:var(--fs-display-l); '
    'line-height:var(--lh-display-l); font-weight:300; color:var(--brand-ivory); '
    'text-wrap:pretty">Vera sabe qué va a preguntar tu consumidor, y '
    '<span style="color:var(--accent-gold); font-weight:600">dónde</span>.</h2>'
    '<p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); '
    'line-height:var(--lh-body-l); color:var(--neutral-400)">Miles de consumidores simulados '
    'recorren la decisión antes que él. No adivinamos intenciones: observamos recorridos y los '
    'cualificamos parada a parada.</p>'
    '<div style="display:grid; grid-template-columns:2fr 3fr; gap:var(--space-16); '
    'margin-top:var(--space-16); align-items:start">'
    '<div>' + pasos_vera() + '<div style="margin-top:var(--space-2)">'
    + door("Cómo funciona Vera", "var(--accent-gold)") + '</div></div>'
    + panel_mapa() + '</div></div></div>'

    # ═══════════════ 4 · LAS RESPUESTAS ═══════════════
    '<div class="sec">'
    '<div class="wrap">'
    '<div style="' + ML + ' color:var(--text-secondary)">Las respuestas</div>'
    '<h2 style="margin:var(--space-5) 0 0; max-width:900px; font-size:var(--fs-display-l); '
    'line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">La respuesta que busca '
    'no siempre tiene la misma <span style="color:var(--text-accent); font-weight:600">forma</span>.</h2>'
    '<p style="margin:var(--space-6) 0 var(--space-16); max-width:720px; '
    'font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">'
    'La misma persona pregunta en cuatro sitios distintos, y cada uno admite una forma de '
    'respuesta. Nuestro trabajo es que en los cuatro haya una tuya.</p>'
    + superficies() +
    '<p style="margin:var(--space-16) 0 0; max-width:720px; font-size:var(--fs-body-l); '
    'line-height:var(--lh-body-l); color:var(--text-secondary)">Donde hay inventario, la presencia '
    'se compra. Donde no lo hay, se fabrica. Por eso hay dos productos y no uno.</p>'
    + bloques_producto() + '</div></div>'

    # ═══════════════ 5 · CIERRE ═══════════════
    '<div class="sec" style="background:var(--brand-graphite); padding-top:112px; '
    'padding-bottom:112px">'
    '<div class="wrap">'
    '<h2 style="margin:0; max-width:940px; font-size:var(--fs-heading); '
    'line-height:var(--lh-heading); font-weight:700; color:var(--brand-ivory); '
    'text-wrap:pretty">Cuéntanos tu objetivo y te enseñamos qué está preguntando tu consumidor, y '
    '<span style="color:var(--accent-gold)">dónde puedes responderle</span>.</h2>'
    '<p style="margin:var(--space-6) 0 0; max-width:660px; font-size:var(--fs-body-l); '
    'line-height:var(--lh-body-l); color:var(--neutral-400)">Antes de activar nada. Y después no '
    'nos vamos: activamos, medimos qué cambió y decidimos la siguiente.</p>'
    '<div style="display:flex; margin-top:var(--space-10)">'
    '<span style="background:var(--accent-gold); color:var(--text-on-gold); '
    'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
    'padding:var(--space-4) var(--space-10); border-radius:var(--radius-pill)">'
    'Pedir una precampaña</span></div></div></div>')

html = _shell.HEAD + _shell.HELMET + "\n\n" + BODY + _shell.FOOTER + _shell.TAIL
open("Main.dc.html", "w", encoding="utf-8").write(html)
print("escrito Main.dc.html — home A+ con el mensaje reencuadrado")
