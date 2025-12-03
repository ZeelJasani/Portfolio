"use client";

import { PhoneIcon } from "lucide-react";
import { toast } from "sonner";

import { useIsClient } from "@/hooks/use-is-client";
import { decodePhoneNumber, formatPhoneNumber } from "@/utils/string";

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";

type PhoneItemProps = {
  phoneNumber: string;
};

export function PhoneItem({ phoneNumber }: PhoneItemProps) {
  const isClient = useIsClient();
  const phoneNumberDecoded = decodePhoneNumber(phoneNumber);
  
  const handlePhoneClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isClient) {
      // Extract only the last 10 digits (local number without country code)
      const numbersOnly = phoneNumberDecoded.replace(/\D/g, '');
      const lastTenDigits = numbersOnly.slice(-10);
      await navigator.clipboard.writeText(lastTenDigits);
      toast.success("Phone number copied to clipboard!");
    }
  };

  return (
    <IntroItem>
      <IntroItemIcon>
        <PhoneIcon />
      </IntroItemIcon>

      <IntroItemContent>
        <IntroItemLink
          href={isClient ? `tel:${phoneNumberDecoded}` : "#"}
          onClick={handlePhoneClick}
          aria-label={
            isClient
              ? `Call ${formatPhoneNumber(phoneNumberDecoded)} or click to copy`
              : "Phone number"
          }
        >
          {isClient
            ? formatPhoneNumber(phoneNumberDecoded)
            : "[Phone protected]"}
        </IntroItemLink>
      </IntroItemContent>
    </IntroItem>
  );
}
