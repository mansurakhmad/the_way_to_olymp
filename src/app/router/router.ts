import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';
import { APP_ROUTERS_NAMES, APP_ROUTES, KEEP_USER_LOGIN } from '@/shared/config';
import { LoginPage } from '@/pages/LoginPage';
import { EnrollmentPage } from '@/pages/EnrollmentPage';
import { ConfirmPage } from '@/pages/ConfirmPage';
import { MainPage } from '@/pages/MainPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { RecoveryPasswordPage } from '@/pages/RecoveryPasswordPage';
import { api } from '@/shared/api';

const routes: RouteRecordRaw[] = [
  {
    path: APP_ROUTES.MAIN,
    component: MainPage,
    name: APP_ROUTERS_NAMES.MAIN,
  },
  {
    path: APP_ROUTES.lOGIN,
    component: LoginPage,
    name: APP_ROUTERS_NAMES.lOGIN,
    meta: { isOnboarding: true },
  },
  {
    path: APP_ROUTES.ENROLLMENT,
    component: EnrollmentPage,
    name: APP_ROUTERS_NAMES.ENROLLMENT,
    meta: { isOnboarding: true },
  },
  {
    path: APP_ROUTES.CONFIRM,
    component: ConfirmPage,
    name: APP_ROUTERS_NAMES.CONFIRM,
    meta: { isOnboarding: true },
  },
  {
    path: APP_ROUTES.FORGOT_PASSWORD,
    component: ForgotPasswordPage,
    name: APP_ROUTERS_NAMES.FORGOT_PASSWORD,
    meta: { isOnboarding: true },
  },
  {
    path: APP_ROUTES.RECOVERY_PASSWORD,
    component: RecoveryPasswordPage,
    name: APP_ROUTERS_NAMES.RECOVERY_PASSWORD,
    meta: { isOnboarding: true },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, _, next) => {
  const {
    data: { session },
  } = await api.auth.getSession();
  const requiresAuth = to.matched.some(record => !record.meta.isOnboarding);

  if (requiresAuth && !session) {
    localStorage.removeItem(KEEP_USER_LOGIN);
    next(APP_ROUTES.lOGIN);
  } else if (session && to.name === APP_ROUTES.lOGIN) {
    next(APP_ROUTES.MAIN);
  } else {
    next();
  }
});

export { router };
