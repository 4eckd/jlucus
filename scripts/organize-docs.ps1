# Documentation Organization Script
# Moves documentation files to proper locations

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Documentation Organization" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create directories if they don't exist
$dirs = @(
    "docs/setup-guides",
    "docs/status",
    "scripts"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "✓ Created directory: $dir" -ForegroundColor Green
    }
}

# Move setup/installation guides to docs/setup-guides/
Write-Host ""
Write-Host "Organizing setup guides..." -ForegroundColor Yellow

$setupFiles = @(
    @{ Source = "PAYMENT_GATEWAY_READY.md"; Dest = "docs/setup-guides/payment-gateway-ready.md" },
    @{ Source = "INSTALL_NOW.md"; Dest = "docs/setup-guides/payment-install-guide.md" },
    @{ Source = "SETUP_PAYMENT_GATEWAY.ps1"; Dest = "scripts/setup-payment-gateway.ps1" },
    @{ Source = "BUILD_AND_MERGE.ps1"; Dest = "scripts/build-and-merge.ps1" }
)

foreach ($file in $setupFiles) {
    if (Test-Path $file.Source) {
        Move-Item -Path $file.Source -Destination $file.Dest -Force
        Write-Host "  ✓ Moved: $($file.Source) → $($file.Dest)" -ForegroundColor Green
    }
}

# Move status files to docs/status/
Write-Host ""
Write-Host "Organizing status files..." -ForegroundColor Yellow

$statusFiles = @(
    @{ Source = "FEATURES_READY_FOR_MERGE.md"; Dest = "docs/status/features-ready-for-merge.md" },
    @{ Source = "FEATURE_STATUS.md"; Dest = "docs/status/feature-status.md" }
)

foreach ($file in $statusFiles) {
    if (Test-Path $file.Source) {
        Move-Item -Path $file.Source -Destination $file.Dest -Force
        Write-Host "  ✓ Moved: $($file.Source) → $($file.Dest)" -ForegroundColor Green
    }
}

# Keep these in root (important top-level files)
Write-Host ""
Write-Host "Keeping in root (essential files):" -ForegroundColor Yellow
$rootFiles = @("README.md", "CLAUDE.md")
foreach ($file in $rootFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file (stays in root)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Organization Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Documentation structure:" -ForegroundColor Cyan
Write-Host "  docs/" -ForegroundColor White
Write-Host "    ├── setup-guides/      (installation & setup docs)" -ForegroundColor Gray
Write-Host "    ├── status/            (project status & tracking)" -ForegroundColor Gray
Write-Host "    ├── feature-plans/     (feature specifications)" -ForegroundColor Gray
Write-Host "    └── changelogs/        (change tracking)" -ForegroundColor Gray
Write-Host "  scripts/                 (automation scripts)" -ForegroundColor White
Write-Host "  artifacts/               (build artifacts & reports)" -ForegroundColor White
Write-Host "  progress/                (session tracking)" -ForegroundColor White
Write-Host ""
