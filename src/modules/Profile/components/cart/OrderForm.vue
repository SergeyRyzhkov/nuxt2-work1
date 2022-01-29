<template>
  <section class="order-form pt-22 md:pr-76">
    <h2>Контактная информация</h2>
    <form class="mt-30" @submit.prevent="">
      <BaseInput placeholder="ФИО*" class="mb-27" />
      <div class="justify-between lg:mb-27 lg:flex">
        <BaseInput placeholder="Телефон*" class="mb-27 lg:mb-0 lg:w-1/2 lg:pr-16" />
        <BaseInput placeholder="Email*" class="mb-27 lg:mb-0 lg:w-1/2 lg:pl-16" />
      </div>
      <BaseInput placeholder="Адрес*" />
      <div class="mt-52">
        <h2>Способ доставки</h2>
        <div class="mt-30">
          <div class="mb-16">
            <BaseRadioButton label="Доставка до двери курьером СДЭК" />
            <div class="del-info mt-9 pl-30">275₽, 14-16 декабря</div>
          </div>
          <div class="mb-16">
            <BaseRadioButton label="Доставка до пункта выдачи СДЭК" />
            <div class="del-info mt-9 pl-30">135₽, 20-22 декабря</div>
          </div>
          <div class="mb-16">
            <BaseRadioButton label="Самовывоз из офиса г. Москва" />
            <div class="del-info mt-9 pl-30">0₽, 14-16 декабря</div>
          </div>
          <div>
            <BaseRadioButton label="Самовывоз из офиса г. Москва" />
            <div class="del-info mt-9 pl-30">0₽, 14-16 декабря</div>
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
      <BaseButton class="mt-40 hidden lg:block" type="submit">Оформтиь</BaseButton>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class OrderForm extends Vue {}
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
