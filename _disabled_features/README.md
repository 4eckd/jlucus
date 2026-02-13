# Disabled Features - Payment & Authentication

> **Status**: Temporarily disabled due to missing dependencies
> **Reason**: These features require additional npm packages not in the core portfolio
> **Future**: Can be re-enabled following the instructions below

---

## Overview

This directory contains payment processing and authentication features that were built but are not part of the core portfolio roadmap. They have been temporarily disabled to allow the main portfolio to build and deploy successfully.

## Features Included

### 1. **Stripe Payment Integration**
- Payment intent creation API (`payment/create-intent/route.ts`)
- Webhook handling for payment events (`payment/webhook/route.ts`)
- Checkout pages (`checkout/page.tsx`, `checkout/success/page.tsx`)
- Stripe checkout component (was in `src/features/payment/components/`)
- Payment hooks and utilities (was in `src/features/payment/`)

### 2. **NextAuth Authentication**
- Authentication API routes (`auth/[...nextauth]/route.ts`)
- Credentials provider setup (was in `src/lib/auth.ts`)
- Prisma adapter integration (was in `src/lib/prisma.ts`)

### 3. **Prisma Database ORM**
- Prisma client configuration (was in `src/lib/prisma.ts`)
- Database integration for user management and payment records

---

## Required Dependencies

To re-enable these features, install the following packages:

### Stripe Payment Processing
```bash
npm install stripe@^14.0.0
npm install @stripe/stripe-js@^3.0.0
npm install @stripe/react-stripe-js@^2.6.0
```

### NextAuth Authentication
```bash
npm install next-auth@^4.24.0
npm install @auth/prisma-adapter@^1.5.0
npm install bcryptjs@^2.4.3
npm install @types/bcryptjs@^2.4.6 --save-dev
```

### Prisma Database ORM
```bash
npm install @prisma/client@^5.10.0
npm install prisma@^5.10.0 --save-dev
```

### Complete Installation Command
```bash
# Install all dependencies at once
npm install \
  stripe@^14.0.0 \
  @stripe/stripe-js@^3.0.0 \
  @stripe/react-stripe-js@^2.6.0 \
  next-auth@^4.24.0 \
  @auth/prisma-adapter@^1.5.0 \
  bcryptjs@^2.4.3 \
  @prisma/client@^5.10.0

npm install --save-dev \
  @types/bcryptjs@^2.4.6 \
  prisma@^5.10.0
```

---

## Re-enabling Instructions

### Step 1: Install Dependencies
```bash
# Run the complete installation command above
npm install stripe @stripe/stripe-js @stripe/react-stripe-js \
  next-auth @auth/prisma-adapter bcryptjs @prisma/client

npm install --save-dev @types/bcryptjs prisma
```

### Step 2: Restore Files from Git History

**All code files were removed to prevent build errors. Restore from git:**

```bash
# From project root

# Restore API routes
git checkout cb28a94 -- src/app/api/auth
git checkout cb28a94 -- src/app/api/payment

# Restore checkout pages
git checkout cb28a94 -- src/app/checkout

# Restore payment feature module
git checkout 9f4a15d -- src/features/payment

# Restore library files
git checkout 9f4a15d -- src/lib/auth.ts
git checkout 9f4a15d -- src/lib/prisma.ts
```

**Git Commits with Code:**
- `9f4a15d` - Original implementation with features/payment
- `cb28a94` - Before moving to _disabled_features
- `d19c936` - Code removed, documentation created (current)

### Step 3: Set Up Prisma

**Create or restore `prisma/schema.prisma`:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Payment {
  id              String   @id @default(cuid())
  amount          Int
  currency        String
  status          String
  paymentIntent   String   @unique
  customerId      String?
  metadata        Json?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Generate Prisma Client:**
```bash
npx prisma generate
```

### Step 4: Configure Environment Variables

Create or update `.env.local`:
```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# NextAuth
NEXTAUTH_SECRET=your-secret-here-use-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/jlucus_dev
```

### Step 5: Update Sitemap

Add checkout routes back to `src/app/sitemap.ts`:
```typescript
// Add checkout pages
const additionalPages = [
  { path: '/checkout', priority: 0.5 },
  { path: '/checkout/success', priority: 0.3 },
];

additionalPages.forEach((page) => {
  routes.push({
    url: `${baseUrl}${page.path}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: page.priority,
  });
});
```

### Step 6: Run Database Migrations

```bash
# Create migration
npx prisma migrate dev --name init

# Push schema to database
npx prisma db push
```

### Step 7: Test

```bash
# Development
npm run dev

# Build
npm run build

# Verify all imports resolve
# Verify API routes work
# Test payment flow
# Test authentication
```

---

## File Structure

**⚠️ Note**: Code files are NOT stored in this directory to prevent build errors.
All files must be restored from git history (see Step 2 above).

```
_disabled_features/
└── README.md               # This file - complete documentation

Files in git history (commit cb28a94):
src/app/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts        # NextAuth API route
└── payment/
    ├── create-intent/
    │   └── route.ts        # Create payment intent API
    └── webhook/
        └── route.ts        # Stripe webhook handler

src/app/
└── checkout/
    ├── page.tsx            # Checkout page
    └── success/
        └── page.tsx        # Payment success page

Files in git history (commit 9f4a15d):
src/features/payment/
├── components/
│   └── StripeCheckout.tsx
├── hooks/
│   └── useStripePayment.ts
├── lib/
│   ├── stripe.ts
│   ├── currency.ts
│   └── validation.ts
└── types/
    └── payment.types.ts

src/lib/
├── auth.ts                 # NextAuth config
└── prisma.ts              # Prisma client
```

---

## Integration Points

### Payment Flow
1. User selects product/service on portfolio
2. Navigate to `/checkout?amount=X&currency=USD&description=...`
3. Stripe checkout component loads
4. Payment processed via API route
5. Redirect to `/checkout/success` on completion
6. Webhook updates payment status in database

### Authentication Flow
1. User visits `/api/auth/signin`
2. Credentials verified against database
3. Session created and managed by NextAuth
4. Protected routes check session via middleware
5. User data available in components via `useSession()`

---

## Testing Credentials

### Stripe Test Mode
- **Card Number**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

### Test Webhook
```bash
stripe listen --forward-to localhost:3000/api/payment/webhook
```

---

## Production Considerations

### Security
- [ ] Use environment-specific Stripe keys (test vs production)
- [ ] Enable HTTPS only for production
- [ ] Implement rate limiting on API routes
- [ ] Add CSRF protection
- [ ] Validate webhook signatures
- [ ] Hash passwords with bcrypt (already implemented)
- [ ] Use secure session tokens

### Database
- [ ] Set up production PostgreSQL instance
- [ ] Enable connection pooling
- [ ] Configure backups
- [ ] Set up monitoring
- [ ] Run migrations in production

### Compliance
- [ ] Implement PCI compliance for payment data
- [ ] Add privacy policy and terms of service
- [ ] Configure GDPR compliance if applicable
- [ ] Set up secure data deletion procedures

---

## Estimated Setup Time

- **Quick Setup** (with existing database): ~30 minutes
- **Full Setup** (new database + configuration): ~2 hours
- **Production Deployment**: ~4-6 hours (including security review)

---

## Why These Were Disabled

1. **Not in Core Roadmap**: These features were added outside PROJECT_ROADMAP.md
2. **Missing Dependencies**: Required 10+ packages not in package.json
3. **Blocking Builds**: Vercel builds failing with 12 module resolution errors
4. **Core Portfolio Unaffected**: Main portfolio (hero, ventures, projects, skills, contact) doesn't use these features

---

## Alternative Solutions

If you don't need full payment/auth integration, consider:

### For Payments
- Link to external payment platform (Gumroad, Stripe Payment Links)
- Email-based invoicing
- Contact form for sales inquiries

### For Authentication
- Remove authentication entirely (public portfolio)
- Use serverless auth (Clerk, Auth0)
- Static password protection via Vercel

---

## Support

For questions about re-enabling these features:
1. Check this README first
2. Review the original implementation in git history (commit 9f4a15d)
3. Consult Stripe and NextAuth documentation
4. Test in development before deploying to production

---

**Last Updated**: 2026-02-13
**Status**: Documented and preserved for future use
**Estimated Re-enablement Effort**: Medium (2-4 hours)
