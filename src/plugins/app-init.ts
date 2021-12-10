import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { getModule } from "nuxt-property-decorator";
import { ServiceLocator } from "@/_core/service/ServiceLocator";
import { AuthService } from "@/modules/Auth/AuthService";
import { PagesContentService } from "@/modules/Root/PagesContentService";
import { EmptyService } from "@/_core/service/EmptyService";
import { SeoMetaTagsBuilder } from "@/_core/service/SeoMetaTagsBuilder";
// import Test from "@/modules/Auth/store/Test";
import { lazyLoad } from "@/utils/Common";

export default async (ctx: Context, inject: Inject) => {
  ServiceLocator.createFreshServiceLocator();

  ServiceLocator.instance.register(SeoMetaTagsBuilder);
  ServiceLocator.instance.register(EmptyService);
  ServiceLocator.instance.register(AuthService);
  ServiceLocator.instance.register(PagesContentService);

  ServiceLocator.instance.updateNuxtContext(ctx);

  configAxios(ctx);

  if (process.server) {
    await ServiceLocator.instance.getService(AuthService).tryGetCsfrCookie();
  }

  // @ts-ignore
  // ctx.store.registerModule("AppStore", await lazyLoad(import("@/modules/Root/store/AppStore.ts")));

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
