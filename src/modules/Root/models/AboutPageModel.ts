import SeoModel from "../../../_core/models/SeoModel";

export default class AboutPageModel extends SeoModel {
  banner: { url: string };
  content: { text: string; description: string };
  content_image_1: { url: string };
  content_image_2: { url: string };
}
