import { Module, VuexModule, VuexMutation, VuexAction } from "nuxt-property-decorator";
import { RouteLink } from "@/_core/models/RouteLink";
import { store } from "@/store";

@Module({
  name: "AppStore",
  stateFactory: true,
  namespaced: true,
  dynamic: true,
  store,
})
export default class AppStore extends VuexModule {
  private breadCrumbList: RouteLink[] = [];

  get breadCrumbs() {
    return this.breadCrumbList;
  }

  @VuexMutation
  private setBreadCrumbList(breadCrumbList: RouteLink[]) {
    this.breadCrumbList = breadCrumbList;
  }

  @VuexAction
  updateBreadCrumbList(breadCrumbList: RouteLink[]) {
    this.setBreadCrumbList(breadCrumbList);
  }
}
