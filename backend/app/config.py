from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+psycopg://app:app@localhost:5432/appdb"
    JWT_SECRET: str = "dev-replace-me"
    JWT_EXPIRE_MINUTES: int = 60*24*7
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5173"]
    OWNER_USERNAME: str = "dhiwa"   # for local owner login
    OWNER_PASSWORD_HASH: str = "$2b$12$JEAHPMPj5fknocLIFibode6ueJ/JTpg7JxWrCdPo3ERqnAXMz9soa"   # admindhiwa_30

settings = Settings()
