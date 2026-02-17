import type { Metadata } from "next";
import { outfit, firaCode } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nicollas Rezende | Desenvolvedor Full Stack",
  description: "Desenvolvedor Full Stack especializado em portais governamentais, automação e soluções escaláveis. Campeão em 4 hackathons. Expertise em Java (Spring/Liferay), Python (Flask/FastAPI) e React/Next.js.",
  keywords: [
    "Nicollas Rezende",
    "desenvolvedor full stack",
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
    "automação",
    "Brasília",
    "hackathon",
    "microserviços",
    "Keycloak",
  ],
  authors: [{ name: "Nicollas Pereira Rezende" }],
  creator: "Nicollas Rezende",
  openGraph: {
    title: "Nicollas Rezende - Desenvolvedor Full Stack",
    description: "Especialista em portais governamentais, automação e soluções escaláveis. Campeão em 4 hackathons.",
    type: "website",
    locale: "pt_BR",
    siteName: "Nicollas Rezende Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicollas Rezende - Desenvolvedor Full Stack",
    description: "Especialista em portais governamentais e soluções escaláveis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${firaCode.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
