#!/bin/bash

# Smart branch switching with auto-stash
# Usage: ./scripts/switch-branch.sh <branch-name>

set -e

BRANCH=$1

if [ -z "$BRANCH" ]; then
  echo "📋 Available branches:"
  echo ""
  git branch -a | grep -v HEAD
  echo ""
  read -p "Enter branch name to switch to: " BRANCH
fi

CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" = "$BRANCH" ]; then
  echo "✅ Already on branch: $BRANCH"
  exit 0
fi

echo "🔄 Switching from $CURRENT_BRANCH to $BRANCH"

# Check for uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "⚠️  You have uncommitted changes"
  echo ""
  git status --short
  echo ""
  read -p "Stash changes? (y/n): " -n 1 -r
  echo

  if [[ $REPLY =~ ^[Yy]$ ]]; then
    STASH_MSG="WIP: $CURRENT_BRANCH at $(date +%Y-%m-%d_%H:%M:%S)"
    git stash push -m "$STASH_MSG"
    echo "✅ Changes stashed: $STASH_MSG"
  else
    echo "❌ Cannot switch with uncommitted changes"
    exit 1
  fi
fi

# Switch branch
echo "🌿 Switching to $BRANCH..."
git checkout $BRANCH
git pull origin $BRANCH 2>/dev/null || echo "⚠️  Could not pull from remote"

echo "✅ Now on branch: $BRANCH"
echo ""
echo "Recent commits:"
git log --oneline -5

echo ""
echo "💡 To restore stashed changes later:"
echo "   git stash list"
echo "   git stash pop"
echo ""
