<template>
<div class="w-1/2 h-full pl-38 mr-60">
  <FormHeader :backBtn="backIsVisible()" @back="back" />
  <div class="w-3/5 m-auto min-w-360">
    <AuthLogin v-if="formVisible === 'login'" @setFormType="(type) => changeForm(type)" :isActive="formVisible"></AuthLogin>
    <AuthRegistration  @setFormType="(type) => changeForm(type)" v-if="formVisible === 'registration'"></AuthRegistration>
    <AuthPasswordReset v-if="formVisible === 'reset'" @setFormType="(type) => changeForm(type)"></AuthPasswordReset>
    <AuthEmailVerification  v-if="formVisible === 'verify'"></AuthEmailVerification>
  </div>

</div>
</template>

<script lang="ts">
import {Vue, Component} from "nuxt-property-decorator";
import FormHeader from "@/modules/Auth/components/FormHeader.vue";
import AuthLogin from "@/modules/Auth/components/AuthLogin.vue";
import AuthRegistration from "@/modules/Auth/components/AuthRegistration.vue";
import AuthPasswordReset from "@/modules/Auth/components/AuthPasswordReset.vue";
import AuthEmailVerification from "@/modules/Auth/components/AuthEmailVerification.vue";

@Component({components:{FormHeader, AuthLogin, AuthRegistration, AuthPasswordReset, AuthEmailVerification}})
export default class AuthForm extends Vue{
  formVisible: string = 'login';

  changeForm(type:string){
    this.formVisible = type
  }
  back(){
    this.formVisible = 'login'
  }
  backIsVisible(){
    const isActive = ['reset', 'verify']
    if (isActive.includes(this.formVisible)){
      return true
    } else return false;
  }
}
</script>

<style lang="scss" scoped>
.min-w-360{
  min-width: 360px;
}
</style>
