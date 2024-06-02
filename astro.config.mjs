import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import { externalLink } from "./src/externalLink";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://joseamietta.github.io",
  integrations: [tailwind({
    applyBaseStyles: true
  }), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), sitemap()],
  markdown: {
    rehypePlugins: [externalLink]
  }
});