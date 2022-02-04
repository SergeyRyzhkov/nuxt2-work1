import OrderModel from "./OrderModel";
import ProductModel from "@/modules/Catalog/models/ProductModel";

export default class ExecutionOrderModel extends OrderModel {
  id: number;
  delivery_price: number;
  delivery_status: string;
  delivery_method: { id: number; title: string; price: number; free_from: any }[];
  payment_type: { id: number; title: string }[];
  payment_status: string;
  products_price: number;
  created_at: string;
  order_items_count: number;
  order_items: { product: ProductModel }[];
}
