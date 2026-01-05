# Kiến Hưng Investment Website

Vite + React + Tailwind + shadcn-ui site for Kiến Hưng Investment, including an AI chat widget that calls a Supabase Edge Function (which proxies to the Lovable AI gateway). This folder is the project root for Git.

## Tech stack
- React 18, TypeScript, Vite
- Tailwind CSS, shadcn-ui components, framer-motion animations
- Supabase client + Edge Functions (`supabase/functions/openai-chat`)
- Router: `react-router-dom`

## Requirements
- Node.js 18+ and npm
- (Optional) Supabase CLI for running the Edge Function locally
- Env vars (create `.env` or `.env.local`):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - `LOVABLE_API_KEY` (only needed when serving the Edge Function)

## Quick start
```bash
npm install
npm run dev
```

## Run the AI chat function locally
```bash
LOVABLE_API_KEY=your_key supabase functions serve openai-chat --no-verify-jwt
```
The front end calls `supabase.functions.invoke("openai-chat")`. The function lives at `supabase/functions/openai-chat/index.ts` and forwards chat to `https://ai.gateway.lovable.dev/v1/chat/completions` with a Vietnamese system prompt customized for Kiến Hưng Investment.

## Scripts
- `npm run dev` – Vite dev server
- `npm run build` – production build to `dist/`
- `npm run preview` – preview the build
- `npm run lint` – ESLint

## Project structure
- `src/` – app code, components, pages, hooks
- `supabase/functions/openai-chat/` – Edge Function used by the AI chat widget
- `public/` – static assets
- `tailwind.config.ts` – Tailwind + shadcn config

## Deployment
Build with `npm run build` and serve `dist/`, or deploy via Lovable/your static host. Ensure the runtime has the same Supabase env vars and the Edge Function is deployed with `LOVABLE_API_KEY` configured.
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
