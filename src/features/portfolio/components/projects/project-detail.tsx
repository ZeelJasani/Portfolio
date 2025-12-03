"use client";

import { ArrowLeftIcon, CalendarIcon, ExternalLinkIcon, InfinityIcon, TagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import { Tag } from "@/components/ui/tag";
import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";
import { cn } from "@/lib/utils";

import type { Project } from "../../types/projects";

interface ProjectDetailProps {
  project: Project;
  className?: string;
}

export function ProjectDetail({ project, className }: ProjectDetailProps) {
  const { start, end } = project.period;
  const isOngoing = !end;
  const isSinglePeriod = end === start;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Back Navigation */}
      <div>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={64}
              height={64}
              quality={100}
              className="size-16 rounded-xl shrink-0 select-none"
              unoptimized
            />
          ) : (
            <div className="size-16 rounded-xl border border-muted-foreground/15 bg-muted flex items-center justify-center shrink-0 select-none">
              <Icons.project className="size-8 text-muted-foreground" />
            </div>
          )}

          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
            
            {/* Period */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="size-4" />
              <span>{start}</span>
              {!isSinglePeriod && (
                <>
                  <span className="font-mono">—</span>
                  {isOngoing ? (
                    <>
                      <InfinityIcon className="size-4" />
                      <span>Present</span>
                    </>
                  ) : (
                    <span>{end}</span>
                  )}
                </>
              )}
            </div>

            {/* Project Link */}
            <div>
              <a
                href={addQueryParams(project.link, UTM_PARAMS)}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLinkIcon className="size-4" />
                Visit Project
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      {project.skills.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <TagIcon className="size-5" />
            Technologies & Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill, index) => (
              <Tag key={index} className="bg-accent text-accent-foreground">
                {skill}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {project.description && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">About</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>{project.description}</p>
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          <p>This project showcases expertise in modern web development technologies and best practices.</p>
        </div>
      </div>
    </div>
  );
}