"""Artboard /navegacion-activa — el concepto (how, parte 1)."""
import math
import _shell

ARROW = ('<svg class="icon" viewBox="0 -960 960 960" aria-hidden="true">'
         '<path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z"/></svg>')


def door(text, dark=False):
    color = "var(--accent-gold)" if dark else "var(--text-accent)"
    return (f'<span style="display:inline-flex; align-items:center; gap:var(--space-2); '
            f'color:{color}; font-size:var(--fs-button); line-height:var(--lh-button); '
            f'font-weight:700">{text}{ARROW}</span>')


def constelacion():
    """Constelación estática: rutas cruzándose sobre paradas que se repiten."""
    stops = [(120, 250), (300, 90), (470, 300), (640, 140), (810, 260), (980, 110)]
    routes, seed = [], 7
    for r in range(34):
        seed = (seed * 1103515245 + 12345) % 2147483648
        start = seed % len(stops)
        pts, cur = [], start
        for step in range(4):
            seed = (seed * 1103515245 + 12345) % 2147483648
            cur = (cur + 1 + seed % 3) % len(stops)
            x, y = stops[cur]
            jx = (seed % 37) - 18
            jy = ((seed >> 5) % 31) - 15
            pts.append((x + jx, y + jy))
        first = (stops[start][0] + ((seed >> 9) % 21) - 10,
                 stops[start][1] + ((seed >> 13) % 21) - 10)
        routes.append([first] + pts)
    paths = "".join(
        '<polyline points="{}" fill="none" style="stroke:var(--neutral-400); '
        'stroke-width:1; opacity:.22" />'.format(
            " ".join("{},{}".format(x, y) for x, y in pts))
        for pts in routes)
    halos = "".join(
        '<circle cx="{}" cy="{}" r="{}" style="fill:var(--accent-gold); opacity:.14" />'
        .format(x, y, 22 + (i % 3) * 7) for i, (x, y) in enumerate(stops))
    dots = "".join(
        '<circle cx="{}" cy="{}" r="7" style="fill:var(--accent-gold)" />'.format(x, y)
        for x, y in stops)
    return ('<svg viewBox="0 0 1120 390" width="100%" height="390" role="img" '
            'aria-label="Decenas de recorridos de navegación cruzándose sobre un '
            'conjunto pequeño de paradas repetidas">'
            + paths + halos + dots + '</svg>')


NODOS = [
    ("ChatGPT", "«¿Qué SUV híbrido rinde mejor en ciudad?»"),
    ("Open Web", "Compara modelos, precios y consumos en medios de motor."),
    ("YouTube", "Busca una review larga del modelo que ya tiene en mente."),
    ("Vuelve a buscar", "Contrasta una duda concreta: mantenimiento y garantía."),
]


def recorrido():
    dots = "".join(
        '<div style="width:18px; height:18px; border-radius:var(--radius-full); '
        'background:var(--accent-gold); box-shadow:0 0 0 6px var(--gold-crema)"></div>'
        for _ in NODOS)
    labels = "".join(
        '<div style="display:flex; flex-direction:column; align-items:flex-start; '
        'gap:var(--space-2)">'
        '<span style="font-family:var(--font-mono); font-size:var(--fs-code-xs); '
        'line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; '
        'color:var(--text-secondary); background:var(--surface-sunken); '
        'padding:var(--space-1) var(--space-3); border-radius:var(--radius-sm)">' + p + '</span>'
        '<p style="margin:0; font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
        'color:var(--text-secondary)">' + q + '</p></div>'
        for p, q in NODOS)
    return (
        '<div style="position:relative; padding-top:var(--space-2)">'
        '<div style="position:absolute; left:9px; right:9px; top:17px; height:1px; '
        'background:var(--border-default)"></div>'
        '<div style="position:relative; display:grid; '
        'grid-template-columns:repeat(4, minmax(0, 1fr)); gap:var(--space-6)">'
        + dots + '</div></div>'
        '<div style="display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); '
        'gap:var(--space-6); margin-top:var(--space-5)">' + labels + '</div>')


FACTORES = [
    ("Intencionalidad",
     "¿Qué probabilidad hay de que tu consumidor haya llegado a este artículo desde un buscador?",
     [("Clasificación del artículo", "Cómo se clasifica este contenido en los motores de búsqueda."),
      ("Volumen de términos", "Qué volumen total de búsquedas relevantes conducen aquí."),
      ("Recuento de términos", "Cuántas búsquedas relevantes distintas conducen aquí.")]),
    ("Credibilidad",
     "¿Cuánta autoridad tiene este editor ante tu consumidor para responder a sus preguntas?",
     [("Subdominio especializado", "Si el artículo aparece en un medio especializado del sector."),
      ("Artículos relevantes", "Cuántos artículos del subdominio responden preguntas relevantes."),
      ("Percepción del editor", "Qué influencia o reputación tiene ese editor en el sector.")]),
    ("Experiencia",
     "¿Cómo de bien responde tu creatividad a la pregunta de tu consumidor en este artículo?",
     [("Relevancia de la creatividad", "Si la pieza está alineada con la pregunta del consumidor."),
      ("Relevancia del contenido", "Si el artículo responde preguntas relevantes del consumidor."),
      ("Privacidad", "Si el impacto respeta la privacidad de quien lo recibe.")]),
]


def calidad():
    cols = []
    for titulo, pregunta, subs in FACTORES:
        filas = "".join(
            '<div style="display:flex; flex-direction:column; gap:var(--space-1); '
            'padding:var(--space-4) 0; border-top:1px solid var(--border-subtle)">'
            '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); '
            'font-weight:600">' + n + '</span>'
            '<span style="font-size:var(--fs-body-s); line-height:var(--lh-body-s); '
            'color:var(--text-secondary)">' + d + '</span></div>'
            for n, d in subs)
        cols.append(
            '<div style="background:var(--surface-card); border:1px solid var(--border-subtle); '
            'border-radius:var(--radius-kpi); padding:var(--space-8)">'
            '<div style="display:flex; align-items:baseline; justify-content:space-between; '
            'gap:var(--space-4)">'
            '<span style="font-size:var(--fs-subheading); line-height:var(--lh-subheading); '
            'font-weight:700">' + titulo + '</span>'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-kpi); '
            'line-height:var(--lh-kpi); color:var(--text-accent); '
            'font-variant-numeric:tabular-nums">[ --- ]</span></div>'
            '<p style="margin:var(--space-3) 0 var(--space-5); font-size:var(--fs-body-m); '
            'line-height:var(--lh-body-m); color:var(--text-secondary)">' + pregunta + '</p>'
            + filas + '</div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-16)">' + "".join(cols) + '</div>')


def placeholder(caption):
    return ('<div style="background:var(--surface-sunken); border:1px dashed var(--border-default); '
            'border-radius:var(--radius-lg); height:260px; display:flex; align-items:center; '
            'justify-content:center; padding:var(--space-6)">'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-xs); '
            'line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; '
            'color:var(--text-tertiary); text-align:center">' + caption + '</span></div>')


BODY = """
<!-- ══════════════════════ 1 · HERO ══════════════════════ -->
<div class="sec" style="padding-top:120px; padding-bottom:104px">
  <div class="wrap">
    <div style="font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; color:var(--text-secondary)">El concepto</div>
    <h1 style="margin:var(--space-6) 0 0; max-width:960px; font-size:var(--fs-display-xl); line-height:var(--lh-display-xl); font-weight:400; text-wrap:pretty">Hay dos formas de <span style="color:var(--text-accent)">navegar</span>.</h1>
    <p style="margin:var(--space-8) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">En una el algoritmo elige por ti. En la otra eliges tú, y solo ahí un anuncio puede ayudarte a decidir.</p>
  </div>
</div>

<!-- ══════════════════════ 2 · LA ESCENA DEL METRO ══════════════════════ -->
<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; color:var(--text-secondary)">Pasiva vs. activa</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:820px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">La escena del <span style="color:var(--text-accent); font-weight:600">metro</span>.</h2>

    <div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:var(--space-6); margin-top:var(--space-12)">
      <div style="display:flex; flex-direction:column; gap:var(--space-5)">
        __PH1__
        <div>
          <div style="font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; color:var(--text-tertiary)">Navegación pasiva</div>
          <p style="margin:var(--space-3) 0 0; font-size:var(--fs-body-m); line-height:var(--lh-body-m); color:var(--text-secondary)">Scroll en Instagram esperando el metro: el algoritmo elige por ti y el anuncio llega sin que hubiera una pregunta detrás.</p>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:var(--space-5)">
        __PH2__
        <div>
          <div style="font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; color:var(--text-accent)">Navegación activa</div>
          <p style="margin:var(--space-3) 0 0; font-size:var(--fs-body-m); line-height:var(--lh-body-m); color:var(--text-secondary)">Cinco minutos después recuerdas que necesitas auriculares para correr y buscas. Ahora hay una pregunta, y un anuncio puede responderla.</p>
        </div>
      </div>
    </div>

    <div style="margin-top:var(--space-12); background:var(--surface-sunken); border-left:4px solid var(--accent-gold); border-radius:0 var(--radius-xl) var(--radius-xl) 0; padding:var(--space-5) var(--space-6)">
      <p style="margin:0; font-size:var(--fs-body-m); line-height:var(--lh-body-m); color:var(--text-secondary)">La diferencia no está en el canal ni en el formato: está en quién decide qué se mira. En la navegación pasiva decide el algoritmo; en la activa decide la persona, y su búsqueda deja una pregunta explícita a la que responder.</p>
    </div>
  </div>
</div>

<!-- ══════════════════════ 3 · SOLO EN UNA PUEDES SER ÚTIL ══════════════════════ -->
<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; color:var(--text-secondary)">Por qué importa</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:900px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Para que un anuncio sea relevante tiene que <span style="color:var(--text-accent); font-weight:600">ayudar</span> a quien lo ve.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Y solo puedes ayudarle cuando intenta decidir.</p>

    <div style="margin-top:var(--space-12); background:var(--surface-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:var(--space-8) var(--space-6); text-align:center">
      <p style="margin:0; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-primary)">«La publicidad pasa, de ser publicidad, a formar parte del <span style="color:var(--text-accent); font-weight:700">contenido</span>.»</p>
      <div style="margin-top:var(--space-4); font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; color:var(--text-secondary)">Blog · Introducción a la Navegación Activa, I</div>
    </div>
  </div>
</div>

<!-- ══════════════════════ 4 · ASÍ NAVEGA UNA PERSONA ══════════════════════ -->
<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; color:var(--text-secondary)">Así navega una persona</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:860px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Nadie planifica para <span style="color:var(--text-accent); font-weight:600">ese recorrido</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Mujer, 35 años, busca un coche eficiente. Su decisión no ocurre en un canal: ocurre en cuatro paradas que ningún plan de medios contempla.</p>

    <div style="margin-top:var(--space-16)">__RECORRIDO__</div>

    <p style="margin:var(--space-10) 0 0; font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); color:var(--text-tertiary)">La secuencia se construye punto a punto con el scroll. Este es el estado final, y el fallback estático que leen los crawlers y los LLMs.</p>
  </div>
</div>

<!-- ══════════════════════ 5 · Y ASÍ NAVEGAN TODAS ══════════════════════ -->
<div class="sec" style="background:var(--brand-graphite)">
  <div class="wrap">
    <div style="font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; color:var(--neutral-500)">Y así navegan todas</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:900px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; color:var(--brand-ivory); text-wrap:pretty">Los caminos son infinitos, pero las paradas son <span style="color:var(--accent-gold); font-weight:600">finitas</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--neutral-400)">Cada recorrido es único; las paradas se repiten. Por eso se pueden predecir, y por eso una anécdota se convierte en un volumen de audiencia planificable.</p>
    <div style="margin-top:var(--space-12)">__CONSTELACION__</div>
  </div>
</div>

<!-- ══════════════════════ 6 · CALIDAD DEL IMPACTO ══════════════════════ -->
<div class="sec" style="border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <div style="font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase; color:var(--text-secondary)">La calidad de un impacto</div>
    <h2 style="margin:var(--space-5) 0 0; max-width:920px; font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">La atención dice cuánto te miran. Falta saber si te estaban <span style="color:var(--text-accent); font-weight:600">buscando</span>.</h2>
    <p style="margin:var(--space-6) 0 0; max-width:720px; font-size:var(--fs-body-l); line-height:var(--lh-body-l); color:var(--text-secondary)">Un formato que bloquea la navegación retiene mucha atención y aun así interrumpe. Valoramos cada impacto desde la perspectiva de quien lo recibe, con tres factores puntuados de 0 a 100.</p>
    __CALIDAD__
    <p style="margin:var(--space-8) 0 0; font-family:var(--font-mono); font-size:var(--fs-code-xs); line-height:var(--lh-code-xs); color:var(--text-tertiary)">Los rangos por factor se calculan por campaña. Cifras agregadas pendientes de dato real.</p>
  </div>
</div>

<!-- ══════════════════════ 7 · AHÍ ENTRA ADVIA ══════════════════════ -->
<div class="sec" style="background:var(--surface-inset); border-top:1px solid var(--border-subtle)">
  <div class="wrap">
    <h2 style="margin:0; max-width:920px; font-size:var(--fs-heading); line-height:var(--lh-heading); font-weight:700; text-wrap:pretty">Predecimos dónde navegarán tus futuros consumidores y convertimos tus anuncios en <span style="color:var(--text-accent)">respuesta</span>.</h2>
    <div style="display:flex; gap:var(--space-8); margin-top:var(--space-10)">
      __DOOR_TEC__
      __DOOR_PROD__
    </div>
  </div>
</div>
"""

body = (BODY
        .replace("__PH1__", placeholder("Ilustración · storyboard<br>Esperando el metro, scroll en Instagram"))
        .replace("__PH2__", placeholder("Ilustración · storyboard<br>Buscando auriculares para correr"))
        .replace("__RECORRIDO__", recorrido())
        .replace("__CONSTELACION__", constelacion())
        .replace("__CALIDAD__", calidad())
        .replace("__DOOR_TEC__", door("Cómo lo predecimos"))
        .replace("__DOOR_PROD__", door("Qué activamos")))

print(_shell.write("NavegacionActiva.dc.html", "Navegación Activa", body))
