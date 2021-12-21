<template>
  <section>
    <div>Персональные данные</div>
    <div class="mt-33">
      <form @submit.prevent="submit">
      <BaseInput
        placeholder="ФИО*"
        class="mb-27"
      />
      <div class="flex items-center">
        <BaseInput
          placeholder="Телефон*"
          class="mb-27 pr-16"
        />
        <BaseInput
          placeholder="Email**"
          class="mb-27 pl-16"
        />
      </div>
      <BaseInput
        placeholder="Адрес доставки*"
        class="mb-32"
      />
      <BaseButton type="submit">Сохранить изменения</BaseButton>
      </form>
    </div>

  </section>
</template>

<script lang="ts">
import {Vue, Component} from "nuxt-property-decorator";

@Component
export default class PersonalForm extends Vue{

  submit(){
    console.log(1)
  }
}
</script>
