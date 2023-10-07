<template>
  <div>
    <Loader v-if="isLoading" />
    <div ref="map" class="google-map"></div>
    <!-- <iframe
      height="450"
      frameborder="0"
      style="border: 0"
      :src="mapUrl"
      allowfullscreen
    ></iframe> -->
  </div>
</template>
  
<script>
import Loader from "../components/Loader.vue";

export default {
  name: "MapVue",
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      this.isLoading = true;
      let map;
      const myLatLng = { lat: this.latitude, lng: this.longitude };
      // eslint-disable-next-line no-undef
      const { Map } = await google.maps.importLibrary("maps");

      map = new Map(this.$refs.map, {
        center: myLatLng,
        zoom: 13,
      });

      console.log("map", map);

      //   eslint-disable-next-line no-undef
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Center Place",
      });
      this.isLoading = false;
    },
  },
  props: {
    apiKey: String,
    latitude: Number,
    longitude: Number,
  },
};
</script>
  
<style scoped>
.google-map {
  width: 100%;
  height: 400px;
}
</style>
  