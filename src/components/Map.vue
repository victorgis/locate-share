<template>
  <div>
    <iframe
      width="600"
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
      return `https://www.google.com/maps/embed/v1/view?key=${this.apiKey}&center=${this.latitude},${this.longitude}&zoom=15`;
    },
  },
};
</script>
  