import ProductModel from "@/modules/Catalog/models/ProductModel";
import { BaseService } from "@/_core/service/BaseService";

export class ProfileService extends BaseService {
  getFavorites() {
    return this.getArrayOrEmpty(ProductModel, "users/favorites");
  }
}
