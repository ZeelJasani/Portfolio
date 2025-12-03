import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    period: {
      start: "01.2024",
      end: "03.2024",
    },
    link: "https://example.com/project1",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe API",
    ],
    description: `A modern e-commerce platform with full shopping cart functionality, payment processing, and admin dashboard.

**Features:**
- User authentication and profiles
- Product catalog with search and filtering
- Shopping cart and checkout process
- Payment integration with Stripe
- Order management system
- Responsive design for all devices`,
    logo: "https://assets.chanhdai.com/images/project-logos/ecommerce.svg",
  },
  {
    id: "project-2",
    title: "Task Management App",
    period: {
      start: "04.2024",
      end: "06.2024",
    },
    link: "https://example.com/project2",
    skills: [
      "Vue.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
    ],
    description: `A collaborative task management application with real-time updates and team collaboration features.

**Features:**
- Real-time task updates
- Team collaboration tools
- Drag-and-drop interface
- Progress tracking
- File attachments
- Notification system`,
    logo: "https://assets.chanhdai.com/images/project-logos/taskapp.svg",
  },
  {
    id: "project-3",
    title: "Weather Dashboard",
    period: {
      start: "07.2024",
      end: "08.2024",
    },
    link: "https://example.com/project3",
    skills: [
      "JavaScript",
      "React",
      "Weather API",
      "Chart.js",
      "CSS3",
    ],
    description: `A comprehensive weather dashboard with detailed forecasts, interactive maps, and historical data visualization.

**Features:**
- Current weather conditions
- 7-day weather forecast
- Interactive weather maps
- Historical weather data
- Location-based forecasts
- Weather alerts and notifications`,
    logo: "https://assets.chanhdai.com/images/project-logos/weather.svg",
  },
  {
    id: "project-4",
    title: "Social Media Analytics",
    period: {
      start: "09.2024",
      end: "11.2024",
    },
    link: "https://example.com/project4",
    skills: [
      "Python",
      "Django",
      "PostgreSQL",
      "D3.js",
      "Redis",
    ],
    description: `An analytics platform for social media managers to track engagement, analyze trends, and generate reports.

**Features:**
- Multi-platform integration
- Real-time analytics dashboard
- Engagement metrics tracking
- Automated report generation
- Data visualization
- Export functionality`,
    logo: "https://assets.chanhdai.com/images/project-logos/analytics.svg",
  },
  {
    id: "project-5",
    title: "Mobile Banking App",
    period: {
      start: "12.2024",
    },
    link: "https://example.com/project5",
    skills: [
      "React Native",
      "TypeScript",
      "Firebase",
      "JWT Auth",
      "Redux",
    ],
    description: `A secure mobile banking application with comprehensive financial management features and biometric authentication.

**Features:**
- Secure user authentication
- Account balance and transactions
- Fund transfers and payments
- Bill payment services
- Biometric security
- Real-time notifications`,
    logo: "https://assets.chanhdai.com/images/project-logos/banking.svg",
  },
];
