#!/bin/bash

# Coordinate merging of multiple feature branches
# Usage: ./scripts/merge-coordinator.sh [branch-name|all]

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          Merge Coordinator - GitButler Style              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Ensure we're on development branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "development" ] && [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  You're currently on: $CURRENT_BRANCH"
  read -p "Switch to development branch? (y/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git checkout development
    git pull origin development
  else
    echo "❌ Merge coordinator must run from development branch"
    exit 1
  fi
fi

# Get all feature branches
echo "🔍 Scanning for mergeable branches..."
echo ""

FEATURE_BRANCHES=$(git branch -r --no-merged | grep -E 'feat-|fix-|docs-|test-|polish-' | grep -v HEAD | sed 's/origin\///' || true)

if [ -z "$FEATURE_BRANCHES" ]; then
  echo "✅ No feature branches waiting to merge"
  exit 0
fi

echo "📋 Branches ready for merge:"
echo ""
echo "$FEATURE_BRANCHES" | nl
echo ""

# Check if specific branch provided
if [ ! -z "$1" ]; then
  if [ "$1" = "all" ]; then
    MODE="batch"
  else
    MODE="single"
    BRANCH_TO_MERGE="$1"
  fi
else
  read -p "Enter branch number to merge (or 'all' for batch merge, 'q' to quit): " INPUT

  if [ "$INPUT" = "q" ]; then
    echo "👋 Exiting"
    exit 0
  elif [ "$INPUT" = "all" ]; then
    MODE="batch"
  else
    MODE="single"
    BRANCH_TO_MERGE=$(echo "$FEATURE_BRANCHES" | sed -n "${INPUT}p")
  fi
fi

# Function to check for conflicts
check_conflicts() {
  local branch=$1
  echo "🔍 Checking $branch for conflicts..."

  git fetch origin $branch
  git merge --no-commit --no-ff origin/$branch 2>&1 | tee /tmp/merge_output.txt

  if grep -q "CONFLICT" /tmp/merge_output.txt; then
    echo "❌ Conflicts detected in $branch"
    git merge --abort
    return 1
  else
    echo "✅ $branch can be merged cleanly"
    git merge --abort
    return 0
  fi
}

# Function to merge branch
merge_branch() {
  local branch=$1

  echo ""
  echo "╔════════════════════════════════════════════════════════════╗"
  echo "║  Merging: $branch"
  echo "╚════════════════════════════════════════════════════════════╝"
  echo ""

  # Fetch latest
  git fetch origin $branch

  # Get branch info
  COMMITS=$(git rev-list --count origin/$branch ^development)
  AUTHOR=$(git log origin/$branch -1 --format="%an")
  LAST_COMMIT=$(git log origin/$branch -1 --format="%s")

  echo "📊 Branch Info:"
  echo "   Commits ahead: $COMMITS"
  echo "   Author: $AUTHOR"
  echo "   Last commit: $LAST_COMMIT"
  echo ""

  # Check for conflicts
  if ! check_conflicts $branch; then
    echo "⚠️  Cannot auto-merge due to conflicts"
    echo "   Please resolve conflicts manually:"
    echo "   git merge origin/$branch"
    return 1
  fi

  # Perform merge
  echo "🔄 Performing merge..."
  git merge --no-ff origin/$branch -m "Merge branch '$branch' into development

Merged feature: $branch
Commits: $COMMITS
Author: $AUTHOR

Auto-merged by merge-coordinator"

  echo "✅ Successfully merged $branch"

  # Ask about branch deletion
  read -p "Delete remote branch $branch? (y/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push origin --delete $branch
    echo "🗑️  Deleted remote branch"
  fi

  return 0
}

# Execute based on mode
if [ "$MODE" = "single" ]; then
  if [ -z "$BRANCH_TO_MERGE" ]; then
    echo "❌ Invalid branch selection"
    exit 1
  fi

  merge_branch $BRANCH_TO_MERGE

elif [ "$MODE" = "batch" ]; then
  echo "🚀 Batch merge mode - processing all branches..."
  echo ""

  SUCCESS_COUNT=0
  FAIL_COUNT=0
  CONFLICT_BRANCHES=()

  while IFS= read -r branch; do
    if merge_branch $branch; then
      SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
      FAIL_COUNT=$((FAIL_COUNT + 1))
      CONFLICT_BRANCHES+=("$branch")
    fi
    echo ""
  done <<< "$FEATURE_BRANCHES"

  echo "╔════════════════════════════════════════════════════════════╗"
  echo "║                    Batch Merge Summary                     ║"
  echo "╠════════════════════════════════════════════════════════════╣"
  echo "║  ✅ Successful merges: $SUCCESS_COUNT"
  echo "║  ❌ Failed merges: $FAIL_COUNT"
  echo "╚════════════════════════════════════════════════════════════╝"

  if [ ${#CONFLICT_BRANCHES[@]} -gt 0 ]; then
    echo ""
    echo "⚠️  Branches with conflicts:"
    for branch in "${CONFLICT_BRANCHES[@]}"; do
      echo "   - $branch"
    done
  fi
fi

echo ""
echo "✅ Merge coordination complete"
echo ""
echo "Next steps:"
echo "  1. Review merged changes: git log --oneline -10"
echo "  2. Run tests: npm test"
echo "  3. Push to development: git push origin development"
echo ""
