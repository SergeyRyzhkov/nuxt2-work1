import { AuthService } from "@/modules/Auth/AuthService";
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
    let params;
    if (!this.isAuthenticated && this.userHash) {
        params.guest_hash = this.userHash
    }
      const cart = await this.getArrayOrEmpty(CartModel, "users/carts", {params});
    this.CartStore.setUserCart(cart)
  }

  get isAuthenticated() {
    return this.nuxtContext.$serviceLocator.getService(AuthService).isAuthenticated;
  }

 async AddToCart(product_id: number) {
    const result = await this.apiRequest.post(`users/carts`, {product_id});
    if (!this.userHash) {
      this.setUserHash(result.data.guest_hash)
    }
  }

  changeCountCartItem(product_id: number, count: number){
    this.apiRequest.post(`users/carts/${product_id}`);
    this.getUserCart()
  }

  setUserHash(guest_hash: string) {
    this.nuxtContext.app.$cookies.set('guest_hash', guest_hash)
  }

  get userHash() {
    return this.nuxtContext.app.$cookies.get('guest_hash') || null
  }
}
