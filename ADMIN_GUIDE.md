# Admin System Guide

## Overview

The admin system allows authenticated users to create and manage blog articles and projects through a web interface.

## Features

- **Authentication**: Secure login with JWT token-based authentication
- **Post Creation**: Create articles and projects with markdown support
- **Tag Management**: Add multiple tags to posts
- **Draft/Publish**: Save posts as drafts or publish immediately
- **Auto-slug Generation**: Automatic URL-friendly slug generation from titles

## Accessing the Admin Panel

### 1. Navigate to Admin Login

Visit: `http://localhost:5173/#login`

Or click "Admin" in the navigation menu.

### 2. Login Credentials

Default credentials (as configured in backend):
- **Username**: `dhiwa`
- **Password**: (the password used to generate the hash in `backend/app/config.py`)

### 3. Admin Dashboard

After successful login, you'll be redirected to the admin dashboard at `http://localhost:5173/#admin`

## Creating a Post

### Step 1: Access Post Form

From the admin dashboard, click "Create New Post" button.

### Step 2: Fill in Post Details

1. **Type**: Select "Article" or "Project"
2. **Title**: Enter the post title (slug will auto-generate)
3. **Slug**: URL-friendly identifier (editable)
4. **Summary**: Brief description of the post
5. **Content**: Write your content in Markdown format
6. **Cover Image URL**: Optional image URL
7. **Tags**: Add relevant tags (press Enter or click Add)
8. **Status**: Choose "Draft" or "Published"

### Step 3: Submit

Click "Create Post" to save. You'll see a success message.

## Markdown Content Examples

### Headings
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

### Lists
```markdown
- Item 1
- Item 2
  - Nested item

1. First
2. Second
```

### Code Blocks
```markdown
\`\`\`python
def hello():
    print("Hello World")
\`\`\`
```

### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](https://example.com/image.jpg)
```

## Post Types

### Articles
- Blog posts
- Tutorials
- Technical writing
- Personal reflections

### Projects
- Portfolio pieces
- Open source projects
- Case studies
- Side projects

## Tag Best Practices

- Use lowercase for consistency
- Keep tags short and descriptive
- Common tags: `python`, `react`, `typescript`, `fastapi`, `tutorial`, `devops`
- Reuse existing tags when possible

## Status Types

### Draft
- Not visible on public homepage
- Can be edited and published later
- Useful for work-in-progress content

### Published
- Visible on homepage
- Automatically gets `published_at` timestamp
- Appears in "Recent Work" section

## Security Notes

1. **Authentication Required**: All admin routes require login
2. **JWT Token**: Session maintained via HTTP-only cookie
3. **Automatic Logout**: Token expires after configured time
4. **CORS Protected**: API only accepts requests from allowed origins

## Troubleshooting

### Cannot Login
- Verify backend is running on port 8000
- Check credentials in `backend/app/config.py`
- Ensure CORS includes frontend URL

### "Slug exists" Error
- The slug must be unique across all posts
- Try a different slug or append a number

### Post Not Showing on Homepage
- Check status is set to "Published"
- Verify post type matches (article/project)
- Refresh the homepage

### Authentication Expired
- Session token has expired
- Simply login again via `/#login`

## API Endpoints Used

### Authentication
- `POST /auth/login` - Login with credentials
- `POST /auth/logout` - Logout
- `GET /auth/me` - Check authentication status

### Posts
- `GET /posts` - List all published posts
- `GET /posts/{slug}` - Get specific post
- `POST /posts` - Create new post (requires auth)
- `PATCH /posts/{id}` - Update post (requires auth)
- `DELETE /posts/{id}` - Delete post (requires auth)

## Future Enhancements

Potential features to add:
- Post listing and editing interface
- Image upload functionality
- Markdown preview
- Post analytics
- Category management
- Multiple admin users
- Rich text editor option
