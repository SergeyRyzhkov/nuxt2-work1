import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { ServiceLocator } from "@/_core/service/ServiceLocator";
import { AuthService } from "@/modules/Auth/AuthService";
import { PagesContentService } from "@/modules/Root/PagesContentService";

export default async (ctx: Context, inject: Inject) => {
  ServiceLocator.createFreshServiceLocator();

  ServiceLocator.instance.register(AuthService);
  ServiceLocator.instance.register(PagesContentService);

  ServiceLocator.instance.updateNuxtContext(ctx);

  configAxios(ctx);

  if (process.server) {
    await ServiceLocator.instance.getService(AuthService).tryGetCsfrCookie();
  }

  inject("serviceLocator", ServiceLocator.instance);
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
