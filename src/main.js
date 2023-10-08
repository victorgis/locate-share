import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/global.css';
import axios from 'axios';
import Loader from './components/Loader.vue';

const app = createApp(App);
// app.use(axios);
console.log(axios)
app.component('LoaderVue', Loader); // Register the Loader component
app.mount('#app');


// createApp(App).mount('#app')
