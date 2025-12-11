// Tech stack configuration - define name and icon for each technology
export interface TechStack {
  name: string;
  icon: string;
  className?: string; // Optional: for dark mode like 'dark:invert'
}

export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /** Short description or subtitle displayed below the title. */
  tagline?: string;

  /** Public URL (site, repository, demo, or video). */
  link: string;
  /** Tech stack - array of technologies with name and icon */
  skills: TechStack[];
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string;
  /** Logo image URL (absolute or path under /public). */
  logo?: string;
  /** Project preview image URL (absolute or path under /public). */
  image?: string;
  /** Whether the project is currently live/active. */
  isLive?: boolean;
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;
};
