"use client";

import { ArrowLeftIcon, ExternalLinkIcon, TagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Icons } from "@/components/icons";
import { UTM_PARAMS } from "@/config/site";
import { cn } from "@/lib/utils";
import { addQueryParams } from "@/utils/url";

import type { Project, TechStack } from "../../types/projects";

interface ProjectDetailProps {
  project: Project;
  className?: string;
}

export function ProjectDetail({ project, className }: ProjectDetailProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which image to show based on theme and hydration state
  const displayImage = !mounted
    ? (project.darkImage || project.image)
    : (resolvedTheme === "dark"
      ? (project.darkImage || project.image)
      : (project.lightImage || project.image));

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

      {/* Project Image */}
      {displayImage && (
        <div className="relative w-full overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            key={displayImage}
            src={displayImage}
            alt={`${project.title} preview`}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            unoptimized
          />
        </div>
      )}

      {/* Skills */}
      {project.skills.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <TagIcon className="size-5" />
            Technologies & Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill: TechStack, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent text-accent-foreground text-xs font-medium"
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={14}
                  height={14}
                  className={skill.className || ''}
                  unoptimized
                />
                {skill.name}
              </span>
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