import type { Project } from "../types/projects";


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
        // icon: "https://raw.githubusercontent.com/better-auth/better-auth/main/docs/public/better-auth.svg",
        // icon: "icons/LogoDark.webp ? /icons/LogoLight.webp",
        icon: "/icons/LogoDark.webp"
        // className: "dark:invert",
      },
      {
        name: "Stripe",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stripe.svg",
      },
    ],
    description: `A modern, full-stack Learning Management System (LMS) built with cutting-edge web technologies. Features secure authentication, course management, rich content editing, file uploads with S3, admin dashboard, and integrated Stripe payments. Built with Next.js 15, TypeScript, Prisma, and PostgreSQL.`,
    logo: "/images/masterji.svg",
    lightImage: "/images/projects/learnix-light.png",
    darkImage: "/images/projects/learnix-dark.png",
    isLive: true,
  },
  {
    id: "notiva",
    title: "Notiva",
    tagline: "The note taking app that thinks like you code",
    link: "https://notiva-olive.vercel.app/",
    skills: [
      {
        name: "Next.js 15",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg",
        className: "dark:invert",
      },
      {
        name: "Tiptap",
        // icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tiptap.svg",
        // className: "dark:invert",
        icon: "/icons/tiptap.webp"
      },
      {
        name: "Tailwind CSS 4",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Drizzle ORM",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/drizzle.svg",
        className: "dark:invert",
      },
      {
        name: "Better Auth",
        // icon: "https://raw.githubusercontent.com/better-auth/better-auth/main/docs/public/better-auth.svg",
        icon: "/icons/LogoDark.webp"
      },
      {
        name: "Neon",
        // icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/neon.svg",
        icon: "/icons/neon.webp"
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/framer.svg",
      },
      {
        name: "Lucide React",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/lucide.svg",
        className: "dark:invert",
      },
    ],
    description: `Notiva is a minimal, high-performance note-taking platform designed specifically for developers. It bridges the gap between traditional text editors and powerful IDEs, offering a block-based workflow that mirrors how programmers structure their thoughts. Features keyboard-first navigation, slash commands, advanced code blocks, and infinite nested hierarchy.`,
    logo: "/images/notiva.png",
    lightImage: "/images/projects/notiva-light.png",
    darkImage: "/images/projects/notiva-dark.png",
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
