// Tech Stack Icon Configuration
// Add or edit technology icons here - just add the name and icon URL!

export interface TechIcon {
    name: string;
    icon: string;
    className?: string; // Optional: for dark mode styling like 'dark:invert'
}

export const TECH_ICONS: Record<string, TechIcon> = {
    // Frontend Frameworks & Libraries
    "nextjs": {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg",
        className: "dark:invert",
    },
    "next.js 15": {
        name: "Next.js 15",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg",
        className: "dark:invert",
    },
    "react": {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    "react three fiber": {
        name: "React Three Fiber",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    "@react-three/drei": {
        name: "@react-three/drei",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
        className: "dark:invert",
    },

    // Languages
    "typescript": {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    "javascript": {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },

    // Styling
    "tailwind css": {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    "radix ui": {
        name: "Radix UI",
        icon: "https://www.radix-ui.com/favicon.svg",
    },

    // Databases & ORM
    "prisma": {
        name: "Prisma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    },
    "postgresql": {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    "mongodb": {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },

    // Cloud & Storage
    "aws s3": {
        name: "AWS S3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    },
    "vercel": {
        name: "Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        className: "dark:invert",
    },

    // DevOps
    "docker": {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    "github actions": {
        name: "GitHub Actions",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        className: "dark:invert",
    },

    // Authentication
    "better auth": {
        name: "Better Auth",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/auth0.svg",
    },
    "nextauth.js": {
        name: "NextAuth.js",
        icon: "https://next-auth.js.org/img/logo/logo-sm.png",
    },

    // Payment
    "stripe": {
        name: "Stripe",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stripe.svg",
    },

    // Build Tools
    "vite": {
        name: "Vite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    },

    // 3D & Graphics
    "three.js": {
        name: "Three.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
        className: "dark:invert",
    },

    // State Management
    "jotai": {
        name: "Jotai",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jotai.svg",
    },
    "react query": {
        name: "React Query",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/reactquery.svg",
    },
};

/**
 * Get tech icon data by name (case-insensitive)
 */
export function getTechIcon(skillName: string): TechIcon | null {
    const normalized = skillName.toLowerCase().trim();
    return TECH_ICONS[normalized] || null;
}
