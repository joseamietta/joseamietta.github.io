import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import { externalLink } from "./src/externalLink";

// https://astro.build/config
export default defineConfig({
  site: "https://joseamietta.github.io",
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  markdown: {
    rehypePlugins: [externalLink],
  },
});
