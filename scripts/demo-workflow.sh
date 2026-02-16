#!/bin/bash

# Quick demonstration of the GitButler workflow
# This creates example branches to show the system in action

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  GitButler System Demonstration                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "📋 Creating demonstration feature branches..."
echo ""

# Example branches based on Phase 2 issues
DEMO_BRANCHES=(
  "polish-123-scanline-effect:Scanline overlay for CRT aesthetic"
  "polish-124-animated-grid:Animated grid background"
  "feat-126-loading-screen:Terminal boot sequence loading screen"
  "polish-131-custom-cursor:Neon trail cursor effect"
  "feat-130-command-palette:Keyboard shortcuts command palette"
)

for branch_info in "${DEMO_BRANCHES[@]}"; do
  IFS=':' read -r branch_name description <<< "$branch_info"

  echo "🌿 Creating: $branch_name"
  echo "   Description: $description"

  # Check if branch exists
  if git show-ref --verify --quiet refs/heads/$branch_name; then
    echo "   ⚠️  Branch already exists, skipping"
  else
    # Create branch
    git branch $branch_name 2>/dev/null || true
    echo "   ✓ Branch created"
  fi

  echo ""
done

echo "✅ Demonstration branches created!"
echo ""
echo "📊 Current branch structure:"
echo ""
git branch | grep -E 'polish-|feat-' || echo "No feature branches yet"
echo ""

echo "🎯 Next steps:"
echo ""
echo "1. Switch to a feature branch:"
echo "   git checkout polish-123-scanline-effect"
echo ""
echo "2. Or create worktrees for parallel development:"
echo "   git worktree add ../jlucus-scanline polish-123-scanline-effect"
echo "   git worktree add ../jlucus-grid polish-124-animated-grid"
echo ""
echo "3. Track progress:"
echo "   ./scripts/track-progress.sh"
echo ""
echo "4. View available branches:"
echo "   git branch --list 'polish-*' 'feat-*'"
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Demonstration complete! Ready for parallel development.   ║"
echo "╚════════════════════════════════════════════════════════════╝"
