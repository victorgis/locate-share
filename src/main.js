import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/global.css';
import Loader from './components/Loader.vue';

const app = createApp(App);
app.component('LoaderVue', Loader); // Register the Loader component
app.mount('#app');



// createApp(App).mount('#app')
