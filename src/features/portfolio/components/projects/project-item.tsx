"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowRightIcon, LinkIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import type { Project, TechStack } from "../../types/projects";

export function ProjectItem({
    className,
    project,
}: {
    className?: string;
    project: Project;
}) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Stable image selection logic
    const displayImage = !mounted
        ? (project.darkImage || project.image)
        : (resolvedTheme === "dark"
            ? (project.darkImage || project.image)
            : (project.lightImage || project.image));

    return (
        <div className={className} suppressHydrationWarning>
            <div className="hover:bg-accent2">
                <div>
                    <div className="flex w-full items-center gap-4 p-4 pr-2">
                        <div className="flex-1">
                            <h3 className="mb-1 leading-snug font-medium text-balance">
                                {project.title}
                            </h3>

                            {project.tagline && (
                                <p className="text-sm text-muted-foreground">
                                    {project.tagline}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Open Project Link */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <LinkIcon className="pointer-events-none size-4" />
                                        <span className="sr-only">Open Project Link</span>
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Open Project Link</p>
                                </TooltipContent>
                            </Tooltip>

                            {/* View Project Details Link */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                                        href={`/project/${project.id}`}
                                    >
                                        <ArrowRightIcon className="pointer-events-none size-4" />
                                        <span className="sr-only">View Project Details</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>View Project Details</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Project Image */}
                    {displayImage && (
                        <div className="border-t border-edge">
                            <div className="p-4">
                                <div className="relative w-full overflow-hidden rounded-lg border border-edge bg-muted">
                                    <Image
                                        key={displayImage}
                                        src={displayImage}
                                        alt={`${project.title} preview`}
                                        width={800}
                                        height={450}
                                        className="w-full h-auto object-cover"
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {project.description && (
                        <div className="border-t border-edge">
                            <div className="p-4 space-y-3" suppressHydrationWarning>
                                {/* Status Indicator */}
                                {project.isLive !== undefined && (
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`size-2 rounded-full ${project.isLive ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        />
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            {project.isLive ? "Live" : "Offline"}
                                        </span>
                                    </div>
                                )}

                                {/* Description Text */}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack Icons */}
                                {project.skills && project.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.skills.map((tech: TechStack, index: number) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/50 text-foreground text-xs font-medium border border-border hover:bg-secondary/70 transition-colors whitespace-nowrap"
                                            >
                                                <Image
                                                    src={tech.icon}
                                                    alt={tech.name}
                                                    width={14}
                                                    height={14}
                                                    className={tech.className || ''}
                                                    unoptimized
                                                />
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
