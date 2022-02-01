import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import CartModel from "@/modules/Profile/models/CartModel";

@Module({
  name: "CartStore",
  stateFactory: true,
  namespaced: true,
})
export default class CartStore extends VuexModule {
  private cart: CartModel[] = [];

  @VuexMutation
  private setUserCart(cartItems: CartModel[]) {
    this.cart = cartItems;
  }

  @VuexAction
  updateUserCart(cartItems: CartModel[]) {
    this.setUserCart(cartItems);
  }

  get userCart() {
    return this.cart;
  }

  get userCartCount() {
    let count = 0;
    this.cart.forEach((el) => {
      count += el.count;
    });
    return count;
  }
}
