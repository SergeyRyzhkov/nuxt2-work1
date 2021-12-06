export const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};

// public download(_url: string, _config?: any) {
//     //  try {
//     //   const response = await this.$serviceRegistry
//     //     .getService(AuthService)
//     //     .apiRequest.getJSON(`admin/contact-form/template/back/${this.contactForm.clContactFormId}`, { responseType: "blob" });
//     //   if (!!response && response.status === 200) {
//     //     const url = window.URL.createObjectURL(new Blob([response.data]));
//     //     const link = document.createElement("a");
//     //     link.href = url;
//     //     link.setAttribute("download", `${this.contactForm.clContactFormFromTemplate}`);
//     //     document.body.appendChild(link);
//     //     link.click();
//     // Надо убрать линк-элемент потом (см. МедТех)
//     //   }
//     // } catch {}
//   }
