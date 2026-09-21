import React from "react";
import {
  siBmw,
  siCitroen,
  siDacia,
  siHyundai,
  siKia,
  siNissan,
  siPeugeot,
  siRenault,
  siSeat,
  siSkoda,
  siTesla,
  siToyota,
  siVolkswagen,
  siVolvo,
} from "simple-icons";

/**
 * Una marca con su logotipo, como en las tablas del producto.
 *
 * Los logotipos salen del catálogo oficial de simple-icons y se pintan tal
 * cual vienen, en su color de marca: nunca redibujados. BYD no está en el
 * catálogo: su trazado es el del producto, pegado tal cual. Es un logotipo
 * apaisado, no un símbolo cuadrado, así que lleva su propia caja y va en el
 * color del texto. Una marca sin logotipo sale con un monograma de sus
 * iniciales, que no pretende serlo.
 */

/* El logotipo de BYD, del propio producto. No se toca ni un punto. */
const BYD = {
  caja: "0 7 94 18",
  path: "M75.0205 7.00977C77.7503 7.09658 80.8465 7.09668 82.8916 7.09668C85.3901 7.00986 87.8508 7.71443 89.9248 9.10352L89.8662 9.08398C90.6669 9.64349 91.3614 10.338 91.9209 11.1387C94.6123 14.9587 93.6862 20.2354 89.8662 22.9268C87.7826 24.2964 85.3226 24.9911 82.834 24.9043C77.6346 25.0008 72.7342 25 65.9238 25V21.5371C72.6377 21.5371 77.4319 21.5851 82.6602 21.4404C84.3096 21.4983 85.9304 21.0741 87.3291 20.2061C87.8596 19.8492 88.313 19.3957 88.6699 18.8652C90.252 16.5405 89.6539 13.3857 87.3291 11.8037C85.9497 10.9646 84.3577 10.5497 82.7373 10.6172C77.4319 10.5304 72.7531 10.5303 65.9814 10.5303V7.00977H75.0205ZM61.8018 7V13.8975C61.6763 17.1963 60.6046 18.1994 57.0645 18.2959H49.9365V24.9805H45.2383V14.7754H55.4346C57.248 14.7465 57.8368 14.1771 57.8369 12.4121C57.8562 10.695 57.8369 8.746 57.8369 7H61.8018ZM21.0869 7.05859C23.2476 6.9525 25.3217 7.92686 26.624 9.66309C27.907 11.6599 27.5988 14.2838 25.8818 15.9141C27.647 17.5636 27.9552 20.2457 26.624 22.2617C25.3314 23.9979 23.2572 24.9812 21.0869 24.8848H0V21.4219H20.9912C22.2354 21.4025 23.5566 20.959 23.5566 19.5605C23.5566 18.1523 22.2355 17.6983 20.9912 17.6982H0V14.2744H20.9912C22.0233 14.2647 23.074 14.0037 23.4502 12.9717C23.6914 12.3254 23.5081 11.5833 22.9775 11.1299C22.4182 10.6863 21.7049 10.4832 20.9912 10.541H0V7.05859H21.0869ZM35.6221 12.4111C35.6317 14.215 36.2109 14.833 38.0244 14.833H43.4648V18.3154H36.1338C32.8154 18.2093 31.7348 17.1765 31.6094 13.916V7.05762H35.6221C35.6221 8.76496 35.6124 10.6073 35.6221 12.4111Z",
};
const LOGOS = {
  BMW: siBmw,
  BYD,
  Citroën: siCitroen,
  Dacia: siDacia,
  Hyundai: siHyundai,
  Kia: siKia,
  Nissan: siNissan,
  Peugeot: siPeugeot,
  Renault: siRenault,
  Seat: siSeat,
  Skoda: siSkoda,
  Tesla: siTesla,
  Toyota: siToyota,
  Volkswagen: siVolkswagen,
  Volvo: siVolvo,
};

/* El sistema no admite negro puro: un logotipo que lo traiga va en grafito. */
const NEGRO_PURO = "000000";

export default function Marca({ nombre, soloLogo = false }) {
  const icono = LOGOS[nombre];
  const tinta = icono?.hex && icono.hex !== NEGRO_PURO ? `#${icono.hex}` : undefined;
  return (
    <span className="v4-plat-marca" title={soloLogo ? nombre : undefined}>
      <span className="v4-plat-marca__logo" aria-hidden={soloLogo ? undefined : "true"}>
        {icono ? (
          <svg
            viewBox={icono.caja || "0 0 24 24"}
            data-apaisado={icono.caja ? "true" : undefined}
            style={{ fill: tinta }}
            role={soloLogo ? "img" : undefined}
          >
            {soloLogo ? <title>{nombre}</title> : null}
            <path d={icono.path} />
          </svg>
        ) : (
          nombre.slice(0, 2).toUpperCase()
        )}
      </span>
      {soloLogo ? null : nombre}
    </span>
  );
}
