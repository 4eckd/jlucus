# Quick Start Guide: UPR-001 Auth Foundation

## What Was Created

All authentication foundation files have been created in your repository:

### New Files
- ✅ `prisma/schema.prisma` - Database schema
- ✅ `src/lib/auth.ts` - NextAuth configuration
- ✅ `src/lib/prisma.ts` - Prisma client singleton
- ✅ `src/app/api/auth/[...nextauth]/route.ts` - Auth API routes
- ✅ `src/types/next-auth.d.ts` - TypeScript type definitions
- ✅ `.env.example` - Environment variables template
- ✅ `.gitignore` - Updated with Prisma exclusions

### Modified Files
- ✅ `.gitignore` - Added Prisma-specific ignores

---

## Setup Instructions

### Option 1: Automated Script (Recommended)

**On Windows (PowerShell):**
```powershell
cd k:\git\4eckd-jlucus\jlucus
.\artifacts\feat-auth-foundation-UPR-001\SETUP_SCRIPT.ps1
```

**On Linux/Mac (Bash):**
```bash
cd k:/git/4eckd-jlucus/jlucus
chmod +x artifacts/feat-auth-foundation-UPR-001/SETUP_SCRIPT.sh
./artifacts/feat-auth-foundation-UPR-001/SETUP_SCRIPT.sh
```

---

### Option 2: Manual Steps

#### 1. Create Feature Branch
```bash
git checkout -b feat/auth-foundation/UPR-001
```

#### 2. Install Dependencies
```bash
# Production dependencies
pnpm add next-auth@beta @auth/prisma-adapter @prisma/client bcryptjs

# Dev dependencies
pnpm add -D prisma @types/bcryptjs
```

#### 3. Generate Prisma Client
```bash
pnpm prisma generate
```

#### 4. Configure Environment
```bash
# Copy template
cp .env.example .env

# Generate secret (Git Bash / WSL / Linux / Mac)
openssl rand -base64 32

# Edit .env and add:
# NEXTAUTH_SECRET="<paste-secret-here>"
# DATABASE_URL="postgresql://user:password@localhost:5432/jlucus_dev"
# Or for SQLite: DATABASE_URL="file:./dev.db"
```

#### 5. Run Database Migration
```bash
pnpm prisma migrate dev --name init_auth
```

#### 6. Test Build
```bash
pnpm build
```

#### 7. Test Linter
```bash
pnpm lint
```

#### 8. Start Dev Server
```bash
pnpm dev
```

Visit: http://localhost:3000/api/auth/signin

You should see the NextAuth default sign-in page.

---

## Troubleshooting

### Error: "Module not found: Can't resolve '@prisma/client'"
**Solution:** Run `pnpm prisma generate`

### Error: "Invalid `prisma.user.findUnique()` invocation"
**Solution:** Run the migration: `pnpm prisma migrate dev --name init_auth`

### Error: "NEXTAUTH_SECRET is not set"
**Solution:** Add `NEXTAUTH_SECRET` to your `.env` file (use `openssl rand -base64 32`)

### TypeScript Error: "Module has no exported member 'NextAuthOptions'"
**Solution:** For NextAuth v5 beta, use `AuthOptions` instead:
```typescript
import type { AuthOptions } from "next-auth";
```
The provided code already uses the correct types for v5.

### Build Error: "Cannot find module 'bcryptjs'"
**Solution:** Ensure dependencies are installed: `pnpm install`

---

## Next Steps After Setup

1. **Test Authentication Endpoint**
   - Visit `/api/auth/signin`
   - Verify NextAuth UI appears

2. **Create Test User (Optional)**
   - You'll need to build registration UI in UPR-002
   - Or manually insert a user via Prisma Studio: `pnpm prisma studio`

3. **Proceed to UPR-002: OAuth Providers**
   - Add Google and GitHub OAuth
   - Create login/register pages with UI

4. **Proceed to UPR-003: Profile UI**
   - Build profile page
   - Add profile forms
   - Implement photo upload

---

## Verification Checklist

- [ ] Dependencies installed successfully
- [ ] `pnpm prisma generate` runs without errors
- [ ] `.env` file created with `NEXTAUTH_SECRET` and `DATABASE_URL`
- [ ] Database migration completed
- [ ] `pnpm build` completes successfully
- [ ] `pnpm lint` shows no errors
- [ ] Dev server starts: `pnpm dev`
- [ ] Can access `/api/auth/signin` without errors

---

## Files Reference

### Configuration Files
- `.env` (create from `.env.example`)
- `prisma/schema.prisma` (database schema)
- `src/lib/auth.ts` (NextAuth config)

### API Routes
- `src/app/api/auth/[...nextauth]/route.ts`

### Database
- After migration: `prisma/migrations/` (git-ignored)
- SQLite: `dev.db` (if using SQLite, git-ignored)

---

**Need Help?** Check the full PR description:
`progress/pr-drafts/feat-auth-foundation-UPR-001.md`
