import SeoModel from "@/_core/models/SeoModel";
import ProductModel from "@/modules/Catalog/models/ProductModel";

export default class FavoritesModel extends SeoModel {
  id: number;
  title: string;
  products: ProductModel[];

  public constructor(init?: Partial<FavoritesModel>) {
    super();
    Object.assign(this, init);
  }
}
