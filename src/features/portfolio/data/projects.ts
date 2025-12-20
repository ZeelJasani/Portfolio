import type { Project } from "../types/projects";

// To add a new project:
// 1. Add a new object to the PROJECTS array.
// 2. Ensure it has a unique 'id'.
// 3. Fill in the title, tagline, link, skills, description, logo, and image.
// 4. Place the logo image in 'public/images/' and reference it in the 'logo' field.
// 5. Place the project screenshot/image in 'public/images/' and reference it in the 'image' field.

export const PROJECTS: Project[] = [
  {
    id: "Learnix",
    title: "Learnix",
    tagline: "Modern LMS Platform",

    link: "https://learnix-sepia.vercel.app/",
    skills: [
      {
        name: "Next.js 15",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg",
        className: "dark:invert",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Prisma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "AWS S3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Better Auth",
        // icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/better-auth.svg",
        icon: "/icons/techstack/betterauth.png"
      },
      {
        name: "Stripe",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stripe.svg",
      },
    ],
    description: `A modern, full-stack Learning Management System (LMS) built with cutting-edge web technologies. Features secure authentication, course management, rich content editing, file uploads with S3, admin dashboard, and integrated Stripe payments. Built with Next.js 15, TypeScript, Prisma, and PostgreSQL.`,
    logo: "/images/masterji.svg",
    image: "/images/Learnix.png",
    isLive: true,
  },
  {
    id: "3d-book",
    title: "Zyora 3D Interactive Book",
    tagline: "Interactive 3D Book Experience",

    link: "https://zyora-amber.vercel.app/",
    skills: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Three.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
        className: "dark:invert",
      },
      {
        name: "React Three Fiber",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Vite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Jotai",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jotai.svg",
      },
    ],
    description: `A high-performance 3D book implementation featuring realistic page turning animations and interactive controls. Built with React Three Fiber and Three.js, it offers dynamic lighting, shadows, realistic paper textures, smooth physics-based animations, and 360° viewing with orbit controls.`,
    logo: "/images/3d-book.svg",
    image: "/images/3d-book-preview.png",
    isLive: true,
  },
];
