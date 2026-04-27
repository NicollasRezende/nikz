import type { Metadata, Viewport } from "next";
import { spaceGrotesk, jetbrainsMono, inter } from "./fonts";
import "./globals.css";

const SITE_URL = "https://nikz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nicollas Rezende — Full Stack Developer",
    template: "%s | Nicollas Rezende",
  },
  description:
    "Desenvolvedor full stack focado em portais governamentais, automação de processos e soluções escaláveis. Campeão em 4 hackathons. Java/Spring/Liferay · Python · React/Next.js.",
  applicationName: "Nicollas Rezende — Portfolio v2",
  authors: [{ name: "Nicollas Pereira Rezende", url: SITE_URL }],
  creator: "Nicollas Rezende",
  publisher: "Nicollas Rezende",
  category: "technology",
  keywords: [
    "Nicollas Rezende",
    "Full Stack Developer",
    "Java",
    "Spring",
    "Liferay",
    "Python",
    "Flask",
    "FastAPI",
    "React",
    "Next.js",
    "TypeScript",
    "portais governamentais",
    "gov.br",
    "Keycloak",
    "automação de vendas",
    "landing pages",
    "Brasília",
    "hackathon",
    "microserviços",
  ],
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Nicollas Rezende — Full Stack Developer",
    description:
      "Portais governamentais, automação de vendas, sistemas de marketing e soluções escaláveis. Campeão em 4 hackathons.",
    url: SITE_URL,
    siteName: "Nicollas Rezende — Portfolio v2",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicollas Rezende — Full Stack Developer",
    description:
      "Portais gov, automação de vendas, marketing pages e backends enterprise.",
    creator: "@NicollasRezende",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c12" },
    { media: "(prefers-color-scheme: light)", color: "#0b0c12" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nicollas Pereira Rezende",
              alternateName: "Nicollas Rezende",
              url: SITE_URL,
              image: `${SITE_URL}/opengraph-image`,
              jobTitle: "Full Stack Developer",
              worksFor: { "@type": "Organization", name: "SEA Tecnologia" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Brasília",
                addressRegion: "DF",
                addressCountry: "BR",
              },
              sameAs: [
                "https://github.com/NicollasRezende",
                "https://linkedin.com/in/nicollas-rezende",
              ],
              knowsAbout: [
                "Java",
                "Spring",
                "Liferay",
                "Python",
                "FastAPI",
                "React",
                "Next.js",
                "TypeScript",
                "Keycloak",
                "Microservices",
                "Government Portals",
                "Sales Automation",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
