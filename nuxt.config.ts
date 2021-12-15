//  hooks: {
//     render: {
//       errorMiddleware(app) {
//         app.use((error, req, res, next) => {
//           res.writeHead(307, {
//             Location: '/network-error',
//           })
//           res.end()
//         })
//       },
//     },
// },

import path from "path";
import { NuxtConfig } from "@nuxt/types";

const SRC_DIR: NuxtConfig["srcDir"] = "src/";

const nuxtConfig: NuxtConfig = {
  modern: process.env.NODE_ENV === "production",
  srcDir: SRC_DIR,

  components: [
    { path: "@/components", pathPrefix: false },
    { path: "@/pages", pathPrefix: false },
    { path: "@/layouts", pathPrefix: false },
  ],

  loading: { color: "#ef8532" },

  head: {
    htmlAttrs: {
      prefix: "og:http://ogp.me/ns#",
      lang: "ru",
    },
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
    ],

    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.png",
      },
    ],

    bodyAttrs: {
      itemscope: "",
      itemtype: "https://schema.org/WebPage",
    },
  },

  css: ["~/assets/styles/_index.scss"],

  plugins: [
    { src: "@/plugins/app-init" },
    { src: "@/plugins/directives" },
    { src: "@/plugins/vuelidate" },
    { src: "@/plugins/dayjs" },
    // { src: "@/plugins/vue-lazyload" },
    { src: "@/plugins/modal-manager.client" },
  ],

  router: {
    prefetchLinks: false,
    // middleware: ["requiresAuthorize"],
  },

  modules: ["@nuxtjs/axios", "cookie-universal-nuxt", "nuxt-webfontloader"],

  buildModules: [
    "@/_core/nuxt_modules/init-router-store.module.ts",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/style-resources",
    [
      "@nuxt/typescript-build",
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true,
        eslint: true,
      },
    ],
  ],

  build: {
    optimizeCSS: process.env.NODE_ENV === "production",

    extractCSS: {
      ignoreOrder: true,
    },

    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },

    splitChunks: {
      layouts: false,
      pages: true,
      commons: true,
    },

    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    },

    // @ts-ignore
    postcss: {
      plugins: {
        "postcss-import": {},
        "tailwindcss/nesting": {},
        tailwindcss: path.resolve(__dirname, "./tailwind.config.js"),
        autoprefixer: {},
      },
      preset: {
        stage: 1,
      },
    },
  },

  render: {
    // compressor: false,
    resourceHints: false,
    etag: false,
    crossorigin: "anonymous",

    bundleRenderer: {
      runInNewContext: false,
    },
  },

  tailwindcss: {
    configPath: "~~/tailwind.config.js",
  },

  webfontloader: {
    events: false,
    google: {
      families: ["Montserrat:400,500,600,700:cyrillic&display=swap"],
    },
  },

  styleResources: {
    scss: ["~assets/styles/_variables.scss"],
  },

  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
  },

  server: {
    port: process.env.PORT || 8010,
    host: process.env.HOST || "localhost",
  },

  publicRuntimeConfig: {
    // apiUrl: process.env.API_URL || "https://api.kaypro.plenexy.digital/api",
    // baseUrl: process.env.BASE_URL || "https://api.kaypro.plenexy.digital",
    apiUrl: "https://api.kaypro.plenexy.digital/api",
    baseUrl: "https://api.kaypro.plenexy.digital",
    siteUrl: "https://kaypro.plenexy.digital",

    defaultMetaDescription:
      "Эксклюзивный представитель итальянского бренда KAYPRO в России. Широкий ассортимент продукции, удобные способы оплаты, быстрая доставка.",
    defaulMetaTitle:
      "Эксклюзивный представитель итальянского бренда KAYPRO в России. Широкий ассортимент продукции, удобные способы оплаты, быстрая доставка.",
    defaulMetaImgSrc: "https://kaypro.plenexy.digital/images/header_logo.png",
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL,
    },
  },
};

export default nuxtConfig;
