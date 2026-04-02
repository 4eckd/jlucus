# Documentation Update Checklist

> **CRITICAL**: This checklist MUST be completed before committing any code changes

## Purpose

This checklist ensures all documentation, configuration files, and metadata are kept in sync when making changes to the project. Consistency across all files is essential for maintainability and professionalism.

---

## Pre-Commit Checklist

Before committing any code changes, verify ALL items in this checklist:

### 1. Version Updates

- [ ] **package.json** - Update `version` field (follow semver)
- [ ] **README.md** - Update version badge
- [ ] **docs.json** - Update `version` and `lastUpdated`
- [ ] **progress/manifest.json** - Update `project_info.version` and `last_updated`
- [ ] **public/manifest.json** - Update `version` field

### 2. Changelog & History

- [ ] **CHANGELOG.md** - Add new version entry with:
  - [ ] Date in YYYY-MM-DD format
  - [ ] Added section (new features)
  - [ ] Changed section (modifications)
  - [ ] Fixed section (bug fixes)
  - [ ] Removed section (deleted features)
  - [ ] Security section (if applicable)
  - [ ] Breaking changes marked with **BREAKING:**

### 3. Documentation Files

- [ ] **README.md** - Update if:
  - [ ] Features changed
  - [ ] Installation steps changed
  - [ ] Configuration changed
  - [ ] Dependencies updated
  - [ ] New sections added

- [ ] **CLAUDE.md** - Update if:
  - [ ] Architecture changed
  - [ ] Design system modified
  - [ ] New components added
  - [ ] Configuration changed

- [ ] **QUICKSTART.md** - Update if:
  - [ ] Setup process changed
  - [ ] Commands changed
  - [ ] Environment variables changed

- [ ] **PROJECT_ROADMAP.md** - Update if:
  - [ ] Milestones completed
  - [ ] New features planned
  - [ ] Timeline changed
  - [ ] Phase progress updated

- [ ] **docs.json** - Update:
  - [ ] Version number
  - [ ] Last updated date
  - [ ] Section lists if documentation structure changed
  - [ ] Updated dates for modified files

- [ ] **progress/manifest.json** - Update:
  - [ ] Last updated timestamp
  - [ ] Project info (version, type)
  - [ ] Recent updates section
  - [ ] Active sessions if applicable

### 4. Package Management

- [ ] **package.json** - Ensure:
  - [ ] Version updated
  - [ ] Dependencies in correct section (dependencies vs devDependencies)
  - [ ] Scripts are functional
  - [ ] Metadata is accurate (description, keywords, author, license)

- [ ] **package-lock.json** - Regenerate:
  ```bash
  npm install
  ```

- [ ] **No pnpm-lock.yaml or yarn.lock** (project uses npm only)

### 5. Public Assets & SEO

- [ ] **public/manifest.json** - Update:
  - [ ] Version number
  - [ ] Description if changed
  - [ ] Theme colors if design system changed
  - [ ] Icons exist and are referenced correctly

- [ ] **public/robots.txt** - Ensure:
  - [ ] Sitemap URL is correct
  - [ ] API routes are blocked
  - [ ] Allowed/disallowed paths are current

- [ ] **Sitemap** - Generate/update if routes changed:
  ```bash
  # Add sitemap generation tool if needed
  ```

### 6. Configuration Files

- [ ] **.gitignore** - Verify:
  - [ ] node_modules/ ignored
  - [ ] Build artifacts ignored (.next/, out/, dist/)
  - [ ] Environment files ignored (.env.local, .env*.local)
  - [ ] package-lock.json is NOT ignored (npm best practice)

- [ ] **.npmignore** - Check if publishing to npm

- [ ] **.dockerignore** - Check if using Docker

- [ ] **.eslintignore** - Verify linting exclusions

### 7. Environment & Secrets

- [ ] **.env.example** - Update if:
  - [ ] New environment variables added
  - [ ] Variables changed or removed
  - [ ] Add comments explaining each variable

- [ ] **README.md Environment Variables section** - Document all variables

### 8. Type Safety & Build

- [ ] **TypeScript** - Ensure:
  ```bash
  npm run lint
  ```
  - [ ] No TypeScript errors
  - [ ] No ESLint errors

- [ ] **Build** - Verify:
  ```bash
  npm run build:clean
  ```
  - [ ] Build succeeds without errors
  - [ ] No warnings (or documented)

### 9. Testing (if applicable)

- [ ] Tests pass:
  ```bash
  npm test
  ```

- [ ] Coverage maintained or improved

### 10. Git Commit

- [ ] **Commit Message** - Follow conventional commits:
  ```
  type(scope): description

  - Detailed change 1
  - Detailed change 2

  🤖 Generated with Claude Code

  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
  ```

  **Types**: feat, fix, docs, style, refactor, perf, test, chore

---

## Version Numbering (Semver)

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0) - Breaking changes
- **MINOR** (x.X.0) - New features (backwards compatible)
- **PATCH** (x.x.X) - Bug fixes (backwards compatible)

### Examples:
- `1.0.0` → `2.0.0` - Breaking change (removed support for Node 16)
- `1.1.0` → `1.2.0` - New feature (added command palette)
- `1.1.1` → `1.1.2` - Bug fix (fixed typo in contact form)

---

## Quick Commands

```bash
# Update version and regenerate lock file
npm version patch  # or minor, or major
npm install

# Verify build
npm run build:clean

# Lint check
npm run lint

# Clean and rebuild
npm run clean && npm run build
```

---

## Files That MUST Be Updated Together

| Change Type | Files to Update |
|-------------|-----------------|
| **Version bump** | package.json, README.md, docs.json, progress/manifest.json, public/manifest.json |
| **New feature** | CHANGELOG.md, README.md, PROJECT_ROADMAP.md, docs.json |
| **Bug fix** | CHANGELOG.md, package.json (patch version) |
| **Dependency update** | package.json, package-lock.json, README.md (tech stack) |
| **Environment variable** | .env.example, README.md, QUICKSTART.md, CLAUDE.md |
| **New route** | Sitemap, robots.txt (if needed) |
| **Design system change** | CLAUDE.md, README.md, public/manifest.json (theme colors) |
| **Documentation structure** | docs.json |

---

## Automation Opportunities

Consider creating npm scripts for common updates:

```json
{
  "scripts": {
    "version:patch": "npm version patch && npm install",
    "version:minor": "npm version minor && npm install",
    "version:major": "npm version major && npm install",
    "precommit": "npm run lint && npm run build:clean",
    "docs:check": "node scripts/check-docs-sync.js"
  }
}
```

---

## Notes

- This checklist should be reviewed and updated as the project evolves
- Consider automating some checks with pre-commit hooks
- Keep this file up to date with actual project requirements
- Add project-specific items as needed

---

**Last Updated**: 2025-12-25
**Version**: 1.0.0
**Maintainer**: jlucus
