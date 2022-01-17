import ProductModel from "@/modules/Catalog/models/ProductModel";
import SeoModel from "@/_core/models/SeoModel";

export default class CartModel extends SeoModel {
  id: number;
  user_id: number | null;
  product_id: number;
  guest_hash: string | null;
  count: number;
  product: ProductModel;
}
