#!/bin/bash
# Setup Script for feat/auth-foundation/UPR-001
# Authentication Foundation Implementation
# Run this script from the jlucus/ directory

set -e  # Exit on error

echo "=================================="
echo "UPR-001: Auth Foundation Setup"
echo "=================================="

# Step 1: Create feature branch
echo ""
echo "[1/7] Creating feature branch..."
git checkout -b feat/auth-foundation/UPR-001

# Step 2: Install production dependencies
echo ""
echo "[2/7] Installing production dependencies..."
pnpm add next-auth@beta @auth/prisma-adapter @prisma/client bcryptjs

# Step 3: Install dev dependencies
echo ""
echo "[3/7] Installing dev dependencies..."
pnpm add -D prisma @types/bcryptjs

# Step 4: Generate Prisma client
echo ""
echo "[4/7] Generating Prisma client..."
pnpm prisma generate

# Step 5: Build test
echo ""
echo "[5/7] Testing Next.js build..."
pnpm build

# Step 6: Lint check
echo ""
echo "[6/7] Running ESLint..."
pnpm lint

# Step 7: Setup environment (manual step reminder)
echo ""
echo "[7/7] ⚠️  MANUAL STEP REQUIRED:"
echo ""
echo "1. Copy .env.example to .env:"
echo "   cp .env.example .env"
echo ""
echo "2. Generate NEXTAUTH_SECRET:"
echo "   openssl rand -base64 32"
echo ""
echo "3. Add the secret to .env:"
echo "   NEXTAUTH_SECRET=\"<paste-generated-secret>\""
echo ""
echo "4. Configure DATABASE_URL in .env:"
echo "   For PostgreSQL:"
echo "     DATABASE_URL=\"postgresql://user:password@localhost:5432/jlucus_dev\""
echo "   For SQLite (dev):"
echo "     DATABASE_URL=\"file:./dev.db\""
echo ""
echo "5. Run database migration:"
echo "   pnpm prisma migrate dev --name init_auth"
echo ""
echo "6. Start dev server and test:"
echo "   pnpm dev"
echo "   # Visit: http://localhost:3000/api/auth/signin"
echo ""
echo "=================================="
echo "✅ Setup script complete!"
echo "Follow manual steps above to finish configuration."
echo "=================================="
