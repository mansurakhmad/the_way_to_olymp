export enum APP_ROUTERS_NAMES {
  lOGIN = 'lOGIN',
  ENROLLMENT = 'ENROLLMENT',
  CONFIRM = 'CONFIRM',
  MAIN = 'MAIN',
}

export const APP_ROUTES = {
  [APP_ROUTERS_NAMES.lOGIN]: '/',
  [APP_ROUTERS_NAMES.ENROLLMENT]: '/enrollment',
  [APP_ROUTERS_NAMES.CONFIRM]: '/confirm',
  [APP_ROUTERS_NAMES.MAIN]: '/main',
} as const;
