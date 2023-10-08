<template>
  <div>
    <Loader v-if="isLoading" />
    <div ref="map" id="viewDiv" class="google-map"></div>
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

import { loadModules } from "esri-loader";

export default {
  name: "MapVue",
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: false,
      map: null,
      // arcGISAPIKEY: process.env.VUE_APP_ARCGIS_API_KEY,
    };
  },
  mounted() {
    // this.initMap();
    this.loadEsri();
  },
  methods: {
    // async initMap() {
    //   this.isLoading = true;
    //   // let map;
    //   const myLatLng = { lat: this.latitude, lng: this.longitude };
    //   // eslint-disable-next-line no-undef
    //   const { Map } = await google.maps.importLibrary("maps");

    //   this.map = new Map(this.$refs.map, {
    //     center: myLatLng,
    //     zoom: 13,
    //   });

    //   console.log("map", this.map);

    //   //   eslint-disable-next-line no-undef
    //   new google.maps.Marker({
    //     position: myLatLng,
    //     map: this.map,
    //     title: "Center Place",
    //   });
    //   this.isLoading = false;
    // },

    loadEsri() {
      this.isLoading = true;
      loadModules([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
      ]).then(([esriConfig, Map, MapView, Graphic, GraphicsLayer]) => {
        esriConfig.apiKey = process.env.VUE_APP_ARCGIS_API_KEY;

        console.log("api", this.arcGISAPIKEY);

        const pointGraphic = new Graphic({
          geometry: {
            type: "point", // autocasts as new Point()
            longitude: this.longitude,
            latitude: this.latitude,
          },
          symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [226, 119, 40],
            outline: {
              // autocasts as new SimpleLineSymbol()
              color: [255, 255, 255],
              width: 2,
            },
          },
        });
        // Add graphic when GraphicsLayer is constructed
        let layer = new GraphicsLayer({
          graphics: [pointGraphic],
        });
        const map = new Map({
          basemap: "arcgis-imagery", // Basemap layer service
          layers: [layer],
        });

        this.view = new MapView({
          map: map,
          center: [this.longitude, this.latitude], // Longitude, latitude
          zoom: 13, // Zoom level
          container: this.$refs.map, // Div element
        });
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
  