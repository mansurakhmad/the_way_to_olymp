import { createMemoryHistory, createRouter } from 'vue-router';
import { LoginPage } from '@/pages/LoginPage';

const routes = [{ path: '/', component: LoginPage }];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
