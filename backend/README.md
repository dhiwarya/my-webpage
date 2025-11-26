# Backend API

A FastAPI-based backend service with PostgreSQL database, JWT authentication, and posts management.

## Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **PostgreSQL Database**: Robust relational database with SQLAlchemy ORM
- **JWT Authentication**: Secure token-based authentication
- **Posts Management**: Support for articles and projects with markdown content
- **CORS Enabled**: Cross-Origin Resource Sharing for frontend integration

## Tech Stack

- **FastAPI** 0.115.2 - Web framework
- **Uvicorn** - ASGI server
- **SQLAlchemy** 2.0.36 - ORM
- **PostgreSQL** - Database (via psycopg)
- **Alembic** - Database migrations
- **Passlib + Bcrypt** - Password hashing
- **Python-JOSE** - JWT token handling
- **Pydantic** - Data validation

## Prerequisites

- Python 3.13+ (or compatible version)
- PostgreSQL 16 (can be run via Docker)
- Docker & Docker Compose (optional, for database)

## Setup Instructions

### 1. Clone the Repository

```bash
cd backend
```

### 2. Create Virtual Environment

```bash
python3 -m venv env
source env/bin/activate  # On macOS/Linux
# or
env\Scripts\activate  # On Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start PostgreSQL Database

You can use Docker Compose from the project root:

```bash
cd ..  # Go to project root
docker-compose up -d
```

This will start PostgreSQL on `localhost:5432` with:
- Database: `appdb`
- User: `app`
- Password: `app`

### 5. Configure Environment Variables (Optional)

The application uses default settings defined in `app/config.py`. You can override these by creating a `.env` file in the `backend` folder:

```env
DATABASE_URL=postgresql+psycopg://app:app@localhost:5432/appdb
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE_MINUTES=10080
CORS_ORIGINS=["http://localhost:3000"]
OWNER_USERNAME=dhiwa
OWNER_PASSWORD_HASH=$2b$12$...
```

### 6. Initialize Database

The database tables will be created automatically when you run the application. Alternatively, you can use Alembic for migrations:

```bash
cd backend
alembic upgrade head
```

### 7. Seed the Database (Optional)

To populate the database with sample data:

```bash
cd app
python seed.py
```

## Running the Application

### Development Mode

From the `backend` folder with the virtual environment activated:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Endpoints

### General
- `GET /` - Health check

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token

### Posts
- `GET /posts` - List all published posts
- `GET /posts/{id}` - Get post by ID
- `POST /posts` - Create new post (requires authentication)
- `PUT /posts/{id}` - Update post (requires authentication)
- `DELETE /posts/{id}` - Delete post (requires authentication)

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI application entry point
│   ├── config.py         # Configuration settings
│   ├── db.py            # Database connection and session
│   ├── seed.py          # Database seeding script
│   ├── auth/
│   │   ├── routes.py    # Authentication endpoints
│   │   └── security.py  # JWT and password utilities
│   └── posts/
│       ├── models.py    # SQLAlchemy models
│       ├── schemas.py   # Pydantic schemas
│       └── routes.py    # Post endpoints
├── env/                 # Virtual environment
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Database Schema

### Users Table
- `id` (UUID) - Primary key
- `username` (String) - Unique username
- `email` (String) - Unique email
- `hashed_password` (String) - Bcrypt hashed password
- `created_at` (DateTime)

### Posts Table
- `id` (UUID) - Primary key
- `type` (Enum) - article or project
- `title` (String)
- `slug` (String) - URL-friendly identifier
- `summary` (String)
- `content_md` (Text) - Markdown content
- `tags_csv` (String) - Comma-separated tags
- `status` (Enum) - draft or published
- `published_at` (DateTime)
- `created_at` (DateTime)
- `updated_at` (DateTime)

## Development

### Running Tests

```bash
pytest
```

### Database Migrations

Create a new migration:
```bash
alembic revision --autogenerate -m "description"
```

Apply migrations:
```bash
alembic upgrade head
```

Rollback:
```bash
alembic downgrade -1
```

### Code Formatting

```bash
black app/
```

## Security Notes

⚠️ **Important**: Before deploying to production:

1. Change `JWT_SECRET` to a strong random value
2. Update `OWNER_PASSWORD_HASH` with a securely hashed password
3. Configure `CORS_ORIGINS` to only include your frontend domain
4. Use environment variables or a secure secrets manager for sensitive data
5. Enable HTTPS
6. Review and update database credentials

## Troubleshooting

### Database Connection Issues

If you can't connect to PostgreSQL:
1. Ensure Docker container is running: `docker ps`
2. Check connection string in `config.py`
3. Verify PostgreSQL is accepting connections on port 5432

### Import Errors

If you get import errors:
1. Ensure virtual environment is activated
2. Verify all dependencies are installed: `pip install -r requirements.txt`
3. Check Python version compatibility

### Port Already in Use

If port 8000 is already in use:
```bash
# Use a different port
uvicorn app.main:app --reload --port 8001
```

## License

[Your License Here]

## Contact

[Your Contact Information]