# Quick Start Guide - Full Stack Personal Website

## 🚀 Getting Started

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Activate virtual environment
source env/bin/activate

# 3. Start the server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`

### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies (if not already done)
npm install

# 3. Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Database Setup

```bash
# Seed the database with sample data
cd backend/app
python seed.py
```

## 📍 Quick Navigation

- **Homepage**: `http://localhost:5173`
- **Admin Login**: `http://localhost:5173/#login`
- **Admin Dashboard**: `http://localhost:5173/#admin`
- **API Docs**: `http://localhost:8000/docs`

## 🔐 Admin Login

**Default Credentials:**
- Username: `dhiwa`
- Password: (from backend config hash)

To create your own password hash:
```python
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
print(pwd_context.hash("your-password"))
```

## 🎯 Main Features

### Public Pages
- ✅ Hero section with greeting
- ✅ About section with current work
- ✅ Experience timeline
- ✅ Recent articles and projects (from API)

### Admin Features
- ✅ Secure login with JWT
- ✅ Create articles and projects
- ✅ Markdown content support
- ✅ Tag management
- ✅ Draft/publish control
- ✅ Auto-slug generation

## 📝 Creating Your First Post

1. **Login**: Go to `http://localhost:5173/#login`
2. **Dashboard**: Click "Create New Post"
3. **Fill Form**:
   - Choose type (Article/Project)
   - Enter title (slug auto-generates)
   - Add summary
   - Write markdown content
   - Add tags
   - Set status (Draft/Published)
4. **Submit**: Click "Create Post"
5. **View**: Check homepage for your new post!

## 🔧 Troubleshooting

### CORS Errors
- Ensure backend `CORS_ORIGINS` includes `http://localhost:5173`
- Restart backend after changing config

### No Data on Homepage
- Run seed script: `cd backend/app && python seed.py`
- Verify posts exist: `http://localhost:8000/posts`

### Cannot Login
- Check backend is running
- Verify credentials in `backend/app/config.py`
- Check browser console for errors

### Changes Not Showing
- Hard refresh: `Cmd/Ctrl + Shift + R`
- Clear browser cache
- Check if post is published (not draft)

## 📚 Documentation

- **[Backend README](backend/README.md)** - Backend setup and API
- **[Frontend README](frontend/README.md)** - Frontend architecture
- **[Admin Guide](ADMIN_GUIDE.md)** - Admin system usage
- **[Integration Testing](INTEGRATION_TESTING.md)** - Testing guide

## 🛠️ Tech Stack

**Backend:**
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy ORM
- JWT Authentication
- Alembic Migrations

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Radix UI Components

## 📦 Project Structure

```
fullstack/
├── backend/
│   ├── app/
│   │   ├── auth/          # Authentication
│   │   ├── posts/         # Posts CRUD
│   │   ├── main.py        # FastAPI app
│   │   ├── config.py      # Settings
│   │   └── seed.py        # Sample data
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # Auth context
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # API & utilities
│   └── package.json
└── docker-compose.yml     # PostgreSQL
```

## 🎨 Customization

### Update Personal Info

Edit these files:
- `frontend/src/components/Hero.tsx` - Name and greeting
- `frontend/src/components/About.tsx` - About section
- `frontend/src/components/Timeline.tsx` - Experience data

### Change Colors/Theme

Edit: `frontend/src/index.css` - CSS variables

### Modify API URL

Edit: `frontend/.env` - Set `VITE_API_URL`

## 🚢 Deployment

### Backend
- Set secure `JWT_SECRET`
- Update `OWNER_PASSWORD_HASH`
- Configure production database
- Set `CORS_ORIGINS` to production domain
- Use environment variables

### Frontend
- Build: `npm run build`
- Deploy `dist/` folder
- Update `VITE_API_URL` for production API

## 📬 API Endpoints

### Public
- `GET /posts` - List published posts
- `GET /posts/{slug}` - Get post by slug

### Admin (Requires Auth)
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /posts` - Create post
- `PATCH /posts/{id}` - Update post
- `DELETE /posts/{id}` - Delete post

## ✨ Next Steps

- [ ] Add post editing functionality
- [ ] Implement post list view in admin
- [ ] Add image upload
- [ ] Create blog and projects pages
- [ ] Add markdown preview
- [ ] Implement search functionality
- [ ] Add comments system
- [ ] Set up CI/CD pipeline
