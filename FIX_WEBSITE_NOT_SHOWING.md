# Fix: Website Not Showing on orbitspace.org

## 🔴 Common Reasons Website Doesn't Show

### 1. DNS Still Not Pointing to Vercel

**Check:**
```bash
nslookup orbitspace.org
```

**If you see:**
- IP address that's not Vercel (like `151.101.195.52`)
- Wrong CNAME records
- DNS pointing to other services

**Fix:** Update DNS to point to Vercel (see steps below)

---

### 2. DNS Not Fully Propagated

**Symptoms:**
- DNS updated correctly
- But site still not loading
- Different results from different locations

**Fix:**
- Wait 15-30 minutes (can take up to 48 hours)
- Check propagation: [whatsmydns.net](https://www.whatsmydns.net/#A/orbitspace.org)
- Clear DNS cache: `ipconfig /flushdns`

---

### 3. Vercel Deployment Not Complete

**Check:**
1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Is the latest deployment **Ready** (green checkmark)?
3. Any build errors?

**Fix:**
- If deployment failed, check build logs
- Redeploy if needed
- Ensure build completed successfully

---

### 4. Domain Not Added to Vercel Project

**Check:**
1. Vercel Dashboard → Settings → **Domains**
2. Is `orbitspace.org` listed?
3. What's the status? (Valid, Invalid, Pending)

**Fix:**
- If not listed, add domain: Settings → Domains → Add Domain
- If status is "Invalid", fix DNS (see below)
- If "Pending", wait for DNS propagation

---

### 5. SSL Certificate Not Issued

**Symptoms:**
- DNS is correct
- But browser shows SSL errors
- Site doesn't load over HTTPS

**Fix:**
1. Vercel Dashboard → Settings → Domains → Click domain
2. Check SSL Certificate status
3. Click "Refresh" or "Renew Certificate"
4. Wait 5-15 minutes

---

### 6. Environment Variables Missing

**Check:**
1. Vercel Dashboard → Settings → **Environment Variables**
2. Is `VITE_CONVEX_URL` set?
3. Is it set for **Production** environment?

**Fix:**
- Add `VITE_CONVEX_URL` with your Convex deployment URL
- Add `CONVEX_SITE_URL` = `https://orbitspace.org`
- **Redeploy** after adding

---

## 🔧 Step-by-Step Diagnostic

### Step 1: Check DNS Configuration

```bash
# Check root domain
nslookup orbitspace.org

# Check www subdomain
nslookup www.orbitspace.org
```

**What you should see:**
- `orbitspace.org` → Vercel IP (like `76.76.21.21`) OR resolves to Vercel
- `www.orbitspace.org` → `cname.vercel-dns.com`

**If you see wrong values:**
→ DNS needs to be updated (see Step 2)

---

### Step 2: Fix DNS (If Wrong)

**Get Vercel's DNS Requirements:**

1. Vercel Dashboard → Project → Settings → **Domains**
2. Click on `orbitspace.org`
3. Look for "DNS Configuration" section
4. Copy the exact records shown

**Update at Your Registrar:**

**For Root Domain (`orbitspace.org`):**
```
Type: A
Name: @ (or blank)
Value: [Vercel IP from dashboard]
```

OR if ALIAS supported:
```
Type: ALIAS (or ANAME)
Name: @
Value: cname.vercel-dns.com
```

**For www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Save and wait 15-30 minutes**

---

### Step 3: Verify Vercel Deployment

1. **Check Deployment Status:**
   - Vercel Dashboard → **Deployments**
   - Latest deployment should show ✅ **Ready**
   - If ❌ **Error**, check build logs

2. **Check Domain Status:**
   - Settings → **Domains** → `orbitspace.org`
   - Status should be ✅ **Valid**
   - If ❌ **Invalid** or ⏳ **Pending**, fix DNS (Step 2)

3. **Check SSL Certificate:**
   - Settings → Domains → Click domain
   - SSL Certificate should be ✅ **Valid**
   - If missing, click "Refresh" and wait

---

### Step 4: Verify Environment Variables

1. Vercel Dashboard → Settings → **Environment Variables**
2. Verify these exist:
   - ✅ `VITE_CONVEX_URL` = `https://your-deployment.convex.cloud`
   - ✅ `CONVEX_SITE_URL` = `https://orbitspace.org`
3. Both should be set for **Production**

**If missing:**
- Add them
- **Redeploy** the project (Deployments → Redeploy)

---

### Step 5: Test Different Ways

**Test 1: Vercel Preview URL**
- Go to Deployments → Latest deployment
- Click the preview URL (e.g., `your-project.vercel.app`)
- **Does this work?**
  - ✅ Yes → Issue is with custom domain/DNS
  - ❌ No → Issue is with deployment/build

**Test 2: HTTPS vs HTTP**
- Try `http://orbitspace.org` (should redirect to HTTPS)
- Try `https://orbitspace.org`
- Do both work?

**Test 3: Different Browsers/Devices**
- Try incognito/private window
- Try different browser
- Try mobile device
- Rule out browser cache issues

---

### Step 6: Check Browser Console

1. Visit `https://orbitspace.org`
2. Open DevTools (F12)
3. Check **Console** tab for errors:
   - `VITE_CONVEX_URL is undefined` → Missing env variable
   - `Failed to fetch` → Convex connection issue
   - Network errors → Check DNS/SSL

4. Check **Network** tab:
   - Are requests failing?
   - Which requests fail?

---

## ✅ Complete Checklist

### DNS Configuration
- [ ] Root domain (`orbitspace.org`) points to Vercel IP or `cname.vercel-dns.com`
- [ ] www subdomain points to `cname.vercel-dns.com`
- [ ] Old/incorrect DNS records deleted
- [ ] DNS changes saved at registrar
- [ ] Waited 15-30 minutes for propagation
- [ ] Verified with `nslookup` shows correct values

### Vercel Configuration
- [ ] Domain added in Vercel (Settings → Domains)
- [ ] Domain status shows "Valid" (not "Invalid" or "Pending")
- [ ] Latest deployment is "Ready" (no errors)
- [ ] SSL certificate is issued and valid
- [ ] Preview URL works (your-project.vercel.app)

### Environment Variables
- [ ] `VITE_CONVEX_URL` is set (your Convex deployment URL)
- [ ] `CONVEX_SITE_URL` is set (`https://orbitspace.org`)
- [ ] Both set for Production environment
- [ ] Redeployed after adding/updating env vars

### Testing
- [ ] Tried `https://orbitspace.org` in browser
- [ ] Tried `http://orbitspace.org` (should redirect)
- [ ] Tried incognito/private window
- [ ] Checked browser console for errors
- [ ] Verified with [whatsmydns.net](https://www.whatsmydns.net/#A/orbitspace.org)

---

## 🚨 Quick Fix: Most Common Issues

### Issue: DNS Wrong
**Symptom:** `nslookup orbitspace.org` shows wrong IP
**Fix:** Update DNS records to point to Vercel (see Step 2)

### Issue: DNS Not Propagated
**Symptom:** DNS updated but still not working
**Fix:** Wait 15-30 minutes, check [whatsmydns.net](https://www.whatsmydns.net/#A/orbitspace.org)

### Issue: Domain Not in Vercel
**Symptom:** Domain not listed in Vercel Settings → Domains
**Fix:** Add domain in Vercel dashboard

### Issue: Deployment Failed
**Symptom:** Latest deployment shows error in Vercel
**Fix:** Check build logs, fix errors, redeploy

### Issue: Missing Environment Variables
**Symptom:** Site loads but blank/errors in console
**Fix:** Add `VITE_CONVEX_URL` and `CONVEX_SITE_URL` in Vercel, redeploy

---

## 🔍 Advanced Debugging

### Check Vercel Edge Network
1. Vercel Dashboard → Settings → Domains
2. Click domain → Check "Edge Network" status
3. Should show as active

### Check DNS Propagation Globally
1. Visit [whatsmydns.net](https://www.whatsmydns.net/#A/orbitspace.org)
2. Enter `orbitspace.org`
3. Check if DNS shows correct values globally
4. If not, wait longer for propagation

### Test with curl
```bash
# Test if domain resolves
curl -I https://orbitspace.org

# Check SSL certificate
curl -v https://orbitspace.org
```

### Check Vercel Logs
1. Vercel Dashboard → Your Project → **Deployments**
2. Click latest deployment → **Logs**
3. Check for any errors or warnings

---

## 📞 Still Not Working?

### Information to Gather:

1. **DNS Status:**
   - Run `nslookup orbitspace.org`
   - Share the IP address shown

2. **Vercel Status:**
   - Domain status in Vercel (Valid/Invalid/Pending)
   - Deployment status (Ready/Error)
   - Any error messages

3. **Browser Console:**
   - Open DevTools → Console
   - Share any error messages

4. **What Happens:**
   - Does page load but blank?
   - Does it show 404?
   - Does it show SSL error?
   - Does it timeout?

### Contact Support:

**Vercel Support:**
- [vercel.com/support](https://vercel.com/support)
- Include screenshots of:
  - DNS records from registrar
  - Vercel domain settings
  - Vercel deployment status
  - Browser console errors

---

## 🎯 Most Likely Solutions

**90% of cases are one of these:**

1. **DNS not pointing to Vercel** → Update DNS records
2. **DNS not propagated yet** → Wait 15-30 minutes
3. **Environment variables missing** → Add `VITE_CONVEX_URL` and redeploy
4. **Domain not added in Vercel** → Add in Settings → Domains

**Check these in order and you'll likely find the issue!**

