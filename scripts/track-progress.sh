#!/bin/bash

# Track and visualize development progress
# Usage: ./scripts/track-progress.sh

set -e

echo "📊 Generating Development Progress Report..."
echo ""

# Create tracking directory
mkdir -p .github/tracking

# Generate timestamp
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

# Get repository stats
TOTAL_BRANCHES=$(git branch -r | grep -v HEAD | wc -l)
TOTAL_COMMITS=$(git rev-list --count HEAD)
RECENT_COMMITS=$(git log --oneline --since="1 week ago" | wc -l)
CURRENT_BRANCH=$(git branch --show-current)

# Calculate phase progress (based on milestones)
declare -A phase_progress=(
  ["Phase 1: Foundation"]=100
  ["Phase 2: Polish & Enhancement"]=40
  ["Phase 3: Content & Features"]=0
  ["Phase 4: Documentation"]=0
  ["Phase 5: Testing & QA"]=30
  ["Phase 6: Deployment"]=0
  ["Phase 7: E-commerce"]=100
  ["Phase 8: Advanced Features"]=0
)

# Generate progress report
cat > .github/tracking/PROGRESS_REPORT.md <<EOF
# Development Progress Report

**Generated:** $TIMESTAMP
**Current Branch:** $CURRENT_BRANCH
**Total Branches:** $TOTAL_BRANCHES
**Total Commits:** $TOTAL_COMMITS
**Recent Commits (7 days):** $RECENT_COMMITS

---

## 📊 Phase Progress

EOF

# Add progress bars
for phase in "${!phase_progress[@]}"; do
  percent=${phase_progress[$phase]}
  filled=$((percent / 5))
  empty=$((20 - filled))

  bar=$(printf '█%.0s' $(seq 1 $filled))$(printf '░%.0s' $(seq 1 $empty))

  # Status emoji
  if [ $percent -eq 100 ]; then
    status="✅"
  elif [ $percent -gt 0 ]; then
    status="🔄"
  else
    status="⏳"
  fi

  echo "$phase  $bar  $percent% $status" >> .github/tracking/PROGRESS_REPORT.md
done

# Add branch details
cat >> .github/tracking/PROGRESS_REPORT.md <<EOF

---

## 🌿 Active Branches

| Branch | Last Commit | Commits | Status |
|--------|-------------|---------|--------|
EOF

# Get branch info
git for-each-ref --sort=-committerdate refs/remotes/origin --format='%(refname:short)|%(committerdate:relative)|%(committerdate:iso8601)' | \
  grep -v HEAD | head -20 | while IFS='|' read -r branch rel_date iso_date; do
    branch_name=$(echo "$branch" | sed 's/origin\///')
    commit_count=$(git rev-list --count origin/$branch_name 2>/dev/null || echo "0")

    # Determine status
    if git branch -r --merged origin/main | grep -q "$branch"; then
      status="🟢 Merged"
    else
      status="🔵 Active"
    fi

    echo "| $branch_name | $rel_date | $commit_count | $status |" >> .github/tracking/PROGRESS_REPORT.md
  done

# Add ASCII visualization
cat >> .github/tracking/PROGRESS_REPORT.md <<'EOF'

---

## 🎨 ASCII Progress Visualization

```
  ___  ___   __   _  _   ___  _  _     ___  ___   __    ___  ___  ___  ___  ___
 | _ )| _ \ /  \ | \| | / __|| || |   | _ \| _ \ /  \  / __|| _ \| __/' __/' __|
 | _ \|   /| /\ || .` || |__ | __ |   |  _/|   /| /\ || (_ ||   /| _|`__ \`__ \
 |___/|_|_\|_||_||_|\_| \___||_||_|   |_|  |_|_\|_||_| \___||_|_\|___||___/|___/

```

### Development Tree

```
main (production)
  │
  └── development (integration)
EOF

# Add branch tree
git branch -r | grep -v HEAD | grep -v main | sed 's/origin\///' | sed 's/^/       ├── /' >> .github/tracking/PROGRESS_REPORT.md

cat >> .github/tracking/PROGRESS_REPORT.md <<EOF

\`\`\`

### Overall Project Status

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Total Progress: ████████░░░░░░░░░░░░  34% Complete        │
│                                                             │
│  ✅ Phase 1: Complete                                       │
│  🔄 Phase 2: In Progress (40%)                             │
│  ⏳ Phase 3-6: Planned                                      │
│  ✅ Phase 7: Complete (Disabled)                           │
│  💭 Phase 8: Future                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 📈 Velocity Metrics

- **Branches per week:** $(git for-each-ref --sort=-committerdate refs/remotes/origin --format='%(committerdate:short)' | grep $(date -d '7 days ago' +%Y-%m) | wc -l)
- **Commits per week:** $RECENT_COMMITS
- **Average commits per branch:** $((TOTAL_COMMITS / (TOTAL_BRANCHES + 1)))

---

**Next Update:** Automated on next push
**Tracking System:** GitButler-inspired parallel development
EOF

echo "✅ Progress report generated: .github/tracking/PROGRESS_REPORT.md"
echo ""

# Generate ASCII art progress (separate file)
cat > .github/tracking/ASCII_PROGRESS.md <<'EOF'
# ASCII Development Progress

```
╔════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║    ██╗██╗     ██╗   ██╗ ██████╗██╗   ██╗███████╗   ██████╗ ███████╗██╗   ██╗ ║
║    ██║██║     ██║   ██║██╔════╝██║   ██║██╔════╝   ██╔══██╗██╔════╝██║   ██║ ║
║    ██║██║     ██║   ██║██║     ██║   ██║███████╗   ██║  ██║█████╗  ██║   ██║ ║
║██  ██║██║     ██║   ██║██║     ██║   ██║╚════██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝ ║
║╚█████╔╝███████╗╚██████╔╝╚██████╗╚██████╔╝███████║██╗██████╔╝███████╗ ╚████╔╝  ║
║ ╚════╝ ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚═╝╚═════╝ ╚══════╝  ╚═══╝   ║
║                                                                                ║
║              Terminal Neon Portfolio - Parallel Development                   ║
╚════════════════════════════════════════════════════════════════════════════════╝

EOF

# Add dynamic progress
echo "## Phase Progress" >> .github/tracking/ASCII_PROGRESS.md
echo "" >> .github/tracking/ASCII_PROGRESS.md
echo '```' >> .github/tracking/ASCII_PROGRESS.md

for phase in "Phase 1: Foundation" "Phase 2: Polish & Enhancement" "Phase 3: Content & Features" "Phase 4: Documentation" "Phase 5: Testing & QA" "Phase 6: Deployment"; do
  percent=${phase_progress[$phase]}
  filled=$((percent / 5))
  empty=$((20 - filled))
  bar=$(printf '█%.0s' $(seq 1 $filled))$(printf '░%.0s' $(seq 1 $empty))
  printf "%-30s %s %3d%%\n" "$phase" "$bar" "$percent" >> .github/tracking/ASCII_PROGRESS.md
done

cat >> .github/tracking/ASCII_PROGRESS.md <<EOF
\`\`\`

## Branch Network

\`\`\`
      main
       │
       ├─── development
       │     │
EOF

# Add branches with ASCII tree
git branch -r | grep -v HEAD | grep -v main | grep -v development | sed 's/origin\///' | awk '{print "       │     ├── " $1}' >> .github/tracking/ASCII_PROGRESS.md

cat >> .github/tracking/ASCII_PROGRESS.md <<EOF
       │
       └─── [$(git branch -r | grep -v HEAD | wc -l) active branches]
\`\`\`

**Last Updated:** $TIMESTAMP
**System:** GitButler-inspired automation ✨
EOF

echo "✅ ASCII progress generated: .github/tracking/ASCII_PROGRESS.md"
echo ""
echo "📂 View reports:"
echo "   - Progress Report: .github/tracking/PROGRESS_REPORT.md"
echo "   - ASCII Progress: .github/tracking/ASCII_PROGRESS.md"
echo ""
