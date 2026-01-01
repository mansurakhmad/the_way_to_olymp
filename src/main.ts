import { createApp } from 'vue';
import App from '@/app/App.vue';
import PrimeVue from 'primevue/config';
import { router } from '@/app/router';
import Aura from '@primeuix/themes/aura';
import '@/app/styles/index.css';

const app = createApp(App);

app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);
app.mount('#app');
