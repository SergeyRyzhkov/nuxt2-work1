import { Module, VuexModule, VuexMutation, VuexAction } from "nuxt-property-decorator";

@Module({
  name: "test",
  stateFactory: true,
  namespaced: true,
})
export default class Test extends VuexModule {
  testState = "rrrr";

  @VuexMutation
  private settestState(accessToken: string) {
    this.testState = accessToken;
  }

  @VuexAction
  public updatetestState(accessToken: string) {
    this.settestState(accessToken);
  }

  public get gettestState() {
    return this.testState;
  }
}
