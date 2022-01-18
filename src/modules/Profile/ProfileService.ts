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
    if (this.isAuthenticated) {
      const cart = await this.getArrayOrEmpty(CartModel, "users/carts");
      this.CartStore.setUserCart(cart);
    } else if ( !this.isAuthenticated && this.userHash) {
      const cart = await this.getArrayOrEmpty(CartModel, "users/carts", {params: {guest_hash: this.userHash}});
      this.CartStore.setUserCart(cart);
    } else {
      return;
    }
  }

  get isAuthenticated() {
    return this.nuxtContext.$serviceLocator.getService(AuthService).isAuthenticated;
  }

  async AddToCart(product_id: number) {
    if (this.isAuthenticated) {
      await this.apiRequest.post(`users/carts`, {product_id});
    } else if (!this.isAuthenticated && this.userHash) {
      await this.apiRequest.post(`users/carts`, {product_id, guest_hash: this.userHash});
    } else {
      const result = await this.apiRequest.post(`users/carts`, {product_id});
      this.setUserHash(result.data.guest_hash);
    }
    this.getUserCart();
  }

  async deleteFromCart(id: number) {
    if (this.isAuthenticated) {
      await this.apiRequest.delete(`users/carts/${id}`);
    } else if (!this.isAuthenticated && this.userHash) {
      await this.apiRequest.delete(`users/carts/${id}`, {params:{guest_hash: this.userHash}});
    }
    this.getUserCart();
  }

 async changeCountCartItem(id: number, count: number) {
    const formData = new FormData();
    formData.append('_method', "PUT")
    if (!this.isAuthenticated && this.userHash) {
      formData.append('guest_hash', this.userHash)
    }
   await this.apiRequest.post(`users/carts/${id}`, formData);
    this.getUserCart();
  }

  setUserHash(guest_hash: string) {
    this.nuxtContext.app.$cookies.set("guest_hash", guest_hash);
  }

  get userHash() {
    return this.nuxtContext.app.$cookies.get("guest_hash") || null;
  }
}
