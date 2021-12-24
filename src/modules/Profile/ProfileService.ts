import ProductModel from "@/modules/Catalog/models/ProductModel";
import { BaseService } from "@/_core/service/BaseService";

export class ProfileService extends BaseService {
  getFavorites() {
    const res: ProductModel[] = [];
    for (let i = 0; i < 16; i++) {
      res.push(new ProductModel());
    }
    return res;
  }
}
