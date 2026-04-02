# Payment Gateway - Installation Commands

**Run these commands in order to complete the setup**

---

## Quick Install (Copy & Paste)

Open PowerShell in the project directory and run:

```powershell
# Navigate to project
cd K:\git\4eckd-jlucus\jlucus

# 1. Install dependencies (2-3 minutes)
pnpm add @stripe/stripe-js @stripe/react-stripe-js stripe currency.js react-hook-form zod
pnpm add -D @types/nodemailer

# 2. Generate Prisma client (10 seconds)
pnpm prisma generate

# 3. Run database migration (5 seconds)
pnpm prisma migrate dev --name add_payment_tables

# 4. Build to verify (30 seconds)
pnpm build

# 5. Start development server
pnpm dev
```

---

## What Each Command Does

### 1. Install Dependencies
```powershell
pnpm add @stripe/stripe-js @stripe/react-stripe-js stripe currency.js react-hook-form zod
```
**Installs**:
- `@stripe/stripe-js` - Stripe.js client library
- `@stripe/react-stripe-js` - React components for Stripe Elements
- `stripe` - Stripe Node.js SDK (server-side)
- `currency.js` - Precise currency calculations
- `react-hook-form` - Form management
- `zod` - Schema validation

### 2. Install Dev Dependencies
```powershell
pnpm add -D @types/nodemailer
```
**Installs**:
- TypeScript types for nodemailer (email sending)

### 3. Generate Prisma Client
```powershell
pnpm prisma generate
```
**Creates**: TypeScript client for database access with Payment model

### 4. Run Database Migration
```powershell
pnpm prisma migrate dev --name add_payment_tables
```
**Creates**:
- Payment table in database
- PaymentStatus enum
- PaymentProvider enum

### 5. Build Project
```powershell
pnpm build
```
**Verifies**: All TypeScript compiles without errors

### 6. Start Dev Server
```powershell
pnpm dev
```
**Starts**: Development server at http://localhost:3000

---

## After Installation

### Configure Webhook (5 minutes)

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click "+ Add endpoint"
3. **Endpoint URL**: `http://localhost:3000/api/payment/webhook`
4. **Select events**:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - payment_intent.canceled
   - payment_intent.processing
5. Click "Add endpoint"
6. Click "Reveal" under "Signing secret"
7. Copy the secret (starts with `whsec_`)
8. Add to `.env` file:
   ```
   STRIPE_WEBHOOK_SECRET="whsec_YOUR_SECRET_HERE"
   ```

### Test Payment Flow

1. **Visit checkout page**:
   ```
   http://localhost:3000/checkout?amount=5000&description=Test%20Payment
   ```

2. **Enter customer details**:
   - Email: test@example.com
   - Name: Test User
   - Click "Continue to Payment"

3. **Enter test card**:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/34`
   - CVC: `123`
   - Country: United States
   - ZIP: `12345`

4. **Submit payment**:
   - Click "Pay $50.00"
   - Should redirect to success page

5. **Verify in database**:
   ```powershell
   pnpm prisma studio
   ```
   - Open Payment table
   - Should see 1 record with status: SUCCEEDED

6. **Check Stripe dashboard**:
   - https://dashboard.stripe.com/test/payments
   - Should see the $50.00 payment

---

## Test Cards

| Card Number | Expiry | CVC | ZIP | Result |
|-------------|--------|-----|-----|--------|
| `4242 4242 4242 4242` | 12/34 | 123 | 12345 | ✅ Success |
| `4000 0025 0000 3155` | 12/34 | 123 | 12345 | 🔒 3D Secure |
| `4000 0000 0000 9995` | 12/34 | 123 | 12345 | ❌ Declined |

---

## Troubleshooting

### Error: "Cannot find module '@stripe/stripe-js'"
**Solution**: Run step 1 again (install dependencies)

### Error: "Prisma Client not initialized"
**Solution**: Run `pnpm prisma generate`

### Error: "Table 'Payment' does not exist"
**Solution**: Run `pnpm prisma migrate dev --name add_payment_tables`

### Build errors
**Solution**: Make sure all dependencies are installed and Prisma client is generated

### Checkout page loads but no payment form
**Solution**: Check browser console for errors, verify Stripe publishable key in .env

### Payment stays in PENDING status
**Solution**: Configure webhook (see "Configure Webhook" section above)

---

## Expected Output

### After `pnpm add ...`
```
Progress: resolved X, reused Y, downloaded Z, added 6
+ @stripe/react-stripe-js 3.X.X
+ @stripe/stripe-js 5.X.X
+ currency.js 2.X.X
+ react-hook-form 7.X.X
+ stripe 18.X.X
+ zod 3.X.X
```

### After `pnpm prisma generate`
```
✔ Generated Prisma Client
```

### After `pnpm prisma migrate dev`
```
Applying migration `20251026_add_payment_tables`
✔ Migration applied
```

### After `pnpm build`
```
✓ Compiled successfully
```

### After `pnpm dev`
```
▲ Next.js 16.0.0
- Local: http://localhost:3000
```

---

## Files That Will Be Created

### During Migration
- `prisma/migrations/XXXXXXXX_add_payment_tables/migration.sql`
- `dev.db` (SQLite database file)

### During Build
- `.next/` directory (Next.js build output)
- `node_modules/.prisma/` (Generated Prisma client)

---

## Verification Checklist

After running all commands:

- [ ] Dependencies installed (check `node_modules/@stripe/`)
- [ ] Prisma client generated (check `node_modules/.prisma/client/`)
- [ ] Database file created (check `dev.db` exists)
- [ ] Payment table exists (run `pnpm prisma studio` and check)
- [ ] Build successful (no TypeScript errors)
- [ ] Dev server running on port 3000
- [ ] Checkout page loads (`/checkout`)
- [ ] Stripe Elements appear (payment form loads)
- [ ] Test payment succeeds
- [ ] Payment appears in database
- [ ] Payment appears in Stripe dashboard

---

## Next Steps After Testing

Once you've verified the payment flow works:

1. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat(payment): add Stripe payment gateway integration

   - Add Stripe checkout with payment intents
   - Implement secure webhook handler
   - Create Payment database model
   - Add checkout and success pages
   - Configure Stripe Elements with custom theme

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

2. **Optional: Add PayPal** (Phase 3)
3. **Optional: Add Invoices** (Phase 4)
4. **Deploy to production** (when ready)

---

**Ready to install? Copy and paste the commands from the "Quick Install" section above!**
