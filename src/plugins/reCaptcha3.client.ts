import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import Vue from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";

export default (_ctx: Context, _inject: Inject) => {
  //   const siteKey = ctx.$config?.
  Vue.use(VueReCaptcha, { siteKey: "6LdlTwYeAAAAAAS-LIlq3AkEloETxcV0CBsCMl5X" });
};
