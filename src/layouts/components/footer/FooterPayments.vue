<template>
<div class="flex items-center">
    <div v-for="i in 8">
      <figure>
        <img v-lozad="`/icons/payments/${i}.svg`" />
      </figure>
    </div>
</div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class FooterPayments extends Vue{
}
</script>
