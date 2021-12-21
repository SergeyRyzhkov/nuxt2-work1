<template>
  <client-only>
    <yandex-map :settings="settings" :zoom="14" :coords="[55.721332, 37.701336]" v-bind="$attrs" v-on="$listeners">
      <ymap-marker
        v-for="m in markers"
        :key="m.id"
        :marker-id="m.id"
        :coords="[m.latitude, m.longitude]"
        :hint-content="m.title"
      />
    </yandex-map>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps";
import { MapMarker } from "@/components/map/MapMarker";

@Component({
  inheritAttrs: false,
  components: {
    yandexMap,
    ymapMarker,
  },
})
export default class BaseYandexMap extends Vue {
  @Prop({ default: () => [] })
  markers: MapMarker[];

  get settings() {
    return {
      apiKey: "886112fb-8933-4d54-bb87-30e5f1b3f5c2",
      lang: "ru_RU",
      coordorder: "latlong",
      version: "2.1",
      "scroll-zoom": false,
    };
  }

  async mounted() {
    // await loadYmap({ ...this.settings, debug: false });
  }
}
</script>
