#!/bin/bash
# Payment Gateway Upgrade - Phase 1 Setup Script
# Session: sess-feat-payment-gateway-upgrade-PGU-001-1
# Run this script to set up the payment gateway feature

set -e # Exit on error

echo "=========================================="
echo "Payment Gateway Upgrade - Phase 1 Setup"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found. Please run this script from the project root."
  exit 1
fi

# Step 1: Create feature branch
echo "[1/5] Creating feature branch..."
git status
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "feature/payment-gateway-upgrade" ]; then
  echo "Creating branch: feature/payment-gateway-upgrade"
  git checkout -b feature/payment-gateway-upgrade
else
  echo "Already on feature/payment-gateway-upgrade branch"
fi

# Step 2: Install dependencies
echo ""
echo "[2/5] Installing payment dependencies..."
echo "This may take a few minutes..."

pnpm add @stripe/stripe-js @stripe/react-stripe-js stripe \
         @paypal/react-paypal-js @paypal/checkout-server-sdk \
         pdf-lib nodemailer currency.js react-hook-form zod

pnpm add -D @types/nodemailer mailtrap

echo "Dependencies installed successfully!"

# Step 3: Generate Prisma client
echo ""
echo "[3/5] Generating Prisma client..."
pnpm prisma generate

echo "Prisma client generated!"

# Step 4: Check environment variables
echo ""
echo "[4/5] Checking environment configuration..."

if [ ! -f ".env" ]; then
  echo "Warning: .env file not found. Creating from .env.example..."
  cp .env.example .env
  echo ".env file created. Please update it with your API keys!"
  echo ""
  echo "Required variables:"
  echo "  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  echo "  - STRIPE_SECRET_KEY"
  echo "  - STRIPE_WEBHOOK_SECRET"
  echo "  - NEXT_PUBLIC_PAYPAL_CLIENT_ID"
  echo "  - PAYPAL_CLIENT_SECRET"
  echo "  - SMTP configuration"
else
  echo ".env file exists. Make sure to add payment gateway variables:"
  echo "  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  echo "  - STRIPE_SECRET_KEY"
  echo "  - NEXT_PUBLIC_PAYPAL_CLIENT_ID"
  echo "  - PAYPAL_CLIENT_SECRET"
fi

# Step 5: Run database migration
echo ""
echo "[5/5] Running database migration..."
echo "This will create the Payment table and enums..."

pnpm prisma migrate dev --name add_payment_tables

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Update .env with your Stripe and PayPal API keys"
echo "2. Test the build: pnpm build"
echo "3. Start development server: pnpm dev"
echo "4. Begin Phase 2: Stripe Integration"
echo ""
echo "Documentation:"
echo "  - Feature Plan: docs/feature-plans/payment-gateway-upgrade.md"
echo "  - Changelog: docs/changelogs/payment-gateway-upgrade.md"
echo ""
