import { Easing, interpolate } from "remotion";
import { FONT_DATA } from "./fontData";

/**
 * Polices locales (licence SIL OFL) embarquées en base64 et déclarées en
 * @font-face : aucune requête réseau, aucun verrou delayRender bloquant.
 */
const FONTS: [string, string][] = [
  ["Montserrat", "600"], ["Montserrat", "700"], ["Montserrat", "800"], ["Montserrat", "900"],
  ["Inter", "400"], ["Inter", "500"], ["Inter", "600"],
];
if (typeof document !== "undefined" && !document.getElementById("arosoft-fonts")) {
  const style = document.createElement("style");
  style.id = "arosoft-fonts";
  style.textContent = FONTS.map(
    ([family, weight]) =>
      `@font-face{font-family:"${family}";font-weight:${weight};font-style:normal;font-display:block;src:url(${FONT_DATA[`${family.toLowerCase()}-latin-${weight}-normal.woff2`]}) format("woff2");}`
  ).join("\n");
  document.head.appendChild(style);
}

/** Palette relevée sur le logo officiel */
export const C = {
  night: "#101D3C",
  abyss: "#08112A",
  royal: "#073BB4",
  electric: "#086CF0",
  cyan: "#079CEF",
  white: "#FFFFFF",
  light: "#E7EDF5",
  ink: "#0B1633",
  mute: "#8A9BBE",
};

export const FONT_TITLE = "Montserrat, sans-serif";
export const FONT_BODY = "Inter, sans-serif";

/** Courbes d'animation (motion design) */
export const E = {
  out: Easing.bezier(0.16, 1, 0.3, 1), // expo out : arrivée rapide, freinage doux
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
  back: Easing.bezier(0.34, 1.56, 0.64, 1), // léger dépassement
  linear: Easing.linear,
};

/** interpolation bornée */
export const tw = (
  f: number,
  start: number,
  dur: number,
  from: number,
  to: number,
  ease: (t: number) => number = E.out
) =>
  interpolate(f, [start, start + Math.max(1, dur)], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

/** interpolation multi-clés bornée */
export const kf = (
  f: number,
  input: number[],
  output: number[],
  ease: (t: number) => number = E.inOut
) =>
  interpolate(f, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

export const gradText = (a = C.cyan, b = C.electric): React.CSSProperties => ({
  backgroundImage: `linear-gradient(100deg, ${a}, ${b})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});

