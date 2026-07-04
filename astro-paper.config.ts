import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://yassinachengli.com",
    title: "Yassin Achengli",
    description: "AstroPaper based web blog, modified to be a blog for my personal notes.",
    author: "Yassin Achengli",
    profile: "https://yassinachengli.com",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Europe/Madrid",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/achengli/yassin_blog/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/achengli" },
    { name: "linkedin", url: "https://www.linkedin.com/in/yassin-achengli-benmouais-a3934121b" },
    { name: "mail",     url: "mailto:yassin_achengli@gmail.com" },
  ],
  shareLinks: [
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
