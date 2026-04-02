# Contributing to jlucus.dev

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Be respectful, constructive, and professional. We're all here to build something great together.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report:
1. Check the [existing issues](https://github.com/4eckd/jlucus2/issues)
2. Try the latest version to see if it's already fixed
3. Collect relevant information (browser, OS, steps to reproduce)

**Submit a bug report:**
- Use the bug report template
- Provide clear title and description
- Include reproduction steps
- Add screenshots/videos if applicable
- Mention your environment (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:
- Check if it's already suggested
- Explain the use case clearly
- Describe the expected behavior
- Consider implementation complexity

### Pull Requests

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/jlucus2.git
   cd jlucus2/jlucus2
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Changes**
   - Follow the code style (see below)
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation

4. **Test Your Changes**
   ```bash
   npm run build
   npm run lint
   npm run dev  # Manual testing
   ```

5. **Commit**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a PR on GitHub

## Development Guidelines

### CSS Variables Philosophy

**CRITICAL**: This project uses CSS variables exclusively. NEVER use hard-coded CSS values.

❌ **WRONG:**
```tsx
<div style={{ color: '#00D9FF' }}>
<div className="bg-[#00D9FF]">
const color = 'rgba(0, 217, 255, 0.5)';
```

✅ **CORRECT:**
```tsx
<div className="text-primary">
<div className="bg-primary/50">
import { getCSSColor } from '@/lib/css-variables';
const color = getCSSColor('primary');
```

### Code Style

1. **TypeScript**
   - Use TypeScript for all new files
   - Enable strict mode
   - Avoid `any` types
   - Use interfaces for props

2. **React/Next.js**
   - Use function components
   - Prefer `'use client'` only when needed
   - Use Server Components by default
   - Follow Next.js 15 App Router patterns

3. **Styling**
   - Use Tailwind CSS classes
   - Use CSS variables from `globals.css`
   - Avoid inline styles unless dynamic
   - Use `cn()` utility for conditional classes

4. **File Organization**
   ```
   src/
   ├── app/           # Next.js App Router
   ├── components/    # React components
   │   ├── layout/    # Layout components
   │   ├── sections/  # Page sections
   │   └── ui/        # Reusable UI components
   ├── data/          # Static data
   ├── lib/           # Utility functions
   └── styles/        # Global styles
   ```

5. **Naming Conventions**
   - Components: `PascalCase` (e.g., `HeroTerminal.tsx`)
   - Utilities: `camelCase` (e.g., `getCSSColor`)
   - CSS variables: `kebab-case` (e.g., `--color-primary`)
   - Files: `kebab-case` (e.g., `hero-terminal.tsx`)

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
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

**Examples:**
```bash
feat(hero): add typing animation to terminal
fix(grid): resolve canvas rendering on mobile
docs(readme): update installation instructions
refactor(css): migrate hard-coded colors to variables
```

### Testing Checklist

Before submitting PR:
- [ ] Code builds without errors (`npm run build`)
- [ ] No linting errors (`npm run lint`)
- [ ] Tested in development mode (`npm run dev`)
- [ ] Works on mobile, tablet, desktop
- [ ] No hard-coded CSS values
- [ ] TypeScript types are correct
- [ ] Documentation updated
- [ ] Commit messages follow convention

## Project Structure

### Key Files

- `src/app/globals.css` - CSS variables and global styles
- `src/lib/css-variables.ts` - CSS variable utilities
- `src/lib/utils.ts` - General utilities
- `tailwind.config.ts` - Tailwind configuration
- `next.config.js` - Next.js configuration

### Design System

All design tokens are in `globals.css`:
- Colors: `--color-*`
- Spacing: `--spacing-*`
- Shadows: `--shadow-*`
- Grid: `--grid-size`

## Documentation

When adding features:
1. Update relevant `.md` files
2. Add JSDoc comments to functions
3. Update `docs.json` if adding docs
4. Add examples to README if applicable

## Questions?

- Open a [Discussion](https://github.com/4eckd/jlucus2/discussions)
- Contact: contact@jlucus.dev
- Check [CLAUDE.md](CLAUDE.md) for technical details

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
