import { getModule } from "vuex-module-decorators";
import LoginData from "./models/LoginData";
import { LogonResult, LogonStatus } from "./models/LogonResult";
import RegistrationData from "./models/RegistrationData";
import { RegistrationResult, RegistrationStatus } from "./models/RegistrationResult";
import SessionUser from "./models/SessionUser";
import AuthStore from "./store/AuthStore";
import { ProfileService } from "@/modules/Profile/ProfileService";
import { BaseService } from "@/_core/service/BaseService";
import { ServiceLocator } from "@/_core/service/ServiceLocator";

export class AuthService extends BaseService {
  cookieTokenCookieName = "KAYPRO_TOKEN";

  public get authStore() {
    return getModule(AuthStore, this.nuxtContext.store);
  }

  get isAuthenticated() {
    const sessUser = this.authStore.sessionUser;
    return !!sessUser && sessUser.id > 0;
  }

  get isUserActive() {
    const sessUser = this.authStore.sessionUser;
    return !!sessUser && sessUser.id > 0 && sessUser.status === "active";
  }

  public getSessionUser(): SessionUser {
    return this.authStore.sessionUser;
  }

  public getAccessToken(): string | null {
    return this.authStore.accessToken;
  }

  public updateAccessToken(accessToken: string | null) {
    this.authStore.updateAccessToken(accessToken);
    if (!accessToken) {
      this.authStore.updateSessionUser(SessionUser.anonymousUser);
    }
  }

  public clearAccessToken() {
    this.updateAccessToken(null);
    this.authStore.updateSessionUser(SessionUser.anonymousUser);
    this.removeTokenFromCookies();
  }

  public async login(loginData: LoginData) {
    const logonResult = new LogonResult();
    const guestHash = this.nuxtContext.$serviceLocator.getService(ProfileService).getUserHash();
    try {
      await this.tryGetCsfrCookie();
      const response = await this.apiRequest.post("users/login", { ...loginData, guestHash });

      if (response.status === 200 || response.status === 204) {
        const accessToken = response?.data?.access_token;
        if (!!accessToken) {
          this.updateAccessToken(accessToken);
          if (await this.getMeAndSetSessionUser()) {
            logonResult.logonStatus = LogonStatus.OK;
            if (loginData.rememberMe) {
              this.saveTokenToCookie(accessToken);
            }
          }
        } else {
          logonResult.logonStatus = LogonStatus.RegistrationNotConfirmed;
        }
      }
    } catch (err: any) {
      logonResult.logonStatus = LogonStatus.Failed;
    }

    return logonResult;
  }

  public async logout() {
    try {
      this.clearAccessToken();
      await this.apiRequest.post("users/logout");
      await ServiceLocator.instance.getService(ProfileService).updateUserCartState();
    } catch {}
  }

  public async register(registrationData: RegistrationData) {
    const result = new RegistrationResult();

    try {
      const response = await this.apiRequest.post("users/register", registrationData);
      if (response.status === 204) {
        result.registrationStatus = RegistrationStatus.OK;
      }
    } catch (err: any) {
      if (!!err && err.status === 422) {
        if (err.data.errors.email && err.data.errors.email.length) {
          result.registrationStatus = RegistrationStatus.EmailAlreadyExists;
        }
        if (err.data.errors.phone && err.data.errors.phone.length) {
          result.registrationStatus = RegistrationStatus.PhoneAlreadyExists;
        }
        if (err.data.errors.phone && err.data.errors.phone.length && err.data.errors.email && err.data.errors.email.length) {
          result.registrationStatus = RegistrationStatus.AlreadyExists;
        }
      } else {
        result.registrationStatus = RegistrationStatus.Invalid;
      }
    }
    return result;
  }

  public async verifyEmail(email: string, password: string, code: string) {
    try {
      const response = await this.apiRequest.post("users/verify/confirm?_method=PUT", { email, code });
      if (response.status === 200) {
        const logonData = new LoginData();
        logonData.email = email;
        logonData.password = password;
        const logonResult = await this.login(logonData);
        if (logonResult.logonStatus === LogonStatus.OK) {
          return await this.getMeAndSetSessionUser();
        }
      }
    } catch (err: any) {
      return false;
    }
    return false;
  }

  public async recoverPassword(email: string) {
    try {
      await this.apiRequest.post("users/password/recover", { email });
      return true;
    } catch (e) {
      return false;
    }
  }

  public async resendVerifyEmail(email: string) {
    try {
      await this.apiRequest.post("users/verify/resend", { email });
      return true;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line camelcase
  public async updatePassword(data: RegistrationData) {
    try {
      const response = await this.apiRequest.post("users/profile/change-password", {
        // eslint-disable-next-line camelcase
        old_password: data.oldPassword,
        password: data.password,
        // eslint-disable-next-line camelcase
        password_confirmation: data.password_confirmation,
      });
      return response.status === 200;
    } catch (err) {
      return false;
    }
  }

  public async updateProfile(registrationData: RegistrationData) {
    registrationData.phone = `+${registrationData.phone}`;
    return await this.apiRequest.post("users/profile?_method=PUT", registrationData);
  }

  public async getMeAndSetSessionUser(options?: any) {
    const currentUser = await this.getOneOrDefault(SessionUser, "users/profile", options);
    if (!!currentUser && currentUser.id > 0) {
      this.authStore.updateSessionUser(currentUser);
      return true;
    }
    return false;
  }

  public async tryGetCsfrCookie() {
    try {
      this.apiRequest.setBaseURL(this.ctx.$config.baseUrl);
      await this.apiRequest.get("sanctum/csrf-cookie");
    } catch (err: any) {
    } finally {
      this.apiRequest.setBaseURL(this.ctx.$config.apiUrl);
    }
  }

  public async tryRestoreSessionUser() {
    const accessToken = this.nuxtContext.app.$cookies.get(this.cookieTokenCookieName, { parseJSON: false });
    //  const xsrfTokenCookie = this.nuxtContext.app.$cookies.get("XSRF-TOKEN", { parseJSON: false });
    if (!!accessToken) {
      try {
        const options = {
          headers: { authorization: `Bearer ${accessToken}` },
          // "X-XSRF-TOKEN": xsrfTokenCookie,
        };
        if (await this.getMeAndSetSessionUser(options)) {
          this.updateAccessToken(accessToken);
        }
      } catch (errr) {
        // ServiceLocator.instance.getService(LogService).log(errr);
      }
    }
  }

  public saveTokenToCookie(token: string) {
    this.nuxtContext.app.$cookies.set(this.cookieTokenCookieName, token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      parseJSON: false,
    });
  }

  public removeTokenFromCookies() {
    this.nuxtContext.app.$cookies.remove(this.cookieTokenCookieName);
  }
}
