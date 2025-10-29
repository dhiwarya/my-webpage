from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+psycopg://app:app@localhost:5432/appdb"
    JWT_SECRET: str = "dev-replace-me"
    JWT_EXPIRE_MINUTES: int = 60*24*7
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    OWNER_USERNAME: str = "dhiwa"   # for local owner login
    OWNER_PASSWORD_HASH: str = "$2b$12$Nhm0LmSe4n6IUZcsseo4MeWKl9ayZViYshuYZ5wB13o9HxVCuMIdq"   # fill after hashing (see below)

settings = Settings()
