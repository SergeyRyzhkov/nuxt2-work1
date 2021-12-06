// import { SeoMetaTagsInfo } from "@/_core/models/SeoMetaTagsInfo";

// export class SeoMetaTagsBuilder {
//   public static createHead(headMetaTagInfo?: SeoMetaTagsInfo, pageRelativePath?: string) {
//     const meta = SeoMetaTagsBuilder.normalizeSeoMetaObject(headMetaTagInfo);

//     return {
//       title: meta.title,
//       meta: [
//         {
//           hid: "og:url",
//           property: "og:url",
//           content: meta.fullPath || `${AppConfig.siteUrlForSeo}/${pageRelativePath}`,
//         },
//         {
//           hid: "og:type",
//           property: "og:type",
//           content: "website",
//         },
//         {
//           hid: "og:title",
//           property: "og:title",
//           content: meta.title.substring(0, 70),
//         },
//         {
//           hid: "og:description",
//           property: "og:description",
//           content: meta.description.substring(0, 150),
//         },
//         {
//           hid: "og:image",
//           property: "og:image",
//           content: meta.image,
//         },
//         {
//           hid: "description",
//           name: "description",
//           content: meta.description.substring(0, 150),
//         },
//         {
//           hid: "Keywords",
//           name: "Keywords",
//           keywords: meta.keywords,
//         },
//       ],
//     };
//   }

//   private static normalizeSeoMetaObject(headMetaTagInfo?: SeoMetaTagsInfo): SeoMetaTagsInfo {
//     const normSeoMeta = headMetaTagInfo || new SeoMetaTagsInfo();
//     normSeoMeta.description = normSeoMeta.description || AppConfig.defaultMetaDescription;
//     normSeoMeta.title = normSeoMeta.title || AppConfig.defaulMetaTitle;
//     normSeoMeta.image = normSeoMeta.image || AppConfig.defaulMetaImgSrc;
//     normSeoMeta.keywords = normSeoMeta.keywords || AppConfig.defaultMetaDescription;

//     return normSeoMeta;
//   }
// }
