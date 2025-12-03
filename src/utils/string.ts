import { formatIncompletePhoneNumber } from "@/lib/libphonenumber";

export function decodeEmail(email: string) {
  // Return plain text email (no longer base64 encoded)
  return email;
}

export function decodePhoneNumber(phone: string) {
  // Return plain text phone number (no longer base64 encoded)
  return phone;
}

export function formatPhoneNumber(phone: string) {
  return formatIncompletePhoneNumber(phone);
}
