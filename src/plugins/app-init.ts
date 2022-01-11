import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { ServiceLocator } from "@/_core/service/ServiceLocator";
import { AuthService } from "@/modules/Auth/AuthService";
import { CatalogService } from "@/modules/Catalog/CatalogService";

export default async (ctx: Context, inject: Inject) => {
  configAxios(ctx);

  ServiceLocator.createFreshServiceLocator();
  ServiceLocator.instance.updateNuxtContext(ctx);

  if (process.server) {
    await ServiceLocator.instance.getService(AuthService).tryGetCsfrCookie();
    await ServiceLocator.instance.getService(AuthService).tryRestoreSessionUser();
  }

  if (process.client) {
    await ServiceLocator.instance.getService(CatalogService).addCatalogRoutes();
  }

  inject("serviceLocator", ServiceLocator.instance);
};

// const cache = new WeakMap<String, any>();

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
