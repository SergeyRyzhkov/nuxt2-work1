import Vue from "vue";
import ImaskDirective from "./vue-imask-directive";

Vue.directive("imask", ImaskDirective);

Vue.directive("click-outside", {
  inserted(el, binding, vnode) {
    const vm = vnode.context;
    const callback = binding.value;

    const onClickHandler = (e) => {
      const elem = e.target as HTMLElement;
      if (!!callback && callback instanceof Function && elem.id !== "dont_outside" && !elem.classList.contains("dont_outside")) {
        if (!el.contains(elem)) {
          e.stopPropagation();
          callback.call(vm, event);
        }
      }
    };
    document.body.addEventListener("click", onClickHandler);
    //    document.body.addEventListener('touchstart', onClickHandler);
  },
});

Vue.directive("select-overflow", {
  inserted: (el, _binding, vnode) => {
    let originalWidth;
    let originalPosition;
    let originalZIndex;
    let selectIsOpen = false;

    // will be used as a placeholder, in order to fix parent height issue (due to position relative)
    const clone = el.cloneNode(true);
    // @ts-ignore
    clone.style.visibility = "hidden";

    // @ts-ignore
    vnode.child.$watch("isOpen", (isOpen) => {
      selectIsOpen = isOpen;
      if (isOpen) {
        const { offsetWidth } = el;
        originalWidth = el.style.width;
        originalPosition = el.style.position;
        originalZIndex = el.style.zIndex;
        el.style.width = `${offsetWidth}px`;
        el.style.position = "absolute";
        // @ts-ignore
        el.style.zIndex = 2;
        // @ts-ignore
        el.parentNode.insertBefore(clone, el.nextSibling); // insert after el
      } else {
        el.style.position = originalPosition;
        el.style.width = originalWidth;
        el.style.zIndex = originalZIndex;
        // @ts-ignore
        clone.parentNode.removeChild(clone);
      }
    });

    window.addEventListener(
      "wheel",
      (event) => {
        if (selectIsOpen) {
          // disabled outside scroll when select is open
          event.stopPropagation();
        }
      },
      true
    );
  },
});
