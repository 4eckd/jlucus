# Portfolio Modernization Project

A modern Next.js 16 portfolio built with TypeScript, Tailwind CSS, and a comprehensive feature branch parallelization system.

## 🚀 Quick Links

- **[Feature Tracking Dashboard](./docs/overview.md)** - View all active features and their status
- **[Branching Strategy](./docs/BRANCHING_STRATEGY.md)** - Parallel development workflow
- **[Modernization Strategy](./docs/MODERNIZATION_STRATEGY.md)** - Technology decisions and architecture
- **[Quick Start Guide](./docs/QUICK_START.md)** - 3-day rapid setup guide

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load custom fonts.

## 🌳 Feature Branch System

This project uses a **Feature Branch Parallelization System** for efficient parallel development:

### Creating a New Feature

1. **Create a feature plan** in `/docs/feature-plans/{feature-name}.md`
2. **Create a branch** using naming convention: `feature/{feature-name-kebab-case}`
3. **Update the dashboard** in `/docs/overview.md` to track progress
4. **Create a changelog** in `/docs/changelogs/{feature-name}.md`

### Branch Naming Conventions

```bash
feature/<feature-name-kebab-case>   # New features
bugfix/<bug-description>            # Bug fixes
enhancement/<enhancement-topic>     # Improvements
hotfix/<critical-fix>               # Emergency fixes
docs/<documentation-topic>          # Documentation updates
```

### Commit Message Format

Follow semantic commit conventions:

```
feat(scope): Add new payment gateway integration
fix(profile): Resolve photo upload race condition
docs(api): Update API endpoint documentation
chore(deps): Update dependencies to latest versions
```

### Code Formatting

Run Prettier before committing:

```bash
pnpm format        # Format all files
pnpm format:check  # Check formatting without changes
pnpm lint          # Run ESLint
```

### Active Features

See [docs/overview.md](./docs/overview.md) for the complete list of active feature branches and their status.

**Current Active Features:**
- Payment Gateway Upgrade (Planning)
- User Profile Redesign (Planning)
- Tour Pricing Optimization (Planning)

## 📚 Documentation Structure

```
docs/
├── overview.md                      # Feature tracking dashboard
├── feature-plans/                   # Detailed plans for each feature
│   ├── payment-gateway-upgrade.md
│   ├── user-profile-redesign.md
│   └── tour-pricing-optimization.md
├── changelogs/                      # Version history per feature
├── templates/                       # Reusable templates
│   ├── FEATURE_PLAN_TEMPLATE.md
│   └── CHANGELOG_TEMPLATE.md
├── BRANCHING_STRATEGY.md           # Git workflow guide
├── MODERNIZATION_STRATEGY.md       # Architecture decisions
├── IMPLEMENTATION_CHECKLIST.md     # Project milestones
└── QUICK_START.md                  # Rapid setup guide
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: @lobehub/ui, Lucide React
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Theme**: next-themes (dark/light mode)
- **Code Quality**: ESLint 9, Prettier

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
