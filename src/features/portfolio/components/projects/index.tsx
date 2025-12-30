import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { CollapsibleList } from "@/components/collapsible-list";
import { Button } from "@/components/ui/button";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem } from "./project-item";
import { cn } from "@/lib/utils";

export function Projects({ limit }: { limit?: number }) {
  const displayedProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <Panel id="projects">
      <PanelHeader className="flex items-center justify-between py-2.5">
        <PanelTitle>Projects</PanelTitle>
      </PanelHeader>

      {!limit ? (
        <CollapsibleList
          items={PROJECTS}
          max={10}
          renderItem={(item) => <ProjectItem project={item} />}
        />
      ) : (
        <>
          {displayedProjects.map((item, index) => (
            <div key={item.id || index} className="border-b border-edge">
              <ProjectItem project={item} />
            </div>
          ))}
          {PROJECTS.length > limit && (
            <div className="flex h-12 items-center justify-center border-b border-edge">
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "group/btn h-full hover:bg-transparent",
                )}
              >
                <Link href="/project" className="flex items-center gap-1">
                  <span className="font-bold underline">
                    Show more projects
                  </span>
                  <MoveRightIcon className="size-4" />
                </Link>
              </Button>
              {/* <Button
                asChild
                variant="ghost"
                className={cn(
                  "group/btn h-12 px-40 rounded-md border border-edge",
                  // Added: rounded-md for rounded corners, border for all sides
                )}
              >
                <Link href="/project" className="flex items-center gap-4">
                  <span>Show more projects</span>
                  <MoveRightIcon className="size-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button> */}
            </div>
          )}
        </>
      )}
    </Panel>
  );
}
