<template>
  <div class="flex items-center">
    <div v-for="i in 8" :key="i">
      <figure>
        <img v-lazysrc="`/icons/payments/${i}.svg`" alt=" " width="50" height="27" />
      </figure>
    </div>
  </div>
</template>
