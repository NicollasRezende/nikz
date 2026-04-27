import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nicollas Rezende — Full Stack Developer",
    short_name: "Nicollas Rezende",
    description:
      "Portfólio de Nicollas Rezende — full stack focado em portais governamentais, automação e soluções escaláveis.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c12",
    theme_color: "#7dcfff",
    lang: "pt-BR",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
