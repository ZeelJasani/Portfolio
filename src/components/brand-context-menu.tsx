"use client";

import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { copyText } from "@/utils/copy";

import { getMarkSVG,ZeelMark } from "./zeel-mark";

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => {
            const svg = getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff");
            copyText(svg);
            toast.success("Copied Mark as SVG");
          }}
        >
          <ZeelMark className="size-full" />
          Copy Mark as SVG
        </ContextMenuItem>

        <ContextMenuItem asChild>
          <Link href="/">
            <DropdownMenuItem>
              <ExternalLinkIcon className="mr-2 size-4" />
              About Brand
            </DropdownMenuItem>
          </Link>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
