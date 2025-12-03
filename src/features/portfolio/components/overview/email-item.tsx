"use client";

import { MailIcon } from "lucide-react";
import { toast } from "sonner";

import { useIsClient } from "@/hooks/use-is-client";
import { decodeEmail } from "@/utils/string";

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";

type EmailItemProps = {
  email: string;
};

export function EmailItem({ email }: EmailItemProps) {
  const isClient = useIsClient();
  const emailDecoded = decodeEmail(email);
  
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isClient) {
      // Open Gmail compose in new tab
      window.open(`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(emailDecoded)}`, '_blank');
    }
  };

  return (
    <IntroItem>
      <IntroItemIcon>
        <MailIcon />
      </IntroItemIcon>

      <IntroItemContent>
        <IntroItemLink
          href="#"
          onClick={handleEmailClick}
          aria-label={
            isClient ? `Send email to ${emailDecoded} via Gmail` : "Email address"
          }
        >
          {isClient ? emailDecoded : "[Email protected]"}
        </IntroItemLink>
      </IntroItemContent>
    </IntroItem>
  );
}
