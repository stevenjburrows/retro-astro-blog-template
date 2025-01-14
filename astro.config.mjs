import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://blahg.netlify.app/",
	base: "/",
	integrations: [sitemap()],
});
