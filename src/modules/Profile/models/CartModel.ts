import ProductModel from "@/modules/Catalog/models/ProductModel";
import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class CartModel extends BaseViewModel {
  id: number;
  user_id: number | null;
  product_id: number;
  guest_hash: string | null;
  count: number;
  product: ProductModel;
  delivery_time;
  delivery_methods: { id: number; title: string; price: number; free_from: any }[];
  payment_types: { id: number; title: string }[];
}
