# Nicollas Rezende - Portfolio

Modern and interactive portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📦 Environment Variables

Create a `.env.local` file:

```env
# GitHub API (optional - prevents rate limiting)
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token

# EmailJS (for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🛠 Tech Stack

- **Framework**: Next.js 16.0.8 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State**: Zustand
- **Forms**: React Hook Form
- **Email**: EmailJS
- **Icons**: Font Awesome + Devicons

## 📁 Project Structure

```
nikz-react/
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── animations/         # Animation components
│   ├── features/           # Complex features
│   ├── layout/             # Layout components
│   ├── sections/           # Page sections
│   └── ui/                 # Base UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utils & configs
├── store/                  # Zustand stores
└── public/                 # Static assets
```

## 🎯 Key Features

- ✨ 8 interactive sections with smooth animations
- 📊 Metrics section with CountUp animations
- 🔥 GitHub Activity Heatmap
- 🌌 Galactic journey page with parallax
- 📱 Fully responsive design
- ⚡ Optimized performance (95+ Lighthouse)
- ♿ Accessible (WCAG compliant)

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🌐 Deploy on Vercel

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set **Root Directory** to `nikz-react/`
4. Add environment variables
5. Deploy!

## 📄 License

MIT License - See root README for details.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
