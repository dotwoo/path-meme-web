// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // site: {
  //   url: 'https://momo.gusibi.mobi',
  //   name: '古思乱讲'
  // },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      titleTemplate: "%s - Dotwoo",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        // Open Graph
        { property: "og:type", content: "website" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@stefanobartoletti/nuxt-social-share",
    "@nuxtjs/sitemap",
    "@nuxtjs/supabase",
    "nuxt-gtag",
    "nuxt-clarity-analytics",
  ],

  // configuration options
  socialShare: {
    baseUrl: "https://blog.dotwoo.us.kg", // required!
    // other optional module options
  },

  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: 0 }],
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },

  plugins: [
    "~/plugins/marked.ts",
    "~/plugins/head.ts",
    "~/plugins/banner-content.ts",
  ],
  routeRules: {
    // 指定只有 /profile 路由需要身份验证
    "/profile": { auth: true },
  },
  // 确保中间件被加载
  hooks: {
    "pages:extend"(pages) {
      pages.forEach((page) => {
        if (page.path === "/profile") {
          page.meta = page.meta || {};
          page.meta.middleware = ["auth"];
        }
      });
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.API_BASE_URL || "https://min-blog.dotwoo.workers.dev/",
      repoOwner: process.env.REPO_OWNER || "dotwoo",
      repoName: process.env.REPO_NAME || "path-meme-db",
      perPageSize: process.env.PER_PAGE_SIZE || "10",
      siteTitle: "dotwoo",
      siteDescription: "dotwoo - 一个关于技术、生活和思考的博客",
      siteUrl: process.env.SITE_URL || "https://blog.dotwoo.us.kg",
      twitterHandle: "@yourtwitterhandle",
    },
    private: {
      githubToken: process.env.GITHUB_TOKEN,
    },
  },
  gtag: {
    id: "G-N7EW8Y4SEF",
  },
  supabase: {
    // Options
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    redirect: false, // Redirect automatically to the configured login page if a non authenticated user is trying to access a guarded. You can disable all redirects by setting this option to false.
  },
  // Sitemap configuration
  sitemap: {
    // hostname: 'https://blog.dotwoo.us.kg',
    // gzip: true,
    exclude: ["/admin/**"],
    sources: ["/api/__sitemap__/urls"],
  },
  nitro: {
    preset: "cloudflare-pages",
  },
});
