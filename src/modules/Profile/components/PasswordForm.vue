<template>
<section>
  <div>Смена пароля</div>
  <form action="" @submit.prevent="submit" class="mt-33">
    <BaseInput
      placeholder="Старый пароль*"
      class="mb-27"
    />
    <BaseInput
      placeholder="Новый пароль*"
      class="mb-27"
    />
    <BaseInput
      placeholder="Повторите пароль*"
      class="mb-32"
    />
    <BaseButton type="submit">Сохранить изменения</BaseButton>
  </form>
</section>
</template>

<script lang="ts">
import {Vue, Component} from "nuxt-property-decorator";

@Component
export default class PasswordForm extends Vue{
  submit(){
    console.log(1)
  }
}
</script>

<style scoped>

</style>
