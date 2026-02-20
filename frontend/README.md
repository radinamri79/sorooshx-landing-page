# SorooshX CodeFi — Frontend (Next.js)

Modern landing page and admin dashboard built with Next.js 16, React 19, and Tailwind CSS 4.

## Tech Stack

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Animations
- **TypeScript** — Type safety

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start development server

```bash
npm run dev
```

App runs at **http://localhost:3000**

### 3. Build for production

```bash
npm run build
npm start
```

## Design System

| Token | Value |
|---|---|
| Background | `#000000` (black) |
| Accent | `#00FF77` (neon green) |
| Text | `#FFFFFF` / `#A1A1AA` |
| Heading font | Manrope |
| Body font | IBM Plex Mono |
| Blog card blue | `#2563EB` |
| Blog card orange | `#F97316` |

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx                  # Root layout (fonts, metadata)
│   ├── globals.css                 # Global styles
│   ├── (public)/                   # Public-facing pages
│   │   ├── layout.tsx              # Header + Footer shell
│   │   ├── page.tsx                # Landing page
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing
│   │   │   └── [slug]/page.tsx     # Blog detail
│   │   └── projects/
│   │       └── [slug]/page.tsx     # Project detail
│   └── admin/                      # Admin panel
│       ├── page.tsx                # Auth redirect
│       ├── login/page.tsx          # Login form
│       └── dashboard/
│           ├── layout.tsx          # Sidebar navigation
│           ├── page.tsx            # Dashboard overview
│           └── blogs/
│               ├── page.tsx        # Blog list (CRUD)
│               ├── create/page.tsx # Create blog
│               └── [id]/edit/page.tsx # Edit blog
├── components/
│   ├── Hero.tsx                    # Hero section
│   ├── About.tsx                   # About section
│   ├── Services.tsx                # Services section
│   ├── Projects.tsx                # Projects section
│   ├── ProjectGallery.tsx          # Project gallery
│   ├── CTA.tsx                     # Call to action
│   ├── FAQ.tsx                     # FAQ section
│   ├── Header.tsx                  # Site header
│   ├── Footer.tsx                  # Site footer
│   ├── AppShell.tsx                # Header + Footer wrapper
│   └── BlogForm.tsx                # Shared blog create/edit form
├── data/
│   ├── blogPosts.ts                # Static blog data (fallback)
│   └── projects.ts                 # Static project data
├── lib/
│   └── api.ts                      # Django API client
└── public/                         # Static assets
```

## Routes

### Public

| Route | Description |
|---|---|
| `/` | Landing page |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog detail |
| `/projects/[slug]` | Project detail |

### Admin

| Route | Description |
|---|---|
| `/admin` | Auth redirect |
| `/admin/login` | Login page |
| `/admin/dashboard` | Dashboard overview |
| `/admin/dashboard/blogs` | Blog management |
| `/admin/dashboard/blogs/create` | Create new blog |
| `/admin/dashboard/blogs/[id]/edit` | Edit existing blog |

## API Integration

The frontend connects to the Django backend API at `http://localhost:8000`.

- **Public blog pages** fetch from the API and fall back to static data if unavailable
- **Admin panel** requires authentication and performs full CRUD via the API
- Token is stored in `localStorage` and sent as `Authorization: Bearer <token>`

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
