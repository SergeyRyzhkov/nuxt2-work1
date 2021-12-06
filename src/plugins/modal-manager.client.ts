import { Context, Plugin } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import Vue, { ComponentOptions, AsyncComponent } from "vue";

import VModal from "vue-js-modal/dist/ssr.nocss";

declare module "vue/types/vue" {
  interface Vue {
    $modal: VModal;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $modalManager: ModalManager;
  }
}

Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true,
  dynamicDefaults: {
    clickToClose: true,
    adaptive: true,
    maxWidth: 568,
    height: "auto",
    scrollable: true,
  },
});

interface ModalOptions {
  name?: string;
  delay?: number;
  resizable?: boolean;
  adaptive?: boolean;
  draggable?: boolean;
  scrollable?: boolean;
  reset?: boolean;
  clickToClose?: boolean;
  transition?: string;
  overlayTransition?: string;
  classes?: String | String[];
  styles?: String | String[] | Object;
  width?: string | number;
  height?: string | number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  pivotX?: number;
  pivotY?: number;
  root?: typeof Vue;
}

class ModalManager {
  modalShow(
    modal: typeof Vue | ComponentOptions<Vue> | AsyncComponent,
    props = {},
    options: ModalOptions = {},
    events: any = {}
  ): Promise<any> {
    return new Promise((resolve) => {
      Vue.prototype.$modal.show(
        modal,
        {
          ...props,
          // Пример использования в компоненте модала. Должен быть пропс returnDataResolver
          // public async onOkClick () {
          // if (!!this.returnDataResolver) {
          //   this.returnDataResolver(this.ekosetManager);
          // }
          // this.$emit("close", this.ekosetManager);
          // }
          returnDataResolver: resolve,
        },
        options,
        events
      );
    });
  }
}

const initModals: Plugin = (_ctx: Context, inject: Inject) => {
  inject("modalManager", new ModalManager());
};

export default initModals;
