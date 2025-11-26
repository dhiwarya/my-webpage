# Testing the API Integration

## Prerequisites

1. **Backend is running**
   ```bash
   cd backend
   source env/bin/activate
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Database has seed data**
   ```bash
   cd backend/app
   python seed.py
   ```

3. **Frontend environment is configured**
   - `.env` file exists with `VITE_API_URL=http://localhost:8000`

## Running the Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the homepage.

## What to Expect

1. **Hero Section**: Welcome greeting
2. **About Section**: Personal info and current work
3. **Timeline**: Experience journey
4. **Recent Content**: 
   - Latest article (fetched from backend)
   - Latest project (fetched from backend)
   - Shows loading state while fetching
   - Shows "No articles yet" or "No projects yet" if none exist

## API Endpoints Being Used

The homepage calls these endpoints:

- `GET /posts?type=article&limit=1` - Gets latest article
- `GET /posts?type=project&limit=1` - Gets latest project

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
- Check that backend is running on port 8000
- Verify `CORS_ORIGINS` in backend includes `http://localhost:5173`
- Restart the backend after changing CORS settings

### No Data Showing
If "No articles yet" or "No projects yet" appears:
- Run the seed script: `cd backend/app && python seed.py`
- Check posts exist: `http://localhost:8000/posts`

### API Connection Failed
- Verify `VITE_API_URL` in `.env` is correct
- Check backend is running: `http://localhost:8000/`
- Restart frontend dev server after changing `.env`

### TypeScript Errors
- Run `npm install` to ensure all dependencies are installed
- Check that all imports are correct

## Testing the API Client Manually

You can test the API client in the browser console:

```javascript
import { postsApi } from './src/lib/api';

// Get all posts
const posts = await postsApi.getAll();
console.log(posts);

// Get posts by type
const articles = await postsApi.getAll({ type: 'article' });
const projects = await postsApi.getAll({ type: 'project' });

// Get post by slug
const post = await postsApi.getBySlug('your-slug-here');
```
