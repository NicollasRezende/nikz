# Migração do Portfólio para Next.js Moderno

**Data:** 2025-12-09
**Autor:** Nicollas Rezende
**Status:** Design Aprovado

## Visão Geral

Migração completa do portfólio atual (HTML/CSS/JS vanilla) para stack moderna React/Next.js, mantendo 100% das funcionalidades e melhorando performance, SEO e manutenibilidade.

---

## Stack Tecnológica

### Core
- **Next.js 14+** (App Router) - Framework React com SSR/SSG
- **TypeScript** - Type safety e melhor DX
- **React 18+** - Library de UI

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Para efeitos específicos (glassmorphism, gradientes customizados)

### State Management
- **Zustand** - State management minimalista
  - Theme store (dark/light mode)
  - Projects store (GitHub API data)

### Animações e Efeitos
- **Framer Motion** - Animações declarativas e performáticas
- **react-intersection-observer** - Scroll animations

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** (opcional) - Schema validation

### Integrações Externas
- **EmailJS** - Mantém integração atual de contato
- **Axios** - Cliente HTTP para GitHub API
- **Octokit** (alternativa) - Cliente oficial GitHub

### DevOps
- **ESLint + Prettier** - Code quality
- **Husky** (opcional) - Git hooks
- **Vercel** - Deploy e hosting

---

## Arquitetura do Projeto

### Estrutura de Pastas

```
nikz-react/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (navbar, footer, theme provider)
│   ├── page.tsx                  # Home page (SPA: hero, about, projects, contact)
│   ├── minha-trajetoria/
│   │   └── page.tsx              # Página "Minha Trajetória" separada
│   ├── globals.css               # Tailwind imports + custom CSS
│   ├── favicon.ico
│   └── robots.ts                 # SEO robots config
│
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Navbar.tsx            # Navegação principal com scroll spy
│   │   ├── Footer.tsx            # Rodapé com links sociais
│   │   └── BackToTop.tsx         # Botão voltar ao topo
│   │
│   ├── sections/                 # Seções da página principal
│   │   ├── HeroSection.tsx       # Hero com TypeWriter effect
│   │   ├── AboutSection.tsx      # Seção sobre com stats
│   │   ├── ProjectsSection.tsx   # Grid de projetos com filtro
│   │   └── ContactSection.tsx    # Formulário de contato
│   │
│   ├── ui/                       # Componentes atômicos reutilizáveis
│   │   ├── Section.tsx           # Wrapper de seção com padding/container
│   │   ├── SectionHeader.tsx     # Título + linha decorativa
│   │   ├── GlassCard.tsx         # Card com efeito glassmorphism
│   │   ├── StatCard.tsx          # Card de estatística (ex: "2+ Anos")
│   │   ├── TechIcon.tsx          # Ícone de tecnologia com tooltip
│   │   ├── Button.tsx            # Botão com variantes
│   │   └── ProjectCard.tsx       # Card de projeto individual
│   │
│   ├── features/                 # Features complexas
│   │   ├── TypeWriter.tsx        # Efeito de máquina de escrever
│   │   ├── ProjectFilter.tsx     # Filtro de projetos (All, React, Python, etc)
│   │   ├── ContactForm.tsx       # Formulário com validação e EmailJS
│   │   ├── ThemeToggle.tsx       # Toggle dark/light mode
│   │   ├── ScrollProgress.tsx    # Barra de progresso de scroll
│   │   └── CursorEffects.tsx     # Efeitos customizados de cursor (opcional)
│   │
│   └── animations/               # Wrappers de animação reutilizáveis
│       ├── FadeUp.tsx            # Fade in + slide up ao entrar na viewport
│       ├── ScaleIn.tsx           # Scale in ao entrar na viewport
│       └── ParallaxWrapper.tsx   # Efeito parallax
│
├── store/                        # Zustand stores
│   ├── useThemeStore.ts          # Estado do tema (dark/light)
│   └── useProjectStore.ts        # Estado dos projetos GitHub
│
├── hooks/                        # Custom React hooks
│   ├── useScrollSpy.ts           # Detecta seção ativa baseado em scroll
│   ├── useGitHubProjects.ts      # Fetch e cache de projetos GitHub
│   ├── useIntersectionObserver.ts # Observer para animações
│   └── useMediaQuery.ts          # Hook para responsive queries
│
├── lib/                          # Utilitários e configs
│   ├── emailjs.ts                # Configuração e funções EmailJS
│   ├── github.ts                 # Cliente GitHub API
│   ├── utils.ts                  # Funções auxiliares (cn, formatDate, etc)
│   └── constants.ts              # Constantes do app (links sociais, etc)
│
├── types/                        # TypeScript types
│   └── index.ts                  # Types globais (Project, ContactForm, etc)
│
├── public/                       # Assets estáticos
│   ├── imgs/                     # Imagens do portfólio
│   │   ├── 55924678.png          # Foto de perfil
│   │   └── og-image.jpg          # Open Graph image
│   └── favicon/                  # Favicons
│
├── .env.local                    # Variáveis de ambiente (não commitar)
├── .env.example                  # Template de variáveis
├── next.config.js                # Configuração Next.js
├── tailwind.config.ts            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
└── package.json                  # Dependências
```

---

## Decisões de Arquitetura

### 1. App Router vs Pages Router
**Decisão:** App Router (Next.js 13+)

**Razões:**
- Padrão moderno do Next.js
- Server Components por padrão (melhor performance)
- Layouts aninhados nativos
- Melhor streaming e loading states
- Futuro do Next.js

### 2. Roteamento Híbrido (SPA + Multi-page)
**Decisão:** Página principal como SPA com scroll suave + rotas separadas para páginas extras

**Estrutura:**
- `/` - Home SPA (Hero → About → Projects → Contact)
- `/minha-trajetoria` - Página separada
- Futuro: `/blog`, `/projetos/[slug]`, etc

**Razões:**
- Mantém UX atual (scroll suave no portfólio)
- Flexibilidade para páginas completas
- SEO otimizado por rota
- Facilita adição de conteúdo futuro

### 3. Componentes Atômicos (Atomic Design)
**Decisão:** Componentes pequenos e compostos

**Hierarquia:**
```
Átomos (ui/) → Moléculas (features/) → Organismos (sections/) → Templates (layout/) → Páginas (app/)
```

**Razões:**
- Reutilização máxima
- Testabilidade
- Manutenção facilitada
- Escalabilidade

### 4. Zustand para State Management
**Decisão:** Zustand em vez de Context API ou Redux

**Razões:**
- API minimalista e simples
- Zero boilerplate
- Melhor performance que Context
- Persist middleware para localStorage
- Suficiente para escopo do projeto

### 5. Tailwind + Custom CSS
**Decisão:** Tailwind como base + CSS customizado para efeitos específicos

**Proporção:** ~80% Tailwind / ~20% CSS customizado

**CSS Customizado para:**
- Glassmorphism effects
- Gradientes complexos
- Animações CSS específicas (quando Framer Motion for overkill)
- Variáveis CSS para temas

**Razões:**
- Produtividade (Tailwind)
- Flexibilidade (custom CSS)
- Purge automático (bundle mínimo)
- Dark mode built-in

---

## Migração de Funcionalidades

### Funcionalidades Atuais (Mantidas 100%)

| Funcionalidade | Implementação Atual | Implementação React | Biblioteca |
|----------------|---------------------|---------------------|------------|
| **Theme Toggle** | localStorage + DOM manipulation | Zustand store + Tailwind dark mode | zustand, next-themes |
| **TypeWriter Effect** | Vanilla JS setInterval | Custom hook + useEffect | - |
| **Scroll Animations** | IntersectionObserver manual | Framer Motion + viewport detection | framer-motion |
| **Navbar Active State** | Scroll event listener | useScrollSpy hook | react-intersection-observer |
| **Project Filter** | DOM manipulation + classList | State + conditional rendering | - |
| **GitHub API** | Fetch + manual cache | Axios + Zustand store | axios ou octokit |
| **Contact Form** | Manual validation + EmailJS | React Hook Form + EmailJS | react-hook-form, @emailjs/browser |
| **Back to Top** | Scroll event + button toggle | useScroll hook + conditional render | framer-motion |
| **Scroll Progress Bar** | Scroll event + width update | useScroll hook + motion.div | framer-motion |
| **Parallax Effects** | Scroll event + transform | Framer Motion parallax | framer-motion |
| **Cursor Effects** | Mouse event listeners | Custom hook (opcional) | - |
| **Glassmorphism** | Custom CSS classes | Tailwind utilities + backdrop-blur | - |

### Melhorias Automáticas

**Performance:**
- Code splitting automático por rota
- Image optimization (Next.js `<Image>`)
- Font optimization (next/font)
- Lazy loading de componentes
- Tree shaking automático

**SEO:**
- Server-side rendering (SSR)
- Static generation onde possível
- Metadata API do Next.js
- Sitemap automático
- robots.txt configurável

**Developer Experience:**
- Type safety (TypeScript)
- Hot reload instantâneo (Vite-like)
- ESLint + Prettier
- Autocomplete de Tailwind
- Component dev tools

---

## Detalhamento de Componentes Principais

### 1. Theme System

**Store (Zustand):**
```typescript
// store/useThemeStore.ts
interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'theme-storage' }
  )
);
```

**Provider (layout.tsx):**
```typescript
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Toggle Component:**
```typescript
// components/features/ThemeToggle.tsx
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
```

### 2. TypeWriter Effect

**Hook:**
```typescript
// hooks/useTypeWriter.ts
export function useTypeWriter(
  texts: string[],
  speed = 100,
  deleteSpeed = 50
) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Lógica de typing/deleting
    // Similar à implementação atual, mas com cleanup
  }, [texts, currentIndex, isDeleting]);

  return displayText;
}
```

**Componente:**
```typescript
// components/features/TypeWriter.tsx
export function TypeWriter({ texts }: { texts: string[] }) {
  const displayText = useTypeWriter(texts);

  return (
    <span className="typewriter">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
}
```

### 3. Scroll Animations (Framer Motion)

**Wrapper Reutilizável:**
```typescript
// components/animations/FadeUp.tsx
export function FadeUp({
  children,
  delay = 0
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
```

**Uso:**
```tsx
<FadeUp>
  <h2>Título aparece com fade up</h2>
</FadeUp>

<FadeUp delay={0.2}>
  <p>Parágrafo aparece 200ms depois</p>
</FadeUp>
```

### 4. GitHub Projects Integration

**Hook:**
```typescript
// hooks/useGitHubProjects.ts
export function useGitHubProjects() {
  const { projects, setProjects, isLoading, setIsLoading } = useProjectStore();

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'https://api.github.com/users/NicollasRezende/repos',
          { params: { sort: 'updated', per_page: 20 } }
        );

        // Filtrar repos importantes (não forks, com descrição, etc)
        const filtered = response.data.filter(repo =>
          !repo.fork && repo.description
        );

        setProjects(filtered);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (projects.length === 0) {
      fetchProjects();
    }
  }, []);

  return { projects, isLoading };
}
```

**Store:**
```typescript
// store/useProjectStore.ts
interface ProjectStore {
  projects: GitHubRepo[];
  setProjects: (projects: GitHubRepo[]) => void;
  filteredProjects: GitHubRepo[];
  filter: string;
  setFilter: (filter: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  filter: 'all',
  setFilter: (filter) => set({ filter }),
  filteredProjects: computed(() => {
    const { projects, filter } = get();
    if (filter === 'all') return projects;
    return projects.filter(p =>
      p.language?.toLowerCase() === filter.toLowerCase()
    );
  }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
```

### 5. Contact Form (React Hook Form + EmailJS)

**Componente:**
```typescript
// components/features/ContactForm.tsx
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/lib/emailjs';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>();

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendEmail(data);
      setStatus('success');
      reset();
      // Toast notification
    } catch (error) {
      setStatus('error');
      // Toast error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('name', { required: 'Nome é obrigatório' })}
          placeholder="Seu nome"
          className={cn(
            'input-base',
            errors.name && 'border-red-500 animate-shake'
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido'
            }
          })}
          placeholder="seu@email.com"
          className={cn(
            'input-base',
            errors.email && 'border-red-500 animate-shake'
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('message', {
            required: 'Mensagem é obrigatória',
            minLength: { value: 10, message: 'Mínimo 10 caracteres' }
          })}
          placeholder="Sua mensagem"
          rows={5}
          className={cn(
            'input-base',
            errors.message && 'border-red-500 animate-shake'
          )}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
      </Button>
    </form>
  );
}
```

**EmailJS Config:**
```typescript
// lib/emailjs.ts
import emailjs from '@emailjs/browser';

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

export async function sendEmail(data: ContactFormData) {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    }
  );
}
```

### 6. Navbar com Scroll Spy

**Hook:**
```typescript
// hooks/useScrollSpy.ts
export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
```

**Componente:**
```typescript
// components/layout/Navbar.tsx
const NAV_ITEMS = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'projects', label: 'Projetos' },
  { id: 'contact', label: 'Contato' },
];

export function Navbar() {
  const activeSection = useScrollSpy(NAV_ITEMS.map(item => item.id));

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg">
      <ul className="flex gap-6">
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'nav-link',
                activeSection === item.id && 'active'
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <ThemeToggle />
    </nav>
  );
}
```

---

## Configurações

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        dark: {
          bg: '#0a1022',
          card: '#1a1f3a',
          border: '#2a2f4a',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
```

### Next.js Config

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
```

### TypeScript Config

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Environment Variables

```bash
# .env.example
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_GITHUB_USERNAME=NicollasRezende
```

---

## SEO e Metadata

### Root Layout Metadata

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://nicollasrezende.dev'),
  title: {
    default: 'Nicollas Rezende | Desenvolvedor Full Stack',
    template: '%s | Nicollas Rezende'
  },
  description: 'Desenvolvedor Full Stack especializado em Python, JavaScript, React e automação. Transformando ideias em soluções digitais eficientes.',
  keywords: [
    'desenvolvedor full stack',
    'python',
    'javascript',
    'react',
    'nextjs',
    'typescript',
    'portfólio',
    'brasília',
    'desenvolvimento web',
    'automação'
  ],
  authors: [{ name: 'Nicollas Rezende' }],
  creator: 'Nicollas Rezende',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://nicollasrezende.dev',
    title: 'Nicollas Rezende | Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em Python, JavaScript e automação. Conheça meus projetos e habilidades.',
    siteName: 'Nicollas Rezende - Portfólio',
    images: [{
      url: '/imgs/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Nicollas Rezende - Desenvolvedor Full Stack'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicollas Rezende | Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em Python, JavaScript e automação.',
    images: ['/imgs/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon/favicon-32x32.png',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};
```

### JSON-LD Structured Data

```typescript
// app/layout.tsx (adicionar ao body)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nicollas Rezende',
  url: 'https://nicollasrezende.dev',
  image: 'https://nicollasrezende.dev/imgs/55924678.png',
  sameAs: [
    'https://github.com/NicollasRezende',
    'https://www.linkedin.com/in/nicollas-rezende/',
  ],
  jobTitle: 'Desenvolvedor Full Stack',
  worksFor: {
    '@type': 'Organization',
    name: 'SEA Tecnologia',
  },
  knowsAbout: [
    'Python',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Automação',
    'Desenvolvimento Web',
  ],
};

// No componente:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

## Estratégia de Implementação

### Fase 1: Setup Inicial
1. Criar novo projeto Next.js
2. Configurar TypeScript, Tailwind, ESLint
3. Configurar estrutura de pastas
4. Configurar variáveis de ambiente
5. Migrar assets estáticos (public/)

### Fase 2: UI Foundation
6. Criar componentes atômicos (ui/)
7. Implementar sistema de tema (Zustand + next-themes)
8. Configurar Tailwind customizado (cores, gradientes)
9. Migrar CSS customizado necessário

### Fase 3: Layout e Navegação
10. Implementar Layout raiz
11. Criar Navbar com scroll spy
12. Criar Footer
13. Implementar Back to Top
14. Implementar Scroll Progress Bar

### Fase 4: Seções Principais
15. Hero Section + TypeWriter effect
16. About Section + Stats
17. Projects Section + GitHub integration + Filter
18. Contact Section + Form + EmailJS

### Fase 5: Animações e Efeitos
19. Configurar Framer Motion
20. Implementar wrappers de animação (FadeUp, ScaleIn, etc)
21. Implementar parallax effects
22. Implementar glassmorphism effects

### Fase 6: Páginas Extras
23. Migrar página "Minha Trajetória"
24. Configurar metadata por página

### Fase 7: Integrações
25. Integrar GitHub API com cache
26. Integrar EmailJS no formulário
27. Testar todas as integrações

### Fase 8: SEO e Performance
28. Otimizar imagens (next/image)
29. Configurar metadata completo
30. Gerar sitemap
31. Configurar robots.txt
32. Audit de performance (Lighthouse)

### Fase 9: Testes e Ajustes
33. Testes de responsividade
34. Testes de acessibilidade
35. Testes de funcionalidades
36. Ajustes finais de design

### Fase 10: Deploy
37. Configurar Vercel
38. Deploy de preview
39. Testes em produção
40. Deploy final

---

## Checklist de Garantia

### Funcionalidades
- [ ] Theme toggle (dark/light) funciona e persiste
- [ ] TypeWriter effect no hero funciona
- [ ] Todas animações de scroll funcionam
- [ ] Navbar active state atualiza com scroll
- [ ] Filtro de projetos funciona
- [ ] GitHub API carrega projetos corretamente
- [ ] Formulário valida corretamente
- [ ] EmailJS envia emails
- [ ] Back to top aparece e funciona
- [ ] Scroll progress bar funciona
- [ ] Parallax effects funcionam
- [ ] Glassmorphism effects renderizam
- [ ] Navegação suave (smooth scroll) funciona
- [ ] Links externos abrem em nova aba
- [ ] Todos os links sociais funcionam

### Responsividade
- [ ] Mobile (< 640px) perfeito
- [ ] Tablet (640px - 1024px) perfeito
- [ ] Desktop (> 1024px) perfeito
- [ ] Navbar mobile funciona (hamburger menu)
- [ ] Imagens responsivas
- [ ] Tipografia escala corretamente

### Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse Best Practices > 95
- [ ] Lighthouse SEO > 95
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Imagens otimizadas (WebP/AVIF)
- [ ] Lazy loading funcionando

### SEO
- [ ] Meta tags corretos
- [ ] Open Graph funcionando
- [ ] Twitter Cards funcionando
- [ ] JSON-LD estruturado
- [ ] Sitemap gerado
- [ ] robots.txt configurado
- [ ] Canonical URLs corretos
- [ ] Alt text em todas imagens

### Acessibilidade
- [ ] Navegação por teclado funciona
- [ ] Focus states visíveis
- [ ] ARIA labels corretos
- [ ] Contraste de cores adequado
- [ ] Headings hierárquicos
- [ ] Formulário acessível

### Browser Compatibility
- [ ] Chrome (última versão)
- [ ] Firefox (última versão)
- [ ] Safari (última versão)
- [ ] Edge (última versão)
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## Dependências do Projeto

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",

    "zustand": "^4.5.0",
    "framer-motion": "^11.0.0",
    "react-hook-form": "^7.51.0",
    "axios": "^1.6.8",
    "@emailjs/browser": "^4.3.3",
    "next-themes": "^0.3.0",

    "tailwindcss": "^3.4.0",
    "@tailwindcss/forms": "^0.5.7",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.14"
  }
}
```

---

## Cronograma Estimado

**Total:** ~40 horas de desenvolvimento

| Fase | Tarefas | Estimativa |
|------|---------|------------|
| 1. Setup | 1-5 | 2h |
| 2. UI Foundation | 6-9 | 4h |
| 3. Layout | 10-14 | 3h |
| 4. Seções | 15-18 | 8h |
| 5. Animações | 19-22 | 4h |
| 6. Páginas Extras | 23-24 | 2h |
| 7. Integrações | 25-27 | 4h |
| 8. SEO | 28-32 | 3h |
| 9. Testes | 33-36 | 6h |
| 10. Deploy | 37-40 | 4h |

---

## Riscos e Mitigações

### Risco 1: Perda de Funcionalidades
**Mitigação:** Checklist detalhado + testes manuais de cada feature

### Risco 2: Performance Pior que Atual
**Mitigação:** Lighthouse audits + otimização de bundle + lazy loading

### Risco 3: SEO Degradado
**Mitigação:** SSR/SSG do Next.js + metadata API + structured data

### Risco 4: Bugs em Produção
**Mitigação:** Preview deploys + testes em staging + rollback fácil

### Risco 5: Migração CSS Incompleta
**Mitigação:** Comparação visual lado a lado + screenshot testing

---

## Sucesso da Migração

A migração será considerada bem-sucedida quando:

✅ **Funcionalidades:** 100% das features atuais funcionando
✅ **Visual:** Design idêntico ao atual (pixel-perfect não obrigatório, mas muito próximo)
✅ **Performance:** Lighthouse > 90 em todas métricas
✅ **SEO:** Metadata completo + structured data
✅ **Código:** TypeScript sem erros + ESLint sem warnings
✅ **Deploy:** Em produção e funcionando perfeitamente

---

## Próximos Passos

1. **Aprovar este design** ✅
2. **Criar plano de implementação detalhado** (próximo documento)
3. **Setup do repositório e worktree**
4. **Iniciar implementação**

---

**Documento aprovado em:** 2025-12-09
**Pronto para implementação:** ✅
