# Quick Deploy Guide - OrbitSpace to orbitspace.org

## 🚀 Fastest Path to Production

### Prerequisites
- GitHub repository (push your code)
- Convex account (deployment URL ready)
- Domain: orbitspace.org (DNS access)

### 5-Minute Deploy Steps

#### 1. Deploy Convex Backend (2 min)
```bash
npx convex deploy --prod
```
Copy your deployment URL: `https://[name].convex.cloud`

#### 2. Deploy to Vercel (3 min)

**Option A: Via Dashboard**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repo
3. Add environment variables:
   - `VITE_CONVEX_URL` = `https://[your-deployment].convex.cloud`
   - `CONVEX_SITE_URL` = `https://orbitspace.org`
4. Deploy!

**Option B: Via CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
vercel env add VITE_CONVEX_URL production
vercel env add CONVEX_SITE_URL production
```

#### 3. Add Custom Domain
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add `orbitspace.org` and `www.orbitspace.org`
3. Update DNS records as shown in Vercel:
   - CNAME: `www` → `cname.vercel-dns.com`
   - A record: `@` → [Vercel IP]

#### 4. Wait & Test
- DNS propagation: 5 minutes to 48 hours
- Test at `https://orbitspace.org`
- Verify waitlist form works

### Environment Variables Checklist
- ✅ `VITE_CONVEX_URL` (required)
- ✅ `CONVEX_SITE_URL` (required)

### Verify Deployment
- [ ] Site loads
- [ ] Form submits successfully  
- [ ] No console errors
- [ ] HTTPS enabled

**Done!** 🎉

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

