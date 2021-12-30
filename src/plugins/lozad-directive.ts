import lozad from "lozad";

export default {
  bind(el, binding) {
    el.decoding = "async";
    if (el.setAttribute) {
      if (!el.getAttribute("alt")) {
        el.setAttribute("alt", " ");
      }
      if (!el.getAttribute("data-src")) {
        el.setAttribute("data-src", binding.value);
      }
    }

    const observer = lozad(el);
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
