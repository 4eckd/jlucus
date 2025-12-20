# Payment Gateway Upgrade - Quick Start Guide

**Session:** sess-feat-payment-gateway-upgrade-PGU-001-1
**Branch:** `feature/payment-gateway-upgrade`
**Status:** Phase 1 Complete (Foundation)

---

## What Was Completed

### Phase 1: Foundation ✅

- ✅ Created complete directory structure in `src/features/payment/`
- ✅ TypeScript types defined (`payment.types.ts`)
- ✅ Currency utilities implemented (`currency.ts`)
- ✅ Validation schemas created with Zod (`validation.ts`)
- ✅ Prisma Payment model added to schema
- ✅ Environment variables documented in `.env.example`
- ✅ Setup scripts created (Bash + PowerShell)

### Files Created (7)

1. `src/features/payment/types/payment.types.ts` - Complete type definitions
2. `src/features/payment/lib/currency.ts` - Currency formatting and calculations
3. `src/features/payment/lib/validation.ts` - Zod validation schemas
4. `prisma/schema.prisma` - Added Payment model + enums (modified)
5. `.env.example` - Added payment configuration (modified)
6. `artifacts/feat-payment-gateway-upgrade-PGU-001/SETUP_SCRIPT.sh` - Bash setup
7. `artifacts/feat-payment-gateway-upgrade-PGU-001/SETUP_SCRIPT.ps1` - PowerShell setup

---

## Quick Start (Choose One)

### Option A: Automated Setup (Recommended)

**On Windows (PowerShell):**
```powershell
cd K:\git\4eckd-jlucus\jlucus
.\artifacts\feat-payment-gateway-upgrade-PGU-001\SETUP_SCRIPT.ps1
```

**On Linux/Mac (Bash):**
```bash
cd /path/to/jlucus
chmod +x artifacts/feat-payment-gateway-upgrade-PGU-001/SETUP_SCRIPT.sh
./artifacts/feat-payment-gateway-upgrade-PGU-001/SETUP_SCRIPT.sh
```

**The script will:**
1. Create feature branch: `feature/payment-gateway-upgrade`
2. Install all payment dependencies (12 packages)
3. Generate Prisma client
4. Create/update `.env` file
5. Run database migration

---

### Option B: Manual Setup

#### Step 1: Create Feature Branch
```bash
git checkout -b feature/payment-gateway-upgrade
```

#### Step 2: Install Dependencies

**Production dependencies:**
```bash
pnpm add @stripe/stripe-js @stripe/react-stripe-js stripe \
         @paypal/react-paypal-js @paypal/checkout-server-sdk \
         pdf-lib nodemailer currency.js react-hook-form zod
```

**Development dependencies:**
```bash
pnpm add -D @types/nodemailer mailtrap
```

#### Step 3: Generate Prisma Client
```bash
pnpm prisma generate
```

#### Step 4: Configure Environment
```bash
# Copy .env.example to .env if not exists
cp .env.example .env

# Edit .env and add your API keys:
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
# STRIPE_SECRET_KEY=sk_test_...
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
# PAYPAL_CLIENT_SECRET=...
```

#### Step 5: Run Database Migration
```bash
pnpm prisma migrate dev --name add_payment_tables
```

---

## Environment Configuration

### Required API Keys

#### 1. Stripe (Test Mode)
Get your test keys from: https://dashboard.stripe.com/test/apikeys

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"
STRIPE_SECRET_KEY="sk_test_your_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

**How to get webhook secret:**
1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "+ Add endpoint"
3. URL: `http://localhost:3000/api/payment/webhook`
4. Events: Select `payment_intent.succeeded` and `payment_intent.payment_failed`
5. Copy the webhook signing secret

#### 2. PayPal (Sandbox)
Get sandbox credentials from: https://developer.paypal.com/

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID="your_client_id"
PAYPAL_CLIENT_SECRET="your_client_secret"
PAYPAL_MODE="sandbox"
```

**How to get credentials:**
1. Log in to https://developer.paypal.com/
2. Go to "My Apps & Credentials"
3. Click "Create App" under Sandbox
4. Copy Client ID and Secret

#### 3. Email (SMTP)
For Gmail (requires app password if 2FA enabled):

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

**Or use Mailtrap for development:**
```env
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="your_mailtrap_user"
SMTP_PASS="your_mailtrap_pass"
```

---

## Verify Setup

### 1. Check Build
```bash
pnpm build
```

Should complete without TypeScript errors.

### 2. Check Linting
```bash
pnpm lint
```

Should have no ESLint errors.

### 3. Start Dev Server
```bash
pnpm dev
```

Navigate to http://localhost:3000

### 4. Verify Database
```bash
pnpm prisma studio
```

Should show the Payment table with proper schema.

---

## Next Steps: Phase 2 (Stripe Integration)

### Files to Create

1. **Stripe Provider**
   - `src/features/payment/components/StripeProvider.tsx`

2. **Checkout Components**
   - `src/features/payment/components/CheckoutForm.tsx`
   - `src/features/payment/components/StripeCheckout.tsx`
   - `src/features/payment/components/PaymentMethodSelector.tsx`

3. **API Routes**
   - `src/app/api/payment/create-intent/route.ts`
   - `src/app/api/payment/confirm/route.ts`
   - `src/app/api/payment/webhook/route.ts`

4. **Custom Hooks**
   - `src/features/payment/hooks/useStripePayment.ts`

5. **Checkout Page**
   - `src/app/checkout/page.tsx`

### Testing with Stripe Test Cards

**Successful payment:**
```
Card: 4242 4242 4242 4242
Exp: 12/34
CVC: 123
ZIP: 12345
```

**Requires 3D Secure:**
```
Card: 4000 0025 0000 3155
Exp: 12/34
CVC: 123
```

**Card declined:**
```
Card: 4000 0000 0000 9995
Exp: 12/34
CVC: 123
```

---

## Troubleshooting

### "Module not found: Can't resolve 'zod'"
Run: `pnpm install`

### "Prisma Client not generated"
Run: `pnpm prisma generate`

### "Environment variable not found"
Check your `.env` file exists and has all required variables.

### "Database migration failed"
Ensure `DATABASE_URL` is set correctly in `.env`

### "Port 3000 already in use"
Kill the process or use a different port:
```bash
pnpm dev -- -p 3001
```

---

## Documentation References

- **Feature Plan**: `docs/feature-plans/payment-gateway-upgrade.md`
- **Changelog**: `docs/changelogs/payment-gateway-upgrade.md`
- **Stripe Docs**: https://stripe.com/docs/payments/accept-a-payment
- **PayPal Docs**: https://developer.paypal.com/sdk/js/
- **Prisma Docs**: https://www.prisma.io/docs/

---

## Session Progress

- [x] **Phase 1: Foundation** (4 hours) - COMPLETE
- [ ] **Phase 2: Stripe Integration** (6 hours) - Next
- [ ] **Phase 3: PayPal Integration** (3 hours)
- [ ] **Phase 4: Invoice & Receipts** (3 hours)
- [ ] **Phase 5: Testing & Polish** (4 hours)

**Total Estimated Time**: 16-20 hours

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review feature plan for detailed specifications
3. Check changelog for recent changes
4. Consult Stripe/PayPal documentation for API issues

---

**Last Updated**: 2025-10-26
**Session**: sess-feat-payment-gateway-upgrade-PGU-001-1
**Window**: 1
