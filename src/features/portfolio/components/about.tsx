import { DownloadIcon } from "lucide-react";

import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { ProseMono } from "@/components/ui/typography";
import { USER } from "@/features/portfolio/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <ProseMono>
          <Markdown>{USER.about}</Markdown>
        </ProseMono>

        {USER.resume && (
          <div className="mt-6 flex justify-start">
            <Button asChild variant="outline">
              <a href={USER.resume} target="_blank" rel="noopener noreferrer">
                <DownloadIcon className="mr-2 size-4" />
                Download Resume/CV
              </a>
            </Button>
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
