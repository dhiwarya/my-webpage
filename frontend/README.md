# Frontend - Personal Website

A modern React + TypeScript + Vite frontend application for a personal website with blog and project showcase.

## Features

- **React 19** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS v4** for styling
- **Radix UI** components for accessible UI
- **Lucide React** for icons
- **API Integration** with FastAPI backend
- **Admin Panel** with authentication for content management
- **Markdown Support** for blog posts and projects

## Project Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Timeline.tsx
│   │   ├── RecentContent.tsx
│   │   ├── Footer.tsx
│   │   ├── LoginPage.tsx      # Admin login
│   │   ├── AdminDashboard.tsx # Admin panel
│   │   ├── PostForm.tsx       # Create/edit posts
│   │   └── ui/          # Reusable UI components
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx    # Authentication state
│   ├── hooks/           # Custom React hooks
│   │   └── usePosts.ts  # Hook for fetching posts
│   ├── lib/             # Utilities and API
│   │   ├── api.ts       # API client
│   │   ├── helpers.ts   # Helper functions
│   │   └── utils.ts     # Utility functions
│   ├── App.tsx          # Main application
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── .env.example         # Example environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file (or copy from `.env.example`):

```env
VITE_API_URL=http://localhost:8000
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

The frontend connects to the FastAPI backend using a custom API layer located in `src/lib/api.ts`.

### API Client

The API client provides the following functionality:

#### Posts API
- `postsApi.getAll(options?)` - Get all published posts
- `postsApi.getBySlug(slug)` - Get a specific post by slug
- `postsApi.create(data)` - Create a new post (requires auth)
- `postsApi.update(id, data)` - Update a post (requires auth)
- `postsApi.delete(id)` - Delete a post (requires auth)

#### Auth API
- `authApi.login(credentials)` - Login and get JWT token
- `authApi.logout()` - Logout
- `authApi.me()` - Get current user info

### Custom Hooks

The application uses custom React hooks for data fetching:

#### `usePosts(options?)`
Fetch multiple posts with optional filters:
```tsx
const { posts, loading, error } = usePosts({ 
  type: 'article', 
  limit: 10 
});
```

#### `usePost(slug)`
Fetch a single post by slug:
```tsx
const { post, loading, error } = usePost('my-post-slug');
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Components

### Hero
Welcome section with greeting and introduction.

### About
Personal information and current activities.

### Timeline
Visual timeline of experience journey.

### RecentContent
Displays the latest blog article and project (fetched from API).

### Footer
Simple footer with copyright information.

### Admin Components

#### LoginPage
Secure login form for admin authentication.

#### AdminDashboard
Main admin interface with quick stats and actions.

#### PostForm
Comprehensive form for creating articles and projects with:
- Markdown content editor
- Tag management
- Auto-slug generation
- Draft/publish status
- Cover image URL

## Admin System

### Accessing Admin Panel

1. Navigate to `http://localhost:5173/#login`
2. Login with credentials (username: `dhiwa`, password from backend config)
3. Create and manage posts from the admin dashboard

### Features

- **Authentication**: JWT token-based with cookie storage
- **Post Creation**: Create articles and projects with markdown
- **Tag Management**: Add and remove tags dynamically
- **Status Control**: Save as draft or publish immediately
- **Auto-slug**: Automatic URL-friendly slug generation

See [ADMIN_GUIDE.md](../../ADMIN_GUIDE.md) for detailed instructions.

## Backend Requirements

The frontend expects the backend API to be running on `http://localhost:8000` (configurable via `.env`).

Make sure the backend:
1. Is running (see backend README)
2. Has CORS enabled for `http://localhost:5173`
3. Has some sample data (run `python app/seed.py`)

## Type Safety

All API responses are typed using TypeScript interfaces defined in `src/lib/api.ts`:
- `Post` - Blog post or project
- `CreatePostData` - Data for creating/updating posts
- `LoginData` - Login credentials
- `ApiError` - Error response structure

## Styling

The application uses Tailwind CSS v4 with a custom theme defined in `src/index.css`. The theme includes:
- CSS variables for colors
- Dark mode support
- Custom radius values
- Responsive utilities

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
