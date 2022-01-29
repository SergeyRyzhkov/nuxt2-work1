<template>
  <div class="w-full lg:w-1/2">
    <div class="flex flex-col md:flex-row">
      <div class="flex w-full flex-col md:w-1/3">
        <div class="font-semibold">Для связи</div>
        <ul class="mt-28 text-14">
          <li>
            <a :href="`tel:${phone}`">{{ phone }}</a>
          </li>
          <li class="underline-offset-4 mt-15 underline">
            <a :href="`mailto:${email}`">{{ email }}</a>
          </li>
          <!-- <li class="mt-15">@kaypro_russia</li> -->
        </ul>
      </div>
      <div class="mt-40 flex flex-col md:mt-0 md:ml-100">
        <div class="font-semibold">Офис</div>
        <ul class="mt-28 text-14">
          <li>{{ address }}</li>
          <li class="mt-16 text-text-gray">{{ schedule }}</li>
          <!-- <li class="mt-18 underline underline-offset-4 cursor-pointer">Показать на карте</li> -->
        </ul>
      </div>
    </div>
    <LazyBaseYandexMap class="mt-50 h-3/4 w-full md:mt-45"></LazyBaseYandexMap>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { EmptyService } from "@/_core/service/EmptyService";
import { formatPhoneNumber } from "@/utils/Formaters";

@Component
export default class ContactsInfo extends Vue {
  contactInfo: any = {};

  async fetch() {
    this.contactInfo = await this.$serviceLocator.getService(EmptyService).getAnyOrNull("users/pages/contact");
  }

  get phone() {
    return formatPhoneNumber(this.contactInfo?.content?.phone);
  }

  get schedule() {
    return this.contactInfo?.content?.schedule;
  }

  get address() {
    return this.contactInfo?.content?.address;
  }

  get email() {
    return this.contactInfo?.content?.email;
  }
}
</script>
