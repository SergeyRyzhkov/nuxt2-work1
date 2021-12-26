export default {
  inserted(el, binding) {
    document.body.addEventListener("click", (e) => onClickHandler(e, el, binding.value));
  },

  unbind(el, binding) {
    document.body.removeEventListener("click", (e) => onClickHandler(e, el, binding.value));
  },
};

const onClickHandler = (e, el, callback) => {
  const elem = e.target as HTMLElement;

  if (!!callback && callback instanceof Function && elem.id !== "dont_outside" && !elem.classList.contains("dont_outside")) {
    if (!el.contains(elem)) {
      e.stopPropagation();
      callback.call(e);
    }
  }
};
