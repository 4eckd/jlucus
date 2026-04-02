# Quickstart Guide

Get jlucus.dev up and running in under 5 minutes!

## Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/4eckd/jlucus2.git
cd jlucus2/jlucus2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (optional for local dev).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Quick Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Building
npm run build        # Production build
npm run build:clean  # Clean build (removes cache first)
npm run start        # Start production server

# Maintenance
npm run clean        # Remove .next, out, cache
npm run clean:all    # Remove .next, out, node_modules
npm run lint         # Run ESLint
```

## Project Structure

```
jlucus2/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # CSS variables
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   ├── sections/     # Hero, Portfolio, Skills, etc.
│   │   └── ui/           # Reusable components
│   ├── data/             # Static content
│   ├── lib/              # Utilities
│   └── styles/           # Global styles
├── public/               # Static assets
└── docs/                 # Documentation
```

## Customization

### 1. Update Site Info

Edit `src/lib/constants.ts`:
```typescript
export const SITE = {
  title: 'Your Name',
  description: 'Your description',
  url: 'https://yoursite.com'
};
```

### 2. Modify Colors

Edit `src/app/globals.css`:
```css
:root {
  --color-primary: 0 217 255;    /* Electric Cyan */
  --color-accent: 255 0 110;     /* Neon Magenta */
  --color-secondary: 204 255 0;  /* Electric Lime */
}
```

### 3. Update Content

- **Ventures**: `src/data/ventures.ts`
- **Projects**: `src/data/projects.ts`
- **Skills**: `src/data/skills.ts`

### 4. Add ASCII Art

Check `docs/ascii-art-samples.md` for terminal-themed banners.

## Common Tasks

### Adding a New Section

1. Create component in `src/components/sections/`:
   ```tsx
   export function MySection() {
     return <section>Content</section>;
   }
   ```

2. Import in `src/app/page.tsx`:
   ```tsx
   import { MySection } from '@/components/sections/my-section';
   ```

3. Add to page:
   ```tsx
   <MySection />
   ```

### Using CSS Variables

Always use CSS variables, never hard-code:

```tsx
// ❌ Wrong
<div style={{ color: '#00D9FF' }}>

// ✅ Correct
<div className="text-primary">
```

For JavaScript/Canvas:
```typescript
import { getCSSColor } from '@/lib/css-variables';
const color = getCSSColor('primary'); // "0 217 255"
```

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms

```bash
# Build
npm run build

# Deploy the .next folder
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001
```

### Permission Errors (Windows)

If `rimraf` fails, close any running processes and try:
```bash
npm run clean:all
```

## Next Steps

1. **Read Full Docs**: Check [CLAUDE.md](CLAUDE.md) for detailed documentation
2. **Customize**: Update content in `src/data/`
3. **Deploy**: Push to production via Vercel
4. **Contribute**: See [CONTRIBUTING.md](CONTRIBUTING.md)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Project Roadmap](PROJECT_ROADMAP.md)

## Support

- **Issues**: [GitHub Issues](https://github.com/4eckd/jlucus2/issues)
- **Discussions**: [GitHub Discussions](https://github.com/4eckd/jlucus2/discussions)
- **Email**: contact@jlucus.dev

---

**Ready?** Run `npm run dev` and start building! 🚀
