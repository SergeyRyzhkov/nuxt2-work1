<template>
<div>
  <AuthSubHeader :title="title" :tabsVisible="true" :isActive="'login'" @setFormType="(type) => $emit('setFormType', type)"/>
  <BaseInput placeholder="E-mail*" class="mb-27" />
  <BaseInput placeholder="Пароль*" />
  <div class="mt-24 flex items-center justify-between">
    <BaseCheckbox :id="'remember-me'" :label="'Запомнить меня'"/>
    <div class="text-14 leading-20 cursor-pointer" @click="$emit('setFormType', 'reset')">Забыли пароль ?</div>
  </div>
  <BaseButton class="mt-40">Войти</BaseButton>
</div>
</template>

<script>
import {Vue, Component} from "nuxt-property-decorator";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue"

@Component({components:{AuthSubHeader}})
export default class AuthLogin extends Vue{
  title = 'Войдите в свой аккаунт'
}
</script>

<style scoped>

</style>
