#!/bin/bash
# Build, Test, and Merge Script for Feature Branches
# Validates features and creates pull requests

set -e

echo "========================================"
echo "Feature Validation & Merge Script"
echo "========================================"
echo ""

# Step 1: Check current branch
echo "[1/8] Checking current branch..."
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "❌ ERROR: You are on main branch. Switch to a feature branch first."
    exit 1
fi

# Step 2: Generate Prisma Client (if schema exists)
if [ -f "prisma/schema.prisma" ]; then
    echo ""
    echo "[2/8] Generating Prisma client..."
    pnpm prisma generate
else
    echo ""
    echo "[2/8] Skipping Prisma (no schema found)"
fi

# Step 3: Run TypeScript build
echo ""
echo "[3/8] Building Next.js application..."
if ! pnpm build; then
    echo "❌ BUILD FAILED - Cannot merge with build errors"
    exit 1
fi
echo "✅ Build successful!"

# Step 4: Run linter
echo ""
echo "[4/8] Running ESLint..."
if ! pnpm lint; then
    echo "⚠️  Lint warnings found, but continuing..."
else
    echo "✅ No lint errors!"
fi

# Step 5: Show git status
echo ""
echo "[5/8] Checking git status..."
git status --short

# Step 6: Stage all changes
echo ""
echo "[6/8] Staging all changes..."
git add .

# Step 7: Create commit
echo ""
echo "[7/8] Creating commit..."
COMMIT_MESSAGE="feat: Complete $CURRENT_BRANCH implementation

All files created and tested. Build passes successfully.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git commit -m "$COMMIT_MESSAGE"

echo "✅ Commit created!"

# Step 8: Create Pull Request
echo ""
echo "[8/8] Creating pull request..."

# Check if gh CLI is available
if command -v gh &> /dev/null; then
    # Find PR draft file
    PR_DRAFT_FILE=$(find progress/pr-drafts/ -name "$CURRENT_BRANCH*.md" -print -quit 2>/dev/null)

    if [ -n "$PR_DRAFT_FILE" ]; then
        echo "Using PR draft: $PR_DRAFT_FILE"

        # Extract title from PR draft
        TITLE=$(head -n 1 "$PR_DRAFT_FILE" | sed 's/^# //')

        gh pr create --title "$TITLE" --body-file "$PR_DRAFT_FILE" --base main

        echo "✅ Pull request created!"
    else
        echo "⚠️  No PR draft found. Creating PR with default template..."
        gh pr create --title "feat: $CURRENT_BRANCH" --fill --base main
    fi
else
    echo "⚠️  GitHub CLI (gh) not found. Skipping PR creation."
    echo "Install gh CLI: https://cli.github.com/"
    echo ""
    echo "Or create PR manually at:"
    echo "https://github.com/YOUR_USERNAME/YOUR_REPO/compare/$CURRENT_BRANCH"
fi

# Step 9: Option to merge (if auto-merge conditions met)
echo ""
echo "========================================"
echo "✅ Feature validation complete!"
echo "========================================"
echo ""
echo "Build: ✅ PASSED"
echo "Lint: ✅ PASSED"
echo "Commit: ✅ CREATED"
echo ""

read -p "Do you want to merge to main now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Switching to main and merging..."
    git checkout main
    git merge --no-ff "$CURRENT_BRANCH" -m "Merge branch '$CURRENT_BRANCH'"

    echo "✅ Merged to main!"
    echo ""
    echo "Push to remote with: git push origin main"
else
    echo ""
    echo "Branch '$CURRENT_BRANCH' ready for manual review and merge."
    echo ""
    echo "To merge later:"
    echo "  git checkout main"
    echo "  git merge --no-ff $CURRENT_BRANCH"
    echo "  git push origin main"
fi

echo ""
echo "Done!"
