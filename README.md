# jlucus.dev - Terminal Neon Portfolio

<div align="center">

[![Version](https://img.shields.io/badge/version-1.1.0-00D9FF?style=for-the-badge&logo=semver&logoColor=white)](https://github.com/4eckd/jlucus2/releases)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.5-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-FF006E?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

[![Build Status](https://img.shields.io/badge/build-passing-CCFF00?style=for-the-badge&logo=github-actions&logoColor=black)](https://github.com/4eckd/jlucus2/actions)
[![Code Quality](https://img.shields.io/badge/code%20quality-A-00FF9F?style=for-the-badge&logo=codeclimate&logoColor=white)](https://github.com/4eckd/jlucus2)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-FF006E?style=for-the-badge&logo=github&logoColor=white)](CONTRIBUTING.md)

**A cyberpunk-inspired developer portfolio with Terminal Neon aesthetics**

[Live Demo](https://jlucus.dev) · [Documentation](CLAUDE.md) · [Report Bug](https://github.com/4eckd/jlucus2/issues) · [Request Feature](https://github.com/4eckd/jlucus2/issues)

</div>

---

## 📊 Project Progress

**Overall Completion: 75%**

```
████████████████████████████████████░░░░░░░░░ 75%
```

| Phase | Status | Progress |
|-------|--------|----------|
| 🏗️ Foundation | ✅ Complete | 100% ████████████████████ |
| 🎨 Polish & Enhancement | 🔄 In Progress | 60% ████████████░░░░░░░░ |
| 📝 Content & Features | ⏳ Planned | 0% ░░░░░░░░░░░░░░░░░░░░ |
| 📚 Documentation | ✅ Complete | 90% ██████████████████░░ |
| 🧪 Testing & QA | ⏳ Planned | 0% ░░░░░░░░░░░░░░░░░░░░ |
| 🚀 Deployment | ⏳ Planned | 0% ░░░░░░░░░░░░░░░░░░░░ |

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

- Node.js 18.0+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/4eckd/jlucus2.git
cd jlucus2/jlucus2

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

**Need more help?** Check out the [Quickstart Guide](QUICKSTART.md)

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

```css
--color-primary: 0 217 255;        /* Electric Cyan #00D9FF */
--color-accent: 255 0 110;         /* Neon Magenta #FF006E */
--color-secondary: 204 255 0;      /* Electric Lime #CCFF00 */
--color-success: 0 255 159;        /* #00FF9F */
--color-warning: 255 184 0;        /* #FFB800 */
--color-error: 255 71 87;          /* #FF4757 */
```

### CSS Variables Philosophy

**NEVER use hard-coded CSS values.** All design tokens are defined as CSS variables:
- 🎨 Colors → `--color-*`
- 📏 Spacing → `--spacing-*`
- 🌟 Shadows → `--shadow-*`
- 📐 Grid → `--grid-size`

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Building
npm run build            # Production build
npm run build:clean      # Clean build (removes cache first)
npm run start            # Start production server

# Maintenance
npm run clean            # Remove .next, out, cache
npm run clean:all        # Remove .next, out, node_modules
npm run lint             # Run ESLint
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [CLAUDE.md](CLAUDE.md) | Complete technical documentation |
| [QUICKSTART.md](QUICKSTART.md) | Get started in 5 minutes |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md) | Development roadmap |
| [SECURITY.md](SECURITY.md) | Security policy |
| [docs/ascii-art-samples.md](docs/ascii-art-samples.md) | ASCII art library |
| [docs/hard-coded-css-audit.md](docs/hard-coded-css-audit.md) | CSS audit report |

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting PRs.

**Quick contribution checklist:**
- ✅ Follow CSS Variables philosophy
- ✅ Use TypeScript
- ✅ Follow conventional commits
- ✅ Test on mobile, tablet, desktop
- ✅ Update documentation

---

## 🔒 Security

Found a security vulnerability? Please report it privately. See [SECURITY.md](SECURITY.md) for details.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Design inspiration: [chaology.xyz](https://chaology.xyz), [terminal.shop](https://terminal.shop)
- Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/), [Inter](https://rsms.me/inter/)

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
