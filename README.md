# 🚀 Nicollas Rezende - Portfólio Profissional

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Portfólio moderno e interativo desenvolvido com as mais recentes tecnologias web**

[🌐 Ver Demo](https://nikz.vercel.app) • [📧 Contato](mailto:nicollasprezende@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/nicollasrezende)

</div>

---

## 📋 Índice

- [Sobre](#-sobre)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Começando](#-começando)
- [Deploy](#-deploy)
- [Performance](#-performance)
- [Licença](#-licença)

---

## 🎯 Sobre

Portfólio profissional full-stack desenvolvido para destacar projetos, habilidades e trajetória profissional. Construído com foco em **performance**, **acessibilidade** e **experiência do usuário**.

### 🏆 Destaques

- ✨ **8 seções interativas** com animações suaves
- 📊 **Métricas de impacto** com números reais do trabalho
- 🔥 **GitHub Activity Heatmap** com visualização de contribuições
- 🌌 **Página de trajetória** galática com parallax scrolling
- 🎨 **Design moderno** com glassmorphism e gradientes
- ⚡ **Performance otimizada** com lazy loading e code splitting
- 📱 **100% responsivo** para todos os dispositivos
- ♿ **Acessível** seguindo padrões WCAG

---

## ✨ Features

### 🏠 Página Principal

| Seção | Descrição |
|-------|-----------|
| **Hero** | Introdução com animações de texto dinâmicas e ícones orbitais |
| **About** | Biografia profissional com conquistas e tecnologias |
| **Metrics** | 8 métricas de impacto com animações CountUp |
| **Projects** | Grid de projetos GitHub com filtros e paginação |
| **Skills** | Categorização de habilidades com barras de progresso |
| **GitHub Stats** | Heatmap de contribuições e linguagens mais usadas |
| **Contact** | Formulário de contato com integração EmailJS |

### 🌌 Minha Trajetória

- **8 galáxias interativas** representando experiências profissionais
- **Parallax scrolling** com 3 camadas de estrelas
- **Partículas animadas** otimizadas (12 por card)
- **Modal detalhado** para cada experiência
- **Conquistas recentes**: 4 hackathons vencidos

### 🎨 Design System

- **Cores primárias**: Cyan (#00c6ff), Blue (#4d8cff)
- **Cores secundárias**: Purple (#9d5cfc), Pink (#ff56b1)
- **Glassmorphism**: Efeitos de vidro com backdrop-blur
- **Gradientes**: Linear e radial em todo o site
- **Animações**: Powered by Framer Motion

---

## 🛠 Tech Stack

### Core

- **[Next.js 16.0.8](https://nextjs.org/)** - Framework React com SSG/SSR
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[Framer Motion](https://www.framer.com/motion/)** - Animações avançadas

### Libraries & Tools

- **[Zustand](https://github.com/pmndrs/zustand)** - State management
- **[React Hook Form](https://react-hook-form.com/)** - Formulários
- **[EmailJS](https://www.emailjs.com/)** - Envio de emails
- **[GitHub API](https://docs.github.com/en/rest)** - Dados de repositórios
- **[Octokit](https://github.com/octokit/octokit.js)** - GitHub API client

### DevOps

- **[Vercel](https://vercel.com/)** - Hosting e CI/CD
- **[Turbopack](https://turbo.build/)** - Bundler ultra-rápido
- **[ESLint](https://eslint.org/)** - Linting
- **[Git](https://git-scm.com/)** - Version control

---

## 📁 Estrutura do Projeto

```
nikz-react/
├── 📁 app/
│   ├── globals.css          # Estilos globais + Tailwind
│   ├── layout.tsx           # Root layout com Navbar/Footer
│   ├── page.tsx             # Home page
│   └── minha-trajetoria/
│       └── page.tsx         # Página de trajetória
│
├── 📁 components/
│   ├── animations/          # Componentes de animação
│   ├── features/            # Features complexas
│   │   ├── ContactForm.tsx
│   │   ├── OrbitingIcons.tsx
│   │   ├── ProjectFilter.tsx
│   │   └── TypeWriter.tsx
│   ├── layout/              # Layout components
│   │   ├── BackToTop.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── sections/            # Seções da página
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── GitHubStatsSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MetricsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── SkillsSection.tsx
│   └── ui/                  # Componentes base UI
│       ├── Button.tsx
│       ├── FloatingCard.tsx
│       ├── Pagination.tsx
│       └── Section.tsx
│
├── 📁 hooks/                # Custom React hooks
│   ├── useGitHubProjects.ts
│   ├── useScrollSpy.ts
│   └── useTheme.ts
│
├── 📁 lib/                  # Utilitários
│   ├── constants.ts         # Configurações do site
│   ├── github.ts            # GitHub API client
│   └── utils.ts             # Funções helper
│
├── 📁 store/                # Zustand stores
│   └── useProjectStore.ts
│
├── 📁 public/
│   └── imgs/                # Imagens e assets
│
└── 📄 Configs
    ├── next.config.ts       # Next.js config
    ├── tailwind.config.ts   # Tailwind config
    ├── tsconfig.json        # TypeScript config
    └── package.json         # Dependencies
```

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** ou **yarn**
- **Git**

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/NicollasRezende/nikz.git
cd nikz/nikz-react
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite `.env.local`:
```env
# GitHub API (opcional, mas recomendado para evitar rate limiting)
NEXT_PUBLIC_GITHUB_TOKEN=seu_token_aqui

# EmailJS (para o formulário de contato)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
```

4. **Rode o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Abra no navegador**
```
http://localhost:3000
```

---

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (Turbopack) |
| `npm run build` | Gera build de produção otimizado |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Roda ESLint para verificar código |

---

## 🌐 Deploy

### Deploy na Vercel (Recomendado)

1. **Via Dashboard**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe o repositório `nikz`
   - Configure:
     ```
     Framework Preset: Next.js
     Root Directory: nikz-react/
     Build Command: npm run build
     Output Directory: .next
     ```
   - Adicione as variáveis de ambiente
   - Clique em "Deploy"

2. **Via CLI**
```bash
npm install -g vercel
cd nikz-react
vercel
```

### Deploy Automático

Após o primeiro deploy, a Vercel automaticamente:

- ✅ Faz deploy a cada push no `main`
- ✅ Cria preview deploys para PRs
- ✅ Adiciona HTTPS automático
- ✅ Otimiza assets com CDN global

---

## ⚡ Performance

### Otimizações Implementadas

- ✅ **SSG (Static Site Generation)** para todas as páginas
- ✅ **Image Optimization** com Next.js Image
- ✅ **Code Splitting** automático
- ✅ **Lazy Loading** para componentes pesados
- ✅ **React.memo** para evitar re-renders
- ✅ **useCallback/useMemo** em hooks críticos
- ✅ **Passive Event Listeners** para scroll
- ✅ **Prefers-Reduced-Motion** para acessibilidade
- ✅ **Font Smoothing** para renderização otimizada
- ✅ **Turbopack** para builds ultra-rápidos

### Métricas (Lighthouse)

```
Performance:  95+
Accessibility: 100
Best Practices: 100
SEO: 100
```

---

## 🎨 Customização

### Alterar Cores

Edite `app/globals.css`:

```css
@theme {
  --color-primary: #00c6ff;
  --color-primary-light: #4d8cff;
  /* ... */
}
```

### Alterar Conteúdo

Edite `lib/constants.ts`:

```typescript
export const SITE_CONFIG = {
  name: "Seu Nome",
  title: "Seu Título",
  // ...
};
```

### Adicionar Nova Seção

1. Crie o componente em `components/sections/`
2. Importe e adicione em `app/page.tsx`
3. Adicione ao `NAV_ITEMS` em `lib/constants.ts`

---

## 👤 Autor

**Nicollas Pereira Rezende**

- 🌐 Website: [nikz.vercel.app](https://nikz.vercel.app)
- 💼 LinkedIn: [@nicollasrezende](https://linkedin.com/in/nicollasrezende)
- 🐙 GitHub: [@NicollasRezende](https://github.com/NicollasRezende)
- 📧 Email: nicollasprezende@gmail.com

---

---

<div align="center">

### ⭐ Se gostou do projeto, deixe uma estrela!

**Desenvolvido com ❤️ usando Next.js, TypeScript e Tailwind CSS**

[⬆ Voltar ao topo](#-nicollas-rezende---portfólio-profissional)

</div>
