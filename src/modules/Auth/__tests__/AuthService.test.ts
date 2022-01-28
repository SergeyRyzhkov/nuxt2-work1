import { mount } from "@vue/test-utils";
import ResetPassword from "@/modules/Auth/pages/ResetPassword.vue";

describe("Greeting.vue", () => {
  it("отрисовывает приветствие", () => {
    const wrapper = mount(ResetPassword);

    console.log(wrapper.html());
  });
});
