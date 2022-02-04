import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class OrderModel extends BaseViewModel {
  guest_hash = "";
  first_name = "";
  last_name = "";
  patronymic = "";
  phone = "";
  email = "";

  delivery_address = "";
  delivery_method_id = 1;
  payment_type_id = 1;
  comment = "";
  agreement = true;
}
