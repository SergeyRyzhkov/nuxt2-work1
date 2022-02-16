<template>
  <section class="order-form pt-22 md:pr-76">
    <span class="text-18">Контактная информация</span>
    <form class="mt-30" @submit.prevent="confirmOrder()">
      <BaseInput
        v-model="order.last_name"
        placeholder="Фамилия*"
        :has-error="$v.order.last_name.$error"
        class="mb-27"
        @blur="$v.order.last_name.$touch()"
      />
      <BaseInput
        v-model="order.first_name"
        placeholder="Имя*"
        :has-error="$v.order.first_name.$error"
        class="mb-27"
        @blur="$v.order.first_name.$touch()"
      />
      <BaseInput
        v-model="order.patronymic"
        placeholder="Отчество"
        :has-error="$v.order.patronymic.$error"
        class="mb-27"
        @blur="$v.order.patronymic.$touch()"
      />
      <div class="flex flex-col md:flex-row">
        <BaseInput
          v-model="order.phone"
          type="tel"
          placeholder="Телефон*"
          :mask="phoneMask"
          :has-error="$v.order.phone.$error"
          class="mb-27"
          @blur="$v.order.phone.$touch()"
        />
        <BaseInput
          v-model="order.email"
          placeholder="Email*"
          :has-error="$v.order.email.$error"
          class="mb-27 md:ml-32"
          @blur="$v.order.email.$touch()"
        />
      </div>

      <BaseInput
        v-model="order.delivery_address"
        placeholder="Адрес*"
        :has-error="$v.order.delivery_address.$error"
        @blur="$v.order.delivery_address.$touch()"
      />

      <div class="mt-52">
        <span class="text-18">Способ доставки</span>
        <div class="mt-30">
          <div v-for="iter in deliveryMethods" :key="iter.id" class="mb-16">
            <BaseRadioButton v-model="order.delivery_method_id" :label="iter.title" :value="iter.id" />
            <div class="del-info mt-9 pl-30">{{ getDeliveryMethodPrice(iter) }}, 14-16 декабря</div>
          </div>
        </div>
      </div>

      <div class="mt-52">
        <span class="text-18">Способы оплаты</span>
        <div class="mt-32">
          <div v-for="iter in paymentTypes" :key="iter.id" class="mb-16">
            <BaseRadioButton v-model="order.payment_type" :label="iter.title" :value="iter.id" />
          </div>
        </div>
      </div>
      <div class="mt-52">
        <span>Комментарий</span>
        <BaseInput v-model="order.comment" placeholder="Введите текст" class="mt-30" />
        <div class="order-checkbox mt-32">
          <BaseCheckbox id="order-privacy" v-model="order.agreement" />
          <label for="order-privacy" class="pl-28"
            >Я согласен на обработку
            <a href="javascript:void(0)" class="inline-block underline focus:no-underline">
              персональных данных и условиями оферты</a
            >
          </label>
        </div>
      </div>
      <BaseButton class="mt-40 hidden lg:block" type="submit" :disabled="!order.agreement">Оформить</BaseButton>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { email, required } from "vuelidate/lib/validators";
import { ProfileService } from "../../ProfileService";
import OrderModel from "../../models/OrderModel";
import OrderingSuccess from "@/modules/Profile/components/OrderingSuccess.vue";
import { phoneMask } from "@/utils/InputMaskDefinitions";

const validations = () => {
  return {
    order: {
      first_name: { required },
      last_name: { required },
      patronymic: { required },
      phone: { required },
      email: { required, email },
      delivery_address: { required },
    },
  };
};

@Component({ validations })
export default class OrderForm extends Vue {
  @Prop()
  order: OrderModel;

  @Prop()
  deliveryMethods: { id: number; title: string; price: number; free_from: any }[];

  @Prop()
  paymentTypes: { id: string; title: string }[];

  phoneMask = phoneMask;

  async confirmOrder() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    if (await this.$serviceLocator.getService(ProfileService).checkoutOrder(this.order)) {
      this.$modalManager.modalShow(OrderingSuccess);
      if (this.$route.name !== "orders") {
        this.$router.push({ name: "orders" });
      }
    }
  }

  getDeliveryMethodPrice(type: any) {
    return type.price?.toLocaleString("ru-RU") + " ₽";
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
