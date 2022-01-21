import { getModule } from "vuex-module-decorators";
import { AuthService } from "@/modules/Auth/AuthService";
import ProductModel from "@/modules/Catalog/models/ProductModel";
import { BaseService } from "@/_core/service/BaseService";
import CartModel from "@/modules/Profile/models/CartModel";
import CartStore from "@/modules/Profile/store/CartStore";
import { ServiceLocator } from "@/_core/service/ServiceLocator";

export class ProfileService extends BaseService {
  public get сartStore() {
    return getModule(CartStore, this.nuxtContext.store);
  }

  getFavorites() {
    return this.getArrayOrEmpty(ProductModel, "users/favorites");
  }

  async updateUserCartState() {
    if (this.isAuthenticated) {
      const cart = await this.getArrayOrEmpty(CartModel, "users/carts");
      this.сartStore.setUserCart(cart);
    }
    if (!this.isAuthenticated && this.getUserHash()) {
      const cart = await this.getArrayOrEmpty(CartModel, "users/carts", { params: { guest_hash: this.getUserHash() } });
      this.сartStore.setUserCart(cart);
    }
  }

  get isAuthenticated() {
    return ServiceLocator.instance.getService(AuthService).isAuthenticated;
  }

  async addToCart(productId: number, count: number) {
    if (this.isAuthenticated) {
      await this.apiRequest.post(`users/carts`, { product_id: productId, count });
    } else if (!this.isAuthenticated && this.getUserHash()) {
      await this.apiRequest.post(`users/carts`, { product_id: productId, count, guest_hash: this.getUserHash() });
    } else {
      const result = await this.apiRequest.post(`users/carts`, { product_id: productId, count });
      this.setUserHash(result.data.guest_hash);
    }
    this.updateUserCartState();
  }

  async deleteFromCart(id: number) {
    if (this.isAuthenticated) {
      await this.apiRequest.delete(`users/carts/${id}`);
    } else if (!this.isAuthenticated && this.getUserHash()) {
      await this.apiRequest.delete(`users/carts/${id}`, { params: { guest_hash: this.getUserHash() } });
    }
    this.updateUserCartState();
  }

  async changeCountCartItem(id: number, count: number) {
    if (count < 1) {
      return;
    } else {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("count", String(count));
      if (!this.isAuthenticated && this.getUserHash()) {
        formData.append("guest_hash", this.getUserHash());
      }
      await this.apiRequest.post(`users/carts/${id}`, formData);
    }
    this.updateUserCartState();
  }

  setUserHash(guestHash: string) {
    this.nuxtContext.app.$cookies.set("guest_hash", guestHash, { maxAge: 60 * 60 * 24 * 30 });
  }

  getUserHash() {
    return this.nuxtContext.app.$cookies.get("guest_hash") || null;
  }
}
