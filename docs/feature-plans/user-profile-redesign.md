# Feature Plan: User Profile Redesign

**Feature ID**: `user-profile-redesign`
**Status**: Planning
**Priority**: MEDIUM
**Branch**: `claude/sequential-feature-development-011CUVCJYuD5uKkp8vxWYBTC`
**Estimated Time**: 10-14 hours
**Created**: 2025-10-26
**Last Updated**: 2025-10-26

---

## Overview

### Purpose
Complete redesign of user profile pages with modern UI/UX, enhanced functionality, and seamless integration with payment history, tour bookings, and personalization features.

### Goals
- Modern, intuitive profile interface
- Edit profile information with real-time validation
- View booking history and upcoming tours
- Payment history integration
- Saved preferences and favorites
- Profile photo upload with cropping
- Responsive design for all devices
- Dark/light mode support
- WCAG 2.1 AA accessibility compliance

### Success Criteria
- [ ] Profile load time < 1 second
- [ ] Mobile-responsive on all screen sizes
- [ ] Profile edit success rate > 98%
- [ ] Image upload success rate > 95%
- [ ] Zero accessibility violations
- [ ] User satisfaction score > 4.5/5
- [ ] Test coverage > 80%

---

## Technical Architecture

### Core Technologies
- **Next.js 16** - App router, server components
- **React 19** - UI components
- **Zustand** - State management for profile data
- **React Hook Form** - Form management
- **Zod** - Validation schemas
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Cloudinary/Uploadthing** - Image upload service
- **next-themes** - Dark/light mode

### Module Structure
```
src/features/user-profile/
├── components/
│   ├── ProfileHeader.tsx          # Profile header with avatar
│   ├── ProfileEditForm.tsx        # Edit profile form
│   ├── ProfileStats.tsx           # Stats cards (bookings, spent, etc.)
│   ├── BookingHistory.tsx         # List of past bookings
│   ├── UpcomingTours.tsx          # List of upcoming tours
│   ├── PaymentHistory.tsx         # Payment transactions
│   ├── SavedFavorites.tsx         # Favorited tours/services
│   ├── ProfileSettings.tsx        # Settings panel
│   ├── AvatarUpload.tsx           # Avatar upload with crop
│   └── ProfileTabs.tsx            # Tab navigation
├── hooks/
│   ├── useProfile.ts              # Fetch and manage profile
│   ├── useProfileUpdate.ts        # Update profile hook
│   ├── useAvatarUpload.ts         # Avatar upload logic
│   └── useBookings.ts             # Fetch booking history
├── lib/
│   ├── profile-validators.ts      # Zod schemas
│   ├── profile-utils.ts           # Utility functions
│   └── image-processing.ts        # Image crop/resize
├── types/
│   ├── profile.types.ts           # TypeScript interfaces
│   └── booking.types.ts           # Booking-related types
├── store/
│   └── profile-store.ts           # Zustand store
└── README.md                      # Feature documentation
```

---

## Affected Files and Components

### New Files
1. `/src/features/user-profile/` - Entire feature module
2. `/src/app/profile/page.tsx` - Main profile page
3. `/src/app/profile/edit/page.tsx` - Edit profile page
4. `/src/app/profile/settings/page.tsx` - Settings page
5. `/src/app/api/profile/` - Profile API routes

### Modified Files
1. `/package.json` - Add new dependencies
2. `/src/app/layout.tsx` - Add profile provider
3. `/src/components/layout/Navigation.tsx` - Add profile link
4. Integration with `/src/features/payment-gateway/` (if exists)

### Existing Components Used
- `/src/components/ui/Button.tsx`
- `/src/components/providers/ThemeProvider.tsx`
- `/src/lib/utils.ts`

---

## Required Dependencies

### Production Dependencies
```json
{
  "react-hook-form": "^7.53.0",
  "@hookform/resolvers": "^3.9.0",
  "zod": "^3.23.0",
  "uploadthing": "^7.0.0",
  "react-dropzone": "^14.2.0",
  "react-image-crop": "^11.0.0",
  "date-fns": "^4.0.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-avatar": "^1.1.0",
  "@radix-ui/react-dialog": "^1.1.0"
}
```

### Dev Dependencies
```json
{
  "@testing-library/react": "^16.0.0",
  "@testing-library/user-event": "^14.5.0"
}
```

---

## Implementation Phases

### Phase 1: Profile Structure & Layout (3-4 hours)
**Tasks:**
- [ ] Create profile page structure
- [ ] Build ProfileHeader component with avatar
- [ ] Implement ProfileTabs navigation
- [ ] Create ProfileStats component
- [ ] Set up routing (profile, profile/edit, profile/settings)
- [ ] Implement responsive layout
- [ ] Add dark/light mode support

**Deliverables:**
- Profile page skeleton
- Tab navigation
- Responsive layout

---

### Phase 2: Profile Data & Forms (3-4 hours)
**Tasks:**
- [ ] Create Zustand profile store
- [ ] Implement useProfile hook
- [ ] Build ProfileEditForm with React Hook Form
- [ ] Create Zod validation schemas
- [ ] Implement profile update API routes
- [ ] Add real-time form validation
- [ ] Create success/error notifications
- [ ] Add loading states

**Deliverables:**
- Working profile edit functionality
- Form validation
- API integration

---

### Phase 3: Avatar Upload & Image Processing (2-3 hours)
**Tasks:**
- [ ] Set up Uploadthing/Cloudinary
- [ ] Build AvatarUpload component
- [ ] Implement image cropping with react-image-crop
- [ ] Add image preview
- [ ] Create upload progress indicator
- [ ] Implement image optimization
- [ ] Add fallback avatar (user initials)
- [ ] Handle upload errors

**Deliverables:**
- Avatar upload functionality
- Image cropping
- Optimized images

---

### Phase 4: History & Settings (2-3 hours)
**Tasks:**
- [ ] Build BookingHistory component
- [ ] Create UpcomingTours component
- [ ] Integrate PaymentHistory (from payment-gateway feature)
- [ ] Build SavedFavorites component
- [ ] Create ProfileSettings panel
- [ ] Implement preference saving (notifications, privacy, etc.)
- [ ] Add export data functionality (GDPR compliance)
- [ ] Build account deletion flow

**Deliverables:**
- Booking/payment history
- Settings functionality
- GDPR compliance features

---

## User Interface Design

### Profile Page Sections

#### 1. Profile Header
```
┌─────────────────────────────────────────┐
│  [Avatar]  Jesse Lucas                  │
│            @jlucus                       │
│            Member since: Oct 2024        │
│            [Edit Profile]                │
└─────────────────────────────────────────┘
```

#### 2. Stats Cards
```
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│   12    │ │   $450  │ │    3    │ │    8    │
│ Bookings│ │  Spent  │ │ Upcoming│ │Favorites│
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

#### 3. Tabbed Content
```
┌─────────────────────────────────────────┐
│ [Overview] [Bookings] [Payments] [Settings] │
├─────────────────────────────────────────┤
│                                          │
│        Tab Content Here                  │
│                                          │
└─────────────────────────────────────────┘
```

---

## API Endpoints

### GET `/api/profile`
**Purpose**: Fetch user profile data
**Response**:
```typescript
{
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  preferences: object;
  createdAt: Date;
}
```

### PATCH `/api/profile`
**Purpose**: Update user profile
**Request Body**:
```typescript
{
  name?: string;
  bio?: string;
  phone?: string;
  preferences?: object;
}
```

### POST `/api/profile/avatar`
**Purpose**: Upload profile avatar
**Request**: FormData with image file
**Response**:
```typescript
{
  avatarUrl: string;
}
```

### GET `/api/profile/bookings`
**Purpose**: Fetch user booking history
**Response**:
```typescript
{
  bookings: Array<{
    id: string;
    tourName: string;
    date: Date;
    status: string;
    amount: number;
  }>;
}
```

### GET `/api/profile/favorites`
**Purpose**: Fetch saved favorites
**Response**:
```typescript
{
  favorites: Array<{
    id: string;
    type: 'tour' | 'service';
    name: string;
    savedAt: Date;
  }>;
}
```

---

## Database Schema (if using database)

### User Profile Extension
```typescript
interface UserProfile {
  userId: string;
  bio: string;
  avatarUrl: string;
  phone: string;
  dateOfBirth: Date;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    darkMode: boolean;
  };
  updatedAt: Date;
}
```

### Favorites Table
```typescript
interface Favorite {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'tour' | 'service' | 'product';
  createdAt: Date;
}
```

---

## Integration Points

### With Existing Features
1. **Payment Gateway**
   - Display payment history in profile
   - Link to PaymentHistory component

2. **Tour Booking System** (if exists)
   - Display booking history
   - Show upcoming tours
   - Quick re-booking functionality

3. **Pricing Optimization** (future)
   - Show personalized pricing based on history
   - Loyalty discounts

4. **Navigation**
   - Add profile link to main navigation
   - User avatar dropdown menu

---

## Testing Checklist

### Unit Tests
- [ ] Profile validation schemas
- [ ] Profile utilities (formatPhone, validateEmail, etc.)
- [ ] Image processing functions
- [ ] Zustand store actions

### Integration Tests
- [ ] Profile fetch and update
- [ ] Avatar upload flow
- [ ] Form validation
- [ ] Settings update

### E2E Tests (Playwright)
- [ ] Complete profile edit flow
- [ ] Avatar upload and crop
- [ ] View booking history
- [ ] Update settings
- [ ] Mobile profile experience

### Accessibility Tests
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] Focus management

---

## Accessibility Requirements

- [ ] All form inputs have proper labels
- [ ] Error messages are announced to screen readers
- [ ] Focus management in modals
- [ ] Keyboard navigation for tabs
- [ ] ARIA labels for interactive elements
- [ ] Color contrast meets WCAG AA standards
- [ ] Avatar upload accessible via keyboard

---

## Environment Variables

```bash
# Image Upload (Uploadthing)
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...

# Or Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## Merge Strategy

### Prerequisites for Merge
- [ ] All tests passing
- [ ] Code review completed
- [ ] Accessibility audit passed
- [ ] Mobile responsive verified
- [ ] Dark mode tested
- [ ] Documentation complete
- [ ] Image upload service configured

### Integration Testing
- [ ] Test on various devices (mobile, tablet, desktop)
- [ ] Test with different user roles
- [ ] Verify integration with payment history
- [ ] Verify integration with bookings

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Large image uploads | MEDIUM | Implement client-side compression, file size limits |
| Profile data privacy | HIGH | Implement proper authentication, data encryption |
| Image upload service downtime | MEDIUM | Implement fallback avatar, retry logic |
| Form validation bypass | MEDIUM | Server-side validation, rate limiting |
| GDPR compliance | HIGH | Add data export, account deletion features |

---

## Performance Considerations

- Lazy load booking history (pagination)
- Optimize avatar images (WebP, responsive sizes)
- Cache profile data (SWR, React Query)
- Debounce form validation
- Progressive image loading

---

## Success Metrics

### Performance
- Profile page load < 1s
- Avatar upload < 5s
- Form submission < 500ms

### User Experience
- Profile edit completion rate > 95%
- Avatar upload success rate > 95%
- User satisfaction > 4.5/5

### Technical
- Test coverage > 80%
- Zero critical accessibility issues
- Mobile responsive score 100%

---

## Timeline

| Phase | Duration | Start | End |
|-------|----------|-------|-----|
| Phase 1: Structure & Layout | 3-4h | TBD | TBD |
| Phase 2: Data & Forms | 3-4h | TBD | TBD |
| Phase 3: Avatar Upload | 2-3h | TBD | TBD |
| Phase 4: History & Settings | 2-3h | TBD | TBD |
| **Total** | **10-14h** | TBD | TBD |

---

## Next Steps

1. **Approve Plan** - Review and approve this feature plan
2. **Set Up Image Service** - Configure Uploadthing or Cloudinary
3. **Install Dependencies** - Run `pnpm add react-hook-form zod uploadthing react-image-crop`
4. **Design Review** - Review UI mockups (if available)
5. **Begin Phase 1** - Start structure implementation

---

## Design References

### Inspiration
- GitHub profile pages
- LinkedIn profile design
- Airbnb user dashboard
- Stripe dashboard profiles

### UI Components
- Use Radix UI for tabs, dialogs, avatars
- Tailwind CSS for styling
- Framer Motion for smooth transitions
- Custom components for unique branding

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-10-26 | Initial feature plan created | Claude AI |

---

## References

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Uploadthing Docs](https://docs.uploadthing.com/)
- [Radix UI Components](https://www.radix-ui.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Plan Status**: ✅ Complete and Ready for Development
**Approval Required**: Yes
**Estimated Start Date**: TBD
**Estimated Completion Date**: TBD
