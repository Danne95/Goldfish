# Goldfish Day Manager

A personal day-to-day manager built with React, Vite, React Router, Tailwind CSS, Zustand, and Supabase.

## Stack

- React + Vite
- React Router v6
- Tailwind CSS with class-based dark mode, dark by default
- Zustand stores for theme and auth session
- Supabase Auth, PostgreSQL, and Row Level Security
- Vercel-ready static frontend
- PWA placeholders: `public/manifest.webmanifest` and `public/sw.js` without service worker registration

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. In Supabase SQL Editor, run:

```bash
supabase/schema.sql
```

4. Start the dev server:

```bash
npm run dev
```

## Supabase Auth

Enable Google OAuth in Supabase Authentication providers, then add these redirect URLs:

- Local: `http://localhost:5173`
- Production: your Vercel domain

## Architecture Notes

- Pages and components do not import `supabaseClient`; all Supabase calls live in `src/services`.
- Hooks in `src/hooks` own loading, error, refresh, and mutation state.
- `Modal` and `Card` are compound components.
- Task sorting is strategy-based through `src/utils/taskUtils.js`.
- Theme and authenticated session are single sources of truth in Zustand stores.
