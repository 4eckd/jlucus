# Feature Plan: Payment Gateway Upgrade

**Feature ID**: `payment-gateway-upgrade`
**Status**: Planning
**Priority**: HIGH
**Branch**: `claude/sequential-feature-development-011CUVCJYuD5uKkp8vxWYBTC`
**Estimated Time**: 16-20 hours
**Created**: 2025-10-26
**Last Updated**: 2025-10-26

---

## Overview

### Purpose
Implement a modern, secure payment gateway integration to handle tour bookings, service payments, and product purchases. This feature will provide multiple payment options including Stripe, PayPal, and potentially cryptocurrency payments.

### Goals
- Secure payment processing with PCI compliance
- Support multiple payment methods (credit cards, PayPal, Apple Pay, Google Pay)
- Seamless checkout experience with minimal friction
- Real-time payment status updates
- Comprehensive error handling and retry logic
- Invoice generation and email receipts
- Payment analytics dashboard for admin

### Success Criteria
- [ ] Payment success rate > 95%
- [ ] Checkout completion < 30 seconds average
- [ ] Zero security vulnerabilities
- [ ] Mobile-responsive payment forms
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Support for 3+ payment methods
- [ ] Automated testing coverage > 80%

---

## Technical Architecture

### Core Technologies
- **Stripe SDK** (`@stripe/stripe-js`, `stripe`) - Primary payment processor
- **Next.js API Routes** - Backend payment handling
- **Zod** - Payment data validation
- **React Hook Form** - Form management
- **Tailwind CSS** - Styling
- **Framer Motion** - UI animations

### Module Structure
```
src/features/payment-gateway/
├── components/
│   ├── CheckoutForm.tsx          # Main checkout form component
│   ├── PaymentMethodSelector.tsx # Payment method picker
│   ├── PaymentStatus.tsx         # Status indicator
│   ├── InvoiceView.tsx           # Invoice display
│   └── PaymentHistory.tsx        # User payment history
├── hooks/
│   ├── useStripeCheckout.ts      # Stripe integration hook
│   ├── usePaymentIntent.ts       # Payment intent management
│   └── usePaymentHistory.ts      # Fetch user payment history
├── lib/
│   ├── stripe-client.ts          # Stripe client initialization
│   ├── payment-validators.ts     # Zod schemas for validation
│   ├── payment-utils.ts          # Utility functions
│   └── invoice-generator.ts      # PDF invoice generation
├── types/
│   ├── payment.types.ts          # TypeScript interfaces
│   └── stripe.types.ts           # Stripe-specific types
├── api/
│   ├── create-payment-intent.ts  # API: Create payment intent
│   ├── confirm-payment.ts        # API: Confirm payment
│   ├── refund-payment.ts         # API: Process refund
│   └── webhooks.ts               # Stripe webhook handler
└── README.md                     # Feature documentation
```

---

## Affected Files and Components

### New Files
1. `/src/features/payment-gateway/` - Entire feature module
2. `/src/app/api/payments/` - Payment API routes
3. `/src/app/checkout/page.tsx` - Checkout page
4. `/src/app/payment-success/page.tsx` - Success page
5. `/src/app/payment-failure/page.tsx` - Failure page
6. `/.env.local` - Add Stripe API keys (documented only)

### Modified Files
1. `/package.json` - Add payment dependencies
2. `/src/app/layout.tsx` - Add Stripe provider
3. `/src/components/layout/Navigation.tsx` - Add checkout link (if needed)
4. `/tailwind.config.ts` - Payment form specific styles (if needed)

### Existing Components Used
- `/src/components/ui/Button.tsx` - For CTAs
- `/src/lib/utils.ts` - Utility functions

---

## Required Dependencies

### Production Dependencies
```json
{
  "@stripe/stripe-js": "^4.0.0",
  "stripe": "^17.0.0",
  "zod": "^3.23.0",
  "react-hook-form": "^7.53.0",
  "@hookform/resolvers": "^3.9.0",
  "date-fns": "^4.0.0",
  "jspdf": "^2.5.0"
}
```

### Dev Dependencies
```json
{
  "@types/stripe": "^8.0.0",
  "stripe-mock": "^3.0.0"
}
```

---

## Implementation Phases

### Phase 1: Foundation (4-5 hours)
**Tasks:**
- [ ] Install and configure Stripe SDK
- [ ] Set up environment variables (STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY)
- [ ] Create Stripe client initialization
- [ ] Set up payment TypeScript types
- [ ] Create Zod validation schemas
- [ ] Implement basic API routes structure

**Deliverables:**
- Working Stripe integration
- API endpoints skeleton
- Type definitions

---

### Phase 2: Checkout Flow (5-6 hours)
**Tasks:**
- [ ] Build CheckoutForm component
- [ ] Implement PaymentMethodSelector
- [ ] Create payment intent hook (useStripeCheckout)
- [ ] Add form validation with Zod + React Hook Form
- [ ] Implement error handling
- [ ] Create loading states and animations
- [ ] Build success/failure pages
- [ ] Integrate with existing cart/booking system

**Deliverables:**
- Functional checkout flow
- Error handling
- Success/failure pages

---

### Phase 3: Advanced Features (4-5 hours)
**Tasks:**
- [ ] Implement PayPal integration (optional secondary method)
- [ ] Add Apple Pay / Google Pay support
- [ ] Create invoice generator (PDF)
- [ ] Build payment history component
- [ ] Implement email receipt sending
- [ ] Add admin payment dashboard
- [ ] Create refund processing functionality

**Deliverables:**
- Multiple payment methods
- Invoice generation
- Payment history
- Admin tools

---

### Phase 4: Security & Testing (3-4 hours)
**Tasks:**
- [ ] Set up Stripe webhook handling
- [ ] Implement webhook signature verification
- [ ] Add rate limiting to API routes
- [ ] Write unit tests for payment utilities
- [ ] Write integration tests for checkout flow
- [ ] Add E2E tests with Playwright (using Stripe test mode)
- [ ] Security audit (SQL injection, XSS prevention)
- [ ] PCI compliance checklist

**Deliverables:**
- Webhook integration
- Comprehensive test suite
- Security hardening

---

## API Endpoints

### POST `/api/payments/create-intent`
**Purpose**: Create a Stripe Payment Intent
**Request Body**:
```typescript
{
  amount: number;        // Amount in cents
  currency: string;      // e.g., "usd"
  description: string;
  metadata?: object;
}
```
**Response**:
```typescript
{
  clientSecret: string;
  paymentIntentId: string;
}
```

### POST `/api/payments/confirm`
**Purpose**: Confirm payment after Stripe processing
**Request Body**:
```typescript
{
  paymentIntentId: string;
  paymentMethodId: string;
}
```

### POST `/api/payments/refund`
**Purpose**: Process payment refund
**Request Body**:
```typescript
{
  paymentIntentId: string;
  amount?: number;  // Partial refund if specified
  reason?: string;
}
```

### POST `/api/payments/webhooks`
**Purpose**: Handle Stripe webhooks
**Headers**: `stripe-signature`
**Events Handled**:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `charge.dispute.created`

---

## Database Schema (if using database)

### Payments Table
```typescript
interface Payment {
  id: string;
  stripePaymentIntentId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  paymentMethod: string;
  description: string;
  metadata: object;
  createdAt: Date;
  updatedAt: Date;
}
```

**Note**: If not using a database, payments can be tracked via Stripe Dashboard.

---

## Integration Points

### With Existing Features
1. **Tour Booking System** (if exists)
   - Link payment to booking ID
   - Update booking status on payment success

2. **User Profile**
   - Display payment history in profile
   - Link to User Profile Redesign feature

3. **Email System**
   - Send payment confirmation emails
   - Send invoice via email

4. **Admin Dashboard**
   - Payment analytics
   - Refund management
   - Dispute handling

---

## Testing Checklist

### Unit Tests
- [ ] Payment validation schemas (Zod)
- [ ] Stripe client initialization
- [ ] Payment utilities (formatAmount, calculateTax, etc.)
- [ ] Invoice generator

### Integration Tests
- [ ] Payment intent creation
- [ ] Payment confirmation flow
- [ ] Webhook handling
- [ ] Refund processing

### E2E Tests (Playwright)
- [ ] Complete checkout flow (Stripe test mode)
- [ ] Payment success scenario
- [ ] Payment failure scenario
- [ ] Form validation errors
- [ ] Mobile checkout experience

### Manual Testing
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsive design
- [ ] Accessibility audit (screen reader, keyboard navigation)
- [ ] Test with Stripe test cards

---

## Environment Variables

```bash
# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional: PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# Email (for receipts)
EMAIL_SERVICE_API_KEY=...
EMAIL_FROM_ADDRESS=noreply@jlucus.dev
```

---

## Merge Strategy

### Prerequisites for Merge
- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review completed
- [ ] Security audit passed
- [ ] Accessibility audit passed
- [ ] Documentation complete
- [ ] Stripe webhook configured in production
- [ ] Environment variables set in production

### Integration Testing
- [ ] Test in Stripe test mode
- [ ] Test with real small transactions (< $1)
- [ ] Verify email receipts sending
- [ ] Verify webhook events processing

### Deployment Steps
1. Set up Stripe webhook endpoint in production
2. Add environment variables to Vercel/hosting
3. Deploy to staging first
4. Run smoke tests
5. Deploy to production
6. Monitor error rates and payment success

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Stripe API rate limits | HIGH | Implement exponential backoff, queue requests |
| Webhook delivery failure | HIGH | Implement webhook retry logic, manual reconciliation |
| Payment fraud | HIGH | Use Stripe Radar, implement 3D Secure |
| PCI compliance violations | CRITICAL | Never store raw card data, use Stripe Elements |
| Downtime during payment | MEDIUM | Implement graceful error handling, retry mechanism |
| Currency conversion errors | LOW | Use Stripe's built-in currency handling |

---

## Documentation Requirements

### User Documentation
- [ ] How to complete checkout
- [ ] Supported payment methods
- [ ] Refund policy
- [ ] Payment security information

### Developer Documentation
- [ ] API endpoint documentation
- [ ] Stripe integration guide
- [ ] Webhook setup guide
- [ ] Testing guide (using Stripe test mode)
- [ ] Troubleshooting common issues

---

## Success Metrics

### Performance Metrics
- Payment processing time < 3 seconds
- API response time < 500ms
- Checkout page load time < 2 seconds

### Business Metrics
- Payment success rate > 95%
- Checkout abandonment rate < 20%
- Refund rate < 5%

### Technical Metrics
- Test coverage > 80%
- Zero critical security vulnerabilities
- Uptime > 99.9%

---

## Timeline

| Phase | Duration | Start | End |
|-------|----------|-------|-----|
| Phase 1: Foundation | 4-5h | TBD | TBD |
| Phase 2: Checkout Flow | 5-6h | TBD | TBD |
| Phase 3: Advanced Features | 4-5h | TBD | TBD |
| Phase 4: Security & Testing | 3-4h | TBD | TBD |
| **Total** | **16-20h** | TBD | TBD |

---

## Next Steps

1. **Approve Plan** - Review and approve this feature plan
2. **Set Up Stripe Account** - Create Stripe account (test mode for development)
3. **Install Dependencies** - Run `pnpm add @stripe/stripe-js stripe zod react-hook-form`
4. **Begin Phase 1** - Start foundation implementation
5. **Daily Updates** - Update this plan with progress daily

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-10-26 | Initial feature plan created | Claude AI |

---

## References

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Elements](https://stripe.com/docs/payments/elements)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [PCI Compliance](https://stripe.com/docs/security/guide)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**Plan Status**: ✅ Complete and Ready for Development
**Approval Required**: Yes
**Estimated Start Date**: TBD
**Estimated Completion Date**: TBD
