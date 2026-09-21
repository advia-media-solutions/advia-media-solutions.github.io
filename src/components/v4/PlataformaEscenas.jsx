import Citas from "./PlataformaCitas";
import Evolucion from "./PlataformaEvolucion";
import Plan from "./PlataformaPlan";
import Respuestas from "./PlataformaRespuestas";

/**
 * Las pantallas de la plataforma que cuelgan de la barra lateral, en el orden
 * en que se trabaja un cliente (ver Plataforma.jsx). El brief no está aquí:
 * se abre desde una fila del plan (PlataformaBrief.jsx).
 *
 * Cada una es una versión recogida de la pantalla real: lo justo para que se
 * reconozca y se lea a este tamaño. Las cifras son de ejemplo y no salen de
 * ninguna medición; viven en cada pantalla porque no cambian con el idioma. Lo
 * que sí cambia está en el diccionario.
 */
const ESCENAS = [Respuestas, Citas, Plan, Evolucion];
export default ESCENAS;
