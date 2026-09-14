"""Kit de la dirección A+ (Instrumento). Piezas compartidas por las siete páginas."""
import re
import _shell

ML = ('font-family:var(--font-mono); font-size:var(--fs-code-xs); '
      'line-height:var(--lh-code-xs); letter-spacing:1px; text-transform:uppercase;')
ARROW = ('<svg class="icon" viewBox="0 -960 960 960" aria-hidden="true">'
         '<path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z"/></svg>')
PADX = 'padding-left:var(--web-section-pad-x); padding-right:var(--web-section-pad-x);'

LOGO_LIGHT = re.search(r'<svg width="106"[\s\S]*?</svg>', _shell.FOOTER).group(0)

H_XL = ('font-size:var(--fs-display-xl); line-height:var(--lh-display-xl); font-weight:400;')
H_L = ('font-size:var(--fs-display-l); line-height:var(--lh-display-l); font-weight:300;')
H_M = ('font-size:var(--fs-heading); line-height:var(--lh-heading); font-weight:700;')
SUB = ('font-size:var(--fs-subheading); line-height:var(--lh-subheading); font-weight:700;')
BODY_L = 'font-size:var(--fs-body-l); line-height:var(--lh-body-l);'
BODY_M = 'font-size:var(--fs-body-m); line-height:var(--lh-body-m);'
BODY_S = 'font-size:var(--fs-body-s); line-height:var(--lh-body-s);'
MONO_M = 'font-family:var(--font-mono); font-size:var(--fs-code-m); line-height:var(--lh-code-m);'
KPI = ('font-family:var(--font-mono); font-size:var(--fs-kpi); line-height:var(--lh-kpi); '
       'font-variant-numeric:tabular-nums;')


def key(t):
    """Palabra clave dorada. Solo sobre dato o mecanismo (voz §8)."""
    return '<span style="color:var(--text-accent); font-weight:600">' + t + '</span>'


def key_dark(t):
    return '<span style="color:var(--accent-gold); font-weight:600">' + t + '</span>'


def door(text, dark=False):
    c = "var(--accent-gold)" if dark else "var(--text-accent)"
    return ('<span style="display:inline-flex; align-items:center; gap:var(--space-2); color:'
            + c + '; font-size:var(--fs-button); line-height:var(--lh-button); '
            'font-weight:700">' + text + ARROW + '</span>')


def pill(text):
    return ('<span style="background:var(--accent-gold); color:var(--text-on-gold); '
            'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
            'padding:var(--space-4) var(--space-10); border-radius:var(--radius-pill)">'
            + text + '</span>')


def ghost(text, dark=False):
    bd = 'var(--border-on-graphite-strong)' if dark else 'var(--border-strong)'
    c = 'var(--brand-ivory)' if dark else 'var(--text-primary)'
    return ('<span style="border:1px solid ' + bd + '; color:' + c + '; '
            'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
            'padding:var(--space-4) var(--space-8); border-radius:var(--radius-pill)">'
            + text + '</span>')


def trama():
    lineas = "".join(
        '<line x1="%d" y1="0" x2="%d" y2="1200" style="stroke:var(--brand-ivory); '
        'stroke-width:1; opacity:.05" />' % (x, x) for x in range(80, 1440, 80))
    return ('<svg viewBox="0 0 1440 1200" width="100%" height="100%" '
            'preserveAspectRatio="none" aria-hidden="true">' + lineas + '</svg>')


def nav_oscura(activo=None):
    items = ["Navegación Activa", "Tecnología", "Productos", "Nosotros", "Blog"]
    links = []
    for i in items:
        if i == activo:
            links.append('<span style="' + BODY_M + ' color:var(--brand-ivory); font-weight:600; '
                         'padding-bottom:var(--space-1); '
                         'border-bottom:2px solid var(--accent-gold)">' + i + '</span>')
        else:
            links.append('<span style="' + BODY_M + ' color:var(--neutral-400)">' + i + '</span>')
    return ('<div style="position:relative; z-index:2; border-bottom:1px solid '
            'var(--border-on-graphite)">'
            '<div style="max-width:var(--web-content-width); margin:0 auto; ' + PADX +
            ' height:76px; display:flex; align-items:center; justify-content:space-between; '
            'gap:var(--space-8)">' + LOGO_LIGHT +
            '<div style="display:flex; align-items:center; gap:var(--space-6)">' + "".join(links) +
            '<span style="background:var(--accent-gold); color:var(--text-on-gold); '
            'font-size:var(--fs-button); line-height:var(--lh-button); font-weight:700; '
            'padding:var(--space-3) var(--space-6); border-radius:var(--radius-pill)">Hablemos'
            '</span></div></div></div>')


def hero(activo, eyebrow, titular, lede, botones="", extra="", xl=False, miga=None):
    """Hero oscuro con velo dorado y retícula. `extra` va a sangre bajo el bloque de texto."""
    migaja = ""
    if miga:
        migaja = ('<div style="display:flex; align-items:center; gap:var(--space-3); '
                  'margin-bottom:var(--space-8)">'
                  '<span style="' + ML + ' color:var(--neutral-500)">Productos</span>'
                  '<span style="' + ML + ' color:var(--neutral-500)">/</span>'
                  '<span style="' + ML + ' color:var(--neutral-400)">' + miga + '</span></div>')
    cta = ''
    if botones:
        cta = ('<div style="display:flex; gap:var(--space-4); margin-top:var(--space-10)">'
               + botones + '</div>')
    return ('<div style="position:relative; background:var(--brand-graphite); overflow:hidden">'
            '<div style="position:absolute; top:0; left:0; right:0; bottom:0; '
            'background:radial-gradient(70% 60% at 12% 0%, var(--gold-veil) 0%, transparent 70%)">'
            '</div>'
            '<div style="position:absolute; top:0; left:0; right:0; bottom:0">' + trama() + '</div>'
            + nav_oscura(activo) +
            '<div style="position:relative; z-index:2; max-width:var(--web-content-width); '
            'margin:0 auto; ' + PADX + ' padding-top:var(--space-20); padding-bottom:'
            + ('0' if extra else 'var(--space-20)') + '">'
            + migaja +
            '<div style="' + ML + ' color:var(--accent-gold)">' + eyebrow + '</div>'
            '<h1 style="margin:var(--space-8) 0 0; max-width:' + ('1000px' if xl else '940px') +
            '; ' + (H_XL if xl else H_L) + ' color:var(--brand-ivory); text-wrap:pretty">'
            + titular + '</h1>'
            '<p style="margin:var(--space-8) 0 0; max-width:680px; ' + BODY_L +
            ' color:var(--neutral-400)">' + lede + '</p>' + cta + '</div>'
            + extra + '</div>')


def banda(caption, contenido, nota=None):
    """Banda a sangre al pie del hero: fondo hundido sobre grafito."""
    pie = ''
    if nota:
        pie = ('<p style="margin:var(--space-5) 0 0; ' + ML + ' color:var(--neutral-500)">'
               + nota + '</p>')
    return ('<div style="position:relative; z-index:2; margin-top:var(--space-20); '
            'border-top:1px solid var(--border-on-graphite); '
            'background:var(--surface-on-graphite)">'
            '<div style="max-width:var(--web-content-width); margin:0 auto; ' + PADX +
            ' padding-top:var(--space-8); padding-bottom:var(--space-8)">'
            '<span style="' + ML + ' color:var(--neutral-500)">' + caption + '</span>'
            '<div style="margin-top:var(--space-5)">' + contenido + '</div>' + pie + '</div></div>')


def sec(contenido, fondo="page", pad=None):
    """Sección de página. fondo: page | inset | graphite."""
    bg = {"page": "var(--surface-page)", "inset": "var(--surface-inset)",
          "graphite": "var(--brand-graphite)"}[fondo]
    p = pad or "var(--web-section-pad-y)"
    return ('<div style="background:' + bg + '; padding:' + p + ' var(--web-section-pad-x)">'
            '<div class="wrap">' + contenido + '</div></div>')


def cabecera(eyebrow, titular, lede=None, oscuro=False, ancho="900px"):
    tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
    ec = 'var(--neutral-500)' if oscuro else 'var(--text-secondary)'
    lc = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
    out = ('<div style="' + ML + ' color:' + ec + '">' + eyebrow + '</div>'
           '<h2 style="margin:var(--space-5) 0 0; max-width:' + ancho + '; ' + H_L +
           ' color:' + tc + '; text-wrap:pretty">' + titular + '</h2>')
    if lede:
        out += ('<p style="margin:var(--space-6) 0 0; max-width:720px; ' + BODY_L +
                ' color:' + lc + '">' + lede + '</p>')
    return out


def split(izq, der, cols="3fr 2fr", align="center", gap="var(--space-16)"):
    return ('<div style="display:grid; grid-template-columns:' + cols + '; gap:' + gap +
            '; align-items:' + align + '">' + izq + der + '</div>')


def filas(items, oscuro=False):
    """Filas editoriales: índice · concepto · desarrollo · etiqueta."""
    bd = 'var(--border-on-graphite)' if oscuro else 'var(--border-subtle)'
    tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
    sc = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
    lc = 'var(--neutral-500)' if oscuro else 'var(--text-tertiary)'
    out = []
    for num, titulo, desc, rotulo, cuerpo, etiqueta in items:
        tag = ''
        if etiqueta:
            tag = ('<span style="' + ML + ' color:' + sc + '; background:'
                   + ('var(--surface-on-graphite)' if oscuro else 'var(--surface-sunken)') +
                   '; padding:var(--space-2) var(--space-4); border-radius:var(--radius-sm)">'
                   + etiqueta + '</span>')
        out.append(
            '<div style="display:grid; grid-template-columns:auto 3fr 4fr auto; '
            'gap:var(--space-8); align-items:center; padding:var(--space-6) 0; '
            'border-top:1px solid ' + bd + '">'
            '<span style="' + MONO_M + ' color:var(--accent-gold)">' + num + '</span>'
            '<div><div style="' + SUB + ' color:' + tc + '">' + titulo + '</div>'
            '<p style="margin:var(--space-1) 0 0; ' + BODY_M + ' color:' + sc + '">'
            + desc + '</p></div>'
            '<div style="border-left:2px solid var(--accent-gold); padding-left:var(--space-5)">'
            '<span style="' + ML + ' color:' + lc + '">' + rotulo + '</span>'
            '<p style="margin:var(--space-2) 0 0; ' + BODY_L + ' color:' + tc + '">'
            + cuerpo + '</p></div>' + tag + '</div>')
    return "".join(out)


def pasos(items, oscuro=True):
    """Columna de pasos con hilo vertical."""
    tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
    sc = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
    hilo = 'var(--border-on-graphite-strong)' if oscuro else 'var(--border-default)'
    out = []
    for i, (titulo, texto) in enumerate(items):
        out.append(
            '<div style="display:grid; grid-template-columns:auto 1fr; gap:var(--space-5); '
            'padding-bottom:var(--space-8)">'
            '<div style="display:flex; flex-direction:column; align-items:center; '
            'gap:var(--space-2)">'
            '<span style="width:14px; height:14px; border-radius:var(--radius-full); '
            'background:var(--accent-gold)"></span>'
            + ('<span style="flex-grow:1; width:1px; background:' + hilo + '"></span>'
               if i < len(items) - 1 else '') + '</div>'
            '<div><div style="' + BODY_M + ' font-weight:700; color:' + tc + '">' + titulo + '</div>'
            '<p style="margin:var(--space-2) 0 0; ' + BODY_M + ' color:' + sc + '">'
            + texto + '</p></div></div>')
    return "".join(out)


def secuencia(nodos, oscuro=False):
    """Secuencia horizontal de paradas con hilo y bolitas."""
    bd = 'var(--border-on-graphite-strong)' if oscuro else 'var(--border-default)'
    sc = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
    tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
    chipbg = 'var(--surface-on-graphite)' if oscuro else 'var(--surface-sunken)'
    n = len(nodos)
    dots = "".join(
        '<div style="width:18px; height:18px; border-radius:var(--radius-full); '
        'background:var(--accent-gold); box-shadow:0 0 0 6px '
        + ('var(--surface-on-graphite)' if oscuro else 'var(--gold-crema)') + '"></div>'
        for _ in nodos)
    labels = "".join(
        '<div style="display:flex; flex-direction:column; align-items:flex-start; '
        'gap:var(--space-3)">'
        '<span style="' + ML + ' color:' + sc + '; background:' + chipbg + '; '
        'padding:var(--space-1) var(--space-3); border-radius:var(--radius-sm)">' + p + '</span>'
        '<p style="margin:0; ' + BODY_L + ' color:' + tc + '">' + q + '</p></div>'
        for p, q in nodos)
    return ('<div style="position:relative; padding-top:var(--space-2)">'
            '<div style="position:absolute; left:9px; right:9px; top:17px; height:1px; '
            'background:' + bd + '"></div>'
            '<div style="position:relative; display:grid; grid-template-columns:repeat('
            + str(n) + ', minmax(0, 1fr)); gap:var(--space-6)">' + dots + '</div></div>'
            '<div style="display:grid; grid-template-columns:repeat(' + str(n) +
            ', minmax(0, 1fr)); gap:var(--space-6); margin-top:var(--space-5)">'
            + labels + '</div>')


def panel_datos(caption, meta, items, nota=None, oscuro=True):
    """Panel de barras: cada fila un concepto con su cuota en hueco."""
    bd = 'var(--border-on-graphite)' if oscuro else 'var(--border-subtle)'
    tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
    sc = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
    lc = 'var(--neutral-500)' if oscuro else 'var(--text-tertiary)'
    fondo = 'var(--surface-on-graphite)' if oscuro else 'var(--surface-card)'
    pista = 'var(--surface-on-graphite)' if not oscuro else 'var(--brand-graphite)'
    borde = 'var(--border-on-graphite-strong)' if oscuro else 'var(--border-subtle)'
    fs = []
    for nombre, etiqueta, ancho in items:
        fs.append(
            '<div style="display:flex; flex-direction:column; gap:var(--space-2); '
            'padding:var(--space-4) 0; border-top:1px solid ' + bd + '">'
            '<div style="display:flex; align-items:baseline; justify-content:space-between; '
            'gap:var(--space-4)">'
            '<span style="' + BODY_M + ' color:' + tc + '">' + nombre + '</span>'
            '<span style="' + MONO_M + ' color:' + sc + '">[ --- ]%</span></div>'
            '<div style="display:flex; align-items:center; gap:var(--space-3)">'
            '<div style="flex-grow:1; height:6px; border-radius:var(--radius-sm); background:'
            + pista + '">'
            '<div style="width:' + str(ancho) + '%; height:6px; '
            'border-radius:var(--radius-sm); background:var(--chart-1-gradient)"></div></div>'
            '<span style="' + ML + ' color:' + lc + '">' + etiqueta + '</span></div></div>')
    pie = ''
    if nota:
        pie = ('<p style="margin:var(--space-6) 0 0; ' + ML + ' color:' + lc + '">' + nota + '</p>')
    return ('<div style="background:' + fondo + '; border:1px solid ' + borde + '; '
            'border-radius:var(--radius-2xl); padding:var(--space-8)">'
            '<div style="display:flex; align-items:baseline; justify-content:space-between; '
            'gap:var(--space-4); padding-bottom:var(--space-4)">'
            '<span style="' + ML + ' color:var(--accent-gold)">' + caption + '</span>'
            '<span style="' + ML + ' color:' + lc + '">' + meta + '</span></div>'
            + "".join(fs) + pie + '</div>')


def bloques(a, b):
    """Par contrastado: uno marfil, uno grafito."""
    def uno(label, titulo, texto, cta, oscuro):
        bg = 'var(--brand-graphite)' if oscuro else 'var(--surface-card)'
        bd = 'var(--brand-graphite)' if oscuro else 'var(--border-default)'
        tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
        sc = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
        lc = 'var(--accent-gold)' if oscuro else 'var(--text-secondary)'
        return ('<div style="background:' + bg + '; border:1px solid ' + bd + '; '
                'border-radius:var(--radius-2xl); padding:var(--space-10); display:flex; '
                'flex-direction:column; gap:var(--space-4)">'
                '<span style="' + ML + ' color:' + lc + '">' + label + '</span>'
                '<div style="' + SUB + ' color:' + tc + '; text-wrap:pretty">' + titulo + '</div>'
                '<p style="margin:0; flex-grow:1; ' + BODY_M + ' color:' + sc + '">'
                + texto + '</p>' + door(cta, True) + '</div>')
    return ('<div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">' + uno(*a, oscuro=False)
            + uno(*b, oscuro=True) + '</div>')


def nota(texto, oscuro=False):
    """Nota analítica: barra dorada a la izquierda, esquinas solo a la derecha."""
    bg = 'var(--surface-on-graphite)' if oscuro else 'var(--surface-sunken)'
    c = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
    return ('<div style="background:' + bg + '; border-left:4px solid var(--accent-gold); '
            'border-radius:0 var(--radius-xl) var(--radius-xl) 0; '
            'padding:var(--space-5) var(--space-6)">'
            '<p style="margin:0; ' + BODY_M + ' color:' + c + '">' + texto + '</p></div>')


def cierre(titular, lede, boton):
    return ('<div style="background:var(--brand-graphite); padding:112px var(--web-section-pad-x)">'
            '<div class="wrap">'
            '<h2 style="margin:0; max-width:940px; ' + H_M + ' color:var(--brand-ivory); '
            'text-wrap:pretty">' + titular + '</h2>'
            '<p style="margin:var(--space-6) 0 0; max-width:660px; ' + BODY_L +
            ' color:var(--neutral-400)">' + lede + '</p>'
            '<div style="display:flex; margin-top:var(--space-10)">' + pill(boton) + '</div>'
            '</div></div>')


def escribir(nombre, cuerpo):
    html = _shell.HEAD + _shell.HELMET + "\n\n" + cuerpo + _shell.FOOTER + _shell.TAIL
    open(nombre, "w", encoding="utf-8").write(html)
    return nombre
