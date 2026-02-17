import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nicollas Rezende - Desenvolvedor Full Stack',
    short_name: 'Nicollas Rezende',
    description: 'Desenvolvedor Full Stack especializado em portais governamentais e soluções escaláveis',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1b26',
    theme_color: '#7dcfff',
    lang: 'pt-BR',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
