<template>
<div>
  <AuthSubHeader :title="title" :email="email" />
  <BaseInput placeholder="Код из почты"></BaseInput>
  <div class="text-code mt-20 mb-40">
    Запросить код повторно можно через 22 секунд
  </div>
  <BaseButton>Подтвердить</BaseButton>
</div>
</template>

<script>
import {Vue, Component} from "nuxt-property-decorator";
import AuthSubHeader from "@/modules/Auth/components/AuthSubHeader.vue"

@Component({components:{AuthSubHeader}})
export default class AuthEmailVerification extends Vue{
  email = "svetlana_lebedeva@mail.ru"
  title = "Подтвердите почту"
}
</script>

<style scoped lang="scss">
.text-code{
  color: #838383;
  line-height: 17px;
  @apply text-14;
}
</style>
