# Payment Gateway Upgrade - Phase 1 Setup Script (PowerShell)
# Session: sess-feat-payment-gateway-upgrade-PGU-001-1
# Run this script to set up the payment gateway feature

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Payment Gateway Upgrade - Phase 1 Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-Not (Test-Path "package.json")) {
    Write-Host "Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Step 1: Create feature branch
Write-Host "[1/5] Creating feature branch..." -ForegroundColor Yellow
git status
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Green

if ($currentBranch -ne "feature/payment-gateway-upgrade") {
    Write-Host "Creating branch: feature/payment-gateway-upgrade" -ForegroundColor Yellow
    git checkout -b feature/payment-gateway-upgrade
} else {
    Write-Host "Already on feature/payment-gateway-upgrade branch" -ForegroundColor Green
}

# Step 2: Install dependencies
Write-Host ""
Write-Host "[2/5] Installing payment dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray

pnpm add @stripe/stripe-js @stripe/react-stripe-js stripe `
         @paypal/react-paypal-js @paypal/checkout-server-sdk `
         pdf-lib nodemailer currency.js react-hook-form zod

pnpm add -D @types/nodemailer mailtrap

Write-Host "Dependencies installed successfully!" -ForegroundColor Green

# Step 3: Generate Prisma client
Write-Host ""
Write-Host "[3/5] Generating Prisma client..." -ForegroundColor Yellow
pnpm prisma generate

Write-Host "Prisma client generated!" -ForegroundColor Green

# Step 4: Check environment variables
Write-Host ""
Write-Host "[4/5] Checking environment configuration..." -ForegroundColor Yellow

if (-Not (Test-Path ".env")) {
    Write-Host "Warning: .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ".env file created. Please update it with your API keys!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Required variables:" -ForegroundColor Cyan
    Write-Host "  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    Write-Host "  - STRIPE_SECRET_KEY"
    Write-Host "  - STRIPE_WEBHOOK_SECRET"
    Write-Host "  - NEXT_PUBLIC_PAYPAL_CLIENT_ID"
    Write-Host "  - PAYPAL_CLIENT_SECRET"
    Write-Host "  - SMTP configuration"
} else {
    Write-Host ".env file exists. Make sure to add payment gateway variables:" -ForegroundColor Green
    Write-Host "  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    Write-Host "  - STRIPE_SECRET_KEY"
    Write-Host "  - NEXT_PUBLIC_PAYPAL_CLIENT_ID"
    Write-Host "  - PAYPAL_CLIENT_SECRET"
}

# Step 5: Run database migration
Write-Host ""
Write-Host "[5/5] Running database migration..." -ForegroundColor Yellow
Write-Host "This will create the Payment table and enums..." -ForegroundColor Gray

pnpm prisma migrate dev --name add_payment_tables

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Update .env with your Stripe and PayPal API keys"
Write-Host "2. Test the build: pnpm build"
Write-Host "3. Start development server: pnpm dev"
Write-Host "4. Begin Phase 2: Stripe Integration"
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "  - Feature Plan: docs/feature-plans/payment-gateway-upgrade.md"
Write-Host "  - Changelog: docs/changelogs/payment-gateway-upgrade.md"
Write-Host ""
