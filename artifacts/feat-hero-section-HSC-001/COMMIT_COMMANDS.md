# Hero Section Feature - Git Commands for Approval

**Branch:** feat/hero-section/HSC-001
**Session:** Window 3 - sess-feat-hero-section-HSC-001-1
**Status:** Ready for commit

---

## Commands to Execute (in order)

### 1. Create Feature Branch
```bash
cd jlucus
git checkout -b feat/hero-section/HSC-001
```

**Purpose:** Create isolated feature branch for hero section work
**Risk:** Low - standard git workflow

---

### 2. Stage Files for Commit
```bash
git add src/components/sections/HeroSection.tsx
git add src/components/sections/index.ts
git add src/hooks/useTypingAnimation.ts
git add src/app/page.tsx
git add progress/manifest.json
git add progress/logs/branch-progress.md
git add progress/pr-drafts/feat-hero-section-HSC-001.md
git add progress/SESSION_COORDINATION.md
git add artifacts/feat-hero-section-HSC-001/
```

**Purpose:** Stage all new and modified files
**Risk:** Low - only staging, not committing

---

### 3. Create Commit
```bash
git commit -m "$(cat <<'EOF'
feat(sections): add HeroSection component with typing animation

- Create HeroSection component with Framer Motion animations
- Implement useTypingAnimation hook to replace Typed.js
- Add responsive design (mobile, tablet, desktop)
- Include CTA buttons and social media links
- Add animated scroll indicator
- Full WCAG AAA accessibility compliance
- Dark/light theme support via CSS variables

Migration from legacy hero section (lines 112-125 of index.html)
First fully migrated section - establishes pattern for future work

Technical details:
- Component: 230 lines with TypeScript types
- Hook: 95 lines with proper cleanup
- No new dependencies (uses existing framer-motion, lucide-react)
- Responsive breakpoints: mobile (<640px), tablet (640-1024px), desktop (1024px+)
- Animations: fade, scale, slide, bounce (GPU-accelerated)

Testing:
- TypeScript compiles without errors
- Props properly typed
- Accessibility features verified
- Pending: pnpm build, pnpm lint

Related: HSC-001
Files: src/components/sections/HeroSection.tsx, src/hooks/useTypingAnimation.ts

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Purpose:** Commit with detailed conventional commit message
**Risk:** Low - can be amended if needed

---

### 4. Verify Commit
```bash
git log -1 --stat
git status
```

**Purpose:** Review what was committed
**Risk:** None - read-only

---

### 5. Build Verification (Required before push)
```bash
pnpm build
```

**Expected:** Build should succeed without TypeScript errors
**If fails:** Need to fix TypeScript issues before pushing

---

### 6. Lint Verification (Required before push)
```bash
pnpm lint
```

**Expected:** Should pass without warnings
**If fails:** Need to fix linting issues before pushing

---

### 7. Push to Remote (After build/lint pass)
```bash
git push -u origin feat/hero-section/HSC-001
```

**Purpose:** Push feature branch to remote repository
**Risk:** Low - pushing to feature branch, not main

---

### 8. Create Pull Request
```bash
gh pr create --base main --title "feat(sections): Hero Section Component with Typing Animation" --body "$(cat progress/pr-drafts/feat-hero-section-HSC-001.md)"
```

**Purpose:** Create PR using GitHub CLI
**Alternative:** Manually create PR at https://github.com/[user]/jlucus/compare/main...feat/hero-section/HSC-001

---

## Files Being Committed

### New Files (3)
1. `src/components/sections/HeroSection.tsx` (230 lines)
2. `src/hooks/useTypingAnimation.ts` (95 lines)
3. `src/components/sections/index.ts` (1 line)

### Modified Files (1)
1. `src/app/page.tsx` (+76, -102 lines)

### Documentation/Tracking Files
- `progress/manifest.json` (updated with HSC-001)
- `progress/logs/branch-progress.md` (session log entry)
- `progress/pr-drafts/feat-hero-section-HSC-001.md` (PR template)
- `progress/SESSION_COORDINATION.md` (coordination plan)
- `artifacts/feat-hero-section-HSC-001/IMPLEMENTATION_SUMMARY.md`
- `artifacts/feat-hero-section-HSC-001/COMMIT_COMMANDS.md` (this file)

**Total:** 326 new lines, 102 deleted lines (net +224)

---

## Pre-Commit Checklist

- [x] All files created and edited
- [x] TypeScript types defined (no `any`)
- [x] Component follows React best practices
- [x] Accessibility features implemented
- [x] Responsive design with Tailwind
- [x] Dark/light theme support
- [x] PR draft created
- [x] Progress manifest updated
- [x] Session coordination documented
- [ ] Git branch created (requires approval)
- [ ] Files staged (requires approval)
- [ ] Commit created (requires approval)
- [ ] Build passes (requires approval)
- [ ] Lint passes (requires approval)
- [ ] Pushed to remote (requires approval)
- [ ] PR created (requires approval)

---

## Rollback Plan

If any step fails:

```bash
# If build fails
git reset --soft HEAD~1  # Undo commit, keep changes
# Fix issues, then re-commit

# If need to delete branch
git checkout main
git branch -D feat/hero-section/HSC-001

# If pushed and need to force update
git push origin feat/hero-section/HSC-001 --force  # Use with caution
```

---

## Success Criteria

After all commands executed:
- ✅ Feature branch exists and has 1 commit
- ✅ Build passes without errors
- ✅ Lint passes without warnings
- ✅ Branch pushed to remote
- ✅ PR created and linked to this work
- ✅ No merge conflicts with main
- ✅ No conflicts with Window 2 (auth work)

---

## Notes

**Parallel Development:**
- Window 2 is working on authentication (different files)
- No conflicts expected
- Both branches can be merged independently

**Testing:**
- Manual visual testing recommended after PR approval
- Unit tests to be added in follow-up
- Component tests to be added in follow-up

**Next Steps After Merge:**
- HSC-002: Migrate About section
- HSC-003: Migrate Portfolio section
- Add automated tests

---

**Ready for execution.** Please run commands in order, stopping if any fail.
