# Payment Gateway Upgrade - Feature Plan

**Feature ID:** PGU-001
**Branch:** `feature/payment-gateway-upgrade`
**Ticket:** Payment Gateway Upgrade
**Priority:** HIGH
**Estimated Time:** 16-20 hours
**Complexity:** High
**Created:** 2025-10-26
**Status:** 🟡 In Progress

---

## 📋 Executive Summary

Implement a comprehensive payment processing system for the jlucus portfolio project, supporting multiple payment gateways (Stripe, PayPal), invoice generation, and automated email receipts. This feature will enable monetization of services and provide a professional checkout experience.

**Business Value:**
- Enable direct payment collection for consulting/services
- Professional invoice and receipt generation
- Multi-currency support for international clients
- Automated email confirmations and record-keeping

---

## 🎯 Objectives

### Primary Goals
1. ✅ Integrate Stripe for card payments with 3D Secure support
2. ✅ Integrate PayPal for alternative payment method
3. ✅ Generate PDF invoices with branding
4. ✅ Send automated email receipts
5. ✅ Support multiple currencies (USD, EUR, GBP, CAD)
6. ✅ WCAG AAA accessibility compliance
7. ✅ PCI DSS compliance through tokenization

### Secondary Goals
- 📊 Payment analytics dashboard (future phase)
- 🔄 Subscription/recurring billing (future phase)
- 💳 Apple Pay / Google Pay support (future phase)

---

## 🏗️ Technical Architecture

### Tech Stack

**Frontend:**
- `@stripe/stripe-js` - Stripe.js client library
- `@stripe/react-stripe-js` - React components for Stripe Elements
- `@paypal/react-paypal-js` - PayPal SDK React wrapper
- `currency.js` - Precise currency calculations
- `react-hook-form` - Form validation and management
- `zod` - Schema validation

**Backend (API Routes):**
- `stripe` - Stripe Node.js SDK (server-side)
- `@paypal/checkout-server-sdk` - PayPal REST API
- `pdf-lib` - PDF generation for invoices
- `nodemailer` - Email sending
- `prisma` - Database ORM for payment records

### Directory Structure

```
src/
├── features/
│   └── payment/
│       ├── components/
│       │   ├── CheckoutForm.tsx           # Main checkout component
│       │   ├── StripeCheckout.tsx         # Stripe Elements wrapper
│       │   ├── PayPalCheckout.tsx         # PayPal buttons component
│       │   ├── PaymentMethodSelector.tsx  # Toggle Stripe/PayPal
│       │   ├── InvoiceSummary.tsx         # Order summary display
│       │   ├── PaymentSuccess.tsx         # Success page
│       │   └── PaymentError.tsx           # Error handling
│       ├── types/
│       │   └── payment.types.ts           # TypeScript interfaces
│       ├── lib/
│       │   ├── stripe.ts                  # Stripe utilities
│       │   ├── paypal.ts                  # PayPal utilities
│       │   ├── currency.ts                # Currency formatting
│       │   └── validation.ts              # Payment validation
│       ├── hooks/
│       │   ├── useStripePayment.ts        # Stripe payment hook
│       │   └── usePayPalPayment.ts        # PayPal payment hook
│       └── utils/
│           ├── invoice-generator.ts       # PDF invoice creation
│           └── email-sender.ts            # Email receipt logic
│
├── app/
│   ├── api/
│   │   └── payment/
│   │       ├── create-intent/route.ts     # Stripe PaymentIntent creation
│   │       ├── confirm/route.ts           # Payment confirmation
│   │       ├── webhook/route.ts           # Stripe webhook handler
│   │       ├── paypal-order/route.ts      # PayPal order creation
│   │       └── invoice/[id]/route.ts      # Invoice download
│   └── checkout/
│       └── page.tsx                       # Checkout page
│
├── lib/
│   └── db/
│       └── schema/
│           └── payments.ts                # Prisma payment models
│
└── styles/
    └── payment.css                        # Payment-specific styles
```

---

## 📊 Database Schema

### Prisma Models

```prisma
// prisma/schema.prisma

model Payment {
  id                String   @id @default(cuid())

  // Payment details
  amount            Decimal  @db.Decimal(10, 2)
  currency          String   @default("USD")
  status            PaymentStatus
  provider          PaymentProvider

  // Provider-specific IDs
  stripePaymentId   String?  @unique
  paypalOrderId     String?  @unique

  // Customer info
  customerEmail     String
  customerName      String?
  billingAddress    Json?

  // Invoice
  invoiceNumber     String   @unique
  invoiceUrl        String?

  // Metadata
  description       String?
  metadata          Json?

  // Timestamps
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  completedAt       DateTime?

  @@index([customerEmail])
  @@index([status])
  @@index([createdAt])
}

enum PaymentStatus {
  PENDING
  PROCESSING
  SUCCEEDED
  FAILED
  CANCELED
  REFUNDED
}

enum PaymentProvider {
  STRIPE
  PAYPAL
}
```

---

## 🔐 Security & Compliance

### PCI DSS Compliance
- ✅ Never store raw card numbers (use Stripe Elements tokenization)
- ✅ Use HTTPS in production only
- ✅ Stripe.js handles card data (never touches server)
- ✅ Webhook signature verification for all webhooks

### Data Protection
- 🔒 Encrypt sensitive metadata in database
- 🔒 HTTPS-only cookies for session management
- 🔒 Rate limiting on payment API routes (10 req/min per IP)
- 🔒 CSRF protection via Next.js built-in headers

### Environment Variables
```bash
# .env.example (not committed)
# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox  # or 'live'

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@jlucus.dev
SMTP_PASS=...

# Database
DATABASE_URL=postgresql://...

# App
NEXT_PUBLIC_SITE_URL=https://jlucus.dev
```

---

## 🎨 User Interface Design

### Payment Flow

1. **Checkout Page** (`/checkout`)
   - Service/product selection
   - Currency selector (USD, EUR, GBP, CAD)
   - Order summary with itemized pricing
   - Tax calculation (if applicable)
   - Coupon/promo code input (future)

2. **Payment Method Selection**
   - Toggle between Stripe (cards) and PayPal
   - Stripe Elements for card input (PCI compliant)
   - PayPal buttons for PayPal checkout
   - "Pay with Google/Apple Pay" (future)

3. **Payment Processing**
   - Loading states with skeleton UI
   - Real-time validation feedback
   - 3D Secure authentication (if required)
   - Error handling with user-friendly messages

4. **Success Page** (`/checkout/success`)
   - Thank you message
   - Order confirmation number
   - Invoice download link
   - Email receipt confirmation
   - "Return to homepage" button

### Accessibility Requirements
- ✅ All form inputs have proper labels and ARIA attributes
- ✅ Keyboard navigation fully supported
- ✅ Focus management during payment flow
- ✅ Screen reader announcements for status changes
- ✅ Color contrast WCAG AAA (7:1 ratio)
- ✅ Error messages associated with form fields

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)
```typescript
// Example test structure
describe('Payment Utilities', () => {
  test('formatCurrency formats USD correctly', () => {
    expect(formatCurrency(1000, 'USD')).toBe('$10.00')
  })

  test('calculateTotal includes tax', () => {
    expect(calculateTotal(100, 0.08)).toBe(108)
  })
})

describe('Invoice Generator', () => {
  test('generates valid PDF buffer', async () => {
    const pdf = await generateInvoice(mockPayment)
    expect(pdf).toBeInstanceOf(Buffer)
  })
})
```

### Integration Tests (Playwright)
```typescript
test('Stripe checkout flow', async ({ page }) => {
  await page.goto('/checkout')

  // Fill checkout form
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="name"]', 'Test User')

  // Select Stripe
  await page.click('text=Pay with Card')

  // Fill Stripe test card (using test mode)
  const stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]')
  await stripeFrame.fill('[name="cardnumber"]', '4242424242424242')
  await stripeFrame.fill('[name="exp-date"]', '12/34')
  await stripeFrame.fill('[name="cvc"]', '123')
  await stripeFrame.fill('[name="postal"]', '12345')

  // Submit payment
  await page.click('button:has-text("Pay $100.00")')

  // Wait for success
  await expect(page).toHaveURL(/\/checkout\/success/)
  await expect(page.locator('h1')).toContainText('Payment Successful')
})
```

### Manual Testing Checklist

**Stripe Test Cards:**
- ✅ `4242424242424242` - Successful payment
- ✅ `4000002500003155` - Requires 3D Secure
- ✅ `4000000000009995` - Declined card
- ✅ `4000002760003184` - Charge succeeds, invoice.payment_failed webhook

**PayPal Sandbox:**
- ✅ Create sandbox buyer account
- ✅ Test successful payment
- ✅ Test canceled payment
- ✅ Test webhook events

**Accessibility:**
- ✅ Navigate entire flow with keyboard only
- ✅ Test with screen reader (NVDA/JAWS)
- ✅ Verify color contrast with axe DevTools
- ✅ Test on mobile (375px width minimum)

---

## 📧 Email Templates

### Receipt Email (HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Responsive email styles */
    body { font-family: 'Roboto', sans-serif; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: #10b981; color: white; padding: 20px; }
    .amount { font-size: 32px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Payment Receipt</h1>
    </div>
    <div class="content">
      <p>Hi {{customerName}},</p>
      <p>Thank you for your payment!</p>

      <div class="summary">
        <h2>Payment Details</h2>
        <p class="amount">{{amount}} {{currency}}</p>
        <p>Invoice: {{invoiceNumber}}</p>
        <p>Date: {{date}}</p>
        <p>Status: <strong>Paid</strong></p>
      </div>

      <a href="{{invoiceUrl}}" class="button">Download Invoice</a>

      <p>If you have any questions, reply to this email.</p>
      <p>Best regards,<br>Jesse Lucas</p>
    </div>
  </div>
</body>
</html>
```

---

## 🚀 Implementation Phases

### Phase 1: Foundation (4 hours)
**Session:** `sess-feat-payment-gateway-upgrade-PGU-001`

- [x] Create directory structure in `src/features/payment/`
- [x] Install dependencies (Stripe, PayPal, pdf-lib, nodemailer, currency.js)
- [x] Create TypeScript types in `payment.types.ts`
- [x] Set up environment variables template (`.env.example`)
- [x] Create Prisma schema for payments
- [x] Run migrations: `pnpm prisma migrate dev`

**Deliverables:**
- ✅ All dependencies installed
- ✅ Type definitions complete
- ✅ Database schema migrated
- ✅ `.env.example` documented

---

### Phase 2: Stripe Integration (6 hours)
**Session:** `sess-feat-payment-gateway-upgrade-PGU-002`

- [ ] Create Stripe Elements wrapper component
- [ ] Build `CheckoutForm` with validation
- [ ] Implement `PaymentMethodSelector` toggle
- [ ] Create API route: `POST /api/payment/create-intent`
- [ ] Create API route: `POST /api/payment/confirm`
- [ ] Create webhook handler: `POST /api/payment/webhook`
- [ ] Add Stripe provider to `layout.tsx`
- [ ] Test with Stripe test cards (4242..., 3D Secure, declined)

**Deliverables:**
- ✅ Stripe checkout fully functional
- ✅ Webhook signature verification working
- ✅ Payment records saved to database
- ✅ 3D Secure authentication tested

---

### Phase 3: PayPal Integration (3 hours)
**Session:** `sess-feat-payment-gateway-upgrade-PGU-003`

- [ ] Create PayPal button component
- [ ] Implement PayPal REST API wrapper
- [ ] Create API route: `POST /api/payment/paypal-order`
- [ ] Handle PayPal callbacks (onApprove, onError, onCancel)
- [ ] Test with PayPal sandbox
- [ ] Integrate with `PaymentMethodSelector`

**Deliverables:**
- ✅ PayPal checkout functional
- ✅ Sandbox testing complete
- ✅ Payment records saved

---

### Phase 4: Invoice & Receipts (3 hours)
**Session:** `sess-feat-payment-gateway-upgrade-PGU-004`

- [ ] Create PDF invoice generator using `pdf-lib`
- [ ] Design invoice template (branded)
- [ ] Implement email sending with `nodemailer`
- [ ] Create HTML email template
- [ ] Add invoice download API: `GET /api/payment/invoice/[id]`
- [ ] Create `InvoiceSummary` component
- [ ] Test email delivery (use Mailtrap for dev)

**Deliverables:**
- ✅ PDF invoices generate correctly
- ✅ Emails send successfully
- ✅ Invoice download works

---

### Phase 5: Testing & Polish (4 hours)
**Session:** `sess-feat-payment-gateway-upgrade-PGU-005`

- [ ] Write unit tests for currency utilities
- [ ] Write integration tests for payment flows
- [ ] Add E2E tests with Playwright
- [ ] Accessibility audit with axe DevTools
- [ ] Error handling and loading states
- [ ] Dark/light theme compatibility
- [ ] Mobile responsiveness testing
- [ ] Add JSDoc comments to all functions

**Deliverables:**
- ✅ All tests passing
- ✅ WCAG AAA compliance verified
- ✅ Mobile fully responsive
- ✅ Code documented

---

## 📈 Success Metrics

### Technical Metrics
- ✅ Payment success rate > 95%
- ✅ Webhook processing latency < 500ms
- ✅ Invoice generation time < 2s
- ✅ Email delivery time < 10s
- ✅ Lighthouse performance score > 90

### Business Metrics
- 💰 Transaction volume
- 📊 Conversion rate (checkout started → completed)
- 🔄 Payment method preference (Stripe vs PayPal)
- 🌍 Currency distribution
- ⏱️ Average checkout time

---

## 🐛 Known Issues & Limitations

### Current Limitations
- ❌ No subscription/recurring billing (future phase)
- ❌ No refund UI (manual via Stripe/PayPal dashboard)
- ❌ No multi-item cart (single service/product only)
- ❌ No discount codes (future phase)
- ❌ No sales tax calculation (flat pricing)

### Future Enhancements
- 🔜 Apple Pay / Google Pay integration
- 🔜 Cryptocurrency payments (Stripe Crypto)
- 🔜 Payment analytics dashboard
- 🔜 Customer payment history page
- 🔜 Automated refund requests

---

## 📚 Documentation

### API Documentation

**POST /api/payment/create-intent**
```typescript
// Request
{
  amount: number,        // Amount in cents (e.g., 10000 = $100.00)
  currency: string,      // 'USD', 'EUR', 'GBP', 'CAD'
  customerEmail: string,
  description?: string
}

// Response
{
  clientSecret: string,  // Stripe PaymentIntent client_secret
  paymentId: string      // Database payment record ID
}
```

**POST /api/payment/webhook**
- Stripe webhook endpoint
- Verifies `stripe-signature` header
- Handles events: `payment_intent.succeeded`, `payment_intent.failed`

**GET /api/payment/invoice/[id]**
- Downloads PDF invoice
- Returns: `Content-Type: application/pdf`

---

## 🔗 Dependencies

**Blocks:**
- None (independent feature)

**Blocked By:**
- Testing framework setup (for automated tests)

**Related:**
- Contact form (can link to checkout)
- Services showcase (pricing display)

---

## 🎓 Learning Resources

- **Stripe Docs:** https://stripe.com/docs/payments/accept-a-payment
- **PayPal SDK:** https://developer.paypal.com/sdk/js/
- **pdf-lib:** https://pdf-lib.js.org/
- **Nodemailer:** https://nodemailer.com/
- **PCI DSS:** https://stripe.com/docs/security/guide

---

## ✅ Definition of Done

- [ ] All phases (1-5) complete
- [ ] Stripe checkout works with test cards
- [ ] PayPal sandbox payment successful
- [ ] Invoice PDF generates correctly
- [ ] Email receipts send successfully
- [ ] All unit/integration tests passing
- [ ] WCAG AAA accessibility verified
- [ ] Mobile responsive (375px+)
- [ ] No ESLint errors
- [ ] Prettier formatted
- [ ] JSDoc comments on all public functions
- [ ] `.env.example` complete with all variables
- [ ] Database migrations run successfully
- [ ] Documentation complete (this file)
- [ ] Changelog updated
- [ ] PR created and approved

---

**Feature Owner:** Jesse Lucas
**Implementation:** Claude Code
**Last Updated:** 2025-10-26

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
