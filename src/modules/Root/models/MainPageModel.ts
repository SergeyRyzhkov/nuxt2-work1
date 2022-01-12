import SeoModel from "../../../_core/models/SeoModel";
import ProductModel from "@/modules/Catalog/models/ProductModel";

export default class MainPageModel extends SeoModel {
  content: {
    line: { title: string; description: string };
    line_2: { title: string }[];
    product: ProductModel[];
    bestsellers: ProductModel[];
    new_products: ProductModel[];
    popular: ProductModel[];
    instagram: [];
  };

  slider: {
    id: number;
    title: string;
    subtitle: string;
    link: string;
    button_text: string;
    image: { url: string };
  }[];
}
