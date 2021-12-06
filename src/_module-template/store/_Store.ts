// import { Module, VuexModule, VuexMutation, VuexAction } from "nuxt-property-decorator";

// @Module({
//   name: "_Store",
//   stateFactory: true,
//   namespaced: true,
// })
// export default class _Store extends VuexModule {
//   private accessTokenState: string | null = null;

//   @VuexMutation
//   private setAccessTokenState(accessToken: string | null) {
//     this.accessTokenState = accessToken;
//   }

//   @VuexAction
//   public updateAccessToken(accessToken: string | null) {
//     this.setAccessTokenState(accessToken);
//   }

//   public get accessToken() {
//     return this.accessTokenState;
//   }
// }
