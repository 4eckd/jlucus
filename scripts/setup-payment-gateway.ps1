# Payment Gateway Setup Script - Automated Installation
# Run this script to complete the payment gateway setup

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Payment Gateway Setup - Stripe Integration" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check .env file
Write-Host "[1/6] Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file found" -ForegroundColor Green

    # Verify Stripe keys are configured
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "pk_test_") {
        Write-Host "✓ Stripe publishable key configured" -ForegroundColor Green
    } else {
        Write-Host "✗ Stripe publishable key not found in .env" -ForegroundColor Red
        exit 1
    }

    if ($envContent -match "sk_test_") {
        Write-Host "✓ Stripe secret key configured" -ForegroundColor Green
    } else {
        Write-Host "✗ Stripe secret key not found in .env" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ .env file not found!" -ForegroundColor Red
    Write-Host "Please create .env file with Stripe credentials" -ForegroundColor Yellow
    exit 1
}

# Step 2: Install dependencies
Write-Host ""
Write-Host "[2/6] Installing payment dependencies..." -ForegroundColor Yellow
Write-Host "This may take 2-3 minutes..." -ForegroundColor Gray

pnpm add @stripe/stripe-js @stripe/react-stripe-js stripe currency.js react-hook-form zod
pnpm add -D @types/nodemailer

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 3: Generate Prisma client
Write-Host ""
Write-Host "[3/6] Generating Prisma client..." -ForegroundColor Yellow

pnpm prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Prisma client generated" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to generate Prisma client" -ForegroundColor Red
    exit 1
}

# Step 4: Run database migration
Write-Host ""
Write-Host "[4/6] Running database migration..." -ForegroundColor Yellow
Write-Host "Creating Payment table and enums..." -ForegroundColor Gray

pnpm prisma migrate dev --name add_payment_tables

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database migration completed" -ForegroundColor Green
} else {
    Write-Host "✗ Database migration failed" -ForegroundColor Red
    exit 1
}

# Step 5: Build project
Write-Host ""
Write-Host "[5/6] Building project..." -ForegroundColor Yellow
Write-Host "Verifying TypeScript compilation..." -ForegroundColor Gray

pnpm build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build successful - no TypeScript errors" -ForegroundColor Green
} else {
    Write-Host "✗ Build failed - check TypeScript errors above" -ForegroundColor Red
    exit 1
}

# Step 6: Setup webhook
Write-Host ""
Write-Host "[6/6] Webhook Setup Instructions" -ForegroundColor Yellow
Write-Host ""
Write-Host "To complete the setup, configure your Stripe webhook:" -ForegroundColor Cyan
Write-Host "1. Go to: https://dashboard.stripe.com/test/webhooks" -ForegroundColor White
Write-Host "2. Click '+ Add endpoint'" -ForegroundColor White
Write-Host "3. Endpoint URL: http://localhost:3000/api/payment/webhook" -ForegroundColor White
Write-Host "4. Select events:" -ForegroundColor White
Write-Host "   - payment_intent.succeeded" -ForegroundColor Gray
Write-Host "   - payment_intent.payment_failed" -ForegroundColor Gray
Write-Host "   - payment_intent.canceled" -ForegroundColor Gray
Write-Host "   - payment_intent.processing" -ForegroundColor Gray
Write-Host "5. Click 'Add endpoint'" -ForegroundColor White
Write-Host "6. Reveal the 'Signing secret' (starts with whsec_)" -ForegroundColor White
Write-Host "7. Add to .env file:" -ForegroundColor White
Write-Host '   STRIPE_WEBHOOK_SECRET="whsec_YOUR_SECRET_HERE"' -ForegroundColor Gray
Write-Host ""

# Success summary
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Set up webhook (see instructions above)" -ForegroundColor White
Write-Host "2. Start dev server: pnpm dev" -ForegroundColor White
Write-Host "3. Visit: http://localhost:3000/checkout?amount=5000" -ForegroundColor White
Write-Host "4. Test with card: 4242 4242 4242 4242" -ForegroundColor White
Write-Host ""
Write-Host "Test Cards:" -ForegroundColor Cyan
Write-Host "  Success:     4242 4242 4242 4242" -ForegroundColor Green
Write-Host "  3D Secure:   4000 0025 0000 3155" -ForegroundColor Yellow
Write-Host "  Declined:    4000 0000 0000 9995" -ForegroundColor Red
Write-Host "  Expiry: 12/34 | CVC: 123 | ZIP: 12345" -ForegroundColor Gray
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "  Feature Plan: docs/feature-plans/payment-gateway-upgrade.md" -ForegroundColor White
Write-Host "  Setup Guide:  artifacts/feat-payment-gateway-upgrade-PGU-001/PHASE2_COMPLETE.md" -ForegroundColor White
Write-Host ""
