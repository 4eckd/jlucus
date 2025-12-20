# PowerShell Setup Script for feat/auth-foundation/UPR-001
# Authentication Foundation Implementation
# Run this script from the jlucus/ directory

$ErrorActionPreference = "Stop"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "UPR-001: Auth Foundation Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Step 1: Create feature branch
Write-Host ""
Write-Host "[1/7] Creating feature branch..." -ForegroundColor Yellow
git checkout -b feat/auth-foundation/UPR-001

# Step 2: Install production dependencies
Write-Host ""
Write-Host "[2/7] Installing production dependencies..." -ForegroundColor Yellow
pnpm add next-auth@beta @auth/prisma-adapter @prisma/client bcryptjs

# Step 3: Install dev dependencies
Write-Host ""
Write-Host "[3/7] Installing dev dependencies..." -ForegroundColor Yellow
pnpm add -D prisma "@types/bcryptjs"

# Step 4: Generate Prisma client
Write-Host ""
Write-Host "[4/7] Generating Prisma client..." -ForegroundColor Yellow
pnpm prisma generate

# Step 5: Build test
Write-Host ""
Write-Host "[5/7] Testing Next.js build..." -ForegroundColor Yellow
pnpm build

# Step 6: Lint check
Write-Host ""
Write-Host "[6/7] Running ESLint..." -ForegroundColor Yellow
pnpm lint

# Step 7: Setup environment (manual step reminder)
Write-Host ""
Write-Host "[7/7] ⚠️  MANUAL STEPS REQUIRED:" -ForegroundColor Red
Write-Host ""
Write-Host "1. Copy .env.example to .env:" -ForegroundColor White
Write-Host "   Copy-Item .env.example .env" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Generate NEXTAUTH_SECRET (in Git Bash or WSL):" -ForegroundColor White
Write-Host "   openssl rand -base64 32" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Edit .env and add the secret:" -ForegroundColor White
Write-Host "   NEXTAUTH_SECRET=`"<paste-generated-secret>`"" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Configure DATABASE_URL in .env:" -ForegroundColor White
Write-Host "   For PostgreSQL:" -ForegroundColor Gray
Write-Host "     DATABASE_URL=`"postgresql://user:password@localhost:5432/jlucus_dev`"" -ForegroundColor Gray
Write-Host "   For SQLite (dev):" -ForegroundColor Gray
Write-Host "     DATABASE_URL=`"file:./dev.db`"" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Run database migration:" -ForegroundColor White
Write-Host "   pnpm prisma migrate dev --name init_auth" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Start dev server and test:" -ForegroundColor White
Write-Host "   pnpm dev" -ForegroundColor Gray
Write-Host "   # Visit: http://localhost:3000/api/auth/signin" -ForegroundColor Gray
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✅ Setup script complete!" -ForegroundColor Green
Write-Host "Follow manual steps above to finish configuration." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
