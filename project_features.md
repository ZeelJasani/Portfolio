# Project Feature Analysis

This document outlines the features, pages, and content currently implemented in the website based on the codebase analysis.

## 1. Pages & Routes

| Route | Description | Component Path |
| :--- | :--- | :--- |
| `/` | **Home Page**: The main portfolio landing page containing all sections. | `src/app/(app)/(root)/page.tsx` |
| `/project/[slug]` | **Project Detail**: Dynamic page for individual project details. | `src/app/(app)/project/[slug]/page.tsx` |
| `/projects/[slug]` | **Projects Detail**: (Alternative/Legacy) Dynamic page for project details. | `src/app/(app)/projects/[slug]/page.tsx` |
| `/og` | **Open Graph Image**: Dynamic OG image generation. | `src/app/og/page.tsx` |
| `/api/github/contributions` | **API Route**: Fetches GitHub contribution data. | `src/app/api/github/contributions/route.ts` |

## 2. Home Page Sections (Features)

The home page (`/`) is composed of the following distinct sections, rendered in order:

1. **Profile Cover**: Visual cover area.
    * *Component*: `src/features/portfolio/components/profile-cover.tsx`
2. **Profile Header**: Name, title, and basic info.
    * *Component*: `src/features/portfolio/components/profile-header.tsx`
3. **Overview**: Summary of key stats or info.
    * *Component*: `src/features/portfolio/components/overview/index.tsx`
4. **Social Links**: Links to social media profiles.
    * *Component*: `src/features/portfolio/components/social-links/index.tsx`
5. **About**: Professional bio and introduction.
    * *Component*: `src/features/portfolio/components/about.tsx`
    * *Content Source*: `src/features/portfolio/data/user.ts`
6. **GitHub Contributions**: Interactive graph showing coding activity.
    * *Component*: `src/features/portfolio/components/github-contributions/index.tsx`
    * *Data Source*: Fetches from GitHub API via `src/features/portfolio/data/github-contributions.ts`.
7. **Tech Stack**: Grid of technologies and tools used.
    * *Component*: `src/features/portfolio/components/teck-stack.tsx`
    * *Data Source*: `src/features/portfolio/data/tech-stack.ts`
8. **Projects**: List of featured projects.
    * *Component*: `src/features/portfolio/components/projects/index.tsx`
    * *Data Source*: `src/features/portfolio/data/projects-new.ts`
9. **Certifications**: List of professional certifications and awards.
    * *Component*: `src/features/portfolio/components/certifications/index.tsx`
    * *Data Source*: `src/features/portfolio/data/certifications.ts`

## 3. Site Header Features

The global site header includes:

* **Navigation**: Links to "Portfolio", "About", "Projects".
* **Command Menu**: A `cmd+k` searchable menu.
* **Theme Toggle**: Switch between Light/Dark mode.
* **Mobile Navigation**: Responsive menu for smaller screens.

## 4. Content Inventory

### User Profile (`src/features/portfolio/data/user.ts`)

* **Name**: Zeel Jasani
* **Title**: Software Developer
* **Bio**: "Creating with code. Small details matter."
* **Location**: India, Junagadh
* **Email**: <jasanizeel487@gmail.com>

### Featured Projects (`src/features/portfolio/data/projects-new.ts`)

Currently listed projects:

1. **E-Commerce Platform** (React, Next.js, Stripe)
2. **Task Management App** (Vue.js, Node.js, MongoDB)
3. **Weather Dashboard** (React, Chart.js)
4. **Social Media Analytics** (Python, Django, PostgreSQL)
5. **Mobile Banking App** (React Native, Firebase)

### Tech Stack (`src/features/portfolio/data/tech-stack.ts`)

Comprehensive list of tools including:

* **Languages**: JavaScript, TypeScript, Python, C++, SQL
* **Frontend**: React, Next.js, Tailwind CSS
* **Backend**: Node.js, Express, PostgreSQL, MySQL, Prisma
* **Mobile**: Flutter, React Native, Swift
* **AI/ML**: TensorFlow, Scikit-learn, LangChain
* **DevOps**: Docker, Kubernetes, Vercel, Firebase

### Certifications (`src/features/portfolio/data/certifications.ts`)

Includes 15+ certifications such as:

* Next.js SEO Fundamentals (Vercel)
* Next.js App Router Fundamentals (Vercel)
* React Foundations (Vercel)
* Various trademark and copyright registrations.
