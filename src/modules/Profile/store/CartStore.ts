import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import CartModel from "@/modules/Profile/models/CartModel";

@Module({
  name: "CartStore",
  stateFactory: true,
  namespaced: true,
})
export default class CartStore extends VuexModule {
  private cart: CartModel[] = [];
  // private userHash: string = "732bfa6bc0224eee8467de517fe0058a";

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

  // get getUserHash() {
  //   return this.userHash;
  // }

  get userCartCount() {
    let count = 0;
    this.cart.forEach((el) => {
      count += el.count;
    });
    return count;
  }
}
