<template>
  <div class="full-app">
    <Header />
    <div class="main">
      <Loader v-if="isLoading" />
      <p>Find my longitude & latitude</p>
      <div @click="getGeolocation" class="locate-me">
        locate me &nbsp;&nbsp;<i class="fa-solid fa-earth-africa"></i>
      </div>
      <div class="results">
        <div class="result-values">
          <h3 class="heading-h3">Results</h3>
          <span
            >Your longitude: {{ longitude ? longitude : "searching..." }}</span
          >
          <span>Your latitude: {{ latitude ? latitude : "searching..." }}</span>
          <span
            >Geocoded Address: {{ address ? address : "searching..." }}</span
          >
        </div>
      </div>
      <div class="btn-list">
        <div @click="handleOpenMap" class="locate-me">
          {{ showsMap ? "Close Map" : "Show Map" }} &nbsp;&nbsp;<i
            class="fa-solid fa-map"
          ></i>
        </div>
        <div @click="handleOpenShareModal" class="locate-me">
          share &nbsp;&nbsp;<i class="fa-solid fa-share-from-square"></i>
        </div>
      </div>

      <div v-if="openShareModal" class="share-options">
        <div class="div-span">
          <span @click="closeModal" class="close">x</span>
          <span @click="shareOnWhatsApp"
            ><i class="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp</span
          >
          <span @click="shareOnTwitter"
            ><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</span
          >
          <span @click="shareViaEmail"
            ><i class="fa fa-envelope" aria-hidden="true"></i> Email</span
          >
          <span @click="copyToClipboard"><i class="fas fa-copy"></i> Copy</span>
        </div>
      </div>

      <div v-if="showsMap" class="showMap">
        <MapView :apiKey="apiKey" :latitude="latitude" :longitude="longitude" />
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Loader from "./components/Loader.vue";
import MapView from "./components/Map.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    Loader,
    MapView,
  },
  data() {
    return {
      isLoading: false,
      longitude: "",
      latitude: "",
      address: "",
      openShareModal: false,
      showsMap: false,
      apiKey: process.env.GOOGLEMAPS_API_KEY,
    };
  },
  methods: {
    closeModal() {
      this.openShareModal = false;
    },
    //Share via Twitter
    shareOnTwitter() {
      const textToCopy = `Your Longitude: ${this.longitude}, Your Latitude: ${this.latitude}`;
      const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        textToCopy
      )}`;
      this.openShareModal = false;
      window.open(twitterShareLink, "_blank");
    },

    //Share via Email
    shareViaEmail() {
      const recipient = "";
      const subject = "My current location";
      const textToCopy = `Your Longitude: ${this.longitude}, Your Latitude: ${this.latitude}`;
      const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(textToCopy)}`;
      this.openShareModal = false;
      window.location.href = mailtoLink;
    },

    //Share to whatsapp
    shareOnWhatsApp() {
      const textToCopy = `Your Longitude: ${this.longitude}, Your Latitude: ${this.latitude}`;
      const whatsappLink = `whatsapp://send?text=${encodeURIComponent(
        textToCopy
      )}`;
      this.openShareModal = false;
      window.open(whatsappLink, "_blank");
    },

    //copy to clipboard
    async copyToClipboard() {
      const textToCopy = `Your Longitude: ${this.longitude}, Your Latitude: ${this.latitude}`;
      await navigator.clipboard.writeText(textToCopy);
      alert("Text copied to clipboard");
      this.openShareModal = false;
    },

    handleOpenShareModal() {
      if (this.longitude) {
        this.openShareModal = !this.openShareModal;
      } else {
        alert('Click on "Locate Me", to find your location first');
      }
    },
    handleOpenMap() {
      if (this.longitude) {
        this.showsMap = !this.showsMap;
      } else {
        alert('Click on "Locate Me", to find your location first');
      }
    },
    async showPosition(position) {
      this.isLoading = true;
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      const params = "format=json&zoom=18";
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${this.latitude}&lon=${this.longitude}&${params}`;

      // Perform the Fetch request
      const { data } = await axios.get(url);
      this.address = data.display_name;

      this.isLoading = false;
    },
    getGeolocation() {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
      };
      const errorCallback = (error) => {
        console.log(error);
      };

      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        errorCallback,
        options
      );
    },
  },
};
</script>

<style>
div.full-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  display: grid;
  grid-template-rows: auto 1fr auto; /* Header, content, footer */
  min-height: 100vh;
}

div.main {
  margin-top: 60px;
}

.locate-me {
  border: #2c3e50 1px solid;
  border-radius: 5px;
  padding: 5px;
  width: 120px;
  margin: 20px auto;
  background: #2c3e50;
  color: #fff;
  cursor: pointer;
}

.locate-me:hover {
  background: #fff;
  color: #2c3e50;
}

.results {
  width: 300px;
  margin: 20px auto;
  background: #f2f2f2;
  border-radius: 5px;
  padding: 15px;
}

.result-values span {
  display: block;
}
.share-options {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
  z-index: 1000;
}

.div-span {
  background: #2c3e50af;
  text-align: left;
  /* top: 80%; */
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f2f2f2;
  width: 120px;
  margin: 0px auto;

  padding-left: 25px;
  padding-bottom: 25px;
}

.div-span span {
  padding: 5px;
  /* padding: 5px 0; */
  cursor: pointer;
  display: block;
}

.div-span span.close {
  text-align: right;
  margin-right: 10px;
  font-size: 20px;
}

.share-options span:hover {
  color: #5793c7;
}

/* Media query for mobile responsiveness */
@media (max-width: 768px) {
  .showMap {
    text-align: center;
    margin: 0 auto;
  }
}

.heading-h3 {
  margin-bottom: 10px;
}

.showMap {
  display: block;
}

.btn-list {
  display: inline-flex;
  margin-bottom: 20px;
}
.btn-list div {
  margin: 0 10px;
}
</style>
