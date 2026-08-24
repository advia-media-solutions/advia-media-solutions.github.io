"""Tres direcciones de arte para el arranque de la home. Mismo sistema, distinta dirección."""
import re
import _shell

ML = ('font-family:var(--font-mono); font-size:var(--fs-code-xs); '
      'line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase;')
ARROW = ('<svg class="icon" viewBox="0 -960 960 960" aria-hidden="true">'
         '<path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z"/></svg>')

LOGO_DARK = re.search(r'<svg width="106"[\s\S]*?</svg>', _shell.NAV).group(0)      # grafito
LOGO_LIGHT = re.search(r'<svg width="106"[\s\S]*?</svg>', _shell.FOOTER).group(0)  # marfil


def door(text, gold="var(--text-accent)"):
    return ('<span style="display:inline-flex; align-items:center; gap:var(--space-2); color:'
            + gold + '; font-size:var(--fs-button); line-height:var(--lh-button); '
            'font-weight:700">' + text + ARROW + '</span>')


def pill(text):
    return ('<span style="background:var(--accent-gold); color:var(--text-on-gold); '
            'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
            'padding:var(--space-4) var(--space-8); border-radius:var(--radius-pill)">'
            + text + '</span>')


def nav(dark=False, minimal=False):
    logo = LOGO_LIGHT if dark else LOGO_DARK
    col = 'var(--neutral-400)' if dark else 'var(--text-secondary)'
    bg = 'var(--brand-graphite)' if dark else 'var(--surface-page)'
    bd = 'var(--border-on-graphite)' if dark else 'var(--border-subtle)'
    items = [] if minimal else ["Navegación Activa", "Tecnología", "Productos", "Nosotros", "Blog"]
    links = "".join(
        '<span style="font-size:var(--fs-body-m); line-height:var(--lh-body-m); color:'
        + col + '">' + i + '</span>' for i in items)
    return ('<div style="background:' + bg + '; border-bottom:1px solid ' + bd + '">'
            '<div style="max-width:var(--web-content-width); margin:0 auto; '
            'padding:0 var(--web-section-pad-x); height:76px; display:flex; align-items:center; '
            'justify-content:space-between; gap:var(--space-8)">' + logo +
            '<div style="display:flex; align-items:center; gap:var(--space-6)">' + links +
            '<span style="background:var(--accent-gold); color:var(--text-on-gold); '
            'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
            'padding:var(--space-3) var(--space-6); border-radius:var(--radius-pill)">Hablemos'
            '</span></div></div></div>')


# ════════════════════ A · INSTRUMENTO ════════════════════
def campo_constelacion():
    """Campo de rutas y paradas: el mapa de Vera como textura del hero."""
    stops = [(160, 300), (380, 130), (600, 360), (820, 180), (1050, 320),
             (1280, 150), (1420, 380)]
    seed = 11
    lineas = []
    for _ in range(52):
        seed = (seed * 1103515245 + 12345) % 2147483648
        cur = seed % len(stops)
        pts = []
        for _ in range(5):
            seed = (seed * 1103515245 + 12345) % 2147483648
            cur = (cur + 1 + seed % 3) % len(stops)
            pts.append((stops[cur][0] + (seed % 49) - 24,
                        stops[cur][1] + ((seed >> 6) % 41) - 20))
        lineas.append('<polyline points="' + " ".join("%d,%d" % p for p in pts) +
                      '" fill="none" style="stroke:var(--brand-ivory); stroke-width:1; '
                      'opacity:.13" />')
    halos = "".join('<circle cx="%d" cy="%d" r="%d" style="fill:var(--accent-gold); '
                    'opacity:.10" />' % (x, y, 30 + (i % 3) * 12)
                    for i, (x, y) in enumerate(stops))
    dots = "".join('<circle cx="%d" cy="%d" r="6" style="fill:var(--accent-gold)" />' % (x, y)
                   for x, y in stops)
    return ('<svg viewBox="0 0 1440 500" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" '
            'aria-hidden="true">' + "".join(lineas) + halos + dots + '</svg>')


def readout():
    cols = []
    for label, desc in [("Agentes simulados", "por categoría analizada"),
                        ("Fuentes cualificadas", "con intención, credibilidad y experiencia"),
                        ("Categorías mapeadas", "listas para activar")]:
        cols.append(
            '<div style="display:flex; flex-direction:column; gap:var(--space-2); '
            'padding-top:var(--space-5); border-top:1px solid var(--border-on-graphite-strong)">'
            '<span style="' + ML + ' color:var(--neutral-500)">' + label + '</span>'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-kpi); '
            'line-height:var(--lh-kpi); color:var(--accent-gold); '
            'font-variant-numeric:tabular-nums">[ --- ]</span>'
            '<span style="font-size:var(--fs-body-s); line-height:var(--lh-body-s); '
            'color:var(--neutral-400)">' + desc + '</span></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-10); margin-top:var(--space-20)">' + "".join(cols) + '</div>')


def panel_mapa():
    filas = []
    for nombre, canal, ancho in [("Medio de motor · comparativa", "Open Web", 82),
                                 ("YouTube · review de producto", "YouTube", 64),
                                 ("Respuestas de IA · consulta", "LLM", 53),
                                 ("Medio generalista · pruebas", "Open Web", 38)]:
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
    return ('<div style="background:var(--brand-graphite); border-radius:var(--radius-2xl); '
            'padding:var(--space-8)">'
            '<div style="display:flex; align-items:baseline; justify-content:space-between; '
            'gap:var(--space-4); padding-bottom:var(--space-4)">'
            '<span style="' + ML + ' color:var(--accent-gold)">Mapa · vista de producto</span>'
            '<span style="' + ML + ' color:var(--neutral-500)">Cuota</span></div>'
            + "".join(filas) + '</div>')


A_BODY = ('__NAV__'
          '<div style="position:relative; background:var(--brand-graphite); overflow:hidden; '
          'padding:var(--space-20) var(--web-section-pad-x) 112px">'
          '<div style="position:absolute; top:0; left:0; right:0; bottom:0">'
          + campo_constelacion() + '</div>'
          '<div class="wrap" style="position:relative">'
          '<div style="' + ML + ' color:var(--accent-gold)">Advia · Navegación Activa</div>'
          '<h1 style="margin:var(--space-8) 0 0; max-width:1000px; '
          'font-size:var(--fs-display-xl); line-height:var(--lh-display-xl); font-weight:400; '
          'color:var(--brand-ivory); text-wrap:pretty">Turning ads into '
          '<span style="color:var(--accent-gold)">answers</span>.</h1>'
          '<p style="margin:var(--space-8) 0 0; max-width:640px; font-size:var(--fs-body-l); '
          'line-height:var(--lh-body-l); color:var(--neutral-400)">Predecimos dónde va a buscar '
          'tu consumidor antes de que lo haga, y convertimos tus anuncios en la respuesta que '
          'encuentra.</p>'
          '<div style="display:flex; gap:var(--space-4); margin-top:var(--space-10)">'
          + pill("Pedir una precampaña") +
          '<span style="border:1px solid var(--border-on-graphite-strong); '
          'color:var(--brand-ivory); font-size:var(--fs-button); line-height:var(--lh-button); '
          'font-weight:700; padding:var(--space-4) var(--space-8); '
          'border-radius:var(--radius-pill)">Cómo funciona Vera</span></div>'
          + readout() + '</div></div>'

          '<div class="sec">'
          '<div class="wrap" style="display:grid; grid-template-columns:3fr 2fr; '
          'gap:var(--space-16); align-items:center">'
          '<div>'
          '<div style="' + ML + ' color:var(--text-secondary)">El momento</div>'
          '<h2 style="margin:var(--space-5) 0 0; font-size:var(--fs-display-l); '
          'line-height:var(--lh-display-l); font-weight:300; text-wrap:pretty">Un anuncio aporta '
          'valor cuando responde a lo que alguien <span style="color:var(--text-accent); '
          'font-weight:600">busca</span>.</h2>'
          '<p style="margin:var(--space-6) 0 var(--space-8); font-size:var(--fs-body-l); '
          'line-height:var(--lh-body-l); color:var(--text-secondary)">A ese momento lo llamamos '
          'Navegación Activa. Cada parada de ese recorrido es una fuente que se puede comprar.</p>'
          + door("Qué es la Navegación Activa") + '</div>'
          + panel_mapa() + '</div></div>')


# ════════════════════ B · FACETAS ════════════════════
def campo_facetas():
    """Campo de facetas: la lógica de corte del isotipo llevada a escala gráfica."""
    bandas = [("20,480 120,480 120,260", "var(--brand-facet-1)"),
              ("120,480 220,480 220,40 120,260", "var(--brand-facet-2)"),
              ("220,480 320,480 320,260 220,40", "var(--brand-facet-3)"),
              ("320,480 420,480 320,260", "var(--brand-facet-4)")]
    polys = "".join('<polygon points="' + p + '" style="fill:' + c + '" />' for p, c in bandas)
    return ('<svg viewBox="10 120 420 380" width="100%" height="440" '
            'preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + polys + '</svg>')


def panel_faceta(label, titulo, texto, destacado):
    cor = ('<svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">'
           '<polygon points="48,0 48,48 0,48" style="fill:var(--accent-gold); opacity:'
           + ('1' if destacado else '.28') + '" /></svg>')
    return ('<div style="position:relative; overflow:hidden; background:'
            + ('var(--surface-on-graphite)' if destacado else 'transparent') +
            '; border:1px solid ' + ('var(--accent-gold)' if destacado
                                     else 'var(--border-on-graphite-strong)') +
            '; border-radius:var(--radius-2xl); padding:var(--space-10)">'
            '<div style="position:absolute; right:0; bottom:0">' + cor + '</div>'
            '<span style="' + ML + ' color:'
            + ('var(--accent-gold)' if destacado else 'var(--neutral-500)') + '">'
            + label + '</span>'
            '<div style="margin:var(--space-4) 0 var(--space-3); '
            'font-size:var(--fs-subheading); line-height:var(--lh-subheading); font-weight:700; '
            'color:var(--brand-ivory); text-wrap:pretty">' + titulo + '</div>'
            '<p style="margin:0; max-width:420px; font-size:var(--fs-body-m); '
            'line-height:var(--lh-body-m); color:var(--neutral-400)">' + texto + '</p></div>')


B_BODY = ('__NAV__'
          '<div class="sec" style="padding-top:var(--space-20); padding-bottom:var(--space-20); '
          'overflow:hidden">'
          '<div class="wrap" style="display:grid; grid-template-columns:3fr 2fr; '
          'gap:var(--space-12); align-items:center">'
          '<div>'
          '<div style="' + ML + ' color:var(--text-secondary)">Creemos en publicidad que aporta valor</div>'
          '<h1 style="margin:var(--space-8) 0 0; font-size:var(--fs-display-xl); '
          'line-height:var(--lh-display-xl); font-weight:400; text-wrap:pretty">Turning ads into '
          '<span style="color:var(--text-accent)">answers</span>.</h1>'
          '<p style="margin:var(--space-8) 0 0; max-width:560px; font-size:var(--fs-body-l); '
          'line-height:var(--lh-body-l); color:var(--text-secondary)">Trabajamos desde el lado de '
          'tu consumidor: predecimos dónde va a buscar y colocamos tu marca en esa respuesta.</p>'
          '<div style="display:flex; gap:var(--space-4); margin-top:var(--space-10)">'
          + pill("Pedir una precampaña") +
          '<span style="border:1px solid var(--border-strong); color:var(--text-primary); '
          'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
          'padding:var(--space-4) var(--space-8); border-radius:var(--radius-pill)">'
          'Por qué existe Advia</span></div></div>'
          '<div>' + campo_facetas() + '</div></div></div>'

          '<div style="background:var(--brand-graphite); '
          'clip-path:polygon(0 96px, 100% 0, 100% 100%, 0 100%); '
          'padding:184px var(--web-section-pad-x) var(--web-section-pad-y)">'
          '<div class="wrap">'
          '<div style="' + ML + ' color:var(--neutral-500)">02 · El momento</div>'
          '<h2 style="margin:var(--space-5) 0 0; max-width:900px; font-size:var(--fs-display-l); '
          'line-height:var(--lh-display-l); font-weight:300; color:var(--brand-ivory); '
          'text-wrap:pretty">Hay dos formas de navegar, y solo en una puedes ser '
          '<span style="color:var(--accent-gold); font-weight:600">útil</span>.</h2>'
          '<div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); '
          'gap:var(--space-6); margin-top:var(--space-12)">'
          + panel_faceta("Navegación pasiva", "El algoritmo elige por ti",
                         "Scroll esperando el metro. El contenido llega solo, y el anuncio "
                         "interrumpe lo que estabas haciendo.", False)
          + panel_faceta("Navegación activa", "Eliges tú, y ahí puedes ayudar",
                         "Recuerdas que necesitas auriculares para correr y buscas. Ahora hay "
                         "una pregunta, y un anuncio puede responderla.", True)
          + '</div>'
          '<div style="margin-top:var(--space-10)">' + door("Qué es la Navegación Activa",
                                                           "var(--accent-gold)") + '</div>'
          '</div></div>')


# ════════════════════ C · MANIFIESTO ════════════════════
def declaracion(texto, keyword, dato, label, oscuro):
    bg = 'var(--brand-graphite)' if oscuro else 'var(--surface-page)'
    tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
    sc = 'var(--neutral-500)' if oscuro else 'var(--text-secondary)'
    return ('<div class="sec" style="background:' + bg + '; padding-top:120px; '
            'padding-bottom:120px">'
            '<div class="wrap" style="display:grid; grid-template-columns:3fr 2fr; '
            'gap:var(--space-16); align-items:end">'
            '<h2 style="margin:0; font-size:var(--fs-display-l); '
            'line-height:var(--lh-display-l); font-weight:300; color:' + tc + '; '
            'text-wrap:pretty">' + texto +
            ' <span style="color:var(--accent-gold); font-weight:600">' + keyword + '</span>.</h2>'
            '<div style="display:flex; flex-direction:column; gap:var(--space-2); '
            'padding-bottom:var(--space-2)">'
            '<span style="' + ML + ' color:' + sc + '">' + label + '</span>'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-kpi); '
            'line-height:var(--lh-kpi); color:' + tc + '; font-variant-numeric:tabular-nums">'
            + dato + '</span></div></div></div>')


C_BODY = ('__NAV__'
          '<div class="sec" style="padding-top:160px; padding-bottom:var(--space-20)">'
          '<div class="wrap" style="max-width:1000px">'
          '<h1 style="margin:0; font-size:var(--fs-display-xl); '
          'line-height:var(--lh-display-xl); font-weight:400; text-wrap:pretty">Turning ads into '
          '<span style="color:var(--text-accent)">answers</span>.</h1>'
          '<p style="margin:var(--space-10) 0 0; max-width:620px; font-size:var(--fs-body-l); '
          'line-height:var(--lh-body-l); color:var(--text-secondary)">Creemos en publicidad que '
          'aporta valor a quien la ve. Es toda la empresa en cuatro palabras, y el resto de esta '
          'página explica cómo se cumple.</p>'
          '<div style="display:flex; margin-top:var(--space-12)">'
          + pill("Cuéntanos tu objetivo") + '</div></div></div>'
          '<div style="height:180px; background:var(--brand-gradient-cta)"></div>'
          + declaracion("Un anuncio aporta valor cuando responde a lo que alguien",
                        "busca", "[ --- ]", "Fuentes cualificadas por categoría", True)
          + declaracion("Vera detecta esa navegación antes de que",
                        "ocurra", "[ --- ]", "Consumidores simulados por análisis", False)
          + declaracion("Lo convertimos en campañas y en presencia en la",
                        "IA", "[ --- ]", "Categorías activas", True))


for nombre, body, dark, minimal in [("DirectionA.dc.html", A_BODY, True, False),
                                    ("DirectionB.dc.html", B_BODY, False, False),
                                    ("DirectionC.dc.html", C_BODY, False, True)]:
    html = _shell.HEAD + _shell.HELMET + "\n\n" + body.replace("__NAV__", nav(dark, minimal)) + _shell.TAIL
    open(nombre, "w", encoding="utf-8").write(html)
    print("escrito", nombre)
