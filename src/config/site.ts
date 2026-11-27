export const siteConfig = {
  locales: ["en", "cy"],
  defaultLocale: "en",
  blog: {
    postsPerPage: 5,
  },
} as const;

export type Locale = (typeof siteConfig.locales)[number];