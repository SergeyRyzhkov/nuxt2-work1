import ProductModel from "@/modules/Catalog/models/ProductModel";
import { BaseService } from "@/_core/service/BaseService";

export class ProfileService extends BaseService {

  async getFavorites() {
    return await this.getOneOrDefault(ProductModel, "/favorites");
  }

}
