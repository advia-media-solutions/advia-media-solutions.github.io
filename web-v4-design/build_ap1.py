"""A+ · /navegacion-activa y /tecnologia."""
import _ap as k

ML, B_L, B_M, B_S, SUB, KPI, MONO = k.ML, k.BODY_L, k.BODY_M, k.BODY_S, k.SUB, k.KPI, k.MONO_M


# ═══════════════════════ /navegacion-activa ═══════════════════════
def contraste_hero():
    def col(label, titulo, texto, dest):
        return ('<div style="flex-grow:1; padding-left:var(--space-6); border-left:2px solid '
                + ('var(--accent-gold)' if dest else 'var(--border-on-graphite-strong)') + '">'
                '<span style="' + ML + ' color:'
                + ('var(--accent-gold)' if dest else 'var(--neutral-500)') + '">' + label + '</span>'
                '<div style="margin:var(--space-3) 0 var(--space-2); ' + SUB +
                ' color:var(--brand-ivory)">' + titulo + '</div>'
                '<p style="margin:0; max-width:420px; ' + B_M + ' color:var(--neutral-400)">'
                + texto + '</p></div>')
    return ('<div style="display:flex; gap:var(--space-12)">'
            + col("Pasiva", "Te entretienen",
                  "El algoritmo elige qué ves. No había una pregunta, así que no hay nada que "
                  "responder.", False)
            + col("Activa", "Buscas algo",
                  "Hay una duda concreta detrás. Existe una respuesta que te sirve, y puede ser "
                  "de una marca.", True) + '</div>')


def placeholder(caption):
    return ('<div style="background:var(--surface-sunken); border:1px dashed var(--border-default); '
            'border-radius:var(--radius-lg); height:200px; display:flex; align-items:center; '
            'justify-content:center; padding:var(--space-6)">'
            '<span style="' + ML + ' color:var(--text-tertiary); text-align:center">'
            + caption + '</span></div>')


def constelacion():
    stops = [(120, 250), (300, 90), (470, 300), (640, 140), (810, 260), (980, 110)]
    routes, seed = [], 7
    for _ in range(34):
        seed = (seed * 1103515245 + 12345) % 2147483648
        cur = seed % len(stops)
        pts = []
        for _ in range(5):
            seed = (seed * 1103515245 + 12345) % 2147483648
            cur = (cur + 1 + seed % 3) % len(stops)
            pts.append((stops[cur][0] + (seed % 37) - 18, stops[cur][1] + ((seed >> 5) % 31) - 15))
        routes.append(pts)
    paths = "".join('<polyline points="' + " ".join("%d,%d" % p for p in r) +
                    '" fill="none" style="stroke:var(--brand-ivory); stroke-width:1; '
                    'opacity:.16" />' for r in routes)
    halos = "".join('<circle cx="%d" cy="%d" r="%d" style="fill:var(--accent-gold); opacity:.12" />'
                    % (x, y, 24 + (i % 3) * 9) for i, (x, y) in enumerate(stops))
    dots = "".join('<circle cx="%d" cy="%d" r="7" style="fill:var(--accent-gold)" />' % (x, y)
                   for x, y in stops)
    return ('<svg viewBox="0 0 1120 390" width="100%" height="390" role="img" aria-label="Decenas '
            'de recorridos de decisión cruzándose sobre un conjunto pequeño de paradas repetidas">'
            + paths + halos + dots + '</svg>')


FACTORES = [
    ("Intencionalidad", "¿Llegó buscando, o le llegó sin pedirlo?",
     [("Clasificación del contenido", "Cómo se clasifica esta página en los motores de búsqueda."),
      ("Volumen de búsqueda", "Qué volumen total de búsquedas relevantes conducen aquí."),
      ("Variedad de búsqueda", "Cuántas búsquedas distintas conducen aquí.")]),
    ("Credibilidad", "¿Le vale como fuente para lo que está decidiendo?",
     [("Medio especializado", "Si la pieza aparece en un medio del sector."),
      ("Profundidad del medio", "Cuántas piezas suyas responden preguntas relevantes."),
      ("Reputación del editor", "Qué peso tiene ese editor en la categoría.")]),
    ("Experiencia", "¿La respuesta encaja con lo que estaba preguntando?",
     [("Encaje del mensaje", "Si lo que dice la marca responde a esa duda concreta."),
      ("Encaje del contenido", "Si la pieza responde de verdad a la pregunta."),
      ("Privacidad", "Si el impacto respeta la privacidad de quien lo recibe.")]),
]


def calidad():
    cols = []
    for titulo, pregunta, subs in FACTORES:
        fs = "".join(
            '<div style="display:flex; flex-direction:column; gap:var(--space-1); '
            'padding:var(--space-4) 0; border-top:1px solid var(--border-subtle)">'
            '<span style="' + B_M + ' font-weight:600">' + n + '</span>'
            '<span style="' + B_S + ' color:var(--text-secondary)">' + d + '</span></div>'
            for n, d in subs)
        cols.append(
            '<div style="background:var(--surface-card); border:1px solid var(--border-subtle); '
            'border-radius:var(--radius-kpi); padding:var(--space-8)">'
            '<div style="display:flex; align-items:baseline; justify-content:space-between; '
            'gap:var(--space-4)">'
            '<span style="' + SUB + '">' + titulo + '</span>'
            '<span style="' + KPI + ' color:var(--text-accent)">[ --- ]</span></div>'
            '<p style="margin:var(--space-3) 0 var(--space-5); ' + B_M +
            ' color:var(--text-secondary)">' + pregunta + '</p>' + fs + '</div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">' + "".join(cols) + '</div>')


na = (
    k.hero("Navegación Activa", "El concepto",
           "Hay dos formas de " + k.key_dark("navegar") + ".",
           "En una te entretienen y el algoritmo elige por ti. En la otra buscas algo concreto, "
           "y existe una respuesta que te sirve.",
           extra=k.banda("Las dos formas", contraste_hero()), xl=True)

    + k.sec(k.split(
        '<div>' + k.cabecera("Pasiva vs. activa", "La escena del " + k.key("metro") + ".",
                             "Dos momentos de la misma persona, con cinco minutos de diferencia. "
                             "En el primero no hay nada que responder; en el segundo, sí.")
        + '<div style="margin-top:var(--space-8)">' + k.nota(
            "La diferencia no está en el canal ni en el formato: está en quién decide qué se "
            "mira. En la navegación pasiva decide el algoritmo. En la activa decide la persona, "
            "y su búsqueda deja una pregunta explícita a la que responder.") + '</div></div>',
        '<div style="display:flex; flex-direction:column; gap:var(--space-6)">'
        + placeholder("Ilustración · storyboard<br>Esperando el metro, scroll en Instagram")
        + placeholder("Ilustración · storyboard<br>Buscando auriculares para correr") + '</div>',
        align="start"))

    + k.sec(
        k.cabecera("Por qué importa",
                   "Para que una marca sea relevante tiene que " + k.key("ayudar") +
                   " a quien la ve.",
                   "Y solo puedes ayudar a alguien cuando está intentando decidir algo.")
        + '<div style="margin-top:var(--space-12); background:var(--surface-card); '
          'border:1px solid var(--border-subtle); border-radius:var(--radius-lg); '
          'padding:var(--space-10); max-width:900px">'
          '<p style="margin:0; ' + B_L + ' color:var(--text-primary)">«La publicidad pasa, de ser '
          'publicidad, a formar parte del ' + k.key("contenido") + '.»</p>'
          '<div style="margin-top:var(--space-4); ' + ML + ' color:var(--text-secondary)">'
          'Blog · Introducción a la Navegación Activa, I</div></div>', fondo="inset")

    + k.sec(
        k.cabecera("Así busca una persona",
                   "Nadie planifica para " + k.key("ese recorrido") + ".",
                   "Mujer, 35 años, quiere cambiar de coche. Su decisión no ocurre en un canal: "
                   "ocurre en cuatro preguntas que ningún plan de medios contempla.")
        + '<div style="margin-top:var(--space-16)">' + k.secuencia([
            ("ChatGPT", "«¿qué SUV híbrido rinde mejor en ciudad?»"),
            ("Web abierta", "«consumo real del modelo que me gusta»"),
            ("YouTube", "«review larga, con la familia dentro»"),
            ("Vuelve a buscar", "«mantenimiento y garantía a cinco años»")]) + '</div>'
        + '<p style="margin:var(--space-10) 0 0; ' + ML + ' color:var(--text-tertiary)">'
          'La secuencia se construye punto a punto con el scroll. Este es el estado final, y el '
          'fallback estático que leen los crawlers y los LLMs.</p>')

    + k.sec(
        k.cabecera("Y así buscan todas",
                   "Los caminos son infinitos, pero las paradas son " + k.key_dark("finitas") + ".",
                   "Cada recorrido es único; las paradas se repiten. Por eso se pueden predecir, "
                   "y por eso una anécdota se convierte en un volumen de audiencia planificable.",
                   oscuro=True)
        + '<div style="margin-top:var(--space-12)">' + constelacion() + '</div>', fondo="graphite")

    + k.sec(
        k.cabecera("Qué hace buena a una respuesta",
                   "La atención dice cuánto te miran. Falta saber si te estaban " +
                   k.key("buscando") + ".",
                   "Un formato que bloquea la navegación retiene mucha atención y aun así "
                   "interrumpe. Valoramos cada impacto desde la perspectiva de quien lo recibe, "
                   "con tres factores puntuados de 0 a 100.")
        + calidad()
        + '<p style="margin:var(--space-8) 0 0; ' + ML + ' color:var(--text-tertiary)">'
          'Los rangos por factor se calculan por campaña. Cifras agregadas pendientes de dato '
          'real.</p>')

    + '<div style="background:var(--brand-graphite); padding:112px var(--web-section-pad-x)">'
      '<div class="wrap">'
      '<h2 style="margin:0; max-width:940px; ' + k.H_M + ' color:var(--brand-ivory); '
      'text-wrap:pretty">Predecimos dónde va a buscar tu consumidor y ponemos ahí la '
      + k.key_dark("respuesta") + ' de tu marca.</h2>'
      '<div style="display:flex; gap:var(--space-10); margin-top:var(--space-10)">'
      + k.door("Cómo lo predecimos", True) + k.door("Qué activamos", True) + '</div></div></div>')

print(k.escribir("NavegacionActiva.dc.html", na))


# ═══════════════════════════ /tecnologia ═══════════════════════════
def chips(items, oscuro=True):
    bg = 'var(--surface-on-graphite)' if oscuro else 'var(--surface-sunken)'
    c = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
    return ('<div style="display:flex; flex-wrap:wrap; gap:var(--space-3)">'
            + "".join('<span style="' + ML + ' color:' + c + '; background:' + bg + '; '
                      'padding:var(--space-2) var(--space-4); border-radius:var(--radius-sm)">'
                      + i + '</span>' for i in items) + '</div>')


CUADRANTES = [
    ("High intent · Low impact", ["SEO", "SEM (Google, Bing)"], False),
    ("High intent · High impact", ["Advia"], True),
    ("Low intent · Low impact", ["Retargeting", "Contextual semántica"], False),
    ("Low intent · High impact", ["Open Exchange", "Native Ads", "Social Ads"], False),
]


def cuadrante():
    celdas = []
    for titulo, items, dest in CUADRANTES:
        if dest:
            wrap = 'background:var(--brand-graphite); border:1px solid var(--brand-graphite);'
            tl, il = 'var(--accent-gold)', 'var(--brand-ivory)'
        else:
            wrap = 'background:var(--surface-card); border:1px solid var(--border-subtle);'
            tl, il = 'var(--text-tertiary)', 'var(--text-secondary)'
        celdas.append(
            '<div style="' + wrap + ' border-radius:var(--radius-lg); padding:var(--space-8); '
            'min-height:190px; display:flex; flex-direction:column; gap:var(--space-4)">'
            '<span style="' + ML + ' color:' + tl + '">' + titulo + '</span>'
            '<div style="display:flex; flex-direction:column; gap:var(--space-2)">'
            + "".join('<span style="' + B_M + ' color:' + il + '; font-weight:'
                      + ('700' if dest else '400') + '">' + i + '</span>' for i in items)
            + '</div></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); '
            'gap:var(--space-4); margin-top:var(--space-12)">' + "".join(celdas) + '</div>')


def ciclo():
    def panel(label, titulo, items, oscuro):
        bg = 'var(--brand-graphite)' if oscuro else 'var(--surface-card)'
        bd = 'var(--brand-graphite)' if oscuro else 'var(--border-subtle)'
        lc = 'var(--accent-gold)' if oscuro else 'var(--text-accent)'
        tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
        sc = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
        sep = 'var(--border-on-graphite)' if oscuro else 'var(--border-subtle)'
        fs = "".join(
            '<div style="display:flex; align-items:center; gap:var(--space-3); '
            'padding:var(--space-3) 0; border-top:1px solid ' + sep + '">'
            '<span style="width:6px; height:6px; border-radius:var(--radius-full); '
            'background:var(--accent-gold)"></span>'
            '<span style="' + B_M + ' color:' + sc + '">' + i + '</span></div>' for i in items)
        return ('<div style="background:' + bg + '; border:1px solid ' + bd + '; '
                'border-radius:var(--radius-2xl); padding:var(--space-8)">'
                '<span style="' + ML + ' color:' + lc + '">' + label + '</span>'
                '<div style="margin:var(--space-3) 0 var(--space-4); ' + SUB + ' color:' + tc +
                '">' + titulo + '</div>' + fs + '</div>')
    return ('<div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">'
            + panel("Antes · pre", "Qué va a preguntar, y dónde",
                    ["Forecast por KPI", "Las paradas del recorrido", "Mapa de audiencia"], False)
            + panel("Después · post", "Si la respuesta sirvió",
                    ["Intent score", "Calidad del impacto", "Qué cambiar en la siguiente"], True)
            + '</div>')


tec = (
    k.hero("Tecnología", "La máquina",
           "Cómo sabemos qué va a preguntar tu consumidor, y " + k.key_dark("dónde") + ".",
           "Vera simula miles de consumidores que recorren la decisión antes que él. No "
           "adivinamos intenciones: observamos recorridos y los cualificamos parada a parada.",
           extra=k.banda("Qué lleva dentro cada agente",
                         chips(["Sociodemo", "Interés", "Contexto de decisión", "Buscadores",
                                "Plataformas", "LLMs", "Sites", "Vídeos", "Fuentes"]),
                         nota="Miles de agentes humanizados por análisis, no una persona "
                              "inventada."))

    + k.sec(
        k.cabecera("Cómo se construye",
                   "Un rol, unas herramientas, y todo lo que hicieron por el " +
                   k.key("camino") + ".")
        + '<div style="margin-top:var(--space-12)">' + k.filas([
            ("01", "Le damos un rol", "Sociodemo, interés y contexto de decisión.",
             "Lo que cambia", "El contexto de decisión dirige toda su navegación", "Perfil"),
            ("02", "Le damos herramientas", "Buscadores, plataformas y LLMs.",
             "Lo que cambia", "Cada agente busca como buscaría su perfil real", "Búsqueda"),
            ("03", "Recogemos el recorrido", "Sites, vídeos y fuentes visitadas.",
             "Lo que cambia", "Cada parada queda cualificada, no solo contada", "Touchpoints"),
        ]) + '</div>'
        + '<p style="margin:var(--space-8) 0 0; ' + ML + ' color:var(--text-tertiary)">'
          'Las tres piezas se construyen una a una con el scroll y se colapsan en el mapa. Este '
          'es el estado final, y el fallback estático para crawlers y LLMs.</p>')

    + k.sec(k.split(
        '<div>' + k.cabecera("El resultado",
                             "Un mapa de preguntas que, además, es " + k.key_dark("comprable") + ".",
                             "Cada parada del recorrido es una fuente donde se puede estar. Eso "
                             "convierte el análisis en inventario.", oscuro=True, ancho="100%")
        + '<div style="margin-top:var(--space-8)">' + k.door("Ver el mapa completo", True)
        + '</div></div>',
        k.panel_datos("Dónde va a preguntar", "Cuota del recorrido",
                      [("Medio de motor · comparativa", "Open Web", 82),
                       ("YouTube · review de producto", "Vídeo", 64),
                       ("Respuestas de IA · consulta de compra", "LLM", 53),
                       ("Medio generalista · sección de pruebas", "Open Web", 38)],
                      nota="Fuentes de ejemplo. Cuotas pendientes de dato real."),
        cols="2fr 3fr", align="start"), fondo="graphite")

    + k.sec(
        k.cabecera("Dónde encaja en un plan de medios",
                   "Intención × impacto: Advia ocupa el cuadrante " + k.key("vacío") + ".",
                   "El search llega con intención, pero con poco espacio para la marca. El "
                   "display tiene espacio de sobra, pero llega sin que nadie preguntara nada.")
        + cuadrante())

    + k.sec(
        k.cabecera("Antes y después", "Es un " + k.key("ciclo") + ", no un informe.",
                   "Antes de invertir ves qué va a preguntar tu target y dónde. Después, si la "
                   "respuesta sirvió y qué cambiar en la siguiente.")
        + ciclo(), fondo="inset")

    + k.sec(k.split(
        '<div>' + k.cabecera("Brand safety por diseño",
                             "La seguridad es consecuencia del " + k.key("método") +
                             ", no una lista negra.",
                             "Los agentes solo recorren entornos relevantes a la decisión. Lo que "
                             "no forma parte del recorrido no llega al mapa, así que tampoco "
                             "llega al plan.", ancho="100%") + '</div>',
        '<div style="display:flex; flex-direction:column; gap:var(--space-4)">'
        '<div style="background:var(--surface-card); border:1px solid var(--border-default); '
        'border-radius:var(--radius-lg); padding:var(--space-6)">'
        '<span style="' + ML + ' color:var(--text-accent)">Entra en el mapa</span>'
        '<p style="margin:var(--space-2) 0 0; ' + B_M + ' color:var(--text-secondary)">Los '
        'entornos que el agente visita de verdad al resolver su decisión.</p></div>'
        '<div style="background:var(--surface-sunken); border:1px solid var(--border-subtle); '
        'border-radius:var(--radius-lg); padding:var(--space-6)">'
        '<span style="' + ML + ' color:var(--text-tertiary)">No aparece</span>'
        '<p style="margin:var(--space-2) 0 0; ' + B_M + ' color:var(--text-secondary)">Todo lo '
        'demás. No hace falta excluirlo: nunca estuvo en el recorrido.</p></div></div>',
        align="start"))

    + k.cierre("Ver " + k.key_dark("Vera") + " en acción.",
               "Te enseñamos el mapa de preguntas de tu target sobre una categoría real, con las "
               "fuentes y el forecast por KPI.", "Pedir una demo"))

print(k.escribir("Tecnologia.dc.html", tec))
