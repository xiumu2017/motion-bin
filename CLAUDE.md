# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Mood Trash Can (情绪垃圾桶)** - A therapeutic web app where users write down negative emotions, select a destruction animation, and receive AI-generated comforting feedback. Built with Next.js 14, React, TypeScript, Framer Motion, and Tailwind CSS.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

**Important**: This project uses `cross-env` to set temp directories to `.next/temp` for the `dev` and `build` commands to avoid cross-device link errors on Windows (EXDEV).

## Architecture

### Core Flow
1. **Home page** (`src/app/page.tsx`) - User inputs emotion text and selects destruction method
2. **Feedback page** (`src/app/feedback/page.tsx`) - Plays destruction animation, then generates AI feedback
3. **API Route** (`src/app/api/chat/route.ts`) - Server-side streaming endpoint for AI responses

### State Management
- **Zustand store** (`src/store/useAppStore.ts`) with `persist` middleware
- Only `history` (last 5 emotion records) is persisted to localStorage
- Current session state (`currentEmotion`, `destructionMethod`, `feedback`) is ephemeral

### Animation System
All animations in `src/components/animations/` follow a uniform interface:
```typescript
interface AnimationProps {
  content: string;      // The emotion text to display
  onComplete: () => void; // Called when animation finishes (~2-3s)
}
```

Destruction methods: `burn`, `crumple`, `delete`, `shred`, `blackhole`

Each animation component is a client component using Framer Motion with:
- Initial display of emotion text in a styled card
- Animated transformation (e.g., burning effect, crumpling)
- Particle effects for visual impact
- Timed completion callback via `useEffect`

### AI Integration
- **Backend**: Next.js API Route at `/api/chat` streams responses using Alibaba DashScope (OpenAI-compatible API)
- **Model**: `qwen3-max` via DashScope endpoint
- **Client**: `generateFeedback()` in `src/services/aiService.ts` consumes stream via fetch API with ReadableStream
- **Fallback**: If API fails, displays random pre-written comforting message with character-by-character animation

### API Configuration
Requires `DASHSCOPE_API_KEY` environment variable (sk-xxx format). Set in:
- `.env.local` for local development
- Vercel dashboard environment variables for production

The API route forces dynamic rendering (`export const dynamic = 'force-dynamic'`) to ensure server-side execution.

### Path Aliases
Uses `@/*` to resolve to `./src/*` (configured in `tsconfig.json`)

### Styling
- Tailwind CSS with default Next.js configuration
- Custom utility via `src/lib/utils.ts` (clsx + tailwind-merge)
- Global styles in `src/app/globals.css`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Import project in Vercel dashboard
3. Add environment variable: `DASHSCOPE_API_KEY=sk-xxx`
4. Deploy (auto-detected as Next.js)

See `DEPLOY.md` for detailed instructions including Docker deployment and handling domestic China access issues.

### Docker
The project includes cross-env for Windows compatibility. Standard Node.js Docker images work, but use Next.js standalone mode for smaller image sizes.

## Code Patterns

### Client Components
Pages using interactivity (hooks, events) must have `'use client'` directive:
- `src/app/page.tsx` - Uses router, Zustand store
- `src/app/feedback/page.tsx` - Uses state, effects, Zustand
- All animation components - Use Framer Motion

### Server Components
- `src/app/layout.tsx` - Root layout, no client-side logic
- `src/app/api/chat/route.ts` - API route (always server-side)

### Feature Development
When adding new destruction methods:
1. Create animation component in `src/components/animations/`
2. Export from `src/components/animations/index.ts`
3. Add method name to `DestructionMethod` type in `src/types/index.ts`
4. Update `DestructionSelector` options
5. Add conditional rendering in `src/app/feedback/page.tsx`

## Key Dependencies

- **next**: 16.1.1 - App Router architecture
- **framer-motion**: 11.16.0 - Animation library
- **zustand**: 5.0.3 - State management
- **openai**: 4.79.0 - AI SDK (compatible with DashScope)
- **html2canvas**: 1.4.1 - Screenshot export functionality
- **lucide-react**: Icon library

## Migration Notes

This project was recently migrated from Vite to Next.js. Git history shows deleted Vite config files. The architecture transitioned from:
- Vite SPA → Next.js App Router
- Client-side env vars (`VITE_*`) → Server-side env vars (`process.env.*`)
- Express backend (`server.js`) → Next.js API Routes
