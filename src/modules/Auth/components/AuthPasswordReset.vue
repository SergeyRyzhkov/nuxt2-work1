<template>
<div>
  <AuthSubHeader :title="title" :description="description" />
  <BaseInput placeholder="Введите электронную почту"></BaseInput>
  <BaseButton class="mt-40" @click="sendReset">Отправить</BaseButton>
</div>
</template>

<script>
import {Vue, Component} from "nuxt-property-decorator";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue"

@Component({components:{AuthSubHeader}})
export default class AuthPasswordReset extends Vue{
  title = "Восстановление пароля"
  description = "Мы отправим вам письмо с ссылкой для восстановления пароля на указанную почту"

  sendReset(){
    this.$emit('setFormType', 'verify')
  }
}
</script>

<style scoped>

</style>
