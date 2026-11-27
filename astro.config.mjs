// @ts-check
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { siteConfig } from "./src/config/site";

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: [...siteConfig.locales],
    defaultLocale: siteConfig.defaultLocale,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [icon()],
});
