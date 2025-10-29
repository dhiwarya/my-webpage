from fastapi import Depends, HTTPException, Request
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from ..config import settings

ALGO = "HS256"
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(raw: str) -> str:
    return pwd.hash(raw)

def verify_password(raw: str, hashed: str) -> bool:
    return pwd.verify(raw, hashed)

def create_token(sub: str):
    expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    return jwt.encode({"sub": sub, "exp": expire}, settings.JWT_SECRET, algorithm=ALGO)

def get_current_owner(req: Request):
    token = req.cookies.get("jwt")
    if not token:
        raise HTTPException(401, "Not authenticated")
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[ALGO])
        if payload.get("sub") != "owner":
            raise HTTPException(403, "Forbidden")
        return {"role": "owner"}
    except JWTError:
        raise HTTPException(401, "Invalid token")
