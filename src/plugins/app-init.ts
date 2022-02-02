import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { ServiceLocator } from "@/_core/service/ServiceLocator";
import { AuthService } from "@/modules/Auth/AuthService";
import { CatalogService } from "@/modules/Catalog/CatalogService";
import { ProfileService } from "@/modules/Profile/ProfileService";

export default (ctx: Context, inject: Inject) => {
  configAxios(ctx);

  ServiceLocator.createFreshServiceLocator();
  ServiceLocator.instance.updateNuxtContext(ctx);

  initAppState();

  if (process.client) {
    ServiceLocator.instance.getService(CatalogService).addCatalogRoutes();
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

  ctx.$axios.onError((err) => {
    console.log(err);
  });

  ctx.$axios.onRequestError((err) => {
    console.log(err);
  });

  ctx.$axios.onResponseError((err) => {
    console.log(err);
  });
};

const initAppState = async () => {
  if (process.server) {
    // await ServiceLocator.instance.getService(AuthService).tryGetCsfrCookie();
    await ServiceLocator.instance.getService(AuthService).tryRestoreSessionUser();
  }

  try {
    await ServiceLocator.instance.getService(ProfileService).updateUserCartState();
  } catch (err) {
    console.log(err);
  }
};
