import { createApp } from 'vue';
import App from '@/app/App.vue';
import { router } from '@/app/router';

import '@/app/styles/index.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
