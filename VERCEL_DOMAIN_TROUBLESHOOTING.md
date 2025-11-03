# Vercel Custom Domain Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Domain Not Showing in Vercel

**Symptoms:**
- Can't add domain in Vercel dashboard
- "Domain already exists" error
- No option to add domain

**Solutions:**

1. **Check Project Settings**
   - Go to your Vercel project
   - Click **Settings** → **Domains**
   - Click **Add** or **Add Domain**
   - Enter `orbitspace.org` and `www.orbitspace.org`

2. **Verify Account Access**
   - Ensure you're logged into the correct Vercel account
   - Check you have admin/owner permissions on the project

3. **Domain Already Added Elsewhere**
   - Check if domain is added to another Vercel project
   - Remove it from the old project first
   - Or contact Vercel support to transfer it

---

### Issue 2: DNS Configuration Errors

**Symptoms:**
- "DNS configuration error" in Vercel
- Domain shows as "Invalid Configuration"
- Not resolving after 24+ hours

**Step-by-Step Fix:**

#### For Root Domain (orbitspace.org):

1. **Check Vercel DNS Instructions**
   - In Vercel: Settings → Domains → Click your domain
   - Vercel will show the exact DNS records needed

2. **Common DNS Records for Vercel:**

   **Option A: Using A Record (Root Domain)**
   ```
   Type: A
   Name: @ (or blank, or orbitspace.org)
   Value: 76.76.21.21
   TTL: Auto (or 3600)
   ```
   ⚠️ **Note**: Vercel's IP can change. Check Vercel dashboard for current IP.

   **Option B: Using ALIAS/ANAME Record (Recommended)**
   ```
   Type: ALIAS or ANAME
   Name: @
   Value: cname.vercel-dns.com
   TTL: Auto
   ```
   ✅ **Best option** if your registrar supports it

3. **For www Subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: Auto
   ```

4. **Where to Add DNS Records:**
   - Log into your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
   - Find **DNS Management** or **DNS Settings**
   - Add/modify the records above
   - Save changes

---

### Issue 3: DNS Propagation Delays

**Symptoms:**
- Domain added correctly but not working
- "Pending" status in Vercel
- Site not loading after DNS changes

**Solutions:**

1. **Wait for Propagation**
   - DNS changes take **5 minutes to 48 hours**
   - Typically takes **15 minutes to 2 hours**

2. **Check DNS Propagation Status**
   - Use [whatsmydns.net](https://www.whatsmydns.net/)
   - Enter `orbitspace.org`
   - Check if DNS records are propagated globally

3. **Clear DNS Cache**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS/Linux
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

4. **Check Current DNS Records**
   ```bash
   # Check A record
   nslookup orbitspace.org
   
   # Check CNAME for www
   nslookup www.orbitspace.org
   ```

---

### Issue 4: Wrong Domain Registrar Settings

**Different Registrars, Different Steps:**

#### Cloudflare (If using Cloudflare DNS)
1. Go to Cloudflare Dashboard
2. Select your domain
3. Go to **DNS** → **Records**
4. Add records:
   - Type: `CNAME`, Name: `@`, Target: `cname.vercel-dns.com`, Proxy: **Off** (DNS only)
   - Type: `CNAME`, Name: `www`, Target: `cname.vercel-dns.com`, Proxy: **Off**
5. Wait 5-15 minutes

#### GoDaddy
1. Go to GoDaddy → My Products → DNS
2. Add/Edit Records:
   - **A Record**: Name `@`, Value `76.76.21.21` (or Vercel's current IP)
   - **CNAME Record**: Name `www`, Value `cname.vercel-dns.com`
3. Save and wait

#### Namecheap
1. Go to Domain List → Manage → Advanced DNS
2. Add Records:
   - **A Record**: Host `@`, Value `76.76.21.21`, TTL `Automatic`
   - **CNAME Record**: Host `www`, Value `cname.vercel-dns.com`, TTL `Automatic`
3. Save

#### Google Domains
1. Go to DNS → Custom records
2. Add:
   - **A Record**: Name `@`, IPv4 address from Vercel
   - **CNAME Record**: Name `www`, Hostname `cname.vercel-dns.com`

---

### Issue 5: SSL Certificate Issues

**Symptoms:**
- Domain connects but shows "Not Secure"
- SSL certificate not issued
- HTTPS not working

**Solutions:**

1. **Wait for SSL**
   - Vercel automatically issues SSL certificates
   - Takes **5-15 minutes** after DNS is correct
   - Certificate is from Let's Encrypt

2. **Force SSL Certificate**
   - In Vercel: Settings → Domains → Your domain
   - Click **Refresh** or **Renew Certificate**
   - Wait a few minutes

3. **Check Certificate Status**
   - In Vercel dashboard, domain should show "Valid"
   - If "Pending" for >1 hour, check DNS again

---

### Issue 6: Domain Verification Issues

**Symptoms:**
- "Domain verification failed"
- "Unable to verify ownership"

**Solutions:**

1. **Verify Domain Ownership**
   - Vercel may ask you to add a TXT record
   - Go to Vercel → Domains → Your domain
   - Copy the verification TXT record
   - Add it to your DNS:
     ```
     Type: TXT
     Name: @ (or orbitspace.org)
     Value: [vercel-verification-string]
     ```
   - Wait 5-10 minutes, then click "Verify" in Vercel

2. **Check DNS Records Are Correct**
   - Ensure no conflicting records
   - Remove old CNAME/A records pointing elsewhere
   - Only keep Vercel records

---

## Step-by-Step: Complete Domain Setup

### Step 1: Add Domain in Vercel
1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Domains**
3. Click **Add Domain**
4. Enter `orbitspace.org` → Click **Add**
5. Enter `www.orbitspace.org` → Click **Add**
6. Vercel will show DNS instructions

### Step 2: Configure DNS at Registrar
1. Copy DNS records from Vercel (they'll show exact values)
2. Log into your domain registrar
3. Go to DNS Management
4. Add/Update records as shown in Vercel

### Step 3: Wait and Verify
1. Wait 15-30 minutes for DNS propagation
2. Check status in Vercel dashboard
3. Domain should change from "Pending" to "Valid"
4. SSL certificate will be issued automatically

### Step 4: Test
1. Visit `https://orbitspace.org`
2. Visit `https://www.orbitspace.org`
3. Both should redirect to the same site
4. Check for SSL lock icon in browser

---

## Quick Diagnostic Commands

Check if DNS is configured correctly:

```bash
# Check root domain
nslookup orbitspace.org

# Check www subdomain
nslookup www.orbitspace.org

# Check DNS records
dig orbitspace.org
dig www.orbitspace.org

# Check SSL certificate
openssl s_client -connect orbitspace.org:443 -servername orbitspace.org
```

---

## Common Error Messages

| Error Message | Solution |
|--------------|----------|
| "Domain already exists" | Remove from other Vercel project or contact support |
| "Invalid Configuration" | Check DNS records match Vercel instructions exactly |
| "Pending" for >24 hours | Verify DNS records are correct, check propagation |
| "SSL Certificate Failed" | Ensure DNS is correct, wait 15 minutes, refresh |
| "Nameservers incorrect" | Use your registrar's nameservers, not Vercel's |

---

## Still Not Working?

### Contact Vercel Support
1. Go to [vercel.com/support](https://vercel.com/support)
2. Describe the issue
3. Include:
   - Your domain name
   - DNS records you've added
   - Screenshots of Vercel dashboard
   - DNS configuration from registrar

### Alternative: Use Vercel Nameservers
If your registrar supports it:
1. In Vercel: Settings → Domains → Your domain
2. Copy Vercel nameservers (if shown)
3. Update nameservers at your registrar
4. This delegates all DNS to Vercel

---

## Verification Checklist

Before contacting support, verify:

- [ ] Domain added in Vercel dashboard
- [ ] DNS records added at registrar (exact values from Vercel)
- [ ] DNS propagated (check with whatsmydns.net)
- [ ] No conflicting DNS records
- [ ] Waited at least 15 minutes after DNS changes
- [ ] Cleared local DNS cache
- [ ] Checked Vercel project is deployed successfully
- [ ] Tried accessing both `orbitspace.org` and `www.orbitspace.org`

---

**Need More Help?**
- [Vercel DNS Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)

