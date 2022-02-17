import SessionUser from "@/modules/Auth/models/SessionUser";
import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class OrderModel extends BaseViewModel {
  public constructor(init?: Partial<OrderModel | SessionUser>) {
    super();
    Object.assign(this, init);
  }

  guest_hash = "";
  first_name = "";
  last_name = "";
  patronymic = "";
  phone = "";
  email = "";

  delivery_address = "";
  delivery_method_id = 1;
  payment_type = "card";
  comment = "";
  agreement = true;
}
