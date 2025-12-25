# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-12-25

### Added

#### Project Configuration
- Created comprehensive `.npmignore` for npm publishing
- Created `.dockerignore` for optimized Docker builds
- Created `.eslintignore` for ESLint configuration
- Added `postinstall` script with friendly success message

#### Documentation
- Enhanced README.md with deployment section and technology stack details
- Added environment variables configuration guide
- Added performance metrics section
- Expanded acknowledgments with design inspiration and tools
- Added color palette visual table
- Added detailed CSS Variables Philosophy section with usage examples
- Added First Time Setup checklist

### Changed

#### Build System
- Updated clean scripts to use `npx rimraf` for cross-platform compatibility
- Fixed `build:clean` script to use `npm run build` instead of `next build`
- Updated package manager configuration to use npm (removed pnpm-lock.yaml)

#### Git Configuration
- Improved `.gitignore` with better organization and comprehensive coverage
- Fixed node_modules ignore pattern (now `node_modules/`)
- Removed package-lock.json from gitignore (npm best practice - keep it tracked)
- Added support for multiple IDEs (VSCode, IntelliJ, Sublime, Vim)
- Added OS-specific ignores (macOS, Windows, Linux)

#### Dependencies
- Updated to Next.js 16.1.0 (from 15.3.2)
- Updated to TypeScript 5.9.3 (from 5.8.3)
- Updated to React 19.2.3 (from 19.1.0)
- All version badges in README now reflect actual package versions

### Removed
- Removed `pnpm-lock.yaml` (project uses npm, not pnpm)

### Fixed
- Fixed package manager lock files (keeping only package-lock.json for npm)
- Fixed gitignore to properly track package-lock.json
- Ensured node_modules is properly ignored across all platforms

---

## [1.1.0] - 2025-12-18

### Added

#### Build & Tooling
- Added `rimraf` package for cross-platform file cleanup
- New npm scripts: `clean`, `clean:all`, `build:clean`
- Enhanced package.json metadata (keywords, repository, bugs, homepage)

#### Documentation
- Created `docs/ascii-art-samples.md` with terminal-themed ASCII art library
- Created `docs/hard-coded-css-audit.md` comprehensive CSS audit report
- Created `docs.json` documentation index and tracking system
- Added CHANGELOG.md for version history
- Added LICENSE (MIT)
- Added SECURITY.md with security policies
- Added CONTRIBUTING.md with contribution guidelines
- Added QUICKSTART.md for rapid onboarding
- Updated README.md with badges and project progress

#### Code Quality
- Created `src/lib/css-variables.ts` utility for accessing CSS variables from JavaScript
- Implemented `getCSSColor()`, `getCSSVariable()`, `getCSSNumber()`, `getCSSSpacing()` helpers

### Changed

#### Refactoring
- **BREAKING:** Refactored `animated-grid.tsx` to use CSS variables instead of hard-coded colors
  - All 5 hard-coded RGBA colors now use CSS variables
  - Extracted 10+ magic numbers to `ANIMATION_CONFIG` constant
  - Now uses `--grid-size` CSS variable from globals.css
  - Replaced inline `style={{ pointerEvents: 'none' }}` with `className="pointer-events-none"`

#### Bug Fixes
- Fixed typo in `contact-section.tsx` line 230: `text-smtext-success` → `text-sm text-success`

#### Build System
- Removed prebuild hook to prevent Windows permission errors
- Build now completes successfully without cleanup blocking

### Removed
- Deleted conflicting root-level `package.json` and `node_modules`
- Removed hard-coded CSS values from canvas rendering

### Security
- All colors now use single source of truth (CSS variables)
- Improved maintainability and consistency
- Future-proofed for theme system implementation

---

## [1.0.0] - 2025-12-16

### Added
- Initial release of jlucus.dev Terminal Neon portfolio
- Next.js 15 with App Router architecture
- TypeScript 5.8.3 with strict mode
- Tailwind CSS 4.1.5 with CSS Variables design system
- Framer Motion animations
- Terminal Neon design system with Electric Cyan primary color
- Hero section with terminal UI
- Ventures section with hexagonal cards
- Portfolio section with filtering
- Skills section with collapsible categories
- Contact section with form
- Animated grid background
- Responsive design (mobile, tablet, desktop, widescreen)
- Button component with Radix UI Slot support
- Custom neon glow effects
- Monospace typography (JetBrains Mono)

### Technical Stack
- React 19.1.0
- Next.js 15.3.2
- TypeScript 5.8.3
- Tailwind CSS 4.1.5
- Framer Motion 12.23.26
- Headless UI 2.2.2
- Lucide React icons

---

## Release Notes

### v1.1.0 Highlights

This release focuses on **code quality**, **documentation**, and **maintainability**:

1. **CSS Variables Philosophy Enforced**: Eliminated all hard-coded CSS values, ensuring single source of truth for theming
2. **Comprehensive Documentation**: Added 7 new documentation files covering ASCII art, security, contributions, and audit reports
3. **Build Improvements**: Added cleanup scripts and resolved Windows permission issues
4. **Utility Library**: New CSS variable utilities for JavaScript/Canvas integration

### Migration Guide (1.0.0 → 1.1.0)

No breaking changes for external users. Internal code now requires:
- CSS variables must be defined in `globals.css` before use
- Use `getCSSColor()` utility instead of hard-coded values in canvas/JS

### Upgrade Instructions

```bash
# Pull latest changes
git pull origin main

# Install dependencies (rimraf added)
npm install

# Run build to verify
npm run build

# Optional: Clean build artifacts
npm run clean
```

---

## Roadmap

See [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md) for detailed future plans.

### Upcoming Features

#### v1.2.0 (Planned)
- Command palette (Cmd/Ctrl+K)
- Custom cursor with neon trail
- Easter eggs (Konami code, terminal commands)
- GitHub API integration
- Performance optimizations

#### v1.3.0 (Planned)
- Blog system with MDX
- Analytics dashboard
- Contact form backend
- Newsletter subscription

#### v2.0.0 (Future)
- Theme system (light mode, color schemes)
- 3D effects with Three.js
- AI chatbot for portfolio Q&A
- Internationalization

---

## Links

- **Website**: [jlucus.dev](https://jlucus.dev)
- **Repository**: [github.com/4eckd/jlucus2](https://github.com/4eckd/jlucus2)
- **Issues**: [github.com/4eckd/jlucus2/issues](https://github.com/4eckd/jlucus2/issues)
- **Documentation**: See [docs/](docs/) folder

---

**Legend**
- 🎉 Major feature
- ✨ Enhancement
- 🐛 Bug fix
- 📚 Documentation
- 🔒 Security
- ⚡ Performance
- 💥 Breaking change
