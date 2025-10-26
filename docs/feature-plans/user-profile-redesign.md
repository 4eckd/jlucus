# 👤 Feature Plan: User Profile Redesign

**Branch**: `feature/user-profile-redesign`
**Status**: 📋 Planning
**Created**: 2025-10-26
**Owner**: Claude
**Estimated Complexity**: Medium
**Estimated Time**: 10-14 hours

---

## 📋 Overview

### Purpose
Redesign the user profile system to provide a modern, intuitive interface for customers to manage their account, view booking history, save preferences, and update personal information. This feature enhances user engagement and retention.

### Business Goals
- Increase repeat bookings by 30% through personalized recommendations
- Reduce customer support inquiries by 20% (self-service profile management)
- Improve user engagement with saved preferences and wishlists
- Enable targeted marketing through user preferences
- Build customer loyalty through booking history and rewards

### User Stories
1. **As a customer**, I want to view my booking history so that I can track past and upcoming tours
2. **As a customer**, I want to save my favorite tours so that I can book them later
3. **As a customer**, I want to update my contact information so that I receive accurate notifications
4. **As a customer**, I want to see personalized tour recommendations based on my interests
5. **As a customer**, I want to manage my communication preferences so that I control what emails I receive

---

## 🎯 Acceptance Criteria

### Functional Requirements
- [ ] User registration and login (email/password + OAuth)
- [ ] Profile photo upload with cropping
- [ ] Personal information management (name, email, phone, address)
- [ ] Booking history with filters (upcoming, past, cancelled)
- [ ] Saved tours / wishlist
- [ ] Personalized tour recommendations
- [ ] Communication preferences (email, SMS, push notifications)
- [ ] Password change and account security
- [ ] Account deletion (GDPR compliant)
- [ ] Profile completion progress indicator

### Non-Functional Requirements
- [ ] Profile page load time < 1.5 seconds
- [ ] Responsive design (mobile-first)
- [ ] Accessible (WCAG AAA compliance)
- [ ] Dark/light theme support
- [ ] Real-time form validation
- [ ] Auto-save for long forms
- [ ] Image optimization for profile photos

---

## 📁 Affected Files & Components

### New Files to Create
```
src/
├── features/
│   └── profile/
│       ├── components/
│       │   ├── ProfileHeader.tsx          # Profile photo + name header
│       │   ├── ProfileNavigation.tsx      # Tab/section navigation
│       │   ├── PersonalInfoForm.tsx       # Edit personal info
│       │   ├── BookingHistory.tsx         # Past/upcoming bookings
│       │   ├── BookingCard.tsx            # Individual booking display
│       │   ├── SavedTours.tsx             # Wishlist/favorites
│       │   ├── TourCard.tsx               # Tour display component
│       │   ├── RecommendedTours.tsx       # AI recommendations
│       │   ├── PreferencesForm.tsx        # Communication preferences
│       │   ├── SecuritySettings.tsx       # Password, 2FA
│       │   ├── PhotoUpload.tsx            # Profile photo upload/crop
│       │   ├── AccountDeletion.tsx        # Delete account flow
│       │   └── ProgressIndicator.tsx      # Profile completion %
│       ├── hooks/
│       │   ├── useProfile.ts              # Profile data fetching
│       │   ├── useBookingHistory.ts       # Bookings API
│       │   ├── useSavedTours.ts           # Wishlist management
│       │   ├── useRecommendations.ts      # AI recommendations
│       │   └── usePhotoUpload.ts          # Image upload logic
│       ├── lib/
│       │   ├── profile-validators.ts      # Form validation
│       │   ├── image-processor.ts         # Image resize/crop
│       │   └── recommendations-engine.ts  # Tour recommendation logic
│       ├── types/
│       │   └── profile.types.ts           # TypeScript interfaces
│       └── constants/
│           └── countries.ts               # Country/region lists
├── app/
│   ├── profile/
│   │   ├── page.tsx                       # Main profile page
│   │   ├── edit/page.tsx                  # Edit profile page
│   │   ├── bookings/page.tsx              # Booking history page
│   │   ├── saved/page.tsx                 # Saved tours page
│   │   └── settings/page.tsx              # Account settings
│   └── api/
│       └── profile/
│           ├── route.ts                   # GET/PUT profile
│           ├── photo/route.ts             # Upload profile photo
│           ├── bookings/route.ts          # Get booking history
│           ├── saved/route.ts             # Manage wishlist
│           ├── recommendations/route.ts   # Get recommendations
│           └── delete/route.ts            # Delete account
└── lib/
    └── db/
        └── schema/
            ├── users.ts                   # User profile schema
            ├── saved_tours.ts             # Saved tours schema
            └── user_preferences.ts        # Preferences schema
```

### Existing Files to Modify
- `src/components/layout/Navigation.tsx` - Add profile menu dropdown
- `src/app/layout.tsx` - Add authentication provider
- `package.json` - Add auth and image processing dependencies
- `.env.example` - Add auth provider keys
- `src/styles/colors.css` - Add profile-specific colors

---

## 📦 Required Dependencies

### Production Dependencies
```json
{
  "next-auth": "^5.0.0-beta.4",
  "@auth/prisma-adapter": "^2.0.0",
  "react-dropzone": "^14.2.3",
  "react-image-crop": "^11.0.5",
  "sharp": "^0.33.1",
  "date-fns": "^3.0.6",
  "react-hook-form": "^7.49.3",
  "zod": "^3.22.4",
  "@hookform/resolvers": "^3.3.4"
}
```

### Dev Dependencies
```json
{
  "@types/react-image-crop": "^8.1.6"
}
```

### Environment Variables Required
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Image Storage (Cloudinary or S3)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
# OR
AWS_S3_BUCKET=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
```

---

## 🔗 Required Integrations

### Third-Party Services
1. **NextAuth.js**
   - Email/password authentication
   - OAuth providers (Google, GitHub)
   - Session management

2. **Image Storage**
   - Cloudinary (recommended) or AWS S3
   - Image optimization and CDN delivery
   - Profile photo hosting

3. **Database**
   - PostgreSQL with Prisma ORM
   - User profiles table
   - Bookings table (link to payment system)
   - Saved tours table
   - User preferences table

4. **Email Service** (for verification emails)
   - SendGrid, Mailgun, or AWS SES
   - Email verification flow
   - Password reset emails

### API Endpoints to Implement
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update profile info
- `POST /api/profile/photo` - Upload profile photo
- `DELETE /api/profile/photo` - Remove profile photo
- `GET /api/profile/bookings` - Get booking history
- `GET /api/profile/saved` - Get saved/wishlist tours
- `POST /api/profile/saved/:tourId` - Save a tour
- `DELETE /api/profile/saved/:tourId` - Remove saved tour
- `GET /api/profile/recommendations` - Get personalized recommendations
- `PUT /api/profile/preferences` - Update communication preferences
- `POST /api/profile/delete` - Request account deletion

---

## 🧪 Testing Checklist

### Unit Tests
- [ ] Profile form validation (email, phone, etc.)
- [ ] Image upload and cropping logic
- [ ] Password strength validation
- [ ] Recommendation algorithm
- [ ] Date formatting for booking history

### Integration Tests
- [ ] User registration flow
- [ ] Login/logout flow
- [ ] OAuth authentication (Google, GitHub)
- [ ] Profile update API
- [ ] Photo upload to Cloudinary/S3
- [ ] Booking history retrieval
- [ ] Saved tours add/remove

### E2E Tests
- [ ] New user registration and profile completion
- [ ] Login and navigate to profile
- [ ] Upload and crop profile photo
- [ ] Edit personal information and save
- [ ] View booking history with filters
- [ ] Save/unsave tours from wishlist
- [ ] Change password
- [ ] Delete account (with confirmation)

### Security Tests
- [ ] Password hashing (bcrypt)
- [ ] Session token security
- [ ] CSRF protection
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] Rate limiting on auth endpoints
- [ ] Account enumeration prevention

### Accessibility Tests
- [ ] Keyboard navigation through profile sections
- [ ] Screen reader support for form fields
- [ ] Error messages linked to inputs
- [ ] Focus management in modals
- [ ] Image alt text for profile photos
- [ ] Color contrast for all text

### Browser/Device Testing
- [ ] Chrome (Desktop & Mobile)
- [ ] Safari (Desktop & iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Responsive design (320px to 1920px)

---

## 🚀 Implementation Plan

### Phase 1: Authentication Setup (3 hours)
1. Install NextAuth.js and configure providers
2. Set up database schema for users
3. Create login/register pages
4. Implement OAuth flows (Google, GitHub)
5. Add session management

### Phase 2: Profile UI Components (4 hours)
1. Create ProfileHeader with photo
2. Build PersonalInfoForm with validation
3. Create ProfileNavigation tabs
4. Design BookingHistory component
5. Build SavedTours grid layout
6. Add dark/light theme support

### Phase 3: Photo Upload System (2 hours)
1. Implement drag-and-drop photo upload
2. Add image cropping functionality
3. Integrate with Cloudinary/S3
4. Add loading states and progress bars
5. Optimize images for web

### Phase 4: API Routes & Data Management (3 hours)
1. Create profile CRUD API routes
2. Implement booking history API
3. Build saved tours API
4. Add recommendation engine
5. Create preferences API

### Phase 5: Testing & Polish (2 hours)
1. Write unit and integration tests
2. Accessibility audit
3. Performance optimization
4. Add animations and transitions
5. Error handling improvements

---

## 📊 Success Metrics

### Key Performance Indicators
- **Profile Completion Rate**: Target 75%+ of users complete profile
- **Repeat Booking Rate**: Target 40%+ (up from 30%)
- **Wishlist Engagement**: Target 50%+ of users save at least 1 tour
- **Self-Service Rate**: Target 80%+ of profile updates done without support
- **Session Duration**: Target 3+ minutes on profile pages

### Monitoring & Analytics
- Track profile completion progress (which fields are skipped)
- Monitor photo upload success rate
- Measure time-to-complete profile
- Track wishlist → booking conversion rate
- Monitor recommendation click-through rate

---

## 🔀 Merge Strategy

### Target Branch
`main` (or `integration` for phased rollout)

### Pre-Merge Requirements
- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review approved (2+ reviewers)
- [ ] Accessibility audit complete
- [ ] Security audit complete (especially auth flow)
- [ ] Performance benchmarks met
- [ ] Documentation complete
- [ ] Database migrations tested
- [ ] Image storage configured

### Deployment Strategy
1. **Stage 1**: Deploy to staging with test database
2. **Stage 2**: Internal team testing (create 10 test profiles)
3. **Stage 3**: Beta testing with 20 real users
4. **Stage 4**: Production deployment with feature flag
5. **Stage 5**: Gradual rollout (25%, 50%, 100%)
6. **Stage 6**: Monitor for 48 hours

### Rollback Plan
- Feature flag to disable new profile UI
- Database migrations are reversible
- Cloudinary/S3 cleanup for test images
- Session management fallback

---

## ⚠️ Risks & Mitigations

### High-Risk Items
1. **Authentication Security**
   - *Risk*: Compromised user accounts
   - *Mitigation*: Use NextAuth.js best practices, enforce strong passwords, add 2FA option

2. **Data Privacy (GDPR)**
   - *Risk*: Non-compliant data handling
   - *Mitigation*: Add account deletion, data export, cookie consent, privacy policy

3. **Image Upload Abuse**
   - *Risk*: Users upload inappropriate or large images
   - *Mitigation*: File size limits (2MB), image validation, moderation queue

4. **Database Performance**
   - *Risk*: Slow booking history queries
   - *Mitigation*: Add database indexes, implement pagination, cache recommendations

### Medium-Risk Items
- OAuth provider downtime
- Image CDN latency
- Session timeout UX issues
- Mobile keyboard covering input fields

---

## 📝 Documentation Requirements

### Code Documentation
- [ ] JSDoc comments for all profile functions
- [ ] TypeScript interfaces for all profile data
- [ ] API route documentation

### User Documentation
- [ ] How to create an account
- [ ] How to upload a profile photo
- [ ] How to save tours and book later
- [ ] Privacy settings guide
- [ ] How to delete your account

### Developer Documentation
- [ ] NextAuth.js setup guide
- [ ] Image upload flow diagram
- [ ] Database schema documentation
- [ ] Recommendation algorithm explanation
- [ ] OAuth provider setup guide

---

## 🔄 Next Actions

### Immediate (Before Starting Development)
1. Choose OAuth providers (Google, GitHub, or both)
2. Set up Cloudinary or AWS S3 account
3. Design database schema for users and bookings
4. Create user flow wireframes
5. Design profile UI mockups

### First Sprint (Days 1-4)
1. Set up NextAuth.js
2. Create database schema
3. Build registration and login pages
4. Implement basic profile view

### Second Sprint (Days 5-7)
1. Add photo upload functionality
2. Build booking history component
3. Implement saved tours feature
4. Add recommendation system
5. Write comprehensive tests

---

## 📎 Related Documents
- [BRANCHING_STRATEGY.md](../BRANCHING_STRATEGY.md)
- [MODERNIZATION_STRATEGY.md](../MODERNIZATION_STRATEGY.md)
- [overview.md](../overview.md)
- [payment-gateway-upgrade.md](./payment-gateway-upgrade.md) - Integrates with booking history

## 📧 Stakeholders
- **Product Owner**: TBD
- **Technical Lead**: Claude
- **UX Designer**: TBD
- **Security Reviewer**: TBD
- **QA Lead**: TBD

---

**Last Updated**: 2025-10-26
**Document Version**: 1.0
