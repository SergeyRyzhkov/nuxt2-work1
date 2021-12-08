<template>
<div class="mb-40">
    <h4 class="text-24 leading-30 text-center font-semibold">{{ title }}</h4>
  <div class="desk-item mt-20 mb-40" v-if="description">{{ description }}</div>
  <div class="text-17 leading-20 text-center mt-20 mb-60" v-if="email">{{ email }}</div>
  <div class="mt-24 flex items-center justify-center" v-if="tabsVisible">
      <div class="mr-15 tab-item" :class="{active: isActive === 'login'}" @click="$emit('setFormType', 'login')">Вход</div>
      <div class="tab-item" :class="{active: isActive === 'registration'}"  @click="$emit('setFormType', 'registration')">Регистрация</div>
  </div>
</div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "nuxt-property-decorator";

@Component
export default class AuthSubHeader extends Vue{
  @Prop({required: true})
  title: string;
  @Prop({default: false})
  tabsVisible: boolean;
  @Prop({default: ''})
  description: string;
  @Prop({default: ''})
  email: string;
  @Prop({default: ''})
  isActive: string;

}
</script>

<style lang="scss" scoped>
.tab-item{
  color: #848484;
  font-size: 17px;
  border-bottom: 1px solid transparent;
  @apply leading-20 pb-2 text-center cursor-pointer;
  &.active{
    color: #000000;
    border-color: #000000;
  }
}
.desk-item{
  color: #848484;
  @apply text-17 leading-20 text-center;
}
</style>
