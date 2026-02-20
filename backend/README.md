# SorooshX CodeFi — Backend (Django)

REST API backend for managing blog content, built with Django and Django REST Framework.

## Tech Stack

- **Django 6.0** — Web framework
- **Django REST Framework 3.16** — API toolkit
- **PostgreSQL** — Database
- **PyJWT** — JSON Web Token authentication
- **Pillow** — Image processing & auto-resize
- **django-cors-headers** — Cross-Origin Resource Sharing

## Prerequisites

- Python 3.12+
- PostgreSQL 14+
- pip

## Setup

### 1. Create & activate virtual environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Set up PostgreSQL database

```bash
createdb soroosh_codefi
```

### 4. Configure environment variables (optional)

The app works with defaults for local development. For production, set:

| Variable | Default | Description |
|---|---|---|
| `DJANGO_SECRET_KEY` | *(insecure dev key)* | Secret key for signing |
| `DJANGO_DEBUG` | `True` | Debug mode |
| `DJANGO_ALLOWED_HOSTS` | `localhost,127.0.0.1` | Allowed host headers |

Database settings can be configured in `soroosh_codefi/settings.py`.

### 5. Run migrations

```bash
python manage.py migrate
```

### 6. Start development server

```bash
python manage.py runserver
```

Server runs at **http://localhost:8000**

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login/` | Login with credentials |
| `POST` | `/api/auth/verify/` | Verify JWT token |

**Login credentials:** `sorooshx` / `sorooshx`

### Blogs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/blogs/` | No | List all published blogs |
| `GET` | `/api/blogs/{id}/` | No | Get blog by ID |
| `GET` | `/api/blogs/by-slug/{slug}/` | No | Get blog by slug |
| `POST` | `/api/blogs/` | Yes | Create new blog |
| `PUT` | `/api/blogs/{id}/` | Yes | Update blog |
| `PATCH` | `/api/blogs/{id}/` | Yes | Partial update blog |
| `DELETE` | `/api/blogs/{id}/` | Yes | Delete blog |

**Query parameters:**

- `search` — Search by title, author, content, category
- `category` — Filter by category slug
- `published` — Filter by published status (`true`/`false`)
- `ordering` — Sort by `created_at` or `title` (prefix `-` for descending)
- `page` — Page number
- `page_size` — Items per page (default: 8)

### Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/categories/` | No | List all categories |
| `POST` | `/api/categories/` | Yes | Create category |

## Project Structure

```
backend/
├── manage.py
├── requirements.txt
├── soroosh_codefi/          # Django project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── blog/                    # Blog app
│   ├── models.py            # Blog & Category models
│   ├── serializers.py       # DRF serializers
│   ├── views.py             # API viewsets
│   ├── urls.py              # Router configuration
│   └── admin.py             # Django admin registration
├── auth_api/                # Authentication app
│   ├── views.py             # Login & verify endpoints
│   ├── jwt_utils.py         # JWT token utilities
│   ├── permissions.py       # Custom DRF permissions
│   └── urls.py              # Auth URL patterns
└── media/                   # Uploaded images (gitignored)
    └── blog_images/
```

## Image Handling

Blog images are automatically processed on upload:

- **Max dimensions:** 1200×675px (16:9 ratio)
- **Format:** JPEG
- **Quality:** 85%
- **Storage:** `media/blog_images/`

## Authentication Flow

1. Client sends `POST /api/auth/login/` with `{ "username": "...", "password": "..." }`
2. Server validates credentials and returns a JWT token (24h expiry)
3. Client includes token in subsequent requests: `Authorization: Bearer <token>`
4. Protected endpoints verify the token via `IsAdminAuthenticated` permission class
