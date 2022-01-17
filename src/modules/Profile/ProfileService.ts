import ProductModel from "@/modules/Catalog/models/ProductModel";
import { BaseService } from "@/_core/service/BaseService";
import CartModel from "@/modules/Profile/models/CartModel";
import CartStore from "@/modules/Profile/store/CartStore";
import { getModule } from "vuex-module-decorators";

export class ProfileService extends BaseService {

  public get CartStore() {
    return getModule(CartStore, this.nuxtContext.store);
  }

  getFavorites() {
    return this.getArrayOrEmpty(ProductModel, "users/favorites");
  }

  async getUserCart() {
    const cart = await this.getArrayOrEmpty(CartModel, "users/carts", {params: {guest_hash: this.userHash}});
    this.CartStore.setUserCart(cart)
  }

  changeCountCartItem(product_id: number, count: number){
    // this.apiRequest.post(`users/carts/${product_id}`);
    // this.getUserCart()
  }

  get userHash() {
    return this.CartStore.getUserHash
  }
}
