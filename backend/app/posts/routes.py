from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..db import SessionLocal
from .models import Post, Status, PostType
from .schemas import PostIn, PostOut
from ..auth.security import get_current_owner
from datetime import datetime

router = APIRouter(prefix="/posts", tags=["posts"])

def get_db():
    with SessionLocal() as s:
        yield s

# Public list (only published)
@router.get("")
def list_posts(type: PostType | None = None, tag: str | None = None, limit: int = 20, offset: int = 0, db: Session = Depends(get_db)):
    stmt = select(Post).where(Post.status == Status.published)
    if type: stmt = stmt.where(Post.type == type)
    if tag:  stmt = stmt.where(Post.tags_csv.like(f"%{tag}%"))
    rows = db.execute(stmt.order_by(Post.published_at.desc().nullslast()).limit(limit).offset(offset)).scalars().all()
    return [row.__dict__ for row in rows]

# Public detail by slug (drafts hidden)
@router.get("/{slug}")
def get_post(slug: str, db: Session = Depends(get_db)):
    row = db.execute(select(Post).where(Post.slug == slug)).scalar_one_or_none()
    if not row or row.status != Status.published:
        raise HTTPException(404, "Not found")
    return row.__dict__

# Admin create/update/delete
@router.post("", dependencies=[Depends(get_current_owner)])
def create_post(payload: PostIn, db: Session = Depends(get_db)):
    exists = db.execute(select(Post).where(Post.slug == payload.slug)).scalar_one_or_none()
    if exists: raise HTTPException(409, "Slug exists")
    row = Post(
        **payload.model_dump(exclude={"tags"}),
        tags_csv=",".join(payload.tags) if payload.tags else None,
        updated_at=datetime.utcnow(),
    )
    db.add(row); db.commit(); db.refresh(row)
    return row.__dict__

@router.patch("/{id}", dependencies=[Depends(get_current_owner)])
def update_post(id: str, payload: dict, db: Session = Depends(get_db)):
    row = db.get(Post, id)
    if not row: raise HTTPException(404, "Not found")
    for k,v in payload.items():
        if k == "tags": setattr(row, "tags_csv", ",".join(v))
        elif hasattr(row, k): setattr(row, k, v)
    row.updated_at = datetime.utcnow()
    db.commit(); db.refresh(row)
    return row.__dict__

@router.delete("/{id}", dependencies=[Depends(get_current_owner)])
def delete_post(id: str, db: Session = Depends(get_db)):
    row = db.get(Post, id)
    if not row: raise HTTPException(404, "Not found")
    db.delete(row); db.commit()
    return {"ok": True}
