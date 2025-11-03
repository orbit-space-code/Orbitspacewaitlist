# OrbitSpace

**A coding agent that asks before it builds.**

OrbitSpace is a revolutionary platform that transforms how developers, creators, and innovators bring their ideas to life. Unlike autonomous AI agents that create unmaintainable code, OrbitSpace uses an intelligent "Overseer" that collaborates with you in real-time, ensuring every decision aligns with your vision.

## 🚀 Features

- **AI-Powered Development**: Leverage intelligent assistance that understands your goals
- **Real-Time Collaboration**: The Overseer asks clarifying questions instead of making assumptions
- **Transparent Process**: See exactly what's being built and why
- **Built for Everyone**: From solo developers to enterprise teams

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS
- **Backend**: Convex (Database, Auth, Real-time)
- **Authentication**: Convex Auth
- **Notifications**: Sonner

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/orbit-space-code/Orbitspacewaitlist.git
cd Orbitspacewaitlist
```

2. Install dependencies:
```bash
npm install
```

3. Set up Convex:
```bash
npx convex dev
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
orbitspace/
├── convex/              # Backend functions and schema
│   ├── schema.ts        # Database schema
│   ├── waitlist.ts      # Waitlist functionality
│   └── auth.ts          # Authentication setup
├── src/
│   ├── App.tsx          # Main application component
│   ├── About.tsx        # About page component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
CONVEX_DEPLOYMENT=your-deployment-url
VITE_CONVEX_URL=your-convex-url
```

## 🚀 Deployment

The project is configured for easy deployment with Convex:

1. Deploy the backend:
```bash
npx convex deploy
```

2. Build the frontend:
```bash
npm run build
```

3. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to **orbitspace.org**.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 💝 Dedication

OrbitSpace is built with ❤️ and we dedicate this to PK.

---

**© 2025 OrbitSpace. All Rights Reserved.**
