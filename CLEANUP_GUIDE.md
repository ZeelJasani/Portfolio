# Portfolio Cleanup Guide

This guide helps you identify and remove unnecessary files and folders from your static portfolio project to keep it lean and maintainable.

## 🗑️ Safe to Remove

### Development & Testing
- `src/__tests__/` (if exists)
- `*.test.ts` or `*.spec.ts` files
- `.github/workflows/` (if not using GitHub Actions)
- `cypress/` or `__tests__/` (if not using testing)
- `jest.config.js` (if not using Jest)

### Configuration
- `.env.example` (after setting up `.env`)
- `.npmrc` (if no custom npm config needed)
- `.eslintrc.js` (if not using ESLint)
- `.prettierrc` (if not using Prettier)

### Build & Cache
- `.next/` (regenerates on build)
- `out/` (if using static export)
- `.turbo/` (if using Turborepo)
- `node_modules/.cache/`

### Temporary Files
- `*.log`
- `*.tmp`
- `*.bak`
- `*.swp`

### Editor/IDE Specific
- `.vscode/` (unless sharing settings)
- `.idea/` (WebStorm/IntelliJ)
- `*.sublime-workspace`
- `*.sublime-project`
- `.DS_Store` (macOS)
- `Thumbs.db` (Windows)

## 🔍 Review Before Deleting

### Source Directories
| Path | Check For |
|------|-----------|
| `src/features/` | Custom features you might be using |
| `src/registry/` | Component registry files |
| `src/scripts/`  | Build/deployment scripts |
| `src/hooks/`    | Custom React hooks |
| `public/audio/` | Audio assets |
| `public/r/`     | Registry assets |

### Configuration Files
- `next-sitemap.config.js` (if not using sitemap)
- `postcss.config.js` (if not customizing PostCSS)
- `babel.config.js` (if not using Babel)

## ✅ Keep These

### Core Project Files
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.js`
- `README.md`
- `LICENSE` (if exists)

### Source Code
- `src/app/`
- `src/components/`
- `src/lib/`
- `src/styles/`
- `public/images/`
- `public/icons/`

## 🧹 Cleanup Command (Run with Caution!)

```bash
# Remove test files
rm -rf src/__tests__/ cypress/ __tests__/ *.test.ts *.spec.ts

# Remove build caches
rm -rf .next/ out/ node_modules/.cache/ .turbo/

# Remove editor files
rm -rf .vscode/ .idea/ *.sublime-*

# Remove temporary files
find . -type f \( -name '*.log' -o -name '*.tmp' -o -name '*.bak' -o -name '*.swp' -o -name '.DS_Store' -o -name 'Thumbs.db' \) -delete

# Clean node_modules and reinstall
rm -rf node_modules/
pnpm install  # or npm install / yarn install
```

> **Warning:** Always back up your project before running cleanup commands. Review each file/directory before deletion.
