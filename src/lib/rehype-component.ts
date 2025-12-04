import fs from "node:fs";
import path from "node:path";

import { u } from "unist-builder";
import { visit } from "unist-util-visit";

// import { Index } from "@/__registry__/index";
import type { UnistNode, UnistTree } from "@/types/unist";

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    // Registry is missing, so we skip component processing
    return tree;
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}
