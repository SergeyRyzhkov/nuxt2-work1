const options = {
  root: null,
  rootMargin: "0px",
  // процент пересечения - половина изображения
  threshold: 0.5,
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
        }
        observer.unobserve(lazyImg);
      }
    });
  }, options);
}

export const observeImage = (target: HTMLElement) => {
  observer.observe(target);
};
