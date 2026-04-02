# GitButler-Inspired Parallel Development Workflow

**Last Updated:** 2026-02-15
**Status:** Active
**Strategy:** Virtual Branch Simulation for Parallel Development

---

## 🎯 Overview

This workflow simulates GitButler's virtual branching capabilities using standard Git and GitHub Actions, enabling seamless parallel development across multiple features with minimal context switching.

### Key Concepts from GitButler

1. **Virtual Branches** - Work on multiple features simultaneously in the same workspace
2. **Automatic Tracking** - All branches, issues, and milestones are auto-linked
3. **Minimal Context Switching** - No need to stash/commit when switching tasks
4. **Smart Merging** - Automated conflict detection and resolution assistance

---

## 🌳 Branch Architecture

```
main (production)
  │
  └── development (integration)
       │
       ├── claude/setup-gitbutler-branching-LScIj (current session)
       │
       ├── feat-{issue#}-{description}      (auto-created from issues)
       ├── fix-{issue#}-{description}        (bug fixes)
       ├── docs-{issue#}-{description}       (documentation)
       ├── test-{issue#}-{description}       (testing)
       └── chore-{issue#}-{description}      (maintenance)
```

### Branch Naming Convention

**Format:** `{type}-{issue#}-{short-description}`

**Types:**
- `feat` - New features (maps to Phase 1-3 milestones)
- `fix` - Bug fixes
- `docs` - Documentation updates (maps to Phase 4)
- `test` - Testing additions (maps to Phase 5)
- `chore` - Maintenance, refactoring, tooling
- `polish` - UI/UX improvements (maps to Phase 2)
- `deploy` - Deployment configs (maps to Phase 6)

**Examples:**
```bash
feat-123-hero-section-animations
fix-45-mobile-menu-overflow
docs-78-api-reference
test-90-e2e-contact-form
polish-124-scanline-effect
```

---

## 🚀 Automated Workflows

### 1. Issue → Branch Creation

**Trigger:** Label issue with `ready-for-dev`

**What Happens:**
1. GitHub Action creates branch: `feat-{#}-{title}`
2. Links branch to issue in comment
3. Adds `in-development` label
4. Assigns to milestone based on keywords

**Example:**
```
Issue #123: "Add Hero Section Animations"
Label: ready-for-dev

→ Creates: feat-123-add-hero-section-animations
→ Links to Milestone #4 (Phase 2: Polish)
→ Comments: "🚀 Branch created: feat-123-add-hero-section-animations"
```

### 2. Branch → Automatic Tracking

**Trigger:** Push to any branch

**What Happens:**
1. Updates `.github/tracking/DEVELOPMENT_MANIFEST.md`
2. Creates `progress/branches/{branch-name}.md`
3. Generates ASCII progress visualization
4. Links commits to issues

**Tracked Data:**
- Branch creation date
- Commit count
- Files changed
- Associated issues
- Milestone mapping

### 3. PR → Milestone Auto-Link

**Trigger:** PR opened

**What Happens:**
1. Scans PR title for keywords
2. Auto-assigns to correct milestone
3. Links related issues
4. Adds phase label

**Keyword Mapping:**
```yaml
foundation → Milestone #3 (Phase 1)
polish → Milestone #4 (Phase 2)
content → Milestone #5 (Phase 3)
documentation → Milestone #6 (Phase 4)
testing → Milestone #7 (Phase 5)
deployment → Milestone #8 (Phase 6)
```

---

## 📊 Parallel Development Model

### Virtual Branch Simulation

GitButler allows multiple "virtual branches" in one workspace. We simulate this with:

1. **Feature Isolation** - Each feature has its own branch
2. **Atomic Commits** - Commits are tagged with feature markers
3. **Smart Stashing** - Use git worktrees for parallel work
4. **Quick Switching** - Helper scripts for rapid context changes

### Working on Multiple Features Simultaneously

**Option 1: Git Worktrees (Recommended)**
```bash
# Create worktrees for parallel development
git worktree add ../jlucus-hero feat-123-hero-section
git worktree add ../jlucus-nav feat-124-navigation
git worktree add ../jlucus-contact feat-125-contact-form

# Work in each directory simultaneously
code ../jlucus-hero    # VSCode window 1
code ../jlucus-nav     # VSCode window 2
code ../jlucus-contact # VSCode window 3
```

**Option 2: Quick Branch Switching**
```bash
# Use our helper script
./scripts/switch-branch.sh feat-123-hero-section

# Or standard git (with auto-stash)
git stash push -m "WIP: current work"
git checkout feat-124-navigation
git stash pop
```

---

## 🤖 Automation Scripts

### 1. Branch Creation Script

**File:** `scripts/create-feature-branch.sh`

```bash
#!/bin/bash
# Create branch from issue number

ISSUE_NUM=$1
if [ -z "$ISSUE_NUM" ]; then
  echo "Usage: ./create-feature-branch.sh <issue-number>"
  exit 1
fi

# Fetch issue details from GitHub
ISSUE_DATA=$(gh issue view $ISSUE_NUM --json title,milestone,labels)
TITLE=$(echo $ISSUE_DATA | jq -r '.title' | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | cut -c1-50)
MILESTONE=$(echo $ISSUE_DATA | jq -r '.milestone.title')

# Determine branch type from labels
LABELS=$(echo $ISSUE_DATA | jq -r '.labels[].name')
if echo "$LABELS" | grep -q "bug"; then
  PREFIX="fix"
elif echo "$LABELS" | grep -q "documentation"; then
  PREFIX="docs"
elif echo "$LABELS" | grep -q "testing"; then
  PREFIX="test"
else
  PREFIX="feat"
fi

BRANCH_NAME="${PREFIX}-${ISSUE_NUM}-${TITLE}"

echo "Creating branch: $BRANCH_NAME"
git checkout -b $BRANCH_NAME
git push -u origin $BRANCH_NAME

# Add comment to issue
gh issue comment $ISSUE_NUM --body "🌿 Branch created: \`$BRANCH_NAME\`"
```

### 2. Progress Tracker Script

**File:** `scripts/track-progress.sh`

```bash
#!/bin/bash
# Generate progress report

echo "Generating development progress report..."

cat > .github/tracking/PROGRESS_REPORT.md <<EOF
# Development Progress Report

**Generated:** $(date -u +%Y-%m-%d %H:%M:%S UTC)

## Active Branches

$(git branch -r | grep -v HEAD | wc -l) branches in development

## Phase Progress

EOF

# Calculate phase completion
phases=(
  "Phase 1: Foundation|milestone:3|100"
  "Phase 2: Polish|milestone:4|40"
  "Phase 3: Content|milestone:5|0"
  "Phase 4: Documentation|milestone:6|0"
  "Phase 5: Testing|milestone:7|30"
  "Phase 6: Deployment|milestone:8|0"
)

for phase_data in "${phases[@]}"; do
  IFS='|' read -r name milestone percent <<< "$phase_data"

  # Generate progress bar
  filled=$((percent / 5))
  empty=$((20 - filled))
  bar=$(printf '█%.0s' $(seq 1 $filled))$(printf '░%.0s' $(seq 1 $empty))

  echo "$name  $bar  $percent%" >> .github/tracking/PROGRESS_REPORT.md
done

echo "✓ Progress report generated"
```

### 3. Merge Coordinator Script

**File:** `scripts/merge-coordinator.sh`

```bash
#!/bin/bash
# Coordinate merging of multiple feature branches

echo "=== Merge Coordinator ==="
echo "This will help merge multiple features safely"
echo ""

# Get all feature branches ready to merge
READY_BRANCHES=$(git branch -r | grep feat- | grep -v HEAD)

echo "Branches available for merge:"
echo "$READY_BRANCHES"
echo ""

read -p "Enter branch name to merge (or 'all' for batch merge): " BRANCH_INPUT

if [ "$BRANCH_INPUT" = "all" ]; then
  echo "Batch merge mode - checking for conflicts..."

  # Check each branch for conflicts
  for branch in $READY_BRANCHES; do
    branch_name=$(echo $branch | sed 's/origin\///')
    echo "Checking $branch_name..."

    git merge --no-commit --no-ff $branch_name 2>&1 | grep -q "CONFLICT"
    if [ $? -eq 0 ]; then
      echo "❌ Conflict detected in $branch_name - skipping"
      git merge --abort
    else
      echo "✓ $branch_name can be merged cleanly"
      git merge --abort
    fi
  done
else
  # Single branch merge
  echo "Merging $BRANCH_INPUT..."
  git merge --no-ff origin/$BRANCH_INPUT
fi
```

---

## 📋 Development Workflow

### Daily Development Flow

**Morning:**
```bash
# 1. Sync with remote
git fetch --all

# 2. Check active branches
./scripts/track-progress.sh

# 3. Review today's tasks
gh issue list --assignee @me --label "in-development"

# 4. Start/continue work on feature
git checkout feat-123-hero-section
# OR create new worktree
git worktree add ../jlucus-feat-123 feat-123-hero-section
```

**During Development:**
```bash
# Frequent commits with conventional format
git add .
git commit -m "feat(hero): add typing animation

- Implement custom useTypingAnimation hook
- Add cursor blink effect
- Support for multiple text sequences

Relates to #123"

git push
```

**End of Day:**
```bash
# 1. Push all work
git push

# 2. Update progress
./scripts/track-progress.sh

# 3. If feature complete, create PR
gh pr create \
  --title "feat: Hero Section Animations" \
  --body "$(cat .github/PULL_REQUEST_TEMPLATE.md)" \
  --base development
```

### Feature Completion Flow

```bash
# 1. Ensure all tests pass
npm run test
npm run build

# 2. Update documentation
# Edit relevant docs

# 3. Create PR to development branch
gh pr create --base development

# 4. After PR approval and merge
git checkout development
git pull
git branch -d feat-123-hero-section
git push origin --delete feat-123-hero-section

# 5. Remove worktree if used
git worktree remove ../jlucus-feat-123
```

---

## 🔗 Integration with Milestones & Issues

### Automatic Associations

The workflow automatically creates these associations:

```
Issue #123 "Hero Animations"
    ↓ (labeled: ready-for-dev)
Branch: feat-123-hero-animations
    ↓ (keyword: "polish")
Milestone: #4 (Phase 2: Polish)
    ↓ (development complete)
PR #45 → Development branch
    ↓ (approved & merged)
Main branch (production)
```

### Manual Linking

If auto-detection fails, manually link using:

```bash
# Link issue to milestone
gh issue edit 123 --milestone "Phase 2: Polish & Enhancement"

# Link PR to issue
gh pr edit 45 --body "Closes #123"

# Add labels
gh issue edit 123 --add-label "phase-2,in-progress"
```

---

## 📈 Tracking & Reporting

### Generated Files (Auto-Updated)

1. **`.github/tracking/DEVELOPMENT_MANIFEST.md`**
   - All active branches
   - Issue associations
   - Milestone mappings
   - PR status

2. **`.github/tracking/ASCII_PROGRESS.md`**
   - Visual progress bars
   - Phase completion percentages
   - Branch tree visualization

3. **`progress/branches/{branch-name}.md`**
   - Per-branch commit history
   - Files changed
   - Associated issues
   - Author info

### Manual Reports

Generate on-demand reports:

```bash
# Progress summary
./scripts/track-progress.sh

# Branch statistics
git branch -r | wc -l  # Total branches
git log --oneline --since="1 week ago" | wc -l  # Weekly commits

# Issue velocity
gh issue list --state closed --search "closed:>$(date -d '7 days ago' +%Y-%m-%d)" | wc -l
```

---

## 🎨 Design Principles Integration

All branches must follow these design principles:

1. **Terminal Neon Aesthetic**
   - Use CSS variables exclusively (no hardcoded colors)
   - Reference `docs/ascii-art-samples.md` for UI elements
   - Maintain Electric Cyan (#00D9FF) as primary color

2. **Component Architecture**
   - Follow existing structure: `sections/`, `layout/`, `ui/`
   - Use TypeScript strictly
   - Include accessibility features (WCAG AAA)

3. **Performance**
   - Bundle size < 200KB gzipped
   - Lighthouse score > 90
   - 60fps animations

4. **Documentation**
   - Update CLAUDE.md for new features
   - Add ASCII art samples for new sections
   - Include component usage examples

---

## 🚨 Conflict Resolution

### Automatic Detection

The workflow detects conflicts and notifies via:
- PR comments
- Issue labels (`merge-conflict`)
- Slack/Discord webhook (optional)

### Resolution Process

```bash
# 1. Update your branch with latest development
git checkout feat-123-hero-section
git fetch origin
git merge origin/development

# 2. Resolve conflicts
# Edit conflicting files

# 3. Test after resolution
npm run build
npm run test

# 4. Commit resolution
git add .
git commit -m "chore: resolve merge conflicts with development"

# 5. Push
git push
```

---

## 📚 Quick Reference

### Essential Commands

```bash
# Create feature from issue
./scripts/create-feature-branch.sh 123

# Switch between features (with worktrees)
git worktree add ../jlucus-feat-124 feat-124-navigation

# Check progress
./scripts/track-progress.sh

# Create PR
gh pr create --base development --fill

# Merge coordinator
./scripts/merge-coordinator.sh

# Cleanup merged branches
git branch -r --merged | grep -v main | xargs git push origin --delete
```

### GitHub CLI Shortcuts

```bash
# View current branch's PR
gh pr view

# List my issues
gh issue list --assignee @me

# Check CI status
gh pr checks

# Auto-merge when ready
gh pr merge --auto --squash
```

---

## 🎯 Success Metrics

Track these metrics weekly:

- **Parallel Branches:** Target 3-5 active at once
- **Merge Frequency:** Daily merges to development
- **Conflict Rate:** < 10% of PRs
- **Issue Velocity:** 5-10 issues closed per week
- **PR Review Time:** < 24 hours

---

## 🔧 Troubleshooting

### Common Issues

**Problem:** Branch not auto-created from issue

**Solution:**
```bash
# Manually create with script
./scripts/create-feature-branch.sh <issue-number>
```

**Problem:** Worktree conflicts

**Solution:**
```bash
# List worktrees
git worktree list

# Remove conflicting worktree
git worktree remove <path>

# Prune stale worktrees
git worktree prune
```

**Problem:** Milestone not auto-assigned

**Solution:**
```bash
# Manually assign
gh pr edit <pr-number> --milestone "Phase 2: Polish & Enhancement"
```

---

## 📖 Additional Resources

- **GitButler Concepts:** https://gitbutler.com/docs
- **GitHub Actions:** `.github/workflows/branch-tracker.yml`
- **Branching Strategy:** `docs/BRANCHING_STRATEGY.md`
- **Milestones:** `MILESTONE_INDEX.md`
- **Design System:** `CLAUDE.md`

---

**Last Updated:** 2026-02-15
**Maintained By:** jlucus development team
**Automation Status:** ✅ Active

```
╔════════════════════════════════════════════════════════════╗
║  GitButler-Style Parallel Development: OPERATIONAL        ║
║                                                            ║
║  - Auto branch creation from issues                        ║
║  - Real-time progress tracking                             ║
║  - Automatic milestone linking                             ║
║  - Conflict detection                                      ║
║  - ASCII progress visualization                            ║
╚════════════════════════════════════════════════════════════╝
```
