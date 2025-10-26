# 💳 Feature Plan: Payment Gateway Upgrade

**Branch**: `feature/payment-gateway-upgrade`
**Status**: 📋 Planning
**Created**: 2025-10-26
**Owner**: Claude
**Estimated Complexity**: High
**Estimated Time**: 16-20 hours

---

## 📋 Overview

### Purpose
Upgrade the payment processing system to support modern payment methods including Stripe, PayPal, and Apple Pay. This feature will provide a seamless, secure checkout experience for tour bookings and service purchases.

### Business Goals
- Increase conversion rate by 25% through simplified checkout
- Support international payments with multi-currency
- Reduce payment processing time from 3 steps to 1 step
- Ensure PCI DSS compliance
- Enable subscription-based tour packages

### User Stories
1. **As a customer**, I want to pay with my preferred payment method so that checkout is convenient
2. **As a customer**, I want to save my payment methods so that future purchases are faster
3. **As a business owner**, I want automated invoice generation so that accounting is streamlined
4. **As a mobile user**, I want to use Apple Pay/Google Pay so that checkout is instant

---

## 🎯 Acceptance Criteria

### Functional Requirements
- [ ] Support Stripe, PayPal, Apple Pay, Google Pay
- [ ] Multi-currency support (USD, EUR, GBP, CAD)
- [ ] Save payment methods (tokenization)
- [ ] One-click checkout for returning customers
- [ ] Automatic invoice PDF generation
- [ ] Email receipt delivery
- [ ] Refund processing interface
- [ ] Payment status webhooks
- [ ] Retry logic for failed payments
- [ ] 3D Secure authentication support

### Non-Functional Requirements
- [ ] Payment processing < 3 seconds
- [ ] 99.9% uptime SLA
- [ ] PCI DSS Level 1 compliant
- [ ] GDPR compliant (no storing raw card data)
- [ ] Accessible checkout (WCAG AAA)
- [ ] Mobile-first responsive design
- [ ] Real-time payment status updates

---

## 📁 Affected Files & Components

### New Files to Create
```
src/
├── features/
│   └── payment/
│       ├── components/
│       │   ├── CheckoutForm.tsx           # Main checkout component
│       │   ├── PaymentMethodSelector.tsx  # Payment method picker
│       │   ├── SavedPaymentMethods.tsx    # Saved cards display
│       │   ├── InvoiceSummary.tsx         # Invoice preview
│       │   └── PaymentStatus.tsx          # Success/error states
│       ├── hooks/
│       │   ├── useStripeCheckout.ts       # Stripe integration
│       │   ├── usePayPalCheckout.ts       # PayPal integration
│       │   └── usePaymentStatus.ts        # Payment state management
│       ├── lib/
│       │   ├── stripe-client.ts           # Stripe API wrapper
│       │   ├── paypal-client.ts           # PayPal API wrapper
│       │   └── payment-validators.ts      # Input validation
│       ├── types/
│       │   └── payment.types.ts           # TypeScript interfaces
│       └── constants/
│           └── currencies.ts              # Supported currencies
├── app/
│   ├── api/
│   │   └── payment/
│   │       ├── create-intent/route.ts     # Create payment intent
│   │       ├── confirm/route.ts           # Confirm payment
│   │       ├── webhook/route.ts           # Stripe webhooks
│   │       ├── refund/route.ts            # Process refunds
│   │       └── invoice/route.ts           # Generate invoices
│   └── checkout/
│       └── page.tsx                       # Checkout page
└── lib/
    └── db/
        └── schema/
            └── payments.ts                # Payment records schema
```

### Existing Files to Modify
- `src/app/layout.tsx` - Add Stripe Elements provider
- `src/lib/utils.ts` - Add currency formatting utilities
- `package.json` - Add payment dependencies
- `.env.example` - Add payment API keys template
- `src/styles/colors.css` - Add payment status colors

---

## 📦 Required Dependencies

### Production Dependencies
```json
{
  "@stripe/stripe-js": "^2.4.0",
  "@stripe/react-stripe-js": "^2.4.0",
  "@paypal/react-paypal-js": "^8.1.3",
  "stripe": "^14.10.0",
  "currency.js": "^2.0.4",
  "pdf-lib": "^1.17.1",
  "nodemailer": "^6.9.7"
}
```

### Dev Dependencies
```json
{
  "@types/nodemailer": "^6.4.14",
  "stripe-mock": "^3.0.0"
}
```

### Environment Variables Required
```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# Email (for receipts)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...

# Invoice Settings
COMPANY_NAME="Your Company"
COMPANY_EMAIL=billing@company.com
COMPANY_ADDRESS="123 Main St..."
```

---

## 🔗 Required Integrations

### Third-Party Services
1. **Stripe Account**
   - Set up production account
   - Configure webhooks
   - Enable payment methods (card, Apple Pay, Google Pay)
   - Set up tax calculation (optional)

2. **PayPal Business Account**
   - Create REST API credentials
   - Configure return URLs
   - Enable express checkout

3. **Email Service**
   - SMTP server or SendGrid/Mailgun
   - Email templates for receipts

4. **Database**
   - Add `payments` table
   - Add `invoices` table
   - Add `payment_methods` table (tokenized)

### API Endpoints to Implement
- `POST /api/payment/create-intent` - Initialize payment
- `POST /api/payment/confirm` - Confirm payment
- `POST /api/payment/webhook` - Handle Stripe webhooks
- `POST /api/payment/refund` - Process refund
- `GET /api/payment/invoice/:id` - Get invoice PDF
- `GET /api/payment/status/:id` - Check payment status
- `POST /api/payment/save-method` - Save payment method
- `GET /api/payment/methods` - Get saved methods

---

## 🧪 Testing Checklist

### Unit Tests
- [ ] Payment form validation (card number, CVV, expiry)
- [ ] Currency conversion calculations
- [ ] Invoice PDF generation
- [ ] Email receipt formatting
- [ ] Webhook signature verification
- [ ] Error handling for all payment methods

### Integration Tests
- [ ] Stripe test mode payment flow
- [ ] PayPal sandbox payment flow
- [ ] Webhook event processing
- [ ] Refund processing
- [ ] Saved payment method usage
- [ ] Multi-currency checkout

### E2E Tests
- [ ] Complete checkout flow (guest user)
- [ ] Checkout with saved payment (returning user)
- [ ] Failed payment error handling
- [ ] 3D Secure authentication flow
- [ ] Apple Pay on Safari (iOS)
- [ ] Google Pay on Chrome (Android)

### Security Tests
- [ ] No sensitive data in client-side logs
- [ ] HTTPS only for payment pages
- [ ] CSRF protection on payment endpoints
- [ ] Rate limiting on payment API routes
- [ ] SQL injection prevention
- [ ] XSS prevention in payment forms

### Accessibility Tests
- [ ] Keyboard navigation through checkout
- [ ] Screen reader announcements for payment status
- [ ] Error messages are descriptive and linked to inputs
- [ ] Focus management in multi-step checkout
- [ ] Color contrast for payment status indicators

### Browser/Device Testing
- [ ] Chrome (Desktop & Mobile)
- [ ] Safari (Desktop & iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Apple Pay on Safari/iOS
- [ ] Google Pay on Chrome/Android

---

## 🚀 Implementation Plan

### Phase 1: Foundation (4 hours)
1. Install dependencies
2. Set up Stripe and PayPal accounts (test mode)
3. Create environment variables
4. Create TypeScript types and interfaces
5. Set up database schema for payments

### Phase 2: Stripe Integration (6 hours)
1. Create Stripe Elements wrapper component
2. Build checkout form UI
3. Implement payment intent creation API
4. Implement payment confirmation API
5. Set up webhook handler
6. Test with Stripe test cards

### Phase 3: PayPal Integration (3 hours)
1. Create PayPal button component
2. Implement PayPal REST API calls
3. Handle PayPal callbacks
4. Test with PayPal sandbox

### Phase 4: Invoice & Receipts (3 hours)
1. Create PDF invoice generator
2. Design email receipt template
3. Implement email sending service
4. Add invoice download functionality

### Phase 5: UI Polish & Testing (4 hours)
1. Add loading states and animations
2. Implement error handling and retry logic
3. Add payment status tracking
4. Write comprehensive tests
5. Accessibility audit
6. Performance optimization

---

## 📊 Success Metrics

### Key Performance Indicators
- **Conversion Rate**: Target 65%+ (from cart to completed payment)
- **Payment Processing Time**: < 3 seconds average
- **Failed Payment Rate**: < 2%
- **Customer Support Tickets**: < 5% of transactions
- **Mobile Checkout Completion**: > 70%

### Monitoring & Analytics
- Track payment method usage (Stripe vs PayPal vs Apple Pay)
- Monitor average transaction value
- Track cart abandonment at each step
- Measure time-to-checkout
- Monitor webhook processing latency

---

## 🔀 Merge Strategy

### Target Branch
`main` (or `integration` if using phased rollouts)

### Pre-Merge Requirements
- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review approved (2+ reviewers)
- [ ] Accessibility audit complete
- [ ] Security review complete
- [ ] Performance benchmarks met
- [ ] Documentation complete
- [ ] Stripe/PayPal test mode validated
- [ ] Production keys ready (but not committed)

### Deployment Strategy
1. **Stage 1**: Deploy to staging environment
2. **Stage 2**: Test with real Stripe test mode
3. **Stage 3**: Internal team testing (5 test transactions)
4. **Stage 4**: Beta testing with 10 customers
5. **Stage 5**: Production deployment with feature flag
6. **Stage 6**: Gradual rollout (10%, 50%, 100%)

### Rollback Plan
- Feature flag to disable new payment system
- Fallback to legacy payment (if exists)
- Database migrations are reversible
- Webhook events are queued (can replay)

---

## ⚠️ Risks & Mitigations

### High-Risk Items
1. **Payment Processing Failures**
   - *Risk*: Stripe/PayPal API downtime
   - *Mitigation*: Implement retry logic, queue failed payments, show user-friendly errors

2. **Security Vulnerabilities**
   - *Risk*: Payment data exposure
   - *Mitigation*: Never store raw card data, use Stripe tokenization, security audit

3. **Webhook Delivery Failures**
   - *Risk*: Missed webhook events
   - *Mitigation*: Implement idempotency, manual reconciliation tool, event replay

4. **Multi-Currency Bugs**
   - *Risk*: Incorrect currency conversion
   - *Mitigation*: Use currency.js for precision, extensive unit tests, display currency clearly

### Medium-Risk Items
- Browser compatibility issues (Apple Pay, Google Pay)
- Mobile UX challenges
- Email delivery failures
- PDF generation errors

---

## 📝 Documentation Requirements

### Code Documentation
- [ ] JSDoc comments for all payment functions
- [ ] TypeScript interfaces for all payment data
- [ ] API route documentation (OpenAPI/Swagger)

### User Documentation
- [ ] How to make a payment (customer guide)
- [ ] Supported payment methods
- [ ] Refund policy and process
- [ ] Payment troubleshooting FAQ

### Developer Documentation
- [ ] Setup guide (environment variables, API keys)
- [ ] Webhook testing guide
- [ ] Payment flow diagrams
- [ ] Database schema documentation
- [ ] Security best practices

---

## 🔄 Next Actions

### Immediate (Before Starting Development)
1. Get Stripe account approval
2. Set up PayPal developer account
3. Decide on database (PostgreSQL recommended)
4. Choose email service (SendGrid vs Mailgun)
5. Review PCI DSS compliance checklist

### First Sprint (Days 1-3)
1. Set up development environment
2. Create database schema
3. Implement basic Stripe checkout
4. Create checkout UI components

### Second Sprint (Days 4-7)
1. Complete payment methods (PayPal, Apple Pay)
2. Implement webhooks
3. Add invoice generation
4. Write comprehensive tests

---

## 📎 Related Documents
- [BRANCHING_STRATEGY.md](../BRANCHING_STRATEGY.md)
- [MODERNIZATION_STRATEGY.md](../MODERNIZATION_STRATEGY.md)
- [overview.md](../overview.md)

## 📧 Stakeholders
- **Product Owner**: TBD
- **Technical Lead**: Claude
- **Security Reviewer**: TBD
- **QA Lead**: TBD

---

**Last Updated**: 2025-10-26
**Document Version**: 1.0
