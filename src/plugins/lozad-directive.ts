import lozad from "lozad";

export default {
  bind(el, binding) {
    el.decoding = "async";

    // const height = el.style.height || el.getAttribute("height");
    // if (!!height) {
    //   el.style.height = height + "px";
    // }

    // if (!el.src) {
    //   el.src = "/images/empty-image.jpg";
    // }

    // if (!el.style.background) {
    //   el.style.background = "linear-gradient(225deg, rgb(242, 242, 242) 28%, rgb(126, 126, 126))";
    // }

    if (!el.getAttribute("alt")) {
      el.setAttribute("alt", " ");
    }
    if (!el.getAttribute("data-src")) {
      el.setAttribute("data-src", binding.value);
    }

    const observer = lozad(el, {
      //   loaded: () => {
      //     if (!el.src) {
      //       el.src = "/images/empty-image.jpg";
      //     }
      //     el.style.background = "";
      //   },
    });
    observer.observe();
  },

  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      el.setAttribute("data-src", binding.value);
      if (el.getAttribute("data-loaded") === "true") {
        el.setAttribute("src", binding.value);
      }
    }
  },
};
