# 📈 Feature Plan: Tour Pricing Optimization

**Branch**: `feature/tour-pricing-optimization`
**Status**: 📋 Planning
**Created**: 2025-10-26
**Owner**: Claude
**Estimated Complexity**: Medium-High
**Estimated Time**: 12-16 hours

---

## 📋 Overview

### Purpose
Implement a dynamic pricing system that optimizes tour prices based on demand, seasonality, group size, and early-bird discounts. This feature maximizes revenue while maintaining competitive pricing and transparent value for customers.

### Business Goals
- Increase revenue by 20% through dynamic pricing
- Improve booking predictability with early-bird incentives
- Maximize capacity utilization (target 85%+ occupancy)
- Enable A/B testing of pricing strategies
- Provide transparent pricing breakdown to customers
- Support promotional campaigns and discount codes

### User Stories
1. **As a customer**, I want to see clear pricing with all fees so that I know the total cost upfront
2. **As a customer**, I want early-bird discounts so that I save money by booking in advance
3. **As a customer**, I want group discounts so that I get better value when booking for multiple people
4. **As a business owner**, I want to increase prices during peak season so that revenue is maximized
5. **As a business owner**, I want to offer discount codes so that I can run promotional campaigns
6. **As a customer**, I want price alerts so that I'm notified when prices drop for my saved tours

---

## 🎯 Acceptance Criteria

### Functional Requirements
- [ ] Base pricing with seasonal adjustments (high/mid/low season)
- [ ] Dynamic pricing based on demand (seats remaining)
- [ ] Early-bird discounts (book 30+ days in advance)
- [ ] Group discounts (2-5 people, 6-10 people, 11+ people)
- [ ] Promotional discount codes
- [ ] Transparent pricing breakdown display
- [ ] Price history tracking (for analytics)
- [ ] Price alerts for saved tours
- [ ] Admin dashboard for pricing rules
- [ ] A/B testing framework for pricing experiments

### Non-Functional Requirements
- [ ] Price calculation < 200ms
- [ ] Real-time seat availability updates
- [ ] Pricing rules are cacheable
- [ ] Audit trail for all price changes
- [ ] Prevent race conditions on booking
- [ ] Accessible pricing display (WCAG AAA)
- [ ] Mobile-responsive pricing UI

---

## 📁 Affected Files & Components

### New Files to Create
```
src/
├── features/
│   └── pricing/
│       ├── components/
│       │   ├── PriceDisplay.tsx           # Main price display
│       │   ├── PriceBreakdown.tsx         # Itemized breakdown
│       │   ├── DiscountBadge.tsx          # Discount indicators
│       │   ├── GroupSizeSelector.tsx      # Group size picker
│       │   ├── PromotionCodeInput.tsx     # Promo code entry
│       │   ├── PriceAlert.tsx             # Price drop alerts
│       │   ├── PriceHistory.tsx           # Historical price chart
│       │   └── SeasonalBadge.tsx          # Season indicator
│       ├── hooks/
│       │   ├── usePricing.ts              # Price calculation hook
│       │   ├── usePromoCode.ts            # Promo validation
│       │   ├── usePriceAlert.ts           # Price alert management
│       │   └── usePriceHistory.ts         # Historical pricing
│       ├── lib/
│       │   ├── pricing-engine.ts          # Core pricing logic
│       │   ├── discount-calculator.ts     # Discount calculations
│       │   ├── seasonal-multiplier.ts     # Season adjustments
│       │   ├── demand-calculator.ts       # Demand-based pricing
│       │   └── promo-validator.ts         # Promo code validation
│       ├── types/
│       │   └── pricing.types.ts           # TypeScript interfaces
│       └── constants/
│           ├── seasons.ts                 # Season definitions
│           └── discount-tiers.ts          # Discount tier config
├── app/
│   ├── tours/
│   │   └── [id]/
│   │       └── pricing/
│   │           └── page.tsx               # Pricing details page
│   └── api/
│       └── pricing/
│           ├── calculate/route.ts         # Calculate price
│           ├── promo/validate/route.ts    # Validate promo code
│           ├── promo/apply/route.ts       # Apply promo code
│           ├── history/route.ts           # Get price history
│           ├── alert/route.ts             # Manage price alerts
│           └── admin/
│               ├── rules/route.ts         # Get/update pricing rules
│               └── discounts/route.ts     # Manage discount codes
└── lib/
    └── db/
        └── schema/
            ├── pricing_rules.ts           # Pricing rules schema
            ├── promo_codes.ts             # Promo codes schema
            ├── price_history.ts           # Historical prices
            └── price_alerts.ts            # User price alerts
```

### Existing Files to Modify
- `src/features/payment/components/CheckoutForm.tsx` - Integrate pricing display
- `src/app/tours/[id]/page.tsx` - Add pricing information
- `src/features/profile/components/SavedTours.tsx` - Add price alerts
- `package.json` - Add pricing/chart dependencies
- `.env.example` - Add pricing configuration

---

## 📦 Required Dependencies

### Production Dependencies
```json
{
  "decimal.js": "^10.4.3",
  "date-fns": "^3.0.6",
  "recharts": "^2.12.0",
  "react-number-format": "^5.3.1",
  "cron": "^3.1.6",
  "@vercel/cron": "^1.0.0"
}
```

### Dev Dependencies
```json
{
  "@types/cron": "^2.0.1"
}
```

### Environment Variables Required
```env
# Pricing Configuration
PRICING_BASE_CURRENCY=USD
PRICING_HIGH_SEASON_MULTIPLIER=1.3
PRICING_MID_SEASON_MULTIPLIER=1.1
PRICING_LOW_SEASON_MULTIPLIER=0.9

# Discount Configuration
EARLY_BIRD_DAYS=30
EARLY_BIRD_DISCOUNT=0.15
GROUP_DISCOUNT_TIER_1=0.10  # 2-5 people
GROUP_DISCOUNT_TIER_2=0.15  # 6-10 people
GROUP_DISCOUNT_TIER_3=0.20  # 11+ people

# Dynamic Pricing
ENABLE_DYNAMIC_PRICING=true
HIGH_DEMAND_THRESHOLD=0.8    # 80% capacity
HIGH_DEMAND_MULTIPLIER=1.2
LOW_DEMAND_THRESHOLD=0.3     # 30% capacity
LOW_DEMAND_DISCOUNT=0.1

# Cron Jobs (for price alerts)
CRON_SECRET=your_cron_secret_here
```

---

## 🔗 Required Integrations

### Third-Party Services
1. **Database**
   - PostgreSQL with Prisma ORM
   - Store pricing rules, promo codes, price history
   - Real-time seat availability tracking

2. **Caching Layer**
   - Redis (optional, for performance)
   - Cache pricing rules
   - Cache calculated prices (short TTL)

3. **Email Service** (for price alerts)
   - SendGrid or Mailgun
   - Send price drop notifications

4. **Analytics**
   - Track pricing experiments (A/B tests)
   - Monitor conversion rate by price point
   - Revenue optimization metrics

### API Endpoints to Implement
- `POST /api/pricing/calculate` - Calculate price for tour/date/group
- `POST /api/pricing/promo/validate` - Validate promo code
- `POST /api/pricing/promo/apply` - Apply promo to booking
- `GET /api/pricing/history/:tourId` - Get price history
- `POST /api/pricing/alert` - Create price alert
- `DELETE /api/pricing/alert/:id` - Remove price alert
- `GET /api/pricing/admin/rules` - Get pricing rules (admin)
- `PUT /api/pricing/admin/rules` - Update pricing rules (admin)
- `POST /api/pricing/admin/promo` - Create promo code (admin)
- `DELETE /api/pricing/admin/promo/:id` - Delete promo code (admin)
- `GET /api/cron/price-alerts` - Cron job to check price alerts

---

## 🧪 Testing Checklist

### Unit Tests
- [ ] Seasonal multiplier calculation
- [ ] Early-bird discount logic
- [ ] Group size discount tiers
- [ ] Promo code validation (expiry, usage limits)
- [ ] Dynamic pricing based on demand
- [ ] Price breakdown itemization
- [ ] Decimal precision (currency.js or decimal.js)

### Integration Tests
- [ ] Calculate price API with all factors
- [ ] Apply multiple discounts (stacking rules)
- [ ] Promo code usage limits (single-use, multi-use)
- [ ] Price alert creation and notification
- [ ] Price history tracking
- [ ] Admin pricing rules update

### E2E Tests
- [ ] View tour with seasonal pricing
- [ ] Add group members and see discount applied
- [ ] Enter promo code and see price update
- [ ] Book early and receive early-bird discount
- [ ] Set price alert and receive notification (mock)
- [ ] Admin creates new promo code

### Business Logic Tests
- [ ] Cannot stack incompatible discounts
- [ ] Expired promo codes are rejected
- [ ] Price cannot go below minimum threshold
- [ ] High demand increases price correctly
- [ ] Seasonal changes apply on correct dates
- [ ] Group discount applies to all members

### Accessibility Tests
- [ ] Price breakdown is screen-reader accessible
- [ ] Discount indicators have ARIA labels
- [ ] Promo code input has error announcements
- [ ] Price updates are announced to screen readers
- [ ] Color is not the only indicator of discounts

### Browser/Device Testing
- [ ] Chrome (Desktop & Mobile)
- [ ] Safari (Desktop & iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Price chart renders correctly on mobile

---

## 🚀 Implementation Plan

### Phase 1: Pricing Engine (4 hours)
1. Create pricing calculation algorithm
2. Implement seasonal multipliers
3. Add early-bird discount logic
4. Add group discount tiers
5. Build promo code validation
6. Write extensive unit tests

### Phase 2: UI Components (3 hours)
1. Create PriceDisplay component
2. Build PriceBreakdown with itemization
3. Design DiscountBadge components
4. Create GroupSizeSelector
5. Build PromotionCodeInput
6. Add loading and error states

### Phase 3: API Routes & Database (3 hours)
1. Create pricing calculation API
2. Build promo code management API
3. Implement price history tracking
4. Add price alert system
5. Create admin pricing dashboard API

### Phase 4: Dynamic Pricing & Alerts (3 hours)
1. Implement demand-based pricing
2. Create cron job for price alerts
3. Build email notification system
4. Add price history chart (Recharts)
5. Implement A/B testing framework

### Phase 5: Testing & Optimization (3 hours)
1. Write comprehensive tests
2. Performance optimization (caching)
3. Accessibility audit
4. Add analytics tracking
5. Create admin documentation

---

## 📊 Success Metrics

### Key Performance Indicators
- **Revenue per Booking**: Target 20% increase
- **Average Occupancy Rate**: Target 85%+ (from 70%)
- **Early-Bird Booking Rate**: Target 40% of bookings
- **Promo Code Usage**: Target 15% of bookings
- **Price Alert Conversion**: Target 25% of alerts → booking

### Monitoring & Analytics
- Track average price per tour over time
- Monitor seasonal revenue trends
- Measure discount code ROI (revenue vs. discount cost)
- Track price elasticity (how demand changes with price)
- Monitor competitor pricing (manual process)

### A/B Testing Experiments
1. **Early-bird discount amount** (10% vs 15% vs 20%)
2. **Group discount thresholds** (start at 2 vs 4 people)
3. **Dynamic pricing aggressiveness** (1.1x vs 1.2x vs 1.3x)
4. **Price display format** (total first vs breakdown first)

---

## 🔀 Merge Strategy

### Target Branch
`main` (or `integration` for phased rollout)

### Pre-Merge Requirements
- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review approved (2+ reviewers)
- [ ] Business stakeholder approval on pricing rules
- [ ] Finance team review of discount logic
- [ ] Performance benchmarks met (< 200ms price calc)
- [ ] Documentation complete
- [ ] A/B testing framework validated

### Deployment Strategy
1. **Stage 1**: Deploy to staging with test pricing rules
2. **Stage 2**: Internal testing (simulate bookings)
3. **Stage 3**: Beta test with 5% of tours (1 week)
4. **Stage 4**: Analyze revenue impact
5. **Stage 5**: Gradual rollout (25%, 50%, 100%)
6. **Stage 6**: Monitor pricing metrics for 2 weeks

### Rollback Plan
- Feature flag to disable dynamic pricing
- Revert to fixed pricing structure
- Database migrations are reversible
- Price history preserved for analysis

---

## ⚠️ Risks & Mitigations

### High-Risk Items
1. **Revenue Loss from Over-Discounting**
   - *Risk*: Too many discounts reduce profit margins
   - *Mitigation*: Set minimum price floor, test discount combinations, monitor margins

2. **Price Perception Issues**
   - *Risk*: Customers feel prices are unfair or confusing
   - *Mitigation*: Transparent breakdown, consistent rules, clear communication

3. **Technical Pricing Errors**
   - *Risk*: Bug causes incorrect pricing (too high or low)
   - *Mitigation*: Extensive unit tests, price validation checks, manual review for new rules

4. **Race Conditions on Bookings**
   - *Risk*: Multiple users book same seats, price changes mid-checkout
   - *Mitigation*: Database transactions, price locking for 15 minutes, seat reservation

### Medium-Risk Items
- Promo code abuse (sharing single-use codes)
- Seasonal date miscalculation
- Dynamic pricing being too aggressive
- Performance issues with complex calculations

---

## 📝 Documentation Requirements

### Code Documentation
- [ ] JSDoc comments for all pricing functions
- [ ] TypeScript interfaces for pricing structures
- [ ] Pricing algorithm flowchart
- [ ] API route documentation

### User Documentation
- [ ] How pricing works (customer FAQ)
- [ ] Early-bird discount eligibility
- [ ] Group discount tiers explained
- [ ] How to use promo codes
- [ ] Price alert setup guide

### Business Documentation
- [ ] Pricing strategy overview
- [ ] Seasonal multiplier rationale
- [ ] Discount policy guidelines
- [ ] A/B testing results template
- [ ] Revenue optimization guide

### Developer Documentation
- [ ] Pricing engine architecture
- [ ] Database schema for pricing
- [ ] Cron job setup for price alerts
- [ ] Admin dashboard usage guide
- [ ] How to add new pricing rules

---

## 🔄 Next Actions

### Immediate (Before Starting Development)
1. Get business approval on pricing strategy
2. Define seasonal date ranges
3. Set discount percentages (early-bird, group)
4. Design pricing UI mockups
5. Review competitor pricing

### First Sprint (Days 1-4)
1. Build pricing calculation engine
2. Create database schema
3. Implement seasonal and group discounts
4. Build basic pricing display UI

### Second Sprint (Days 5-8)
1. Add promo code system
2. Implement dynamic pricing
3. Create price alert system
4. Build admin dashboard
5. Add price history chart
6. Write comprehensive tests

---

## 📎 Related Documents
- [BRANCHING_STRATEGY.md](../BRANCHING_STRATEGY.md)
- [MODERNIZATION_STRATEGY.md](../MODERNIZATION_STRATEGY.md)
- [overview.md](../overview.md)
- [payment-gateway-upgrade.md](./payment-gateway-upgrade.md) - Integrates with checkout
- [user-profile-redesign.md](./user-profile-redesign.md) - Price alerts for saved tours

## 📧 Stakeholders
- **Product Owner**: TBD
- **Technical Lead**: Claude
- **Finance/Revenue Manager**: TBD (must approve pricing rules)
- **Marketing Lead**: TBD (promo codes and campaigns)
- **QA Lead**: TBD

---

**Last Updated**: 2025-10-26
**Document Version**: 1.0
