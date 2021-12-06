import { getModule } from "vuex-module-decorators";
import LoginData from "./models/LoginData";
import { LogonResult, LogonStatus } from "./models/LogonResult";
import RegistrationData from "./models/RegistrationData";
import { RegistrationResult, RegistrationStatus } from "./models/RegistrationResult";
import SessionUser from "./models/SessionUser";
import AuthStore from "./store/AuthStore";
import { BaseService } from "@/_core/service/BaseService";

export class AuthService extends BaseService {
  cookieTokenCookieName = "KAYPRO_TOKEN";

  public get authStore() {
    return getModule(AuthStore, this.nuxtContext.store);
  }

  get isAuthenticated() {
    const sessUser = this.authStore.sessionUser;
    return !!sessUser && sessUser.id > 0;
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
    if (!!accessToken) {
      this.saveTokenToCookie(accessToken);
    }
  }

  public clearAccessToken() {
    this.updateAccessToken(null);
    this.authStore.updateSessionUser(SessionUser.anonymousUser);
    this.removeTokenFromCookies();
  }

  public async login(loginData: LoginData) {
    const logonResult = new LogonResult();

    try {
      const response = await this.apiRequest.post("users/login", loginData);
      if (response.status === 200) {
        const accessToken = response.data.token;
        if (!!accessToken) {
          this.updateAccessToken(accessToken);
          if (await this.getMeAndSetSessionUser()) {
            logonResult.logonStatus = LogonStatus.OK;
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
    this.clearAccessToken();
    await this.apiRequest.post("users/logout");
  }

  public async register(registrationData: RegistrationData) {
    const result = new RegistrationResult();

    try {
      const response = await this.apiRequest.post("users/register", registrationData);
      if (response.status === 201) {
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
      await this.apiRequest.post("users/recover", { email });
    } catch (e) {}
  }

  public async resendVerifyEmail(email: string) {
    try {
      await this.apiRequest.post("users/verify/resend", { email });
      return true;
    } catch (e) {
      return false;
    }
  }

  public async updatePassword(code: number, newPassword: string) {
    try {
      const response = await this.apiRequest.put("users/password/recover?_method=PUT", { code, new_password: newPassword });
      return response.status === 200;
    } catch (err) {
      return false;
    }
  }

  public async getMeAndSetSessionUser() {
    const currentUser = await this.getOneOrDefault(SessionUser, "users/me");
    if (!!currentUser && currentUser.id > 0) {
      this.authStore.updateSessionUser(currentUser);
      return true;
    }
    return false;
  }

  public async tryRestoreSessionUser() {
    const accessToken = this.nuxtContext.app.$cookies.get(this.cookieTokenCookieName, { parseJSON: false });
    if (!!accessToken) {
      try {
        const options = {
          headers: { authorization: `Bearer ${accessToken}` },
        };
        const user = await this.getOneOrDefault(SessionUser, "users/me", options);
        if (!!user && user.id > 0) {
          this.authStore.updateSessionUser(user);
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
