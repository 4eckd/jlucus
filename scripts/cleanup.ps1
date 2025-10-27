# Project Cleanup Script
# Cleans up development artifacts, temporary files, and ensures project is in good state

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Project Cleanup & Maintenance" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$cleaned = 0
$errors = 0

# 1. Clean build artifacts
Write-Host "[1/7] Cleaning build artifacts..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host "  ✓ Removed .next directory" -ForegroundColor Green
    $cleaned++
}
if (Test-Path "out") {
    Remove-Item -Path "out" -Recurse -Force
    Write-Host "  ✓ Removed out directory" -ForegroundColor Green
    $cleaned++
}

# 2. Clean Prisma artifacts
Write-Host ""
Write-Host "[2/7] Cleaning Prisma artifacts..." -ForegroundColor Yellow
if (Test-Path "prisma/migrations/.tmp") {
    Remove-Item -Path "prisma/migrations/.tmp" -Recurse -Force
    Write-Host "  ✓ Removed temporary migration files" -ForegroundColor Green
    $cleaned++
}

# 3. Clean log files
Write-Host ""
Write-Host "[3/7] Cleaning log files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Filter "*.log" -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
    if ($_.FullName -notmatch "node_modules") {
        Remove-Item $_.FullName -Force
        Write-Host "  ✓ Removed $($_.Name)" -ForegroundColor Green
        $cleaned++
    }
}

# 4. Clean temporary files
Write-Host ""
Write-Host "[4/7] Cleaning temporary files..." -ForegroundColor Yellow
$tempPatterns = @("*.tmp", "*.temp", "*~", ".DS_Store", "Thumbs.db")
foreach ($pattern in $tempPatterns) {
    Get-ChildItem -Path . -Filter $pattern -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
        if ($_.FullName -notmatch "node_modules") {
            Remove-Item $_.FullName -Force
            Write-Host "  ✓ Removed $($_.Name)" -ForegroundColor Green
            $cleaned++
        }
    }
}

# 5. Verify critical files exist
Write-Host ""
Write-Host "[5/7] Verifying project structure..." -ForegroundColor Yellow
$criticalFiles = @(
    "package.json",
    "tsconfig.json",
    "next.config.ts",
    ".env.example",
    "prisma/schema.prisma"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file exists" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file missing!" -ForegroundColor Red
        $errors++
    }
}

# 6. Check for large files (> 10MB)
Write-Host ""
Write-Host "[6/7] Checking for large files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -File -ErrorAction SilentlyContinue | Where-Object {
    $_.Length -gt 10MB -and $_.FullName -notmatch "node_modules"
} | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "  ⚠ Large file: $($_.Name) ($sizeMB MB)" -ForegroundColor Yellow
}

# 7. Organize documentation
Write-Host ""
Write-Host "[7/7] Checking documentation structure..." -ForegroundColor Yellow
$docDirs = @("docs", "artifacts", "progress")
foreach ($dir in $docDirs) {
    if (Test-Path $dir) {
        $fileCount = (Get-ChildItem -Path $dir -Recurse -File).Count
        Write-Host "  ✓ $dir/ contains $fileCount files" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ $dir/ directory missing" -ForegroundColor Yellow
    }
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cleanup Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Items cleaned: $cleaned" -ForegroundColor Green
Write-Host "Errors found: $errors" -ForegroundColor $(if ($errors -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($errors -eq 0) {
    Write-Host "✓ Project is clean and ready!" -ForegroundColor Green
} else {
    Write-Host "⚠ Some issues were found. Please review above." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run: pnpm install (if needed)" -ForegroundColor White
Write-Host "  2. Run: pnpm build (to verify)" -ForegroundColor White
Write-Host "  3. Run: pnpm dev (to start)" -ForegroundColor White
Write-Host ""
