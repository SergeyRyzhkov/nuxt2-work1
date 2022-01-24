const loadClassesName = ["rsn-skeleton", "rsn-animate-wave"];

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

let observer = {
  observe(_target: HTMLElement) {},
};

if (process.client) {
  observer = new IntersectionObserver((images, observer) => {
    images.forEach((iter) => {
      if (iter.isIntersecting) {
        const lazyImg = iter.target;
        if (!!lazyImg) {
          lazyImg.setAttribute("src", lazyImg.getAttribute("data-src") || "");

          lazyImg.addEventListener("load", () => {
            lazyImg.setAttribute("data-loaded", "true");
            lazyImg.classList.remove(...loadClassesName);
          });
        }
        observer.unobserve(lazyImg);
      }
    });
  }, options);
}

export const observeImage = (target: HTMLElement) => {
  target.classList.add(...loadClassesName);
  observer.observe(target);
};
