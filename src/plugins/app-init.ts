import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { ServiceLocator } from "@/_core/service/ServiceLocator";
import { AuthService } from "@/modules/Auth/AuthService";

export default (ctx: Context, inject: Inject) => {
  ServiceLocator.createFreshServiceLocator();

  ServiceLocator.instance.register(AuthService);

  ServiceLocator.instance.updateNuxtContext(ctx);

  configAxios(ctx);

  inject("serviceLocator", ServiceLocator.instance);

  ServiceLocator.instance.getService(AuthService).tryGetCsfrCookie();
};

const configAxios = (ctx: Context) => {
  ctx.$axios.onRequest((config) => {
    const accessToken = ServiceLocator.instance.getService(AuthService).getAccessToken();
    if (!!accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }
  });

  ctx.$axios.onResponse((config) => {
    const token = config?.headers?.access_token;
    if (!!token) {
      ServiceLocator.instance.getService(AuthService).updateAccessToken(token);
    }
  });
};
