"use client";

import { ArrowRightIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import type { Project } from "../../types/projects";

export function ProjectItem({
    className,
    project,
}: {
    className?: string;
    project: Project;
}) {
    return (
        <div className={className}>
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

                        <Link
                            className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                            href={`/project/${project.id}`}
                            title="View Project Details"
                        >
                            <ArrowRightIcon className="pointer-events-none size-4" />
                            <span className="sr-only">View Project Details</span>
                        </Link>
                    </div>

                    {/* Project Image - Always Visible */}
                    {project.image && (
                        <div className="border-t border-edge">
                            <div className="p-4">
                                <div className="relative w-full overflow-hidden rounded-lg border border-edge bg-muted">
                                    <Image
                                        src={project.image}
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

                    {/* Description - Enhanced Readability */}
                    {project.description && (
                        <div className="border-t border-edge">
                            <div className="p-4 space-y-3">
                                {/* Project Name with Status Indicator */}
                                <div className="flex items-center gap-2">
                                    <h4 className="text-base font-semibold underline decoration-2 underline-offset-4">
                                        {project.title}
                                    </h4>
                                    {project.isLive !== undefined && (
                                        <div
                                            className={`size-2 rounded-full ${project.isLive ? "bg-green-500" : "bg-red-500"
                                                }`}
                                            title={project.isLive ? "Live" : "Offline"}
                                        />
                                    )}
                                </div>

                                {/* Description Text */}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack Icons */}
                                {project.skills && project.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.skills.map((tech, index) => (
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
