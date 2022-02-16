<template>
  <div class="w-full lg:w-1/2">
    <div class="flex flex-col md:flex-row">
      <div class="flex w-full flex-col md:w-1/3">
        <div class="font-semibold">Для связи</div>
        <ul class="text-14 mt-28">
          <li>
            <a :href="`tel:${phone}`">{{ phone }}</a>
          </li>
          <li class="mt-15 underline underline-offset-4">
            <a :href="`mailto:${email}`">{{ email }}</a>
          </li>
          <!-- <li class="mt-15">@kaypro_russia</li> -->
        </ul>
      </div>
      <div class="md:ml-100 mt-40 flex flex-col md:mt-0">
        <div class="font-semibold">Офис</div>
        <ul class="text-14 mt-28">
          <li>{{ address }}</li>
          <li class="text-text-gray mt-16">{{ schedule }}</li>
          <!-- <li class="mt-18 underline underline-offset-4 cursor-pointer">Показать на карте</li> -->
        </ul>
      </div>
    </div>
    <LazyBaseYandexMap class="mt-50 md:mt-45 h-3/4 w-full"></LazyBaseYandexMap>
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
