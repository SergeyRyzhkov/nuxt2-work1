<template>
  <div class="base-input" :class="{ 'base-input--error': isShakeError && hasError }">
    <div class="base-input__wrap">
      <input
        ref="maskFiled"
        v-imask="mask"
        class="base-input__input"
        :value="value"
        :class="[classes, currentClasses, type === 'password' ? 'pr-16 md:pr-30' : '']"
        :type="type === 'password' && showPassword ? '' : type"
        v-bind="{ ...$attrs }"
        v-on="{
          ...$listeners,
          input: () => {},
          focus: (event) => $emit('focus', event),
          blur: (event) => $emit('blur', event),
        }"
        @input="onInput"
        @keyup.delete="onDelete"
        @complete="onComplete"
      />

      <a v-if="type === 'password'" href="#" class="absolute top-0 right-0 z-100" @click.prevent="showPassword = !showPassword">
        <img v-show="showPassword" src="/icons/eye-open.svg" width="32" height="32" />
        <img v-show="!showPassword" src="/icons/eye-close.svg" width="32" height="32" />
      </a>
    </div>

    <slot />

    <transition name="fade">
      <div v-if="!!help" class="base-input__help">{{ help }}</div>
    </transition>
    <transition name="fade">
      <div v-if="hasError">
        {{ errorText }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "nuxt-property-decorator";
import { Guid } from "@/utils/Guid";

type InputType = "text" | "number" | "tel" | "email" | "password" | "find" | "select";

@Component({
  inheritAttrs: false,
})
export default class BaseInput extends Vue {
  showPassword = false;
  @Ref("maskFiled") readonly maskFiled!: HTMLInputElement | any;

  @Prop({ default: () => Guid.newGuid() })
  id: string;

  @Prop({ default: "" })
  mask: string;

  @Prop({ default: "text" })
  type: InputType;

  @Prop()
  value;

  @Prop({ default: true })
  isShakeError: boolean;

  @Prop()
  label: string;

  @Prop()
  help: string;

  @Prop()
  classes: string;

  @Prop()
  errorText: string;

  @Prop({ default: false })
  hasError: boolean;

  mounted() {
    if (this.value) {
      if (this.$refs.maskFiled) {
        this.maskFiled.maskRef.typedValue = String(this.value);
      }
    }
  }

  onInput(e) {
    if (!e?.target?.maskRef) {
      this.$emit("input", e.target.value);
    }
  }

  onDelete(e) {
    if (!!e?.target?.maskRef) {
      this.$emit("input", "");
    }
  }

  onComplete(e) {
    if (!!e && !!e.detail && !!e.detail._unmaskedValue) {
      this.$emit("input", e.detail._unmaskedValue);
    }
  }

  get currentClasses() {
    return {
      "base-input__input--error": this.hasError,
      "base-input__input--help": !!this.help,
    };
  }
}
</script>

<style lang="scss">
.base-input {
  position: relative;
  width: 100%;

  &__wrap {
    position: relative;
  }

  &--error {
    animation-name: shakeError;
    animation-fill-mode: forwards;
    animation-duration: 0.6s;
    animation-timing-function: ease-in-out;
  }

  &__input {
    border-bottom: 1px solid $light-gray;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 8px;
    &--error {
      border-bottom: 1px solid #ff4e4e;
    }
    &--help {
      border: 1px solid #3068f7;
    }
    &::placeholder {
      opacity: 1;
      color: $gray;
    }
    &:focus {
      border-bottom: 1px solid $primary;
      outline: none;
    }
  }

  &__help {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #3068f7;
    position: absolute;
    top: 4px;
    left: 0;
  }

  &__error {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #ff4e4e;
    position: absolute;
    margin-top: 4px;
    left: 0;
  }
}
@keyframes shakeError {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(0.375rem);
  }
  30% {
    transform: translateX(-0.375rem);
  }
  45% {
    transform: translateX(0.375rem);
  }
  60% {
    transform: translateX(-0.375rem);
  }
  75% {
    transform: translateX(0.375rem);
  }
  90% {
    transform: translateX(-0.375rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
