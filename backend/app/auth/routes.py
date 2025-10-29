from fastapi import APIRouter, Response, HTTPException
from .security import create_token, verify_password
from ..config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login(body: dict, res: Response):
    username = body.get("username", "")
    password = body.get("password", "")
    if username != settings.OWNER_USERNAME or not settings.OWNER_PASSWORD_HASH:
        raise HTTPException(401, "Invalid credentials")
    if not verify_password(password, settings.OWNER_PASSWORD_HASH):
        raise HTTPException(401, "Invalid credentials")
    token = create_token("owner")
    res.set_cookie("jwt", token, httponly=True, samesite="lax")
    return {"ok": True}

@router.post("/logout")
def logout(res: Response):
    res.delete_cookie("jwt")
    return {"ok": True}

@router.get("/me")
def me():
    return {"role": "owner"}
