import React from "react";

import { SOCIAL_LINKS } from "../../data/social-links";
import { Panel } from "../panel";
import { SocialLinkItem } from "./social-link-item";

export function SocialLinks() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
        {SOCIAL_LINKS.map((link, index) => {
          return <SocialLinkItem key={index} {...link} index={index} />;
        })}
      </div>
    </Panel>
  );
}
