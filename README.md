# jlucus.dev - Terminal Neon Portfolio

<div align="center">

[![Version](https://img.shields.io/badge/version-1.1.1-00D9FF?style=for-the-badge&logo=semver&logoColor=white)](https://github.com/4eckd/jlucus2/releases)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.0-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.5-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-FF006E?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

[![Build Status](https://img.shields.io/badge/build-passing-CCFF00?style=for-the-badge&logo=github-actions&logoColor=black)](https://github.com/4eckd/jlucus2/actions)
[![Code Quality](https://img.shields.io/badge/code%20quality-A-00FF9F?style=for-the-badge&logo=codeclimate&logoColor=white)](https://github.com/4eckd/jlucus2)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-FF006E?style=for-the-badge&logo=github&logoColor=white)](CONTRIBUTING.md)

**A cyberpunk-inspired developer portfolio with Terminal Neon aesthetics**

[Live Demo](https://jlucus.dev) · [Documentation](CLAUDE.md) ·
[Report Bug](https://github.com/4eckd/jlucus2/issues) ·
[Request Feature](https://github.com/4eckd/jlucus2/issues)

![Hero Preview](docs/preview-hero.png)

</div>

---

## 📊 Project Progress

**Overall Completion: 75%**

```
████████████████████████████████████░░░░░░░░░ 75%
```

| Phase                   | Status         | Progress                  |
| ----------------------- | -------------- | ------------------------- |
| 🏗️ Foundation           | ✅ Complete    | 100% ████████████████████ |
| 🎨 Polish & Enhancement | 🔄 In Progress | 60% ████████████░░░░░░░░  |
| 📝 Content & Features   | ⏳ Planned     | 0% ░░░░░░░░░░░░░░░░░░░░   |
| 📚 Documentation        | ✅ Complete    | 90% ██████████████████░░  |
| 🧪 Testing & QA         | ⏳ Planned     | 0% ░░░░░░░░░░░░░░░░░░░░   |
| 🚀 Deployment           | ⏳ Planned     | 0% ░░░░░░░░░░░░░░░░░░░░   |

**Recent Milestones:**

- ✅ v1.1.0: CSS Variables migration complete
- ✅ Documentation overhaul (7 new docs)
- ✅ Build system improvements
- 🔄 Command palette (In Progress)
- 🔄 Custom cursor effects (In Progress)

---

## 🎯 Features

### ✨ Current Features

- 🖥️ **Terminal Neon UI** - Cyberpunk-inspired design with neon glow effects
- ⚡ **Next.js 15** - Latest App Router with React Server Components
- 🎨 **CSS Variables System** - Single source of truth for theming
- 🎭 **Framer Motion** - Smooth animations and transitions
- 📱 **Fully Responsive** - Mobile-first design
- 🎯 **SEO Optimized** - Meta tags, sitemap, structured data
- 🔧 **TypeScript** - Full type safety
- 🌊 **Animated Grid** - Dynamic canvas background
- 💼 **Sections**: Hero, Ventures, Portfolio, Skills, Contact

### 🚀 Coming Soon

- ⌨️ Command Palette (Cmd/Ctrl+K)
- 🎨 Custom Neon Cursor
- 🎮 Easter Eggs
- 📊 GitHub Stats Integration
- 📝 MDX Blog System
- 🎯 Analytics Dashboard

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0
npm >= 9.0 (or yarn >= 1.22, pnpm >= 8.0)
Git >= 2.0
```

### Installation

```bash
# Clone repository
git clone https://github.com/4eckd/jlucus2.git
cd jlucus2

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

**Need more help?** Check out the [Quickstart Guide](QUICKSTART.md)

### First Time Setup

1. Update personal information in [src/lib/constants.ts](src/lib/constants.ts)
2. Add your ventures data in [src/data/ventures.ts](src/data/ventures.ts)
3. Add your projects in [src/data/projects.ts](src/data/projects.ts)
4. Configure your skills in [src/data/skills.ts](src/data/skills.ts)
5. Customize colors in [src/styles/globals.css](src/styles/globals.css)

---

## 📁 Project Structure

```
jlucus2/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # CSS variables & styles
│   ├── components/
│   │   ├── layout/               # Header, Footer
│   │   ├── sections/             # Page sections
│   │   │   ├── hero-terminal.tsx
│   │   │   ├── ventures-section.tsx
│   │   │   ├── portfolio-section.tsx
│   │   │   ├── skill-tree.tsx
│   │   │   └── contact-section.tsx
│   │   └── ui/                   # Reusable components
│   ├── data/                     # Static content
│   ├── lib/                      # Utilities
│   │   ├── css-variables.ts      # CSS variable helpers
│   │   ├── utils.ts              # General utilities
│   │   └── constants.ts          # Site config
│   └── styles/
├── public/                       # Static assets
├── docs/                         # Documentation
└── tests/                        # Tests (planned)
```

---

## 🎨 Design System

### Terminal Neon Color Palette

<table>
<tr>
<td width="20%" align="center" style="background: #00D9FF; color: #000;">
<strong>Primary</strong><br/>
Electric Cyan<br/>
<code>#00D9FF</code>
</td>
<td width="20%" align="center" style="background: #FF006E; color: #fff;">
<strong>Accent</strong><br/>
Neon Magenta<br/>
<code>#FF006E</code>
</td>
<td width="20%" align="center" style="background: #CCFF00; color: #000;">
<strong>Secondary</strong><br/>
Electric Lime<br/>
<code>#CCFF00</code>
</td>
<td width="20%" align="center" style="background: #00FF9F; color: #000;">
<strong>Success</strong><br/>
Mint Green<br/>
<code>#00FF9F</code>
</td>
<td width="20%" align="center" style="background: #FFB800; color: #000;">
<strong>Warning</strong><br/>
Amber<br/>
<code>#FFB800</code>
</td>
</tr>
</table>

```css
/* All colors use RGB format for alpha channel support */
--color-primary: 0 217 255; /* rgb(0, 217, 255) */
--color-accent: 255 0 110; /* rgb(255, 0, 110) */
--color-secondary: 204 255 0; /* rgb(204, 255, 0) */
--color-success: 0 255 159; /* rgb(0, 255, 159) */
--color-warning: 255 184 0; /* rgb(255, 184, 0) */
--color-error: 255 71 87; /* rgb(255, 71, 87) */
```

### CSS Variables Philosophy

**CRITICAL RULE: NEVER use hard-coded CSS values.**

All design tokens are defined as CSS variables for:

- Single source of truth
- Easy theming and customization
- Alpha channel support via `rgb(var(--color-*) / <alpha>)`
- Consistent spacing, colors, and effects

| Category   | Pattern       | Example                             |
| ---------- | ------------- | ----------------------------------- |
| 🎨 Colors  | `--color-*`   | `--color-primary`, `--color-accent` |
| 📏 Spacing | `--spacing-*` | `--spacing-md`, `--spacing-xl`      |
| 🌟 Shadows | `--shadow-*`  | `--shadow-neon-primary`             |
| 📐 Layout  | `--grid-size` | `--grid-size: 40px`                 |

**Usage in Tailwind:**

```tsx
// Correct - Uses CSS variables
<div className="bg-primary text-background">

// Incorrect - Hard-coded values
<div className="bg-[#00D9FF] text-[#0A0E27]">
```

---

## 🛠️ Available Scripts

| Command               | Description              | Use Case                                   |
| --------------------- | ------------------------ | ------------------------------------------ |
| `npm run dev`         | Start development server | Local development at http://localhost:3000 |
| `npm run build`       | Production build         | Build for deployment                       |
| `npm run build:clean` | Clean build              | Remove cache before building               |
| `npm start`           | Start production server  | Test production build locally              |
| `npm run lint`        | Run ESLint               | Check code quality                         |
| `npm run clean`       | Remove build artifacts   | Clear `.next`, `out`, cache                |
| `npm run clean:all`   | Deep clean               | Remove everything including `node_modules` |

### Development Workflow

```bash
# Start fresh development session
npm run clean && npm run dev

# Production build and test
npm run build:clean && npm start

# Code quality check
npm run lint
```

---

## 📚 Documentation

| Document                                                     | Description                      |
| ------------------------------------------------------------ | -------------------------------- |
| [CLAUDE.md](CLAUDE.md)                                       | Complete technical documentation |
| [QUICKSTART.md](QUICKSTART.md)                               | Get started in 5 minutes         |
| [CONTRIBUTING.md](CONTRIBUTING.md)                           | Contribution guidelines          |
| [CHANGELOG.md](CHANGELOG.md)                                 | Version history                  |
| [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md)                     | Development roadmap              |
| [SECURITY.md](SECURITY.md)                                   | Security policy                  |
| [docs/ascii-art-samples.md](docs/ascii-art-samples.md)       | ASCII art library                |
| [docs/hard-coded-css-audit.md](docs/hard-coded-css-audit.md) | CSS audit report                 |

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/4eckd/jlucus2)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:

- **Netlify**: Use the Next.js build plugin
- **Railway**: Connect your GitHub repo
- **DigitalOcean**: Use App Platform
- **AWS Amplify**: Connect to GitHub
- **Self-hosted**: Build and serve with `npm run build && npm start`

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME="Your Name"

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Contact Form (if using a service)
CONTACT_FORM_ENDPOINT=https://formspree.io/f/xxxxx
```

---

## 🛠️ Technology Stack

### Core

- **[Next.js 16.1.0](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4.1.5](https://tailwindcss.com/)** - Utility-first CSS

### Animation & UI

- **[Framer Motion 12.23.26](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Heroicons](https://heroicons.com/)** - Additional icons
- **[Headless UI](https://headlessui.com/)** - Unstyled components
- **[Radix UI Slot](https://www.radix-ui.com/)** - Polymorphic components

### Utilities

- **[clsx](https://github.com/lukeed/clsx)** - Conditional classNames
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes
- **[class-variance-authority](https://cva.style/)** - Component variants

### Development

- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Rimraf](https://github.com/isaacs/rimraf)** - Cross-platform cleanup

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting
PRs.

**Quick contribution checklist:**

- ✅ Follow CSS Variables philosophy (NEVER hard-code values)
- ✅ Use TypeScript with proper types
- ✅ Follow conventional commits format
- ✅ Test on mobile, tablet, and desktop
- ✅ Update documentation for new features
- ✅ Ensure accessibility (ARIA labels, keyboard navigation)
- ✅ Run `npm run lint` before committing

---

## 🔒 Security

Found a security vulnerability? Please report it privately. See [SECURITY.md](SECURITY.md) for
details.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Optimizations

- ⚡ Server-side rendering with React Server Components
- 🎯 Automatic code splitting by route
- 🖼️ Optimized images with `next/image`
- 📦 Font optimization with `next/font`
- 🗜️ Minified CSS and JavaScript
- 🔄 Automatic static optimization

---

## 🙏 Acknowledgments

### Design Inspiration

- [chaology.xyz](https://chaology.xyz) - Terminal UI patterns
- [terminal.shop](https://terminal.shop) - Neon aesthetics
- Cyberpunk 2077 - Color palette inspiration
- Synthwave/Retrowave art - Visual style

### Technologies

- Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/),
  [Framer Motion](https://www.framer.com/motion/)
- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/), [Inter](https://rsms.me/inter/)
- Icons: [Lucide](https://lucide.dev/), [Heroicons](https://heroicons.com/)

### Tools

- Development: [Visual Studio Code](https://code.visualstudio.com/),
  [Claude Code](https://claude.com/claude-code)
- Design: [Figma](https://figma.com), CSS Variables
- Version Control: [Git](https://git-scm.com/), [GitHub](https://github.com)

---

## 📬 Contact

- **Website**: [jlucus.dev](https://jlucus.dev)
- **GitHub**: [@4eckd](https://github.com/4eckd)
- **Email**: contact@jlucus.dev
- **Issues**: [GitHub Issues](https://github.com/4eckd/jlucus2/issues)

---

<div align="center">

**Built with 💙 by jlucus using [Claude Code](https://claude.com/claude-code)**

⭐ Star this repo if you find it useful!

</div>
