import OrderModel from "./OrderModel";
import { OrderStatusType } from "./OredrStatusType";
import { PayStatusType } from "./PayStatusType";
import ProductModel from "@/modules/Catalog/models/ProductModel";

export default class ExecutionOrderModel extends OrderModel {
  id: number;
  delivery_price: number;
  status: OrderStatusType;
  delivery_method: { id: number; title: string; price: number; free_from: any }[];
  payment_type: string;
  payment_status: PayStatusType;
  products_price: number;
  created_at: string;
  order_items_count: number;
  order_items: { product: ProductModel }[];
}
