#!/bin/bash

# Create feature branch from GitHub issue
# Usage: ./scripts/create-feature-branch.sh <issue-number>

set -e

ISSUE_NUM=$1

if [ -z "$ISSUE_NUM" ]; then
  echo "❌ Error: Issue number required"
  echo "Usage: ./create-feature-branch.sh <issue-number>"
  echo ""
  echo "Example: ./create-feature-branch.sh 123"
  exit 1
fi

echo "🔍 Fetching issue #$ISSUE_NUM details..."

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) is not installed"
  echo "Install: https://cli.github.com/"
  exit 1
fi

# Fetch issue data
ISSUE_DATA=$(gh issue view $ISSUE_NUM --json title,milestone,labels,state 2>&1)

if echo "$ISSUE_DATA" | grep -q "could not find issue"; then
  echo "❌ Issue #$ISSUE_NUM not found"
  exit 1
fi

TITLE=$(echo $ISSUE_DATA | jq -r '.title' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | cut -c1-50)
MILESTONE=$(echo $ISSUE_DATA | jq -r '.milestone.title // "none"')
STATE=$(echo $ISSUE_DATA | jq -r '.state')
LABELS=$(echo $ISSUE_DATA | jq -r '.labels[].name' | tr '\n' ',' | sed 's/,$//')

echo "📋 Issue Details:"
echo "   Title: $TITLE"
echo "   Milestone: $MILESTONE"
echo "   State: $STATE"
echo "   Labels: $LABELS"
echo ""

# Determine branch prefix from labels
PREFIX="feat"
if echo "$LABELS" | grep -q "bug"; then
  PREFIX="fix"
elif echo "$LABELS" | grep -q "documentation"; then
  PREFIX="docs"
elif echo "$LABELS" | grep -q "testing"; then
  PREFIX="test"
elif echo "$LABELS" | grep -q "enhancement"; then
  PREFIX="polish"
elif echo "$LABELS" | grep -q "chore"; then
  PREFIX="chore"
fi

BRANCH_NAME="${PREFIX}-${ISSUE_NUM}-${TITLE}"

echo "🌿 Creating branch: $BRANCH_NAME"

# Check if branch already exists
if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
  echo "⚠️  Branch already exists locally"
  read -p "Switch to it? (y/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git checkout $BRANCH_NAME
  fi
  exit 0
fi

# Create and checkout branch
git checkout -b $BRANCH_NAME

echo "✓ Branch created and checked out"

# Push to remote
echo "📤 Pushing to remote..."
git push -u origin $BRANCH_NAME

# Add comment to issue
echo "💬 Adding comment to issue..."
gh issue comment $ISSUE_NUM --body "🚀 **Branch created:** \`$BRANCH_NAME\`

You can start working on this issue. When ready, create a PR to merge into \`development\`.

**Quick commands:**
\`\`\`bash
git checkout $BRANCH_NAME
git pull origin $BRANCH_NAME
\`\`\`

**Related:**
- Milestone: $MILESTONE
- Branch type: $PREFIX
"

# Add in-development label
echo "🏷️  Adding 'in-development' label..."
gh issue edit $ISSUE_NUM --add-label "in-development" 2>/dev/null || true

echo ""
echo "✅ All done!"
echo ""
echo "Next steps:"
echo "  1. Start coding in branch: $BRANCH_NAME"
echo "  2. Commit frequently with: git commit -m '$PREFIX(scope): description'"
echo "  3. Push changes: git push"
echo "  4. Create PR when ready: gh pr create --base development"
echo ""
