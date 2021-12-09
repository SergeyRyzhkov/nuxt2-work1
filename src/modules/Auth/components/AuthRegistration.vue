<template>
  <div>
    <AuthSubHeader :title="title" :tabsVisible="true" :isActive="'registration'" @setFormType="(type) => $emit('setFormType', type)"/>
    <BaseInput placeholder="ФИО*" class="mb-27"/>
    <BaseInput placeholder="Телефон*" class="mb-27"/>
    <BaseInput placeholder="Email*" class="mb-27"/>
    <BaseInput placeholder="Адрес*" class="mb-27"/>
    <BaseInput placeholder="Пароль*" class="mb-24"/>
    <BaseInput placeholder="Подтвердите пароль*" class="mb-27"/>
    <div class="mt-24 flex items-center justify-between">
      <div class="flex flex-col mb-40">
        <BaseCheckbox
         :id="'privacy'"
         class="mb-14"
        :label="'Я согласен на обработку персональных данных'"
        />
        <BaseCheckbox :label="'Информирование о новинках и акциях'" :id="'news'"
        />
      </div>
    </div>
    <BaseButton>Войти</BaseButton>
  </div>
</template>

<script>
import {Vue, Component} from "nuxt-property-decorator";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue"

@Component({components:{AuthSubHeader}})
export default class AuthRegistration extends Vue {
  title = 'Войдите в свой аккаунт'
}
</script>

<style scoped>

</style>
