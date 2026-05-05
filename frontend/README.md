# SystemForge AI — Frontend

Premium Next.js frontend for the SystemForge AI multi-agent architecture engine.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 14** | App Router, SSR/SSG |
| **TypeScript** | Full type safety |
| **Ant Design 5** | UI component system |
| **Framer Motion** | Animations & transitions |
| **React Three Fiber** | 3D particle explosion background |
| **Three.js** | 3D rendering engine |

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with Ant Design theme
│   └── page.tsx            # Main page orchestrator
├── components/
│   ├── agents/
│   │   ├── AgentCard.tsx   # Individual agent output card
│   │   └── AgentPipeline.tsx # 3-agent pipeline layout
│   ├── animations/
│   │   └── ParticleBackground.tsx  # 3D exploding Three.js scene
│   ├── layout/
│   │   └── Header.tsx      # Fixed top navigation
│   └── ui/
│       └── HeroSection.tsx # Hero + project input
├── lib/
│   ├── api.ts              # Backend API + mock mode
│   └── types.ts            # Shared TypeScript types
├── styles/
│   └── globals.css         # CSS variables, fonts, base styles
├── .env.local              # Environment config
└── package.json
```

## Environment Variables

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000   # FastAPI backend
NEXT_PUBLIC_MOCK_MODE=true                       # Enable mock responses
```

## Mock Mode

The frontend works fully without AMD credits using mock mode.
Realistic agent outputs are streamed with proper timing simulation.

Set `NEXT_PUBLIC_MOCK_MODE=false` and ensure `NEXT_PUBLIC_BACKEND_URL` points to a live backend once AMD credits are activated.

## Design System

- **Primary**: AMD Red `#E30913`
- **Accent**: Cyan `#00D4FF`, Gold `#FFB800`, Green `#00FF9C`
- **Font Display**: Orbitron
- **Font Body**: Rajdhani
- **Font Mono**: JetBrains Mono
- **Theme**: Dark — void black backgrounds with glowing accents
