# Fix Website Errors on orbitspace.org

## 🔴 Common Errors & Quick Fixes

### Error 1: Blank Page / White Screen

**Symptoms:**
- Site loads but shows nothing
- White/blank page
- No content visible

**Most Likely Cause:** Missing `VITE_CONVEX_URL` environment variable

**Fix:**
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Check if `VITE_CONVEX_URL` exists
3. If missing, add it:
   - Key: `VITE_CONVEX_URL`
   - Value: `https://[your-deployment].convex.cloud` (your Convex URL)
   - Environment: `Production` (and `Preview` if you want)
4. **Redeploy** the site (go to Deployments → click "..." → Redeploy)

---

### Error 2: "Failed to fetch" or Network Errors

**Symptoms:**
- Console shows: `Failed to fetch` or `Network request failed`
- Convex connection errors
- Waitlist form doesn't work

**Causes & Fixes:**

**A. Missing or Wrong `VITE_CONVEX_URL`**
- ✅ Check environment variable is set correctly
- ✅ Value should be: `https://[deployment-name].convex.cloud`
- ✅ No trailing slash

**B. Convex Backend Not Deployed**
```bash
# Deploy Convex backend to production
npx convex deploy --prod
```

**C. CORS Issues** (Rare - Convex handles this automatically)
- Check Convex dashboard for any CORS settings

---

### Error 3: Console Error "VITE_CONVEX_URL is not defined"

**Symptoms:**
- Browser console shows: `VITE_CONVEX_URL is undefined`
- Site doesn't load or crashes

**Fix:**
1. **In Vercel:**
   - Settings → Environment Variables
   - Add `VITE_CONVEX_URL` with your Convex deployment URL
   - Make sure it's set for **Production** environment
   - **Redeploy** after adding

2. **Verify Convex URL:**
   ```bash
   # Get your Convex deployment URL
   npx convex deploy --prod
   # Copy the URL shown (e.g., https://rapid-hamster-481.convex.cloud)
   ```

---

### Error 4: Authentication Errors

**Symptoms:**
- Auth-related errors in console
- "Failed to authenticate" messages

**Fix:**
1. **Set `CONVEX_SITE_URL` environment variable:**
   - In Vercel: Settings → Environment Variables
   - Add: Key `CONVEX_SITE_URL`, Value `https://orbitspace.org`
   - Environment: `Production`
   - **Redeploy**

2. **Update Convex Auth Config:**
   - The `convex/auth.config.ts` uses `CONVEX_SITE_URL`
   - Make sure it's set correctly

---

### Error 5: 404 Errors on Navigation

**Symptoms:**
- Navigating to different pages shows 404
- Direct URL access fails

**Fix:**
- The `vercel.json` file should handle this with rewrites
- Check Vercel project settings:
  - Framework: Should be "Vite" or auto-detected
  - Output Directory: Should be `dist`
  - Build Command: Should be `npm run build`

---

### Error 6: Build Errors in Vercel

**Symptoms:**
- Deployment fails
- Build logs show errors

**Common Fixes:**

1. **Node.js Version:**
   - In Vercel: Settings → General
   - Set Node.js Version to `18.x` or `20.x`

2. **Build Command:**
   - Should be: `npm run build`
   - Output Directory: `dist`

3. **Missing Dependencies:**
   - Ensure `package.json` has all dependencies
   - Vercel should install automatically

---

## 🔍 Step-by-Step Debugging

### Step 1: Check Browser Console

1. Open `https://orbitspace.org`
2. Press `F12` (or right-click → Inspect)
3. Go to **Console** tab
4. Look for red error messages
5. **Screenshot the errors** - this helps diagnose

**Common console errors:**
- `VITE_CONVEX_URL is undefined` → Missing env variable
- `Failed to fetch` → Convex connection issue
- `Network error` → Check Convex URL and deployment
- `CORS error` → Rare, but check Convex dashboard

### Step 2: Check Network Tab

1. Open browser DevTools (`F12`)
2. Go to **Network** tab
3. Reload page
4. Look for failed requests (red)
5. Check if Convex requests are failing

### Step 3: Verify Environment Variables

**In Vercel Dashboard:**
1. Project → **Settings** → **Environment Variables**
2. Verify these exist:
   - ✅ `VITE_CONVEX_URL` = `https://[your-deployment].convex.cloud`
   - ✅ `CONVEX_SITE_URL` = `https://orbitspace.org`
3. Both should be set for **Production**

**To get your Convex URL:**
```bash
# Run this locally
npx convex deploy --prod
# Copy the deployment URL shown
```

### Step 4: Check Vercel Deployment Logs

1. Vercel Dashboard → Your Project → **Deployments**
2. Click on latest deployment
3. Check **Build Logs** for errors
4. Check **Runtime Logs** for runtime errors

### Step 5: Test Convex Connection

1. Visit your Convex dashboard
2. Check if deployment is active
3. Test a query manually (if possible)

---

## ✅ Complete Fix Checklist

### Environment Variables (CRITICAL)

- [ ] `VITE_CONVEX_URL` is set in Vercel
- [ ] Value is correct (your Convex deployment URL)
- [ ] Set for Production environment
- [ ] `CONVEX_SITE_URL` is set to `https://orbitspace.org`
- [ ] Both variables have correct values (no typos)

### Convex Backend

- [ ] Convex is deployed to production: `npx convex deploy --prod`
- [ ] Deployment URL matches `VITE_CONVEX_URL` in Vercel
- [ ] Convex dashboard shows deployment as active

### Vercel Configuration

- [ ] Build is successful (check Deployments tab)
- [ ] No build errors in logs
- [ ] Node.js version is 18+ (Settings → General)
- [ ] Framework is detected as Vite
- [ ] Output directory is `dist`

### After Fixing

- [ ] **Redeploy** in Vercel (go to Deployments → Redeploy)
- [ ] Wait for deployment to complete
- [ ] Clear browser cache
- [ ] Test site again

---

## 🚨 Quick Fix: Most Common Issue

**99% of errors are caused by missing `VITE_CONVEX_URL`**

### Immediate Fix:

1. **Get your Convex URL:**
   ```bash
   npx convex deploy --prod
   ```
   Copy the URL (e.g., `https://rapid-hamster-481.convex.cloud`)

2. **Add to Vercel:**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Click **Add New**
   - Key: `VITE_CONVEX_URL`
   - Value: `https://your-deployment.convex.cloud` (paste your URL)
   - Environment: Select **Production** (and Preview if needed)
   - Click **Save**

3. **Redeploy:**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click **Redeploy**

4. **Wait 1-2 minutes** for redeploy

5. **Test:** Visit `https://orbitspace.org` again

---

## 🔧 Additional Environment Variables

If you're still having issues, also add:

```
CONVEX_SITE_URL=https://orbitspace.org
```

This is used by Convex Auth configuration.

---

## 🐛 Still Not Working?

### Check These:

1. **Vercel Build Logs:**
   - Deployments → Latest → Build Logs
   - Look for any errors or warnings

2. **Browser Console:**
   - Open DevTools → Console
   - Share the exact error message

3. **Network Tab:**
   - DevTools → Network
   - Check which requests are failing

4. **Convex Dashboard:**
   - Verify deployment is active
   - Check if there are any errors

### Contact Support:

If still not working:
1. **Screenshot:**
   - Browser console errors
   - Vercel build logs
   - Environment variables (hide sensitive values)

2. **Share:**
   - Exact error messages
   - What happens when you visit the site

---

## 📋 What Error Are You Seeing?

To help diagnose faster, please share:

1. **What do you see?**
   - Blank page?
   - Error message?
   - Site loads but features don't work?

2. **Browser Console Errors:**
   - Open DevTools (F12) → Console
   - Copy any red error messages

3. **Environment Variables:**
   - Are `VITE_CONVEX_URL` and `CONVEX_SITE_URL` set in Vercel?

4. **Deployment Status:**
   - Is the Vercel deployment successful?
   - Any errors in build logs?

---

**Most likely fix:** Add `VITE_CONVEX_URL` environment variable in Vercel with your Convex deployment URL, then redeploy.

