import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import type { Locale } from "@/types/locale";
// Global/shared messages
import globalEnMessages from "./messages/en.json";
import globalIdMessages from "./messages/id.json";
import { landingEn } from "@/features/landing/i18n/en";
import { landingId } from "@/features/landing/i18n/id";
// Feature messages

// Merge all messages
const messages = {
  en: {
    ...globalEnMessages,
    ...landingEn,
  },
  id: {
    ...globalIdMessages,
    ...landingId,
  },
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  };
});
