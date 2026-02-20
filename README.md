# SorooshX CodeFi

Full-stack web application featuring a modern landing page with an integrated blog and admin dashboard for content management.

## Overview

**Frontend** — Next.js 16 landing page with blog pages and an admin panel for managing content.  
**Backend** — Django REST API with JWT authentication, PostgreSQL database, and image processing.

## Architecture

```
┌─────────────────────┐       ┌─────────────────────┐
│   Next.js Frontend  │ ───── │   Django Backend     │
│   (Port 3000)       │  API  │   (Port 8000)        │
│                     │       │                      │
│ • Landing page      │       │ • REST API           │
│ • Blog pages        │       │ • JWT Auth           │
│ • Admin dashboard   │       │ • Image processing   │
│ • Blog CRUD UI      │       │ • Blog CRUD          │
└─────────────────────┘       └──────────┬───────────┘
                                         │
                              ┌──────────┴───────────┐
                              │     PostgreSQL        │
                              │   (soroosh_codefi)    │
                              └──────────────────────┘
```

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.12+
- PostgreSQL 14+

### 1. Clone the repository

```bash
git clone <repository-url>
cd sorooshx-codefi
```

### 2. Set up the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
createdb soroosh_codefi
python manage.py migrate
python manage.py runserver
```

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app

- **Landing page:** http://localhost:3000
- **Admin panel:** http://localhost:3000/admin
- **API:** http://localhost:8000/api/

**Admin credentials:** `sorooshx` / `sorooshx`

## Project Structure

```
sorooshx-codefi/
├── frontend/           # Next.js application
│   ├── app/            # Pages & routes
│   ├── components/     # UI components
│   ├── lib/            # API client
│   └── data/           # Static fallback data
├── backend/            # Django application
│   ├── blog/           # Blog API app
│   ├── auth_api/       # Authentication app
│   └── soroosh_codefi/ # Django config
└── README.md
```

See [frontend/README.md](frontend/README.md) and [backend/README.md](backend/README.md) for detailed documentation.

## Features

### Landing Page
- Responsive design with dark theme
- Hero, About, Services, Projects, FAQ, and CTA sections
- Smooth animations with Framer Motion
- Blog listing with API integration and static fallback

### Admin Dashboard
- Secure JWT authentication
- Dashboard overview with content statistics
- Full blog CRUD — create, edit, delete, search, paginate
- Image upload with drag-and-drop and preview
- Category management
- Published/draft toggle
- Responsive sidebar navigation

### Backend API
- RESTful API with Django REST Framework
- Blog & Category models with auto-slug generation
- Image auto-resize to 1200×675 (16:9, JPEG 85%)
- Search, filtering, ordering, and pagination
- JWT token authentication (24h expiry)
- CORS configuration for local development

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, Framer Motion, TypeScript |
| Backend | Django 6.0, Django REST Framework 3.16, PyJWT, Pillow |
| Database | PostgreSQL 14+ |
| Auth | JWT (Bearer token) |

## License

This project is private.
