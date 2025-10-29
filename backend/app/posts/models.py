from sqlalchemy import String, Text, Enum, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
import enum, uuid
from ..db import Base

class PostType(str, enum.Enum):
    article = "article"
    project = "project"

class Status(str, enum.Enum):
    draft = "draft"
    published = "published"

class Post(Base):
    __tablename__ = "posts"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    type: Mapped[PostType] = mapped_column(Enum(PostType), index=True)
    title: Mapped[str] = mapped_column(String(200))
    slug: Mapped[str] = mapped_column(String(220), unique=True, index=True)
    summary: Mapped[str | None] = mapped_column(Text(), nullable=True)
    content_md: Mapped[str] = mapped_column(Text())
    cover_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    tags_csv: Mapped[str | None] = mapped_column(String(500), nullable=True)  # simple for MVP
    status: Mapped[Status] = mapped_column(Enum(Status), default=Status.draft, index=True)
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
