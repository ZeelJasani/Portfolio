export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /** Short description or subtitle displayed below the title. */
  tagline?: string;

  /** Public URL (site, repository, demo, or video). */
  link: string;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string;
  /** Logo image URL (absolute or path under /public). */
  logo?: string;
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean;
};
