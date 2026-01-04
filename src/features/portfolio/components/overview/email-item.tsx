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

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isClient) {
      await navigator.clipboard.writeText(emailDecoded);
      toast.success("Email copied to clipboard!");
    }
  };

  return (
    <IntroItem>
      <IntroItemIcon>
        <MailIcon />
      </IntroItemIcon>

      <IntroItemContent>
        <IntroItemLink
          href={isClient ? `mailto:${emailDecoded}` : "#"}
          onClick={handleEmailClick}
          aria-label={
            isClient ? `Copy email ${emailDecoded} to clipboard` : "Email address"
          }
        >
          {isClient ? emailDecoded : "[Email protected]"}
        </IntroItemLink>
      </IntroItemContent>
    </IntroItem>
  );
}
