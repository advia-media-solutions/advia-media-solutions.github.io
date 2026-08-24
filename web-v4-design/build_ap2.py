"""A+ · /productos, /productos/paid-media, /productos/geo y /nosotros."""
import _ap as k

ML, B_L, B_M, B_S, SUB, KPI, MONO = k.ML, k.BODY_L, k.BODY_M, k.BODY_S, k.SUB, k.KPI, k.MONO_M


def chips(items, oscuro=True):
    bg = 'var(--surface-on-graphite)' if oscuro else 'var(--surface-sunken)'
    c = 'var(--neutral-400)' if oscuro else 'var(--text-secondary)'
    return ('<div style="display:flex; flex-wrap:wrap; gap:var(--space-3)">'
            + "".join('<span style="' + ML + ' color:' + c + '; background:' + bg + '; '
                      'padding:var(--space-2) var(--space-4); border-radius:var(--radius-sm)">'
                      + i + '</span>' for i in items) + '</div>')


def lista_panel(items, oscuro=False):
    bd = 'var(--border-on-graphite)' if oscuro else 'var(--border-subtle)'
    tc = 'var(--brand-ivory)' if oscuro else 'var(--text-primary)'
    fondo = 'var(--surface-on-graphite)' if oscuro else 'var(--surface-card)'
    borde = 'var(--border-on-graphite-strong)' if oscuro else 'var(--border-subtle)'
    fs = "".join(
        '<div style="display:flex; align-items:center; gap:var(--space-4); '
        'padding:var(--space-4) 0; border-top:1px solid ' + bd + '">'
        '<span style="' + MONO + ' color:var(--accent-gold)">' + "%02d" % (i + 1) + '</span>'
        '<span style="' + B_M + ' color:' + tc + '">' + t + '</span></div>'
        for i, t in enumerate(items))
    return ('<div style="background:' + fondo + '; border:1px solid ' + borde + '; '
            'border-radius:var(--radius-2xl); padding:var(--space-4) var(--space-8) '
            'var(--space-8)">' + fs + '</div>')


# ═══════════════════════════ /productos ═══════════════════════════
prod = (
    k.hero("Productos", "Las activaciones",
           "Cada sitio donde pregunta admite una forma distinta de " + k.key_dark("respuesta") + ".",
           "Esta página no lista productos: explica por qué hay dos antes de que elijas puerta.",
           extra=k.banda("Dónde pregunta tu consumidor",
                         chips(["Buscador", "Web abierta", "Vídeo", "Respuesta de la IA"])))

    + k.sec(
        k.cabecera("El puente",
                   "Donde hay inventario, la respuesta se " + k.key("compra") +
                   ". Donde no lo hay, se " + k.key("fabrica") + ".",
                   "Es toda la diferencia entre los dos productos, y no es una decisión nuestra: "
                   "la impone el canal.")
        + '<div style="margin-top:var(--space-12)">' + k.filas([
            ("01", "Open Web", "Lee análisis, pruebas y comparativas.",
             "La presencia", "Se compra: hay inventario y se puja por él", "Paid Media"),
            ("02", "YouTube", "Busca la review larga antes de cerrar.",
             "La presencia", "Se compra: hay inventario y se puja por él", "Paid Media"),
            ("03", "Redes sociales", "Descubre, aunque no venía buscando.",
             "La presencia", "Se fabrica: hay que ser el contenido que circula", "GEO"),
            ("04", "Respuestas de los LLMs", "Pregunta directamente qué le conviene.",
             "La presencia", "Se fabrica: hay que ser la fuente que el modelo cita", "GEO"),
        ]) + '</div>'
        + '<p style="margin:var(--space-8) 0 0; ' + ML + ' color:var(--text-tertiary)">'
          'Pendiente de confirmar: cómo se activa redes sociales y si la lista de canales se '
          'cierra aquí.</p>')

    + k.sec(k.split(
        '<div>' + k.cabecera("Donde la respuesta se compra",
                             "Navegación Activa en " + k.key_dark("Paid Media") + ".",
                             "Campañas en Open Web y YouTube colocadas sobre las fuentes que tu "
                             "consumidor consulta mientras compara.", oscuro=True, ancho="100%")
        + '<div style="margin-top:var(--space-8)">' + k.door("Ver el producto", True)
        + '</div></div>',
        lista_panel(["Territorios", "Producto", "Local"], oscuro=True),
        cols="3fr 2fr", align="center"), fondo="graphite")

    + k.sec(k.split(
        lista_panel(["Medimos cómo estás", "Diseñamos la estrategia", "Creamos el contenido"]),
        '<div>' + k.cabecera("Donde la respuesta se fabrica",
                             "Visibilidad Intencional en IA: " + k.key("GEO") + ".",
                             "No hay inventario que comprar. La única vía es ser la fuente que el "
                             "modelo cita, y eso se construye.", ancho="100%")
        + '<div style="margin-top:var(--space-8)">' + k.door("Ver el producto") + '</div></div>',
        cols="2fr 3fr", align="center"))

    + k.cierre("Precampaña: qué está preguntando tu consumidor, " +
               k.key_dark("antes de activar") + ".",
               "Nos cuentas el objetivo, simulamos el recorrido de tu target y te enseñamos dónde "
               "puedes responderle.", "Pedir una precampaña"))

print(k.escribir("Productos.dc.html", prod))


# ═══════════════════════ /productos/paid-media ═══════════════════════
def tipos():
    out = []
    for num, titulo, desc in [
            ("01", "Territorios", "Capitalizar un territorio que la marca aspira a conquistar."),
            ("02", "Producto", "De los primeros síntomas de necesidad a la compra."),
            ("03", "Local", "El comportamiento de búsqueda alrededor de una ciudad o región.")]:
        out.append(
            '<div style="background:var(--surface-card); border:1px solid var(--border-subtle); '
            'border-radius:var(--radius-2xl); padding:var(--space-8); display:flex; '
            'flex-direction:column; gap:var(--space-4); box-shadow:var(--card-shadow)">'
            '<span style="font-family:var(--font-mono); font-size:var(--fs-code-l); '
            'line-height:var(--lh-code-l); color:var(--text-accent)">' + num + '</span>'
            '<div style="' + SUB + '">' + titulo + '</div>'
            '<p style="margin:0; flex-grow:1; ' + B_M + ' color:var(--text-secondary)">'
            + desc + '</p>'
            '<div style="padding-top:var(--space-4); border-top:1px solid var(--border-subtle)">'
            '<span style="' + ML + ' color:var(--text-tertiary)">Verticales</span>'
            '<div style="margin-top:var(--space-2); ' + MONO + ' color:var(--text-secondary)">'
            '[ --- ]</div></div></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">' + "".join(out) + '</div>')


def canales_oscuro():
    def panel(nombre, desc):
        slots = "".join(
            '<div style="display:flex; align-items:center; justify-content:space-between; '
            'gap:var(--space-4); padding:var(--space-4) 0; '
            'border-top:1px solid var(--border-on-graphite)">'
            '<span style="' + B_M + ' color:var(--neutral-400)">Formato ' + str(i + 1) + '</span>'
            '<span style="' + MONO + ' color:var(--neutral-500)">[ --- ]</span></div>'
            for i in range(3))
        return ('<div style="background:var(--surface-on-graphite); border:1px solid '
                'var(--border-on-graphite-strong); border-radius:var(--radius-2xl); '
                'padding:var(--space-8)">'
                '<div style="' + SUB + ' color:var(--brand-ivory)">' + nombre + '</div>'
                '<p style="margin:var(--space-3) 0 var(--space-4); ' + B_M +
                ' color:var(--neutral-400)">' + desc + '</p>' + slots + '</div>')
    return ('<div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">'
            + panel("Open Web", "Donde compara: medios especializados, comparativas y artículos "
                                "de prueba.")
            + panel("YouTube", "Donde resuelve la duda larga: reviews, comparativas en vídeo y "
                               "demostraciones.") + '</div>')


def funnel():
    seg = ('<div style="flex-grow:{}; background:{}; padding:var(--space-6); '
           'border-radius:{}; display:flex; flex-direction:column; gap:var(--space-2)">'
           '<span style="' + ML + ' color:{}">{}</span>'
           '<span style="' + B_M + ' font-weight:600; color:{}">{}</span></div>')
    barra = ('<div style="display:flex; gap:var(--space-2); margin-top:var(--space-12)">'
             + seg.format(2, 'var(--surface-sunken)',
                          'var(--radius-lg) var(--radius-sm) var(--radius-sm) var(--radius-lg)',
                          'var(--text-tertiary)', 'Awareness', 'var(--text-secondary)',
                          'Brand-day, skins')
             + seg.format(3, 'var(--brand-graphite)', 'var(--radius-sm)',
                          'var(--accent-gold)', 'Advia', 'var(--brand-ivory)',
                          'De la parte baja de awareness a la consideración')
             + seg.format(2, 'var(--surface-sunken)',
                          'var(--radius-sm) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
                          'var(--text-tertiary)', 'Performance', 'var(--text-secondary)',
                          'Conversión pura') + '</div>')
    return barra + '<div style="margin-top:var(--space-6)">' + chips(
        ["Reach", "Viewability", "VTR", "CTR", "Qualified Visits"], oscuro=False) + '</div>'


def rinde():
    cs = []
    for label, desc in [("Viewability", "vs. benchmark de mercado"),
                        ("VTR", "vs. benchmark de mercado"),
                        ("Tiempo de atención", "media por impacto")]:
        cs.append('<div style="background:var(--surface-card); border:1px solid '
                  'var(--border-subtle); border-radius:var(--radius-kpi); padding:var(--space-8)">'
                  '<span style="' + ML + ' color:var(--text-secondary)">' + label + '</span>'
                  '<div style="margin:var(--space-3) 0 var(--space-2); ' + KPI +
                  ' color:var(--text-primary)">[ --- ]</div>'
                  '<span style="' + B_S + ' color:var(--text-secondary)">' + desc + '</span></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">' + "".join(cs) + '</div>')


paid = (
    k.hero("Productos", "Navegación Activa en Paid Media",
           "Tu marca dentro de la respuesta que ya estaba " + k.key_dark("leyendo") + ".",
           "Campañas en Open Web y YouTube colocadas sobre las fuentes que Vera ha visto en el "
           "recorrido de decisión de tu target.",
           miga="Navegación Activa en Paid Media",
           extra=k.banda("Tres formas de entrar",
                         chips(["Territorios", "Producto", "Local"])))

    + k.sec(
        k.cabecera("Tres tipos de Navegación Activa",
                   "No todas las decisiones empiezan en el mismo " + k.key("sitio") + ".")
        + tipos())

    + k.sec(
        k.cabecera("Los canales",
                   "Dónde ocurre cada tipo de búsqueda, y qué formato admite cada " +
                   k.key_dark("canal") + ".", oscuro=True)
        + canales_oscuro(), fondo="graphite")

    + k.sec(
        k.cabecera("Dónde encajamos",
                   "Ni reach puro ni performance puro: el tramo donde se " +
                   k.key("descartan marcas") + ".",
                   "La parte del funnel que casi nadie cose: desde la parte baja de awareness "
                   "hasta la consideración, cuando ya está comparando y todavía puede cambiar de "
                   "opinión.")
        + funnel())

    + k.sec(
        k.cabecera("Cómo rinde",
                   "Quien busca para decidir es más lento y más " + k.key("atento") +
                   " que quien hace scroll.",
                   "Lee, compara y vuelve. Eso se nota en viewability y en VTR.")
        + rinde()
        + '<p style="margin:var(--space-8) 0 0; ' + ML + ' color:var(--text-tertiary)">'
          'Cifras agregadas de campañas activadas. Pendientes de dato real.</p>', fondo="inset")

    + k.cierre("Precampaña: te enseñamos dónde puedes responder " +
               k.key_dark("antes de activar") + ".",
               "Con las fuentes concretas del recorrido de tu target y el forecast por KPI.",
               "Pedir una precampaña"))

print(k.escribir("PaidMedia.dc.html", paid))


# ═══════════════════════════ /productos/geo ═══════════════════════════
def respuesta_ia():
    fuentes = "".join(
        '<span style="' + ML + ' color:var(--neutral-400); background:var(--brand-graphite); '
        'border:1px solid var(--border-on-graphite-strong); padding:var(--space-1) '
        'var(--space-3); border-radius:var(--radius-sm)">fuente ' + str(i + 1) + '</span>'
        for i in range(3))
    return ('<div style="max-width:820px">'
            '<p style="margin:0; ' + B_L + ' color:var(--brand-ivory)">Para ese uso, las opciones '
            'más recomendadas son ' + k.key_dark("[tu marca]") + ', junto con otras dos '
            'alternativas del mismo segmento…</p>'
            '<div style="display:flex; gap:var(--space-2); margin-top:var(--space-5)">'
            + fuentes + '</div></div>')


def tres_medios():
    items = [("TV", "Te da visibilidad, pero le da igual el momento."),
             ("Search", "Llega cuando ya has decidido."),
             ("Motores generativos", "Visibilidad dentro del momento de decidir.")]
    out = []
    for i, (nombre, desc) in enumerate(items):
        dest = i == 2
        out.append(
            '<div style="background:' + ('var(--surface-card)' if dest else 'var(--surface-sunken)')
            + '; border:1px solid ' + ('var(--accent-gold)' if dest else 'var(--border-subtle)')
            + '; border-radius:var(--radius-lg); padding:var(--space-8)">'
            '<div style="' + SUB + ' color:'
            + ('var(--text-accent)' if dest else 'var(--text-primary)') + '">' + nombre + '</div>'
            '<p style="margin:var(--space-3) 0 0; ' + B_M + ' color:var(--text-secondary)">'
            + desc + '</p></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-4); margin-top:var(--space-12)">' + "".join(out) + '</div>')


def estanterias():
    items = [("Editorial", 88), ("Social", 66), ("Owned", 24), ("Multimedia", 72),
             ("Autoritario", 80)]
    out = []
    for nombre, alto in items:
        dest = nombre == "Owned"
        out.append(
            '<div style="display:flex; flex-direction:column; justify-content:flex-end; '
            'gap:var(--space-3); height:280px">'
            '<div style="height:' + str(int(alto * 2.4)) + 'px; '
            'border-radius:var(--radius-md); background:'
            + ('var(--chart-1-gradient)' if dest else 'var(--series-primary)') + '"></div>'
            '<span style="' + B_M + ' font-weight:' + ('700' if dest else '400') + '; color:'
            + ('var(--text-accent)' if dest else 'var(--text-primary)') + '">' + nombre + '</span>'
            '<span style="' + MONO + ' color:var(--text-secondary)">[ --- ]%</span></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(5, minmax(0, 1fr)); '
            'gap:var(--space-5); margin-top:var(--space-12); align-items:end">'
            + "".join(out) + '</div>')


geo = (
    k.hero("Productos", "Visibilidad Intencional en IA: GEO",
           "Tu marca en la " + k.key_dark("respuesta") + " de la IA.",
           "Cuando alguien pregunta por tu categoría, el modelo contesta con un puñado de marcas "
           "y unas cuantas fuentes. Trabajamos para que estés entre ellas.",
           miga="Visibilidad Intencional en IA: GEO", xl=True,
           extra=k.banda("Simulación de respuesta generativa", respuesta_ia()))

    + k.sec(
        k.cabecera("Visibilidad Intencional",
                   "La visibilidad de la TV, exactamente en el momento en que alguien " +
                   k.key("decide") + ".",
                   "A eso lo llamamos Visibilidad Intencional, y es lo que abren los motores "
                   "generativos: un sitio donde se ve tu marca justo mientras se está eligiendo.")
        + tres_medios()
        + '<div style="margin-top:var(--space-12); max-width:860px">'
          '<p style="margin:0; ' + B_L + ' color:var(--text-primary)">«Millones de nuevos '
          'prescriptores ultrainformados… y no puedes llamarles para pedirles que corrijan su '
          'mensaje.»</p>'
          '<div style="margin-top:var(--space-4); ' + ML + ' color:var(--text-secondary)">'
          'Blog · Introducción a la Navegación Activa, III</div></div>')

    + k.sec(
        k.cabecera("El paquete completo",
                   "No vendemos un dashboard: cerramos el " + k.key_dark("ciclo") + ".",
                   "Medimos cómo estás, decidimos dónde merece la pena pelear y creamos el "
                   "contenido que el modelo cita.", oscuro=True)
        + '<div style="margin-top:var(--space-16)">' + k.secuencia([
            ("Medimos", "Cómo apareces hoy en las respuestas de tu categoría."),
            ("Diseñamos", "En qué factores merece la pena pelear, y en cuáles no."),
            ("Creamos", "El contenido que la IA cita, donde la IA se informa.")], oscuro=True)
        + '</div>'
        + '<div style="margin-top:var(--space-10)">' + k.nota(
            "Y volvemos a medir. El ciclo se cierra sobre sí mismo: cada pieza publicada cambia "
            "lo que el modelo cita, y esa variación es la que medimos en la vuelta siguiente.",
            oscuro=True) + '</div>', fondo="graphite")

    + k.sec(k.split(
        '<div>' + k.cabecera("Medimos",
                             "Del Share of Search al " + k.key("Share of Answer") + ".",
                             "Cuánto apareces, en qué posición, frente a quién y por qué "
                             "factores.", ancho="100%") + '</div>',
        k.panel_datos("Share of Answer", "Cuota de respuesta",
                      [("Tu marca", "categoría", 46), ("Competidor A", "categoría", 68),
                       ("Competidor B", "categoría", 31)],
                      nota="Reparto ilustrativo. Cuotas pendientes de dato real.", oscuro=False),
        cols="2fr 3fr", align="start"))

    + k.sec(
        k.cabecera("Diseñamos la estrategia",
                   "Medir no mueve nada. Decidimos " +
                   k.key("en qué factores merece la pena pelear") + ".",
                   "Entendemos por qué tu presencia es la que es, factor a factor, y concentramos "
                   "el esfuerzo ahí. No hace falta salir primero en todo.")
        + '<div style="margin-top:var(--space-10); max-width:900px">' + k.nota(
            "Salir primero en todo no es un objetivo alcanzable ni útil: los modelos citan por "
            "factores distintos según la pregunta. Elegir dos o tres donde sí puedes ganar rinde "
            "más que repartir el esfuerzo entre veinte.") + '</div>', fondo="inset")

    + k.sec(
        k.cabecera("GEO va más allá del SEO",
                   "Solo una fracción pequeña de las fuentes que cita la IA son de tu web. Hacen "
                   "falta las " + k.key("cinco estanterías") + ".",
                   "Editorial, social, owned, multimedia y contenido autoritario. La propia es la "
                   "que menos pesa, y es justo la única que la mayoría trabaja.")
        + estanterias()
        + '<p style="margin:var(--space-6) 0 0; ' + ML + ' color:var(--text-tertiary)">'
          'Proporción ilustrativa. El reparto real de fuentes citadas se mide por categoría y '
          'pende de dato real.</p>')

    + k.sec(
        k.cabecera("Creamos el contenido", "El " + k.key("loop") + " es el producto.",
                   "AI-Readable Content: contenido editorial diseñado para que los modelos lo "
                   "citen, publicado donde la IA se informa. Después volvemos a medir, y el "
                   "reparto de fuentes dice si funcionó.")
        + '<p style="margin:var(--space-8) 0 0; ' + ML + ' color:var(--text-tertiary)">'
          'Nomenclatura a unificar antes de publicar: AI-Readable vs. AI-Friendly Content.</p>',
        fondo="inset")

    + k.cierre("Pide un análisis de tu " + k.key_dark("visibilidad en IA") + ".",
               "Te enseñamos cuánto apareces hoy en las respuestas de tu categoría, frente a "
               "quién y por qué factores.", "Pedir el análisis"))

print(k.escribir("Geo.dc.html", geo))


# ═══════════════════════════ /nosotros ═══════════════════════════
def equipo():
    cs = []
    for valor, label, desc in [("12", "Personas", "El equipo hoy."),
                               ("3", "Áreas", "Cada una liderada por un fundador."),
                               ("[ --- ]", "Mercados", "Pendiente de dato real.")]:
        cs.append('<div style="background:var(--surface-on-graphite); border:1px solid '
                  'var(--border-on-graphite-strong); border-radius:var(--radius-kpi); '
                  'padding:var(--space-8)">'
                  '<div style="' + KPI + ' color:var(--accent-gold)">' + valor + '</div>'
                  '<div style="margin-top:var(--space-2); ' + ML + ' color:var(--neutral-500)">'
                  + label + '</div>'
                  '<p style="margin:var(--space-3) 0 0; ' + B_M + ' color:var(--neutral-400)">'
                  + desc + '</p></div>')
    return ('<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); '
            'gap:var(--space-6); margin-top:var(--space-12)">' + "".join(cs) + '</div>')


def clientes():
    fs = "".join(
        '<div style="display:flex; align-items:center; justify-content:space-between; '
        'gap:var(--space-4); padding:var(--space-5) 0; border-top:1px solid var(--border-subtle)">'
        '<span style="' + B_L + ' color:var(--text-primary)">' + n + '</span>'
        '<span style="' + MONO + ' color:var(--text-tertiary)">[ --- ]</span></div>'
        for n in ["Grupos de agencias", "Sectores donde estamos", "Mercados activos"])
    return ('<div style="margin-top:var(--space-12); max-width:820px">' + fs +
            '<p style="margin:var(--space-6) 0 0; ' + ML + ' color:var(--text-tertiary)">'
            'Nombres solo con permiso verificado. Por defecto, agregados y anónimos.</p></div>')


def valores():
    vs = ["#WorkHardPlayHard", "#Superhuman", "#RightOverEasy", "#Imagine", "#WinAsOne"]
    return ('<div style="display:flex; flex-wrap:wrap; gap:var(--space-3); '
            'margin-top:var(--space-12)">'
            + "".join('<span style="' + SUB + ' color:var(--text-primary); '
                      'background:var(--surface-card); border:1px solid var(--border-subtle); '
                      'padding:var(--space-4) var(--space-6); border-radius:var(--radius-pill)">'
                      + v + '</span>' for v in vs) + '</div>')


nos = (
    k.hero("Nosotros", "Nosotros",
           "Estábamos convencidos de que la publicidad digital podía " +
           k.key_dark("ser mejor") + ".",
           "Veníamos de hacerla desde dentro, y empezamos incómodos con cómo se planificaba.")

    + k.sec(
        k.cabecera("Por qué existe Advia",
                   "Casi toda campaña se piensa desde el lado del anunciante. Fundamos Advia para "
                   "trabajar desde el lado de quien " + k.key("busca") + ".",
                   "Es lógico que se piense desde el anunciante: es quien paga. Pero el impacto "
                   "lo recibe otra persona, que en ese momento estaba intentando resolver algo "
                   "suyo.")
        + '<div style="margin-top:var(--space-10); max-width:900px">' + k.nota(
            "Cambiar de lado cambia qué se planifica: dejas de preguntarte dónde cabe tu anuncio "
            "y empiezas a preguntarte qué está intentando averiguar tu consumidor. De ahí sale "
            "Turning ads into answers.") + '</div>')

    + k.sec(
        k.cabecera("De dónde venimos",
                   "Conocemos el ciclo de una campaña " + k.key_dark("desde dentro") + ".",
                   "Tres fundadores con recorrido en Seedtag y GroupM: el lado del medio y el "
                   "lado de la agencia, que es donde se ve qué se rompe entre el plan y el "
                   "resultado.", oscuro=True)
        + equipo(), fondo="graphite")

    + k.sec(
        k.cabecera("Con quién trabajamos",
                   "Los grandes grupos de agencias, y los sectores donde " + k.key("estamos") + ".")
        + clientes())

    + k.sec(
        k.cabecera("Valores",
                   "Cinco cosas que decidimos " + k.key("antes") + " de contratar a nadie.")
        + valores(), fondo="inset")

    + k.cierre("Cómo trabajamos, y a quién " + k.key_dark("buscamos") + ".",
               "Si te interesa el problema que estamos resolviendo, escríbenos aunque no haya una "
               "vacante abierta con tu nombre.", "Únete al equipo"))

print(k.escribir("Nosotros.dc.html", nos))
