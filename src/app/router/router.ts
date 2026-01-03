import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';
import { APP_ROUTES } from '@/shared/config';
import { LoginPage } from '@/pages/LoginPage';
import { EnrollmentPage } from '@/pages/EnrollmentPage';
import { ConfirmPage } from '@/pages/ConfirmPage';
import { MainPage } from '@/pages/MainPage';

const routes: RouteRecordRaw[] = [
  { path: APP_ROUTES.lOGIN, component: LoginPage },
  { path: APP_ROUTES.ENROLLMENT, component: EnrollmentPage },
  { path: APP_ROUTES.CONFIRM, component: ConfirmPage },
  { path: APP_ROUTES.MAIN, component: MainPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
