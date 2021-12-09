<template>
  <div class="base-input" :class="{ 'base-input--error': isShakeError && hasError }">
    <div class="base-input__wrap">
      <input
        class="base-input__input"
        :value="value"
        :class="[classes, currentClasses]"
        v-bind="{ ...$attrs }"
        v-on="{
          ...$listeners,
          input: (event) => $emit('input', event.target.value),
          focus: (event) => $emit('focus', event),
          blur: (event) => $emit('blur', event),
        }"
      />
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
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { Guid } from "@/utils/Guid";

@Component({
  inheritAttrs: false,
})
export default class BaseInput extends Vue {
  showPassword = false;

  @Prop({ default: () => Guid.newGuid() })
  id: string;

  @Prop()
  value;

  @Prop({ default: false })
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
    //  color: #838383;
    @apply text-14 leading-24 pb-14;
    &--error {
      border: 1px solid #ff4e4e;
    }
    &--help {
      border: 1px solid #3068f7;
    }
    &::placeholder {
      opacity: 1;
      color: $gray;
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
