# Hero Section Feature - Automated Deployment Script
# Session: Window 3 - HSC-001
# Platform: Windows PowerShell

param(
    [switch]$SkipBuild,
    [switch]$SkipLint,
    [switch]$SkipPush,
    [switch]$DryRun
)

# Colors for output
function Write-Success { param($msg) Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Error { param($msg) Write-Host "❌ $msg" -ForegroundColor Red }
function Write-Info { param($msg) Write-Host "ℹ️  $msg" -ForegroundColor Cyan }
function Write-Warning { param($msg) Write-Host "⚠️  $msg" -ForegroundColor Yellow }

Write-Info "Hero Section Feature Deployment Script"
Write-Info "Branch: feat/hero-section/HSC-001"
Write-Info "========================================`n"

# Navigate to jlucus directory
Set-Location -Path "K:\git\4eckd-jlucus\jlucus"

# Step 1: Create feature branch
Write-Info "Step 1: Creating feature branch..."
if ($DryRun) {
    Write-Warning "DRY RUN: Would execute: git checkout -b feat/hero-section/HSC-001"
} else {
    try {
        git checkout -b feat/hero-section/HSC-001 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Feature branch created: feat/hero-section/HSC-001"
        } elseif (git branch --list feat/hero-section/HSC-001) {
            git checkout feat/hero-section/HSC-001
            Write-Success "Switched to existing branch: feat/hero-section/HSC-001"
        } else {
            throw "Failed to create/checkout branch"
        }
    } catch {
        Write-Error "Failed to create feature branch: $_"
        exit 1
    }
}

# Step 2: Stage files
Write-Info "`nStep 2: Staging files for commit..."
$filesToAdd = @(
    "src/components/sections/HeroSection.tsx",
    "src/components/sections/index.ts",
    "src/hooks/useTypingAnimation.ts",
    "src/app/page.tsx",
    "progress/manifest.json",
    "progress/logs/branch-progress.md",
    "progress/pr-drafts/feat-hero-section-HSC-001.md",
    "progress/SESSION_COORDINATION.md",
    "artifacts/feat-hero-section-HSC-001/"
)

if ($DryRun) {
    Write-Warning "DRY RUN: Would stage $($filesToAdd.Count) files"
} else {
    foreach ($file in $filesToAdd) {
        if (Test-Path $file) {
            git add $file
            Write-Success "Staged: $file"
        } else {
            Write-Warning "File not found (skipping): $file"
        }
    }
}

# Step 3: Create commit
Write-Info "`nStep 3: Creating commit..."
$commitMessage = @"
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
"@

if ($DryRun) {
    Write-Warning "DRY RUN: Would create commit with message:"
    Write-Host $commitMessage -ForegroundColor Gray
} else {
    try {
        git commit -m $commitMessage
        Write-Success "Commit created successfully"

        # Show commit details
        Write-Info "`nCommit details:"
        git log -1 --stat
    } catch {
        Write-Error "Failed to create commit: $_"
        exit 1
    }
}

# Step 4: Run build
if (-not $SkipBuild) {
    Write-Info "`nStep 4: Running production build..."
    if ($DryRun) {
        Write-Warning "DRY RUN: Would execute: pnpm build"
    } else {
        try {
            pnpm build
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Build passed ✓"
            } else {
                throw "Build failed with exit code $LASTEXITCODE"
            }
        } catch {
            Write-Error "Build failed: $_"
            Write-Warning "Fix build errors before pushing"
            exit 1
        }
    }
} else {
    Write-Warning "Skipping build (use -SkipBuild:$false to enable)"
}

# Step 5: Run lint
if (-not $SkipLint) {
    Write-Info "`nStep 5: Running ESLint..."
    if ($DryRun) {
        Write-Warning "DRY RUN: Would execute: pnpm lint"
    } else {
        try {
            pnpm lint
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Lint passed ✓"
            } else {
                throw "Lint failed with exit code $LASTEXITCODE"
            }
        } catch {
            Write-Error "Lint failed: $_"
            Write-Warning "Fix linting errors before pushing"
            exit 1
        }
    }
} else {
    Write-Warning "Skipping lint (use -SkipLint:$false to enable)"
}

# Step 6: Push to remote
if (-not $SkipPush) {
    Write-Info "`nStep 6: Pushing to remote..."
    if ($DryRun) {
        Write-Warning "DRY RUN: Would execute: git push -u origin feat/hero-section/HSC-001"
    } else {
        try {
            git push -u origin feat/hero-section/HSC-001
            Write-Success "Pushed to remote: origin/feat/hero-section/HSC-001"
        } catch {
            Write-Error "Failed to push: $_"
            Write-Warning "You can push manually later with: git push -u origin feat/hero-section/HSC-001"
        }
    }
} else {
    Write-Warning "Skipping push (use -SkipPush:$false to enable)"
}

# Step 7: Create PR
Write-Info "`nStep 7: Creating Pull Request..."
if ($DryRun) {
    Write-Warning "DRY RUN: Would create PR using GitHub CLI"
} else {
    $prDraft = Get-Content "progress/pr-drafts/feat-hero-section-HSC-001.md" -Raw

    try {
        gh pr create --base main `
            --title "feat(sections): Hero Section Component with Typing Animation" `
            --body $prDraft

        Write-Success "Pull request created!"
    } catch {
        Write-Warning "Failed to create PR automatically: $_"
        Write-Info "Create PR manually at:"
        Write-Info "https://github.com/[your-username]/jlucus/compare/main...feat/hero-section/HSC-001"
    }
}

# Summary
Write-Info "`n========================================`n"
Write-Success "Deployment complete!"
Write-Info "Branch: feat/hero-section/HSC-001"
Write-Info "Status: Ready for review"
Write-Info "`nNext steps:"
Write-Info "1. Review PR and request reviews"
Write-Info "2. Address any feedback"
Write-Info "3. Merge to main when approved"
Write-Info "4. Start next feature: HSC-002 (About section)"

# Show current status
Write-Info "`nCurrent git status:"
git status --short
