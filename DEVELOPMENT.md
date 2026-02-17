# Development Guide

Complete guide for setting up and working on the jlucus.dev portfolio project.

## 🚀 Quick Setup

For automated setup, run:

```bash
./scripts/dev-setup.sh
```

This script will:
- ✅ Check prerequisites (Node.js, npm, Git)
- ✅ Install dependencies
- ✅ Set up environment variables
- ✅ Initialize Git hooks
- ✅ Run type checks and linting
- ✅ Optional: Test build

## 📋 Prerequisites

### Required

- **Node.js**: >= 18.0 ([Download](https://nodejs.org/))
- **npm**: >= 9.0 (comes with Node.js)
- **Git**: >= 2.0 ([Download](https://git-scm.com/))

### Recommended

- **VS Code**: With recommended extensions (see [.vscode/extensions.json](.vscode/extensions.json))
- **GitHub CLI**: For issue/PR management ([Install](https://cli.github.com/))

## 🛠️ Manual Setup

### 1. Clone Repository

```bash
git clone https://github.com/4eckd/jlucus2.git
cd jlucus2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your values
# Required: NEXT_PUBLIC_GITHUB_USERNAME
# Optional: GITHUB_PERSONAL_ACCESS_TOKEN, analytics, etc.
```

### 4. Initialize Git Hooks

```bash
npm run prepare
```

This sets up Husky hooks for:
- **pre-commit**: Linting and formatting
- **commit-msg**: Conventional commit validation
- **pre-push**: Build verification

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your changes.

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Production build |
| `npm run build:clean` | Clean build (removes cache first) |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check if code is formatted |
| `npm run type-check` | Run TypeScript type checks |
| `npm run clean` | Remove build artifacts |
| `npm run clean:all` | Deep clean (including node_modules) |

## 🎨 Code Style & Formatting

### EditorConfig

The project uses [EditorConfig](.editorconfig) to maintain consistent coding styles across different editors:

- **Indent**: 2 spaces
- **Charset**: UTF-8
- **Line endings**: LF (Unix)
- **Trim trailing whitespace**: Yes
- **Insert final newline**: Yes

### Prettier

Code formatting is handled by [Prettier](.prettierrc) with these settings:

- **Print width**: 80 characters
- **Tab width**: 2 spaces
- **Semicolons**: Yes
- **Quotes**: Single quotes (except JSX)
- **Trailing commas**: ES5
- **Arrow parens**: Always

**Format your code:**

```bash
# Format all files
npm run format

# Check formatting without changing files
npm run format:check
```

### ESLint

Linting rules extend from Next.js best practices:

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

## 🎯 Git Workflow

### Branching Strategy

```
main
├── development (staging)
└── claude/feature-branch-*
    └── feat-*
    └── fix-*
    └── docs-*
```

### Branch Naming

Use conventional prefixes:

- `feat-123-feature-name` - New features
- `fix-123-bug-description` - Bug fixes
- `docs-123-update-readme` - Documentation
- `refactor-123-cleanup` - Refactoring
- `test-123-add-tests` - Tests
- `chore-123-update-deps` - Maintenance

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Tests
- `chore`: Build, dependencies, etc.

**Examples:**

```bash
git commit -m "feat(hero): add typing animation to terminal"
git commit -m "fix(grid): resolve canvas rendering on mobile"
git commit -m "docs(readme): update installation instructions"
```

### Git Hooks

The project uses [Husky](.husky/) for Git hooks:

#### Pre-commit Hook
Runs before each commit:
- Lints staged files with ESLint
- Formats staged files with Prettier
- Runs TypeScript type check

#### Commit Message Hook
Validates commit messages against Conventional Commits format.

#### Pre-push Hook
Runs before pushing to remote:
- Builds the project
- Ensures no build errors

### Creating a Pull Request

```bash
# 1. Create and checkout feature branch
git checkout -b feat-123-my-feature

# 2. Make changes and commit
git add .
git commit -m "feat(scope): add amazing feature"

# 3. Push to remote
git push -u origin feat-123-my-feature

# 4. Create PR via GitHub UI or CLI
gh pr create --title "feat: Add amazing feature" --body "Description..."
```

## 🏗️ Project Structure

```
jlucus2/
├── .github/
│   ├── workflows/           # GitHub Actions CI/CD
│   │   ├── ci.yml          # Main CI pipeline
│   │   └── branch-tracker.yml
│   └── tracking/            # Progress tracking
├── .husky/                  # Git hooks
│   ├── pre-commit
│   ├── pre-push
│   └── commit-msg
├── .vscode/                 # VS Code workspace settings
│   ├── settings.json
│   ├── extensions.json
│   └── css-variables.json
├── docs/                    # Documentation
├── public/                  # Static assets
├── scripts/                 # Automation scripts
│   ├── dev-setup.sh        # Developer onboarding
│   ├── create-feature-branch.sh
│   └── track-progress.sh
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # CSS variables
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── sections/       # Page sections
│   │   └── ui/             # Reusable components
│   ├── data/               # Static content
│   │   ├── ventures.ts
│   │   ├── projects.ts
│   │   └── skills.ts
│   ├── lib/                # Utilities
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── css-variables.ts
│   └── styles/             # Global styles
├── .editorconfig           # Editor configuration
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore rules
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── postcss.config.js       # PostCSS configuration
```

## 🎨 Design System

### CSS Variables Philosophy

**CRITICAL**: This project uses CSS variables exclusively. NEVER use hard-coded CSS values.

All design tokens are defined in `src/app/globals.css`:

```css
/* Colors (RGB format for alpha channel support) */
--color-primary: 0 217 255;        /* Electric Cyan */
--color-accent: 255 0 110;         /* Neon Magenta */
--color-secondary: 204 255 0;      /* Electric Lime */

/* Spacing */
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */

/* Neon Effects */
--shadow-neon-primary: 0 0 5px rgb(var(--color-primary)),
                       0 0 20px rgb(var(--color-primary));
```

**Usage in Tailwind:**

```tsx
// ✅ Correct - Uses CSS variables
<div className="bg-primary text-background">

// ❌ Incorrect - Hard-coded values
<div className="bg-[#00D9FF] text-[#0A0E27]">
```

**Usage in JavaScript/Canvas:**

```typescript
import { getCSSColor } from '@/lib/css-variables';

const primaryColor = getCSSColor('primary'); // "0 217 255"
const rgbColor = `rgb(${primaryColor})`; // "rgb(0, 217, 255)"
```

### Typography

- **Headings**: JetBrains Mono (monospace, terminal aesthetic)
- **Body**: Inter (clean, readable)
- **Code**: JetBrains Mono

### Responsive Breakpoints

```css
sm:   640px   /* Mobile landscape */
md:   768px   /* Tablet */
lg:   1024px  /* Desktop */
xl:   1280px  /* Large desktop */
2xl:  1536px  /* Widescreen */
```

## 🧪 Testing

Testing infrastructure is set up with Jest and React Testing Library (coming soon):

```bash
# Run tests (when available)
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🔧 Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

### Type Errors

```bash
# Run type check
npm run type-check

# If using VS Code, reload window
Cmd/Ctrl + Shift + P → "Reload Window"
```

### Linting Issues

```bash
# Auto-fix linting errors
npm run lint:fix

# Auto-format code
npm run format
```

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001

# Or kill process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Git Hook Failures

```bash
# Skip hooks (not recommended)
git commit --no-verify

# Fix issues instead
npm run lint:fix
npm run format
npm run type-check
```

## 📚 Additional Resources

### Documentation

- [README.md](README.md) - Project overview
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [CLAUDE.md](CLAUDE.md) - Technical documentation
- [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md) - Development roadmap

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 💬 Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/4eckd/jlucus2/issues)
- **GitHub Discussions**: [Ask questions or share ideas](https://github.com/4eckd/jlucus2/discussions)
- **Email**: contact@jlucus.dev

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Happy coding!** 🚀
