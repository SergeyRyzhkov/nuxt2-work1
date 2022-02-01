import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class OrderModel extends BaseViewModel {
  guest_hash: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  delivery_address: string;
  delivery_method_id: number;
  payment_type: string;
  comment: string;
  agreement: boolean;
}
