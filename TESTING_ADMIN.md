# Testing the Admin System

## Step-by-Step Test

### 1. Verify Backend is Running

```bash
curl http://localhost:8000/
```

Expected: `{"Hello":"World"}`

### 2. Check if Posts Endpoint Works

```bash
curl http://localhost:8000/posts
```

Expected: JSON array of posts (might be empty if not seeded)

### 3. Seed Database (if empty)

```bash
cd backend/app
python seed.py
```

Expected: Output showing created posts

### 4. Verify Posts After Seeding

```bash
curl http://localhost:8000/posts
```

Expected: JSON array with sample articles and projects

### 5. Test Frontend Homepage

Open browser: `http://localhost:5173`

Expected to see:
- Hero section with "Dhiwa Kusumah"
- About section
- Timeline
- Recent Work (should show latest article and project)

### 6. Test Admin Login

1. Navigate to: `http://localhost:5173/#login`
2. Enter credentials:
   - Username: `dhiwa`
   - Password: (your configured password)
3. Click "Sign In"

Expected: Redirect to `http://localhost:5173/#admin`

### 7. Test Creating a Post

From Admin Dashboard:

1. Click "Create New Post"
2. Fill in the form:
   - Type: Article
   - Title: "Test Article"
   - Summary: "This is a test"
   - Content: "# Hello\n\nThis is test content"
   - Tags: Add "test"
   - Status: Published
3. Click "Create Post"

Expected: Success message and redirect to dashboard

### 8. Verify New Post on Homepage

1. Navigate back to: `http://localhost:5173`
2. Scroll to "Recent Work" section

Expected: Your new test article appears in "Latest Article"

### 9. Test Logout

From Admin Dashboard:
1. Click "Logout" button

Expected: Redirect to homepage

### 10. Verify Protected Route

1. Try to access: `http://localhost:5173/#admin`

Expected: Automatic redirect to login page

## Common Issues and Solutions

### Issue: Cannot login

**Solution:**
```bash
# Check backend logs for errors
# Verify password hash in backend/app/config.py
# Try creating a new hash:
cd backend
source env/bin/activate
python -c "from passlib.context import CryptContext; pwd_context = CryptContext(schemes=['bcrypt']); print(pwd_context.hash('yourpassword'))"
```

### Issue: CORS error in browser

**Solution:**
```python
# In backend/app/config.py, ensure:
CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5173"]
```

Then restart backend.

### Issue: Post not showing on homepage

**Checklist:**
- [ ] Post status is "published" (not draft)
- [ ] Backend is returning posts: `curl http://localhost:8000/posts`
- [ ] Frontend has correct API URL in `.env`
- [ ] No console errors in browser DevTools

### Issue: "Slug exists" error

**Solution:**
- Use a different slug (must be unique)
- Or delete the existing post with that slug via API

## Manual API Testing

### Test Login Endpoint

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "dhiwa", "password": "yourpassword"}' \
  -c cookies.txt
```

### Test Create Post (with auth)

```bash
curl -X POST http://localhost:8000/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "type": "article",
    "title": "API Test Post",
    "slug": "api-test-post",
    "summary": "Testing via curl",
    "content_md": "# Test\n\nThis was created via API",
    "tags": ["test", "api"],
    "status": "published",
    "published_at": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"
  }'
```

### Test Logout

```bash
curl -X POST http://localhost:8000/auth/logout \
  -b cookies.txt \
  -c cookies.txt
```

## Browser DevTools Debugging

### Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Try creating a post
4. Look for:
   - `POST /posts` request
   - Status code (should be 200)
   - Response body

### Check Console for Errors

1. Open DevTools (F12)
2. Go to Console tab
3. Look for:
   - Red error messages
   - Failed fetch requests
   - Authentication issues

### Check Application Storage

1. Open DevTools (F12)
2. Go to Application tab
3. Check Cookies:
   - Should see `jwt` cookie after login
   - Domain should be `localhost`

## Success Criteria

✅ All tests pass
✅ Can login as admin
✅ Can create articles and projects
✅ New posts appear on homepage
✅ Can logout successfully
✅ Protected routes redirect to login
✅ No console errors
✅ API calls succeed with proper auth

## Performance Check

### Backend Response Time

```bash
time curl http://localhost:8000/posts
```

Should be < 100ms

### Frontend Load Time

Check Network tab in DevTools:
- Initial load < 2s
- API calls < 500ms

## Next Steps After Testing

1. Create your real content
2. Update personal information in components
3. Add your own projects and articles
4. Customize styling and colors
5. Deploy to production!
