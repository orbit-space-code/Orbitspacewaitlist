# Deployment Guide for OrbitSpace

This guide will walk you through deploying OrbitSpace to **orbitspace.org**.

## 📋 Prerequisites

1. **Node.js 18+** installed
2. **Convex account** and deployment set up
3. **Domain**: orbitspace.org configured and ready
4. **GitHub account** (for automatic deployments)

## 🔧 Step 1: Prepare the Application

### 1.1 Ensure Convex Backend is Deployed

```bash
# Make sure you're logged into Convex
npx convex dev --once

# Deploy the backend to production
npx convex deploy --prod
```

After deployment, note your **Convex deployment URL**. It will look like:
```
https://rapid-hamster-481.convex.cloud
```

### 1.2 Build the Frontend Locally (Optional - to test)

```bash
npm install
npm run build
```

This creates a `dist` folder with production-ready files.

## 🚀 Step 2: Deploy to Vercel (Recommended)

Vercel is the easiest and most suitable platform for deploying Vite + React applications.

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Push code to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Import your GitHub repository**
   - Click "Add New Project"
   - Select your repository
   - Vercel will auto-detect Vite settings

4. **Configure Environment Variables**
   Add the following in Vercel project settings:
   - `VITE_CONVEX_URL` = Your Convex deployment URL (e.g., `https://rapid-hamster-481.convex.cloud`)
   - `CONVEX_SITE_URL` = `https://orbitspace.org` (or your Vercel preview URL)

5. **Configure Custom Domain**
   - Go to Project Settings → Domains
   - Add `orbitspace.org` and `www.orbitspace.org`
   - Follow DNS instructions:
     - Add an A record pointing to Vercel's IP
     - Or add a CNAME record: `www.orbitspace.org` → `cname.vercel-dns.com`
   - Wait for DNS propagation (can take up to 24 hours)

6. **Deploy**
   - Click "Deploy"
   - Your site will be live!

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add VITE_CONVEX_URL
vercel env add CONVEX_SITE_URL

# Add custom domain
vercel domains add orbitspace.org
```

## 🌐 Step 3: Alternative Deployment Options

### Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Create `netlify.toml`** (already created if using this option):
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy**
   ```bash
   netlify init
   netlify deploy --prod
   ```

4. **Add environment variables** in Netlify dashboard:
   - `VITE_CONVEX_URL`
   - `CONVEX_SITE_URL`

5. **Configure custom domain** in Netlify dashboard

### Deploy to Cloudflare Pages

1. **Connect GitHub repository** to Cloudflare Pages

2. **Build settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

3. **Environment variables**:
   - `VITE_CONVEX_URL`
   - `CONVEX_SITE_URL`

4. **Custom domain**: Add `orbitspace.org` in Pages settings

## 🔐 Step 4: Configure DNS for orbitspace.org

You need to configure DNS records with your domain registrar:

### For Vercel:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @ (or blank)
Value: [Vercel's IP - check Vercel dashboard]
```

### For Netlify:
```
Type: CNAME
Name: www
Value: orbitspace.netlify.app

Type: A
Name: @
Value: [Netlify's IP]
```

### For Cloudflare Pages:
```
Type: CNAME
Name: @
Value: [Your Pages URL].pages.dev

Type: CNAME
Name: www
Value: [Your Pages URL].pages.dev
```

## ✅ Step 5: Verify Deployment

1. Visit `https://orbitspace.org`
2. Test the waitlist form
3. Check browser console for errors
4. Verify Convex connection is working

## 🔄 Step 6: Continuous Deployment

Both Vercel and Netlify support automatic deployments:

- **Every push to `main` branch** → Auto-deploy to production
- **Pull requests** → Create preview deployments
- **No manual deployment needed** after initial setup

## 🐛 Troubleshooting

### Issue: Cannot Connect Custom Domain in Vercel
- **Solution**: See [VERCEL_DOMAIN_TROUBLESHOOTING.md](./VERCEL_DOMAIN_TROUBLESHOOTING.md) for detailed troubleshooting guide
- **Quick fixes**:
  - Check DNS records match Vercel's instructions exactly
  - Wait 15-30 minutes for DNS propagation
  - Verify domain isn't added to another Vercel project
  - Check SSL certificate status (auto-issued after DNS is correct)

### Issue: Site loads but Convex connection fails
- **Solution**: Check `VITE_CONVEX_URL` environment variable is set correctly in your hosting platform

### Issue: 404 errors on page refresh
- **Solution**: Ensure SPA routing is configured (rewrites/redirects). The `vercel.json` file handles this automatically.

### Issue: Domain not resolving
- **Solution**: 
  - Wait for DNS propagation (up to 48 hours, usually 15-30 minutes)
  - Check DNS records are correct using [whatsmydns.net](https://www.whatsmydns.net/)
  - Verify records at your domain registrar match Vercel's requirements
  - See [VERCEL_DOMAIN_TROUBLESHOOTING.md](./VERCEL_DOMAIN_TROUBLESHOOTING.md) for detailed steps

### Issue: Build fails
- **Solution**: Ensure Node.js version is 18+ in your hosting platform settings

## 📝 Post-Deployment Checklist

- [ ] Site loads at orbitspace.org
- [ ] HTTPS is enabled (automatic on Vercel/Netlify)
- [ ] Waitlist form submits successfully
- [ ] Waitlist stats display correctly
- [ ] Mobile responsive design works
- [ ] All environment variables are set
- [ ] DNS records are properly configured
- [ ] Custom domain SSL certificate is active

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Convex Deployment Guide](https://docs.convex.dev/production/deployment)
- [Vite Production Build](https://vitejs.dev/guide/build)

---

**Need Help?** Check the [Convex documentation](https://docs.convex.dev/) or your hosting platform's support.

