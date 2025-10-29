from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal

class PostIn(BaseModel):
    type: Literal["article","project"]
    title: str
    slug: str
    summary: str | None = None
    content_md: str
    cover_image_url: str | None = None
    tags: list[str] = []
    status: Literal["draft","published"] = "draft"
    published_at: datetime | None = None

class PostOut(PostIn):
    id: str
    created_at: datetime
    updated_at: datetime
