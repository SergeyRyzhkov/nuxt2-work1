import { Module, VuexModule, VuexMutation, VuexAction } from "nuxt-property-decorator";
import SessionUser from "@/modules/Auth/models/SessionUser";

@Module({
  name: "AuthStore",
  stateFactory: true,
  namespaced: true,
})
export default class AuthStore extends VuexModule {
  private sessionUserState: SessionUser = SessionUser.anonymousUser;
  private accessTokenState: string | null = null;

  @VuexMutation
  private setAccessTokenState(accessToken: string | null) {
    this.accessTokenState = accessToken;
  }

  @VuexMutation
  private setSessionUser(sessionUser: SessionUser) {
    const setVal = sessionUser ?? SessionUser.anonymousUser;
    this.sessionUserState = setVal;
  }

  @VuexAction
  public updateAccessToken(accessToken: string | null) {
    this.setAccessTokenState(accessToken);
    if (!accessToken) {
      this.setSessionUser(SessionUser.anonymousUser);
    }
  }

  @VuexAction
  public updateSessionUser(user: SessionUser) {
    this.setSessionUser(user);
    if (!user || user.id === 0) {
      this.setAccessTokenState(null);
    }
  }

  public get sessionUser() {
    return this.sessionUserState;
  }

  public get accessToken() {
    return this.accessTokenState;
  }
}
