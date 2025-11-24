from sqlalchemy.orm import Session
from datetime import datetime
from pathlib import Path
import sys
import uuid

# Allow running as a script (python seed.py) by adding project root to sys.path
CURRENT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = CURRENT_DIR.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.append(str(PROJECT_ROOT))

from app.db import Base, engine, SessionLocal
from app.posts.models import Post, PostType, Status

def generate_slug(title: str) -> str:
    return title.lower().replace(" ", "-").replace("/", "-")


def seed_posts(db: Session):
    """Seed initial posts into the database."""
    sample_posts = [
        {
            "type": PostType.article,
            "title": "Welcome to My Blog",
            "summary": "This is your first article!",
            "content_md": "# Hello World\nThis is your first markdown article.",
            "tags_csv": "intro,hello,blog",
            "status": Status.published,
        },
        {
            "type": PostType.project,
            "title": "My First Project",
            "summary": "A showcase of your first project.",
            "content_md": "# Project Overview\nHere is the markdown content.",
            "tags_csv": "project,portfolio,first",
            "status": Status.published,
        },
    ]

    for post in sample_posts:
        new_post = Post(
            id=str(uuid.uuid4()),
            type=post["type"],
            title=post["title"],
            slug=generate_slug(post["title"]),
            summary=post["summary"],
            content_md=post["content_md"],
            tags_csv=post["tags_csv"],
            status=post["status"],
            published_at=datetime.utcnow(),
        )
        db.add(new_post)

    db.commit()
    print("Database seeded successfully!")


def main():
    print("Dropping all tables for a clean seed...")
    Base.metadata.drop_all(bind=engine)

    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        seed_posts(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()
