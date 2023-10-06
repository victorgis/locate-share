<template>
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
      </div>
    </div>
    <div @click="handleOpenShareModal" class="locate-me">
      share &nbsp;&nbsp;<i class="fa-solid fa-share-from-square"></i>
    </div>
    <div v-if="openShareModal" class="share-options">
      <span @click="shareOnWhatsApp"
        ><i class="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp</span
      >
      <span @click="shareOnTwitter"
        ><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</span
      >
      <!-- <span @click="shareViaSMS"
        ><i class="fa fa-sms" aria-hidden="true"></i> Send SMS</span
      > -->
      <span @click="shareViaEmail"
        ><i class="fa fa-envelope" aria-hidden="true"></i> Email</span
      >
      <span @click="copyToClipboard"><i class="fas fa-copy"></i> Copy</span>
    </div>
  </div>

  <Footer />
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Loader from "./components/Loader.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    Loader,
  },
  data() {
    return {
      isLoading: false,
      longitude: "",
      latitude: "",
      openShareModal: false,
    };
  },
  methods: {
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

    //Share via SMS
    // shareViaSMS() {
    //   const textToCopy = `Your Longitude: ${this.longitude}, Your Latitude: ${this.latitude}`;
    //   const phoneNumber = "+1234567890";
    //   const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(
    //     textToCopy
    //   )}`;
    //   this.openShareModal = false;
    //   window.location.href = smsLink;
    // },

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
    showPosition(position) {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
    },
    getGeolocation() {
      this.isLoading = true;
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
      this.isLoading = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

div.main {
  margin-top: 60px;
  text-align: center;
  height: 72vh;
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
  background: #f2f2f2;
  width: 120px;
  margin: 0px auto;

  padding: 5px 0;
  padding-left: 25px;
}
.share-options span {
  display: block;
  text-align: left;
  padding: 5px;
  cursor: pointer;
}

.share-options span:hover {
  color: #227bc9;
}

.heading-h3 {
  margin-bottom: 10px;
}
</style>
