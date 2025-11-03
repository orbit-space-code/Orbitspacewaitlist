# Verify Deployment Checklist - orbitspace.org

## Quick Verification Steps

### 1. Check Site Loads
- [ ] Visit `https://orbitspace.org`
- [ ] Site loads (not blank/white screen)
- [ ] No 404 errors

### 2. Check Browser Console
- [ ] Open DevTools (F12)
- [ ] Go to Console tab
- [ ] No red errors
- [ ] No "VITE_CONVEX_URL is undefined" errors

### 3. Check Environment Variables in Vercel
- [ ] `VITE_CONVEX_URL` is set
- [ ] Value is your Convex deployment URL
- [ ] `CONVEX_SITE_URL` is set to `https://orbitspace.org`

### 4. Test Waitlist Form
- [ ] Form displays correctly
- [ ] Can type in name field
- [ ] Can type in email field
- [ ] Submit button works
- [ ] Form submission succeeds (no errors)

### 5. Check Convex Connection
- [ ] No "Failed to fetch" errors in console
- [ ] Network tab shows successful Convex requests
- [ ] Waitlist stats load (if shown on page)

---

## Common Issues Checklist

### ❌ Blank/White Page
→ Missing `VITE_CONVEX_URL` environment variable

### ❌ "VITE_CONVEX_URL is undefined" in console
→ Add environment variable in Vercel and redeploy

### ❌ Form doesn't submit
→ Check Convex backend is deployed and `VITE_CONVEX_URL` is correct

### ❌ Network errors
→ Verify Convex deployment URL is correct

### ❌ 404 on page refresh
→ Check `vercel.json` rewrite rules (should be configured)

---

## Quick Test Commands

```bash
# Get your Convex deployment URL
npx convex deploy --prod

# This will show your deployment URL
# Copy it and add to Vercel as VITE_CONVEX_URL
```

---

**If you see any errors, check [FIX_WEBSITE_ERRORS.md](./FIX_WEBSITE_ERRORS.md) for detailed solutions.**

