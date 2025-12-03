import { USER } from "@/features/portfolio/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://zeeljasani.vercel.app",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Projects",
    href: "/#projects",
  },
];

export const GITHUB_USERNAME = "ZeelJasani";
export const SOURCE_CODE_GITHUB_REPO = "ZeelJasani/MyPortFolio";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/ZeelJasani/MyPortFolio";

export const UTM_PARAMS = {
  utm_source: "zeeljasani.vercel.app",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};
