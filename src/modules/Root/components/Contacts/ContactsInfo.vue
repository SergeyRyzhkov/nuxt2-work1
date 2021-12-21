<template>
  <div class="w-full lg:w-1/2">
    <div class="flex">
      <div class="flex flex-col w-1/3">
        <div class="font-semibold">Для связи</div>
        <ul class="mt-28">
          <li><a href="tel:8 (495) 740-07-00">8 (495) 740-07-00</a></li>
          <li class="mt-15 underline underline-offset-4"><a href="mailto:info@kaypro.ru">info@kaypro.ru</a></li>
          <li class="mt-15">@kaypro_russia</li>
        </ul>
      </div>
      <div class="flex flex-col ml-100">
        <div class="font-semibold">Офис</div>
        <ul class="mt-28">
          <li>Москва, Остаповский проезд, д. 5/1, стр. 1, БЦ «Контакт» Офис 802</li>
          <li class="mt-16 text-text-gray">9.00 - 19.00, понедельник-пятница</li>
          <li class="mt-18 underline underline-offset-4 cursor-pointer">Показать на карте</li>
        </ul>
      </div>
    </div>
    <LazyBaseYandexMap class="w-full mt-25 md:mt-45 h-3/4"></LazyBaseYandexMap>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class ContactsInfo extends Vue {}
</script>
