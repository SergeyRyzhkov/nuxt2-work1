import SeoModel from "../../../_core/models/SeoModel";
import ProductModel from "@/modules/Catalog/models/ProductModel";

export default class MainPageModel extends SeoModel {
  loaded = false;
  content: {
    line: { title: string; description: string };
    line_2: { title: string }[];
    product: ProductModel[];
    bestsellers: ProductModel[];
    new_products: ProductModel[];
    popular: ProductModel[];
    instagram: { url: string }[];
  };

  slider: {
    id: number;
    title: string;
    subtitle: string;
    link: string;
    button_text: string;
    image: { url: string };

    description: string;
    title_color: string;
    subtitle_color: string;
    button: boolean;
    media: string;
  }[];

  slider_line: {
    id: number;
    title: string;
    description: string;
    title_color: string;
    subtitle_color: string;
    link: string;
    button: boolean;
    button_text: string;
    image: { url: string };
    media: { url: string };
  }[];
}
