import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';
import { APP_ROUTERS_NAMES, APP_ROUTES } from '@/shared/config';
import { LoginPage } from '@/pages/LoginPage';
import { EnrollmentPage } from '@/pages/EnrollmentPage';
import { ConfirmPage } from '@/pages/ConfirmPage';
import { MainPage } from '@/pages/MainPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { RecoveryPasswordPage } from '@/pages/RecoveryPasswordPage';

const routes: RouteRecordRaw[] = [
  { path: APP_ROUTES.lOGIN, component: LoginPage, name: APP_ROUTERS_NAMES.lOGIN },
  { path: APP_ROUTES.ENROLLMENT, component: EnrollmentPage, name: APP_ROUTERS_NAMES.ENROLLMENT },
  { path: APP_ROUTES.CONFIRM, component: ConfirmPage, name: APP_ROUTERS_NAMES.CONFIRM },
  { path: APP_ROUTES.MAIN, component: MainPage, name: APP_ROUTERS_NAMES.MAIN },
  {
    path: APP_ROUTES.FORGOT_PASSWORD,
    component: ForgotPasswordPage,
    name: APP_ROUTERS_NAMES.FORGOT_PASSWORD,
  },
  {
    path: APP_ROUTES.RECOVERY_PASSWORD,
    component: RecoveryPasswordPage,
    name: APP_ROUTERS_NAMES.RECOVERY_PASSWORD,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
