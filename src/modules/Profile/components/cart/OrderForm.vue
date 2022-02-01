<template>
  <section class="order-form pt-22 md:pr-76">
    <h2>Контактная информация</h2>
    <form class="mt-30" @submit.prevent="">
      <BaseInput placeholder="ФИО*" class="mb-27" />
      <div class="lg:mb-27 justify-between lg:flex">
        <BaseInput placeholder="Телефон*" class="mb-27 lg:mb-0 lg:w-1/2 lg:pr-16" />
        <BaseInput placeholder="Email*" class="mb-27 lg:mb-0 lg:w-1/2 lg:pl-16" />
      </div>
      <BaseInput placeholder="Адрес*" />
      <div class="mt-52">
        <h2>Способ доставки</h2>
        <div class="mt-30">
          <div class="mb-16">
            <BaseRadioButton label="Доставка до двери курьером СДЭК" />
            <div class="del-info pl-30 mt-9">275₽, 14-16 декабря</div>
          </div>
          <div class="mb-16">
            <BaseRadioButton label="Доставка до пункта выдачи СДЭК" />
            <div class="del-info pl-30 mt-9">135₽, 20-22 декабря</div>
          </div>
          <div class="mb-16">
            <BaseRadioButton label="Самовывоз из офиса г. Москва" />
            <div class="del-info pl-30 mt-9">0₽, 14-16 декабря</div>
          </div>
          <div>
            <BaseRadioButton label="Самовывоз из офиса г. Москва" />
            <div class="del-info pl-30 mt-9">0₽, 14-16 декабря</div>
          </div>
        </div>
      </div>
      <div class="mt-52">
        <h2>Способа оплаты</h2>
        <div class="mt-32">
          <BaseRadioButton label="Наличными при получении" class="mb-20" />
          <BaseRadioButton label="Банковской картой на сайте" />
        </div>
      </div>
      <div class="mt-52">
        <h2>Комментарий</h2>
        <BaseInput placeholder="Комментарий" class="mt-30" />
        <div class="order-checkbox mt-32">
          <BaseCheckbox id="order-privacy" />
          <label for="order-privacy" class="pl-28"
            >Я согласен на обработку
            <a href="javascript:void(0)" class="inline-block underline"> персональных данных и условиями оферты</a>
          </label>
        </div>
      </div>
      <BaseButton class="mt-40 hidden lg:block" type="submit" @click="confirmOrder()">Оформтиь</BaseButton>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import OrderModel from "../../models/OrderModel";
import { ProfileService } from "../../ProfileService";

@Component
export default class OrderForm extends Vue {
  confirmOrder() {
    const order = new OrderModel();

    order.first_name = "first_name";
    order.agreement = true;
    order.last_name = "last_name";
    order.phone = "79218941537";
    order.email = "ryzhkov@mail.ru";
    order.delivery_address = "Земля";
    order.delivery_method_id = 2;
    order.payment_type = "card";
    order.comment = "test comment";

    this.$serviceLocator.getService(ProfileService).checkoutOrder(order);
  }
}
</script>

<style lang="scss">
.order-form {
  .del-info {
    font-size: 12px;
    color: $text-gray;
    line-height: 15px;
  }
  .order-checkbox {
    @apply flex items-center;
    > label {
      a {
        color: #131313;
      }
    }
    color: $text-gray;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
