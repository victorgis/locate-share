<!-- eslint-disable no-undef -->
<!-- <template>
  <div>
    <iframe
      height="450"
      frameborder="0"
      style="border: 0"
      :src="mapUrl"
      allowfullscreen
    ></iframe>
  </div>
</template>
  
  <script>
export default {
  name: "MapVue",
  props: {
    apiKey: String,
    latitude: Number,
    longitude: Number,
  },
  computed: {
    mapUrl() {
      return `https://www.google.com/maps/embed/v1/view?key=${this.apiKey}&center=${this.latitude},${this.longitude}&zoom=18`;
    },
  },
};
</script> -->
  

<template>
  <div>
    <div ref="map" class="google-map"></div>
  </div>
</template>
  
  <script>
export default {
  name: "MapVue",
  mounted() {
    this.initMap();
    // eslint-disable-next-line no-undef
    console.log(google);
  },
  methods: {
    async initMap() {
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
  
  
  <style scoped>
.google-map {
  width: 100%;
  height: 400px;
}
</style>
  