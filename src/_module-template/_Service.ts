// import { getModule } from "vuex-module-decorators";
// import { BaseService } from "@/_core/service/BaseService";
// import AuthStore from "@/modules/Auth/store/AuthStore";
// import SessionUser from "@/modules/Auth/models/SessionUser";

// export class _Service extends BaseService {
//   public get authStore() {
//     return getModule(AuthStore, this.nuxtContext.store);
//   }

//   get isAuthenticated() {
//     const sessUser = this.authStore.sessionUser;
//     return !!sessUser && sessUser.id > 0;
//   }

//   public getSessionUser(): SessionUser {
//     return this.authStore.sessionUser;
//   }

//   public getAccessToken(): string | null {
//     return this.authStore.accessToken;
//   }

//   public updateAccessToken(accessToken: string | null) {
//     this.authStore.updateAccessToken(accessToken);
//     if (!accessToken) {
//       this.authStore.updateSessionUser(SessionUser.anonymousUser);
//     }
//   }
// }
