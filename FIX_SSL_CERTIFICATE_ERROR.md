# Fix SSL Certificate Error - "Requested host does not match any Subject Alternative Names"

## 🔴 Error Explained

**Error:** `Requested host does not match any Subject Alternative Names (SANs) on TLS certificate`

**What this means:**
- Your domain `orbitspace.org` is pointing to a server/service
- That server has an SSL certificate, but it's **not for orbitspace.org**
- The certificate is for a different domain (likely `appwrite.network` or another service)
- This is why the connection fails

**Root Cause:** DNS is still pointing to the wrong service (not Vercel), so it's hitting a Fastly-backed service that doesn't have your domain's certificate.

---

## ✅ Solution: Fix DNS to Point to Vercel

The DNS records must point to **Vercel**, not to Appwrite or other services. Vercel will automatically issue the correct SSL certificate for your domain.

### Step 1: Verify Current DNS (What's Wrong)

```bash
nslookup orbitspace.org
nslookup www.orbitspace.org
```

**If you see:**
- IP addresses like `151.101.195.52` (Fastly IPs)
- CNAME to `appwrite.network`
- Any non-Vercel service

→ DNS is **wrong** and needs to be fixed

### Step 2: Get Vercel's DNS Configuration

1. **Go to Vercel Dashboard:**
   - Your Project → **Settings** → **Domains**
   - Click on `orbitspace.org`
   - Look for **DNS Configuration** section
   - Copy the exact records shown

2. **Vercel will show something like:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Step 3: Update DNS at Your Registrar

Go to your domain registrar's DNS management and update:

#### For Root Domain (orbitspace.org):

**Option A: If Vercel shows an A record (IP address):**
```
Type: A
Name: @ (or blank, depends on registrar)
Value: [Vercel's IP from dashboard] (e.g., 76.76.21.21)
TTL: Auto (or 3600)
```

**Option B: If your DNS provider supports ALIAS/ANAME:**
```
Type: ALIAS (or ANAME)
Name: @
Value: cname.vercel-dns.com
TTL: Auto
```

#### For www Subdomain:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

### Step 4: DELETE Old/Incorrect Records

**CRITICAL:** Delete these incorrect records that are causing the error:
- ❌ Any A record pointing to `151.101.195.52` or other Fastly IPs
- ❌ Any CNAME pointing to `appwrite.network`
- ❌ Any other records pointing to non-Vercel services

**Keep only:**
- ✅ A record for root domain pointing to Vercel IP (or ALIAS to `cname.vercel-dns.com`)
- ✅ CNAME for www pointing to `cname.vercel-dns.com`

### Step 5: Wait for DNS Propagation

1. **Save changes** at your registrar
2. **Wait 15-30 minutes** for DNS to propagate
3. **Clear DNS cache:**
   ```bash
   # Windows
   ipconfig /flushdns
   ```

### Step 6: Verify DNS is Correct

After 15-30 minutes, check:

```bash
nslookup orbitspace.org
nslookup www.orbitspace.org
```

**Expected results:**
- `orbitspace.org` should show a Vercel IP (like `76.76.21.21`) OR resolve to Vercel
- `www.orbitspace.org` should show `cname.vercel-dns.com`

### Step 7: Force Vercel SSL Certificate

Once DNS is correct:

1. **Go to Vercel Dashboard:**
   - Settings → Domains → `orbitspace.org`
   - Look for "SSL Certificate" section
   - Click **Refresh** or **Renew Certificate**
   - Wait 5-15 minutes for SSL to be issued

2. **Vercel automatically:**
   - Detects when DNS points to them
   - Issues SSL certificate via Let's Encrypt
   - Configures it for your domain

### Step 8: Test

After DNS propagates and SSL is issued:

1. Visit `https://orbitspace.org`
2. Check for padlock icon (🔒) in browser
3. No SSL errors
4. Site loads correctly

---

## 🔧 Registrar-Specific Instructions

### Cloudflare

1. Login → Select `orbitspace.org`
2. **DNS** → **Records**
3. **Update root domain:**
   - Delete any A/CNAME pointing to wrong IP/service
   - If ALIAS supported: Type `ALIAS`, Name `@`, Target `cname.vercel-dns.com`, Proxy = **OFF** (gray cloud)
   - If no ALIAS: Type `A`, Name `@`, IPv4 = Vercel IP, Proxy = **OFF**
4. **Update www:**
   - Type `CNAME`, Name `www`, Target `cname.vercel-dns.com`, Proxy = **OFF**
5. **Save**
6. Wait 15 minutes

### GoDaddy

1. My Products → **DNS**
2. **Records** section
3. **Edit root domain:**
   - Delete old A/CNAME records
   - Add: Type `A`, Name `@`, Value = Vercel IP (from dashboard)
4. **Edit www:**
   - Type `CNAME`, Name `www`, Value `cname.vercel-dns.com`
5. **Save**
6. Wait 15 minutes

### Namecheap

1. Domain List → **Manage** → **Advanced DNS**
2. **Remove** old records pointing to wrong services
3. **Add root domain:**
   - Type `A`, Host `@`, Value = Vercel IP
4. **Edit www:**
   - Type `CNAME`, Host `www`, Value `cname.vercel-dns.com`
5. **Save All Changes**
6. Wait 15 minutes

---

## ⚠️ Why This Error Happens

The error occurs because:

1. **DNS points to wrong service:** Your domain resolves to Fastly/CDN (Appwrite or another service)
2. **Wrong SSL certificate:** That service has SSL, but it's for a different domain
3. **Mismatch:** Browser expects certificate for `orbitspace.org`, but gets certificate for `appwrite.network` or another domain
4. **Connection fails:** Browser blocks connection due to certificate mismatch

**The fix:** Point DNS to Vercel, and Vercel will issue the correct SSL certificate.

---

## ✅ Verification Checklist

After fixing DNS:

- [ ] DNS records updated to point to Vercel
- [ ] Old incorrect records deleted
- [ ] Saved changes at registrar
- [ ] Waited 15-30 minutes
- [ ] Verified DNS with `nslookup` shows Vercel values
- [ ] Checked Vercel dashboard - domain status is "Valid"
- [ ] SSL certificate issued in Vercel (check domain settings)
- [ ] Tested `https://orbitspace.org` - no SSL errors
- [ ] Padlock icon (🔒) appears in browser
- [ ] Site loads correctly

---

## 🆘 Still Getting Error?

### If error persists after DNS fix:

1. **Wait longer:** DNS propagation can take up to 48 hours (usually 15-30 min)
2. **Check global DNS:** Use [whatsmydns.net](https://www.whatsmydns.net/#A/orbitspace.org) to verify propagation
3. **Clear browser cache:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check Vercel SSL:** In dashboard, verify SSL certificate is issued
5. **Try different browser/incognito:** Rule out browser cache issues

### Contact Support:

If still failing after 1 hour:
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- Include:
  - Screenshot of DNS records from registrar
  - Screenshot of Vercel domain settings
  - The exact error message

---

## 📝 Quick Summary

1. **Problem:** DNS points to Fastly/service with wrong SSL certificate
2. **Fix:** Update DNS to point to Vercel (use A record or ALIAS)
3. **Wait:** 15-30 minutes for DNS propagation
4. **Verify:** DNS shows Vercel, SSL certificate issued
5. **Test:** Site loads with correct SSL

**The key:** Your DNS must point to Vercel, not to any other service. Once DNS is correct, Vercel will automatically issue the right SSL certificate.

