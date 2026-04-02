# Branching Strategy - Portfolio Modernization

**Last Updated**: 2025-10-25
**Strategy Type**: Feature-Based Parallel Development

---

## 🎯 Strategy Overview

**Goal**: Enable parallel development of features for fastest possible rollout while maintaining code quality and stability.

**Approach**: **Feature-based branching** (NOT phase-based)
- ✅ Multiple features can be developed simultaneously
- ✅ Features can be merged independently when ready
- ✅ Easy to test features in isolation
- ✅ Flexible - can prioritize any feature
- ❌ NOT phase-based (phases are too broad for parallel work)

---

## 🌳 Branch Structure

```
main (production)
  │
  └── claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM (integration/dev branch)
       │
       ├── feature/navigation              (Header, nav, mobile menu)
       ├── feature/hero-section             (Hero with animations)
       ├── feature/about-section            (About + profile)
       ├── feature/skills-resume            (Skills, timeline, resume)
       ├── feature/portfolio-grid           (Projects + filtering)
       ├── feature/services-showcase        (Services + AI models)
       ├── feature/contact-form             (Contact + validation)
       ├── feature/footer-layout            (Footer component)
       │
       ├── feature/payload-cms              (CMS setup + schemas)
       ├── feature/content-migration        (Legacy content → CMS)
       │
       ├── feature/chat-agent               (AI chat implementation)
       ├── feature/linkedin-integration     (LinkedIn API sync)
       │
       ├── feature/testing-setup            (Vitest, Playwright, a11y)
       └── feature/deployment-config        (Vercel, CI/CD)
```

---

## 📋 Branch Types & Naming

### 1. **Main Branch** (`main`)
- **Purpose**: Production-ready code
- **Protection**: Protected, requires PR approval
- **Deploy**: Auto-deploys to production (jlucus.dev)

### 2. **Integration Branch** (`claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM`)
- **Purpose**: Central development branch, integration point
- **Lifespan**: Entire modernization project
- **Merges**: Feature branches merge here first
- **Deploy**: Can deploy to preview URL for testing

### 3. **Feature Branches** (`feature/*`)
- **Purpose**: Individual feature development
- **Naming**: `feature/<feature-name>`
- **Created From**: Integration branch
- **Merges Into**: Integration branch (via PR)
- **Lifespan**: Until feature is complete and merged
- **Delete**: After successful merge

### 4. **Hotfix Branches** (`hotfix/*`) - If Needed
- **Purpose**: Emergency production fixes
- **Created From**: `main`
- **Merges Into**: Both `main` AND integration branch
- **Naming**: `hotfix/<issue-description>`

---

## 🚀 Feature Branch Plan

### **Phase 1: UI Components & Sections** (Parallel Development)

| Feature Branch | Description | Dependencies | Priority | Est. Time |
|----------------|-------------|--------------|----------|-----------|
| `feature/navigation` | Header, nav menu, mobile menu, smooth scroll | None | HIGH | 4-6h |
| `feature/hero-section` | Hero with typing animation, CTA buttons | None | HIGH | 3-4h |
| `feature/about-section` | Profile image, bio, personal details | None | MEDIUM | 2-3h |
| `feature/skills-resume` | Skills bars, timeline, work history | None | MEDIUM | 4-5h |
| `feature/portfolio-grid` | Project cards, filtering, lightbox | None | HIGH | 5-6h |
| `feature/services-showcase` | Services cards, AI models display | None | MEDIUM | 3-4h |
| `feature/contact-form` | Form with validation, email integration | None | HIGH | 3-4h |
| `feature/footer-layout` | Footer component, social links | None | LOW | 2h |

**Total Parallel Time**: ~6-8 hours (if working on all simultaneously)
**Sequential Time**: ~26-34 hours

### **Phase 2: CMS & Content** (Can start in parallel with Phase 1)

| Feature Branch | Description | Dependencies | Priority | Est. Time |
|----------------|-------------|--------------|----------|-----------|
| `feature/payload-cms` | Payload setup, schemas, admin panel | None | HIGH | 4-6h |
| `feature/content-migration` | Migrate legacy content to CMS | `payload-cms` | MEDIUM | 3-4h |
| `feature/linkedin-integration` | LinkedIn API, article fetching | `payload-cms` | LOW | 4-6h |

### **Phase 3: Advanced Features** (Can start once sections are done)

| Feature Branch | Description | Dependencies | Priority | Est. Time |
|----------------|-------------|--------------|----------|-----------|
| `feature/chat-agent` | AI chat with LobeUI, Vercel AI SDK | Sections complete | MEDIUM | 6-8h |
| `feature/testing-setup` | Vitest, Playwright, accessibility tests | Most features | MEDIUM | 4-5h |
| `feature/deployment-config` | Vercel config, CI/CD, env setup | All features | HIGH | 2-3h |

---

## 🔄 Workflow

### **Creating a Feature Branch**

```bash
# 1. Ensure you're on the integration branch
git checkout claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM

# 2. Pull latest changes
git pull origin claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM

# 3. Create and checkout feature branch
git checkout -b feature/navigation

# 4. Work on feature, commit frequently
git add .
git commit -m "feat(navigation): add sticky header component"

# 5. Push to remote
git push -u origin feature/navigation
```

### **Merging a Feature Branch**

```bash
# 1. Ensure feature is complete and tested
pnpm build  # Verify build works
pnpm test   # Run tests (once setup)

# 2. Update from integration branch (in case of conflicts)
git checkout claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM
git pull
git checkout feature/navigation
git merge claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM

# 3. Resolve conflicts if any
# 4. Push updated feature branch
git push

# 5. Create Pull Request (GitHub UI or CLI)
gh pr create --base claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM \
             --head feature/navigation \
             --title "feat: Add navigation component" \
             --body "See PR template"

# 6. After PR approval and merge, delete feature branch
git branch -d feature/navigation
git push origin --delete feature/navigation
```

### **Merging Integration Branch to Main (Production Release)**

```bash
# 1. Ensure integration branch is stable
# 2. All tests passing
# 3. Create PR from integration → main
gh pr create --base main \
             --head claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM \
             --title "Release: Portfolio Modernization v2.0" \
             --body "See PRODUCTION_PR_TEMPLATE.md"

# 4. After approval, merge to main
# 5. Tag the release
git tag -a v2.0.0 -m "Portfolio modernization complete"
git push origin v2.0.0
```

---

## 📊 Parallel Development Strategy

### **Week 1: Foundation + UI Components**
```
Day 1-2:
- feature/navigation        (Developer A / Claude)
- feature/hero-section      (Developer B / Claude)
- feature/payload-cms       (Developer C / Claude)

Day 3-4:
- feature/portfolio-grid    (Developer A)
- feature/about-section     (Developer B)
- feature/skills-resume     (Developer C)

Day 5:
- feature/contact-form
- feature/services-showcase
- Merge all completed features to integration
```

### **Week 2: Advanced Features + Testing**
```
Day 1-3:
- feature/content-migration
- feature/chat-agent
- feature/testing-setup

Day 4-5:
- feature/linkedin-integration
- feature/deployment-config
- Final integration testing
```

### **Week 3: Polish + Launch**
```
Day 1-2:
- Bug fixes
- Performance optimization
- Accessibility audit

Day 3:
- Create production PR
- Final testing on preview URL

Day 4:
- Merge to main
- Deploy to production
- Monitor
```

---

## 🔒 Branch Protection Rules

### **Main Branch** (`main`)
- ✅ Require pull request reviews (1 approver minimum)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Do not allow force push
- ✅ Do not allow deletion

### **Integration Branch** (`claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM`)
- ✅ Require pull request for feature merges (recommended)
- ⚠️ Allow force push (for rebasing if needed)
- ✅ Require CI checks to pass (once CI is setup)

### **Feature Branches**
- ✅ No restrictions (fast iteration)
- ✅ Can force push (for cleaning up commits)
- ✅ Delete after merge

---

## 📝 Commit Message Convention

Use **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

**Examples**:
```bash
feat(navigation): add mobile hamburger menu
fix(contact-form): resolve email validation issue
docs(readme): update setup instructions
style(button): apply consistent spacing
refactor(hero): extract animation logic to custom hook
test(portfolio): add unit tests for filtering
chore(deps): update Next.js to 16.0.1
```

---

## 🎯 Merge Strategy

### **Feature → Integration**
- **Method**: Squash and merge (keeps integration branch clean)
- **PR Required**: Yes (for review and CI checks)
- **Delete Branch**: Yes (after merge)

### **Integration → Main**
- **Method**: Merge commit (preserves history)
- **PR Required**: Yes (requires thorough review)
- **Tag Release**: Yes (semantic versioning)

---

## 🚨 Handling Conflicts

### **Conflict Resolution Workflow**:

1. **Update from integration branch**:
   ```bash
   git checkout claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM
   git pull
   git checkout feature/your-feature
   git merge claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM
   ```

2. **Resolve conflicts**:
   - Open conflicting files
   - Choose correct changes
   - Test thoroughly

3. **Commit resolution**:
   ```bash
   git add .
   git commit -m "chore: resolve merge conflicts with integration branch"
   git push
   ```

---

## 📈 Progress Tracking

### **Use GitHub Projects** (Optional):
- Create project board: "Portfolio Modernization"
- Columns: Backlog, In Progress, Review, Done
- Link feature branches to issues/cards
- Track progress visually

### **Use Todo Lists in PRs**:
```markdown
## Checklist
- [x] Component implemented
- [x] Styles applied
- [x] Responsive design tested
- [x] Accessibility verified
- [x] Tests added
- [ ] Documentation updated
```

---

## 🎉 Benefits of This Strategy

✅ **Parallel Development** - Work on 3-5 features simultaneously
✅ **Independent Merges** - Don't wait for all features to complete
✅ **Easy Rollback** - Can revert individual features if needed
✅ **Clear Organization** - Know exactly what each branch contains
✅ **Flexible Prioritization** - Can change priorities on the fly
✅ **Isolated Testing** - Test features independently before integration

---

## 🔄 Migration Plan

### **From Current State to Strategy**:

1. **Current**: Single branch (`claude/portfolio-ui-update-011CUTvByNJX3R35kfc4gRZM`)
2. **Next**: Create feature branches from current branch
3. **Future**: Merge features back as they complete

**No disruption** - we continue working on current branch until ready to branch out.

---

## 📅 Timeline with Parallel Development

| Week | Focus | Branches Active | Milestone |
|------|-------|-----------------|-----------|
| Week 1 | UI Components | 4-6 feature branches | All sections migrated |
| Week 2 | CMS + Advanced | 3-4 feature branches | CMS integrated, chat working |
| Week 3 | Polish + Deploy | 1-2 feature branches | Production ready |

**Total**: ~3 weeks to full launch (vs 10-12 weeks sequential)

---

## 🎯 Next Actions

1. ✅ Document strategy (this file)
2. ⏳ Create PR template
3. ⏳ Create initial feature branches
4. ⏳ Create production PR for foundation work
5. ⏳ Begin parallel feature development

---

**Questions?** Ask before branching!
**Ready to branch?** Create feature branches in batch when foundation is merged.

---

**Last Updated**: 2025-10-25
**Strategy Owner**: Jesse Lucas
**Implementation**: Claude Code