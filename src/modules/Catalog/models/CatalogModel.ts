import ProductModel from "./ProductModel";
import SeoModel from "@/_core/models/SeoModel";

export default class CatalogModel extends SeoModel {
  banner: { url: string };
  banner2: { url: string };
  content_image_1: { url: string };
  content_image_2: { url: string };
  content: {
    banner1: { title: string; description: string; button_text: string };
    banner2: { title: string; description: string; button_text: string };
    bestsellers: ProductModel[];
    line: { title: string }[];
    popular: ProductModel[];
  };
}
