# How to Use On-Demand GitHub Contributions Revalidation

## Setup

### 1. Add Secret Token to .env

Add this line to your `.env` file (create it if it doesn't exist):

```env
REVALIDATE_SECRET=your-secure-random-token-here
```

**Important**: Generate a strong random token. You can use:

```bash
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

### 2. Restart Your Development Server

After adding the token, restart your dev server:

```bash
npm run dev
```

## Usage

### Manual Trigger (After Pushing Commits)

When you push commits to GitHub and want the graph to update immediately, call the revalidation endpoint:

**Using PowerShell:**

```powershell
$token = "your-secure-random-token-here"
Invoke-RestMethod -Uri "http://localhost:3000/api/revalidate/github?token=$token" -Method POST
```

**Using curl:**

```bash
curl -X POST "http://localhost:3000/api/revalidate/github?token=your-secure-random-token-here"
```

**Using browser:**
Simply visit:

```
http://localhost:3000/api/revalidate/github?token=your-secure-random-token-here
```

### Production Usage

For production, use your deployed URL:

```
https://your-domain.com/api/revalidate/github?token=your-token
```

## Automatic Trigger with GitHub Actions (Optional)

Create a GitHub Action that triggers revalidation after every push:

**.github/workflows/revalidate-portfolio.yml**

```yaml
name: Revalidate Portfolio

on:
  push:
    branches: [main]

jobs:
  revalidate:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Portfolio Revalidation
        run: |
          curl -X POST "https://your-domain.com/api/revalidate/github?token=${{ secrets.REVALIDATE_SECRET }}"
```

Then add `REVALIDATE_SECRET` to your GitHub repository secrets.

## How It Works

1. **Default Behavior**: Graph caches for 1 hour
2. **After Pushing Commits**: Call the revalidation endpoint
3. **Cache Clears**: Next page load fetches fresh data from GitHub
4. **Graph Updates**: Your new contributions appear immediately

## Security

- The endpoint requires a secret token
- Token should be kept secure and not committed to git
- Use environment variables for the token
- Different tokens for development and production recommended
