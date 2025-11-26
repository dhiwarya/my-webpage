# System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                    (React + TypeScript)                      │
│                   http://localhost:5173                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Homepage   │  │  Admin Login │  │    Admin     │     │
│  │              │  │              │  │  Dashboard   │     │
│  │  - Hero      │  │  - Auth Form │  │  - PostForm  │     │
│  │  - About     │  │              │  │  - Stats     │     │
│  │  - Timeline  │  │              │  │              │     │
│  │  - Recent    │  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│         │                   │                   │            │
│         └───────────────────┴───────────────────┘            │
│                             │                                │
│                    ┌────────▼────────┐                      │
│                    │   API Client    │                      │
│                    │   (lib/api.ts)  │                      │
│                    └────────┬────────┘                      │
└─────────────────────────────┼───────────────────────────────┘
                              │
                              │ HTTP/HTTPS + Cookies
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                          Backend                             │
│                    (FastAPI + Python)                        │
│                   http://localhost:8000                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                     Routes                           │   │
│  │                                                      │   │
│  │  ┌──────────────┐         ┌──────────────┐        │   │
│  │  │  Auth Routes │         │  Post Routes │        │   │
│  │  │              │         │              │        │   │
│  │  │  POST /login │         │  GET  /posts │        │   │
│  │  │  POST /logout│         │  GET  /posts/│        │   │
│  │  │  GET  /me    │         │  POST /posts │  🔒   │   │
│  │  │              │         │  PATCH/posts │  🔒   │   │
│  │  │              │         │  DELETE/posts│  🔒   │   │
│  │  └──────────────┘         └──────────────┘        │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                               │
│                    ┌─────────▼─────────┐                    │
│                    │    Middleware     │                    │
│                    │  - CORS           │                    │
│                    │  - JWT Auth       │                    │
│                    └─────────┬─────────┘                    │
│                              │                               │
│                    ┌─────────▼─────────┐                    │
│                    │   SQLAlchemy ORM  │                    │
│                    └─────────┬─────────┘                    │
└──────────────────────────────┼───────────────────────────────┘
                               │
                               │ SQL Queries
                               │
┌──────────────────────────────▼───────────────────────────────┐
│                        PostgreSQL                             │
│                   localhost:5432/appdb                        │
│                                                              │
│  ┌──────────────┐                                           │
│  │    posts     │                                           │
│  ├──────────────┤                                           │
│  │ id           │ (UUID, PK)                                │
│  │ type         │ (article/project)                         │
│  │ title        │                                           │
│  │ slug         │ (unique)                                  │
│  │ summary      │                                           │
│  │ content_md   │                                           │
│  │ cover_image  │                                           │
│  │ tags_csv     │                                           │
│  │ status       │ (draft/published)                         │
│  │ published_at │                                           │
│  │ created_at   │                                           │
│  │ updated_at   │                                           │
│  └──────────────┘                                           │
└───────────────────────────────────────────────────────────────┘
```

## Data Flow

### Public View (Homepage)

```
User Browser
    │
    │ 1. Visit http://localhost:5173
    │
    ▼
React App Loads
    │
    │ 2. usePosts() hook calls API
    │
    ▼
GET /posts?type=article&limit=1
GET /posts?type=project&limit=1
    │
    │ 3. FastAPI processes request
    │
    ▼
Database Query
SELECT * FROM posts 
WHERE status = 'published'
AND type = 'article'
ORDER BY published_at DESC
LIMIT 1
    │
    │ 4. Returns JSON
    │
    ▼
Frontend Renders
- Latest article
- Latest project
```

### Admin Login Flow

```
User visits /#login
    │
    │ 1. Enter credentials
    │
    ▼
POST /auth/login
{
  "username": "dhiwa",
  "password": "secret"
}
    │
    │ 2. Backend validates
    │
    ▼
Password Hash Check
    │
    │ 3. If valid, create JWT
    │
    ▼
Set HTTP-only Cookie
jwt=eyJhbGc...
    │
    │ 4. Return success
    │
    ▼
AuthContext updates
isAuthenticated = true
    │
    │ 5. Redirect to /#admin
    │
    ▼
Admin Dashboard
```

### Creating a Post

```
User fills PostForm
    │
    │ 1. Submit form data
    │
    ▼
POST /posts
Headers: Cookie: jwt=...
Body: {
  "type": "article",
  "title": "My Post",
  "slug": "my-post",
  "content_md": "...",
  "tags": ["tech"],
  "status": "published"
}
    │
    │ 2. JWT middleware validates
    │
    ▼
Check JWT Token
    │
    │ 3. If valid, proceed
    │
    ▼
Validate Post Data
- Check slug uniqueness
- Validate required fields
    │
    │ 4. Insert to database
    │
    ▼
INSERT INTO posts (...)
VALUES (...)
    │
    │ 5. Return created post
    │
    ▼
Success Message
Form Resets
    │
    │ 6. User can view on homepage
    │
    ▼
New post appears in
"Recent Work" section
```

## Authentication Flow

```
┌──────────────┐
│ User Actions │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────┐
│           Is Authenticated?               │
│  (Check JWT cookie via AuthContext)      │
└──────┬──────────────────────┬────────────┘
       │                      │
       │ No                   │ Yes
       │                      │
       ▼                      ▼
┌────────────┐         ┌─────────────┐
│ Redirect   │         │   Allow     │
│ to Login   │         │   Access    │
└────────────┘         └─────────────┘
       │                      │
       ▼                      │
┌────────────┐                │
│  Login     │                │
│  Page      │                │
└──────┬─────┘                │
       │                      │
       │ Enter credentials    │
       │                      │
       ▼                      │
┌────────────────┐            │
│ POST /auth/login│           │
└──────┬──────────┘           │
       │                      │
       │ Success              │
       │                      │
       ▼                      │
┌──────────────────┐          │
│ Set JWT Cookie   │          │
│ isAuthenticated=│          │
│      true        │          │
└──────┬───────────┘          │
       │                      │
       └──────────────────────┘
                │
                ▼
         ┌─────────────┐
         │   Admin     │
         │  Dashboard  │
         └─────────────┘
```

## Component Hierarchy

```
App (AuthProvider)
├── AppContent
    ├── Homepage (default route)
    │   ├── Navigation
    │   ├── Hero
    │   ├── About
    │   ├── Timeline
    │   ├── RecentContent (uses usePosts hook)
    │   └── Footer
    │
    ├── LoginPage (#login route)
    │   └── Card
    │       ├── Input (username)
    │       ├── Input (password)
    │       └── Button (submit)
    │
    └── AdminDashboard (#admin route, auth required)
        ├── Header
        │   └── Logout Button
        ├── Dashboard View
        │   ├── Stats Cards
        │   └── Create Post Button
        └── PostForm (when creating)
            ├── Type Select
            ├── Title Input
            ├── Slug Input
            ├── Summary Textarea
            ├── Content Textarea (markdown)
            ├── Cover Image Input
            ├── Tags Management
            ├── Status Select
            └── Submit Button
```

## State Management

```
┌─────────────────────────────────────┐
│         Global State                │
│        (AuthContext)                │
│                                     │
│  - isAuthenticated: boolean         │
│  - isLoading: boolean               │
│  - login(username, password)        │
│  - logout()                         │
└─────────────────────────────────────┘
              │
              │ Provides to all children
              │
┌─────────────▼─────────────────────────┐
│          Component State              │
└───────────────────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
┌─────────┐      ┌────────────┐
│ usePosts│      │ PostForm   │
│         │      │            │
│ - posts │      │ - formData │
│ - loading│     │ - loading  │
│ - error │      │ - error    │
└─────────┘      └────────────┘
```

## Security Layers

```
1. Frontend Route Protection
   ↓ Check isAuthenticated before rendering admin routes
   
2. HTTP-only Cookie
   ↓ JWT stored securely, not accessible to JavaScript
   
3. Backend Middleware
   ↓ Verify JWT on protected endpoints
   
4. Database Constraints
   ↓ Unique slugs, required fields, data validation
```

## API Request/Response Cycle

```
Frontend                Backend                 Database
   │                       │                        │
   │  POST /posts          │                        │
   ├──────────────────────>│                        │
   │  + JWT Cookie         │                        │
   │  + JSON Body          │                        │
   │                       │                        │
   │                       │  Validate JWT          │
   │                       │  ✓ Valid               │
   │                       │                        │
   │                       │  Check slug unique     │
   │                       ├───────────────────────>│
   │                       │                        │
   │                       │<───────────────────────┤
   │                       │  ✓ Slug available      │
   │                       │                        │
   │                       │  INSERT post           │
   │                       ├───────────────────────>│
   │                       │                        │
   │                       │<───────────────────────┤
   │                       │  Return inserted row   │
   │                       │                        │
   │<──────────────────────┤                        │
   │  200 OK               │                        │
   │  { id, title, ... }   │                        │
   │                       │                        │
```

## File System Structure

```
fullstack/
├── backend/                     # Python FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI app & routes
│   │   ├── config.py           # Settings & env vars
│   │   ├── db.py               # Database connection
│   │   ├── seed.py             # Sample data
│   │   ├── auth/               # Authentication module
│   │   │   ├── routes.py       # Login/logout endpoints
│   │   │   └── security.py     # JWT & password utils
│   │   └── posts/              # Posts module
│   │       ├── models.py       # SQLAlchemy models
│   │       ├── routes.py       # CRUD endpoints
│   │       └── schemas.py      # Pydantic schemas
│   ├── env/                    # Python virtual env
│   └── requirements.txt        # Dependencies
│
├── frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── RecentContent.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── PostForm.tsx
│   │   │   └── ui/             # Reusable components
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx # Auth state management
│   │   ├── hooks/
│   │   │   └── usePosts.ts     # Data fetching hook
│   │   ├── lib/
│   │   │   ├── api.ts          # API client
│   │   │   ├── helpers.ts      # Utility functions
│   │   │   └── utils.ts        # More utilities
│   │   ├── App.tsx             # Main app & routing
│   │   ├── main.tsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── .env                    # Environment variables
│   ├── package.json            # Dependencies
│   └── vite.config.ts          # Vite configuration
│
├── docker-compose.yml           # PostgreSQL container
├── QUICKSTART.md               # Quick start guide
├── ADMIN_GUIDE.md              # Admin system docs
├── TESTING_ADMIN.md            # Testing guide
└── ARCHITECTURE.md             # This file
```

## Technology Stack Details

### Frontend Stack
- **React 19**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool & dev server
- **Tailwind CSS v4**: Styling
- **Radix UI**: Accessible components
- **Lucide React**: Icon library

### Backend Stack
- **FastAPI**: Web framework
- **Python 3.13**: Programming language
- **PostgreSQL**: Database
- **SQLAlchemy**: ORM
- **Alembic**: Migrations
- **Pydantic**: Data validation
- **python-jose**: JWT tokens
- **passlib**: Password hashing
- **bcrypt**: Hashing algorithm

### Development Tools
- **Docker**: PostgreSQL container
- **npm**: Frontend package manager
- **pip**: Backend package manager
- **uvicorn**: ASGI server

## Deployment Considerations

### Frontend
- Build: `npm run build` → `dist/` folder
- Deploy to: Vercel, Netlify, Cloudflare Pages
- Set `VITE_API_URL` to production API

### Backend
- ASGI server: uvicorn/gunicorn
- Deploy to: Railway, Render, Fly.io, AWS
- Use environment variables for secrets
- Set up SSL/TLS certificates
- Configure CORS for production domain

### Database
- Production PostgreSQL
- Consider: Supabase, Railway, Neon
- Run migrations with Alembic
- Set up backups
- Use connection pooling
