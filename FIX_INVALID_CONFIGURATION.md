# Fix "Invalid Configuration" - CNAME Verified But Still Error

## 🔴 Current Issue

Your DNS shows:
- `orbitspace.org` → Still pointing to `151.101.195.52` (wrong IP)
- `www.orbitspace.org` → Still pointing to `appwrite.network` (wrong)

**Even if Vercel says "CNAME verified", the root domain MUST use an A record, not CNAME.**

## ❗ Critical Rule: Root Domain Cannot Use CNAME

**Important:** You **CANNOT** use CNAME for the root domain (`orbitspace.org`). You MUST use an **A record** with Vercel's IP address.

- ✅ **Root domain (`orbitspace.org`)**: Use **A record** with IP address
- ✅ **www subdomain (`www.orbitspace.org`)**: Use **CNAME** to `cname.vercel-dns.com`

## 🔧 Step-by-Step Fix

### Step 1: Get Vercel's IP Address for Root Domain

**Method A: From Vercel Dashboard**
1. Go to Vercel → Your Project → **Settings** → **Domains**
2. Click on `orbitspace.org`
3. Look for DNS instructions - it will show an **A record** with an IP address
4. Copy that IP address (something like `76.76.21.21`)

**Method B: If Vercel Doesn't Show IP**
1. In Vercel dashboard, check if there's a "Configure DNS" button
2. Click it - it will show the required records
3. For root domain, you'll need an A record

**If you can't find it:**
- Vercel might show: `cname.vercel-dns.com` for root domain
- But you need to convert this to an IP address
- Contact Vercel support or use this common Vercel IP: `76.76.21.21`
- **OR** check if your DNS provider supports **ALIAS/ANAME** records (which can point CNAME at root level)

### Step 2: Update DNS Records at Your Registrar

#### For Root Domain (orbitspace.org) - MUST BE A RECORD

**Option 1: If your DNS provider supports ALIAS/ANAME**
```
Type: ALIAS (or ANAME)
Name: @ (or blank, or orbitspace.org)
Value: cname.vercel-dns.com
TTL: Auto
```

**Option 2: If NO ALIAS support (Most Common)**
```
Type: A
Name: @ (or blank, or orbitspace.org - depends on registrar)
Value: 76.76.21.21 (or the IP Vercel shows you)
TTL: Auto (or 3600)
```

**⚠️ Important:** 
- Delete any existing A record pointing to `151.101.195.52`
- Delete any CNAME record on root domain (if it exists - this is invalid)

#### For www Subdomain - CNAME

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

**⚠️ Important:**
- Delete any existing CNAME pointing to `appwrite.network`
- Make sure it points EXACTLY to `cname.vercel-dns.com`

### Step 3: Registrar-Specific Instructions

#### Cloudflare
1. Login → Select `orbitspace.org`
2. **DNS** → **Records**
3. **For root domain:**
   - If you see ALIAS option: Type `ALIAS`, Name `@`, Target `cname.vercel-dns.com`, Proxy **OFF** (gray cloud)
   - If no ALIAS: Type `A`, Name `@`, IPv4 `76.76.21.21`, Proxy **OFF**
4. **For www:**
   - Type `CNAME`, Name `www`, Target `cname.vercel-dns.com`, Proxy **OFF**
5. **Delete** any records pointing to wrong services
6. Click **Save**

#### GoDaddy
1. My Products → **DNS**
2. Scroll to **Records** section
3. **Edit root domain record:**
   - Change Type to `A` (if it's CNAME, delete and create new)
   - Name: `@` (or leave blank)
   - Value: `76.76.21.21` (or Vercel's IP)
   - TTL: `600`
4. **Edit www record:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
5. **Delete** old incorrect records
6. **Save**

#### Namecheap
1. Domain List → **Manage** → **Advanced DNS**
2. **For root domain:**
   - Delete any existing CNAME on `@`
   - Add: Type `A`, Host `@`, Value = Vercel IP (like `76.76.21.21`)
3. **For www:**
   - Edit CNAME: Host `www`, Value `cname.vercel-dns.com`
4. **Remove** records pointing to wrong IPs/services
5. **Save All Changes**

### Step 4: Clear DNS Cache & Wait

1. **Clear your local DNS cache:**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

2. **Wait 15-30 minutes** for DNS propagation

3. **Force Vercel to Re-check:**
   - Go to Vercel → Settings → Domains
   - Click on your domain
   - Look for "Refresh" or "Re-check DNS" button
   - Click it to force verification

### Step 5: Verify DNS is Correct

After 15-30 minutes, check:

```bash
# Check root domain (should show Vercel IP)
nslookup orbitspace.org

# Check www (should show cname.vercel-dns.com)
nslookup www.orbitspace.org
```

**Expected results:**
- `orbitspace.org` should show a Vercel IP (like `76.76.21.21`) or resolve correctly
- `www.orbitspace.org` should show `cname.vercel-dns.com`

### Step 6: Check Global DNS Propagation

Use online tools to verify globally:
1. Go to [whatsmydns.net](https://www.whatsmydns.net/#A/orbitspace.org)
2. Enter `orbitspace.org`
3. Check that it shows the Vercel IP globally (may take time)

## 🎯 Common Mistakes to Avoid

1. ❌ **Using CNAME on root domain** (not supported by most DNS)
   - ✅ **Fix**: Use A record with IP address

2. ❌ **Both A and CNAME on root domain** (conflicts)
   - ✅ **Fix**: Only ONE record - use A record

3. ❌ **Wrong IP address** (pointing to old service)
   - ✅ **Fix**: Use exact IP from Vercel dashboard

4. ❌ **www pointing to wrong CNAME**
   - ✅ **Fix**: Must be exactly `cname.vercel-dns.com`

5. ❌ **Not waiting for DNS propagation**
   - ✅ **Fix**: Wait 15-30 minutes, clear cache

## 🔍 If Still Not Working After 30 Minutes

### Check Vercel Dashboard
1. Go to Settings → Domains → `orbitspace.org`
2. Read any error messages carefully
3. Check if it shows specific DNS issues
4. Look for a "Refresh" button and click it

### Alternative: Use Vercel Nameservers

If DNS at registrar keeps failing:

1. **In Vercel Dashboard:**
   - Settings → Domains → Your domain
   - Look for "Nameservers" option
   - Copy the nameservers shown

2. **At Your Registrar:**
   - Change nameservers from default to Vercel's nameservers
   - This delegates ALL DNS to Vercel (easier management)

3. **Wait 1-2 hours** for nameserver changes to propagate

### Contact Support

If still failing:
1. **Vercel Support**: [vercel.com/support](https://vercel.com/support)
   - Include screenshots of:
     - Your DNS records from registrar
     - Vercel domain settings page
     - Error message in Vercel

2. **Your DNS Provider Support**
   - Ask if they support ALIAS/ANAME records
   - Confirm the exact format for A records

## ✅ Success Checklist

- [ ] Root domain (`orbitspace.org`) uses **A record** with Vercel IP
- [ ] www subdomain uses **CNAME** to `cname.vercel-dns.com`
- [ ] Deleted all old/incorrect DNS records
- [ ] Saved changes at registrar
- [ ] Cleared local DNS cache
- [ ] Waited 15-30 minutes
- [ ] Verified DNS with `nslookup` shows correct values
- [ ] Checked Vercel dashboard - status changed
- [ ] Clicked "Refresh" in Vercel to force re-check
- [ ] SSL certificate issued (shows in Vercel)

## 📞 Need the Exact Vercel IP?

If you can't find Vercel's IP address in the dashboard:

1. Check Vercel's documentation for current IPs
2. Contact Vercel support - they'll provide the exact IP for your region
3. Common Vercel IPs (may vary):
   - `76.76.21.21`
   - Check [Vercel's DNS docs](https://vercel.com/docs/concepts/projects/domains) for current IPs

---

**The key issue:** Root domain MUST use A record, not CNAME. This is why you're getting "Invalid Configuration" even after CNAME is verified.

