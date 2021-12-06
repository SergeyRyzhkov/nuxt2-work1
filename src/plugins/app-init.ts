import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
// import { AppConfig } from "@/AppConfig";
import { ServiceLocator } from "@/_core/service/ServiceLocator";
import { AuthService } from "@/modules/Auth/AuthService";

export default (ctx: Context, inject: Inject) => {
  ServiceLocator.createFreshServiceLocator();
  ServiceLocator.instance.register(AuthService);
  ServiceLocator.instance.updateNuxtContext(ctx);

  inject("serviceLocator", ServiceLocator.instance);

  // await ServiceLocator.instance.getService(AuthService).tryRestoreSessionUser();
};
