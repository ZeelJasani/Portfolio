import type { Project } from "../types/projects";

// To add a new project:
// 1. Add a new object to the PROJECTS array.
// 2. Ensure it has a unique 'id'.
// 3. Fill in the title, tagline, link, skills, description, and logo.
// 4. Place the logo image in 'public/images/projects/' and reference it in the 'logo' field.

export const PROJECTS: Project[] = [
  {
    id: "masterji",
    title: "Masterji",
    tagline: "LMS Platform",

    link: "https://mastrji.vercel.app/",
    skills: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "AWS S3",
      "Docker",
      "NextAuth.js",
      "Stripe",
    ],
    description: `A modern, full-stack Learning Management System (LMS) built with cutting-edge web technologies. It provides a comprehensive platform for creating, managing, and delivering online courses.

**Key Features:**
- **User Authentication:** Secure login with multiple providers (GitHub, email OTP) via Better Auth.
- **Course Management:** Create and organize courses with chapters and lessons.
- **Rich Content Editor:** Advanced text editing with TipTap integration.
- **File Management:** Secure file uploads with S3-compatible storage.
- **Admin Dashboard:** Comprehensive course administration tools.
- **Payment Processing:** Integrated Stripe payment system.

**Tech Stack:**
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Radix UI, React Query.
- **Backend:** Node.js, Next.js API Routes, Prisma, PostgreSQL.
- **DevOps:** Vercel, GitHub Actions, Docker.`,
    logo: "/images/masterji.svg", // Placeholder logo path
  },
  {
    id: "3d-book",
    title: "Zyora 3D Interactive Book",
    tagline: "Interactive 3D Book Experience",

    link: "https://zyora-amber.vercel.app/",
    skills: [
      "React",
      "Three.js",
      "React Three Fiber",
      "Vite",
      "Tailwind CSS",
      "Jotai",
    ],
    description: `A high-performance 3D book implementation built with React Three Fiber and Three.js, featuring realistic page turning animations and interactive controls.

**Features:**
- **Realistic 3D Book:** Dynamic lighting, shadows, and realistic paper texture mapping.
- **Smooth Page Turning:** Physics-based animations with customizable curve strength.
- **Interactive Controls:** Orbit controls for 360° viewing and hover effects.
- **Customizable Content:** Easy page content management and support for custom textures.

**Tech Stack:**
- **Core:** React, Three.js, React Three Fiber, @react-three/drei.
- **Build:** Vite, Tailwind CSS.
- **State:** Jotai.`,
    logo: "/images/3d-book.svg", // Placeholder logo path
  },
];
