/* eslint-disable camelcase */
import { getModule } from "vuex-module-decorators";
import { plainToInstance } from "class-transformer";
import OrderModel from "./models/OrderModel";
import ExecutionOrderModel from "./models/ExecutionOrderModel";
import { OrderStatusType } from "./models/OredrStatusType";
import { PayStatusType } from "./models/PayStatusType";
import { AuthService } from "@/modules/Auth/AuthService";
import { BaseService } from "@/_core/service/BaseService";
import CartModel from "@/modules/Profile/models/CartModel";
import CartStore from "@/modules/Profile/store/CartStore";
import { ServiceLocator } from "@/_core/service/ServiceLocator";

export class ProfileService extends BaseService {
  get сartStore() {
    return getModule(CartStore, this.nuxtContext.store);
  }

  getCartItems() {
    return this.сartStore.userCart;
  }

  async getFavorites() {
    const favorites = await this.getAnyOrNull("users/favorites");
    if (!!favorites) {
      return favorites.map((iter) => iter.product);
    }
    return [];
  }

  async updateUserCartState() {
    if (this.isAuthenticated || (!this.isAuthenticated && this.getUserHash())) {
      const response = await this.apiRequest.get(
        "users/carts",
        !this.isAuthenticated && this.getUserHash() ? { params: { guest_hash: this.getUserHash() } } : {}
      );
      const data = response?.data?.data || response?.data;

      const deliveryMethods = response?.data?.delivery_methods;

      const cartList = !!data ? plainToInstance(CartModel, Array.from(data)) : [];
      if (!!cartList) {
        cartList.forEach((iter) => {
          iter.delivery_methods = deliveryMethods;
        });
        this.сartStore.updateUserCart(cartList);
      } else {
        this.сartStore.updateUserCart([]);
      }
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

  clearCart() {
    const cart = this.сartStore.userCart;
    if (!!cart) {
      const deletePromises = cart.map((iter) => this.deleteFromCart(iter.product_id));
      Promise.all(deletePromises);
    }
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

  getDeliveryMethods() {
    return this.сartStore.userCart.length > 0 ? this.сartStore.userCart[0].delivery_methods : [];
  }

  getPaymentMethods() {
    return [
      { id: "card", title: "Банковской картой на сайте" },
      { id: "cash", title: "Наличными при получении" },
      { id: "invoice", title: "invoice" },
    ];
  }

  async checkoutOrder(order: OrderModel) {
    if (!this.сartStore.userCart.length) {
      return false;
    }

    if (this.isAuthenticated) {
      const result = await this.apiRequest.post(`users/orders`, order);
      this.updateUserCartState();
      return result.status === 204 || result.status === 200;
    } else if (!this.isAuthenticated && this.getUserHash()) {
      order.guest_hash = this.getUserHash();
      const result = await this.apiRequest.post(`users/orders`, order);
      this.updateUserCartState();
      return result.status === 204 || result.status === 200;
    }
    return false;
  }

  cancelOrderEnabled(order: ExecutionOrderModel) {
    return (
      order.status === (OrderStatusType.created || order.status === OrderStatusType.processing) &&
      order.payment_status !== PayStatusType.paid
    );
  }

  async cancelOrder(order: ExecutionOrderModel) {
    try {
      await this.apiRequest.put(`users/orders/${order.id}/cancel`, { params: { guest_hash: this.getUserHash() } });
      return null;
    } catch (err: any) {
      return err.response?.data?.message;
    }
  }

  repeatOrderEnabled(order: ExecutionOrderModel) {
    return order.payment_status === PayStatusType.paid;
  }

  payOrderEnabled(order: ExecutionOrderModel) {
    return order.payment_status !== PayStatusType.paid;
  }

  async repeatOrder(order: ExecutionOrderModel) {
    try {
      await this.apiRequest.post(`users/orders/${order.id}/repeat`, {}, { params: { guest_hash: this.getUserHash() } });
      return null;
    } catch (err: any) {
      return err.response?.data?.message;
    }
  }

  getOrderList(date_from?: string, date_to?: string) {
    const params = { params: { guest_hash: this.getUserHash(), date_from, date_to } };
    return this.getArrayOrEmpty(ExecutionOrderModel, `users/orders`, params);
  }

  getOrder(id: number) {
    const userHash = this.getUserHash();
    // const result = this.getArrayOrEmpty(ExecutionOrderModel, `users/orders/${id}${!!userHash ? `?guest_hash=${userHash}` : ""}`);
    // console.log(id, result);
    return this.getOneOrDefault(ExecutionOrderModel, `users/orders/${id}${!!userHash ? `?guest_hash=${userHash}` : ""}`);
  }

  setUserHash(guestHash: string) {
    this.nuxtContext.app.$cookies.set("guest_hash", guestHash, { maxAge: 60 * 60 * 24 * 30 });
  }

  getUserHash() {
    return this.nuxtContext.app.$cookies.get("guest_hash") || null;
  }
}
