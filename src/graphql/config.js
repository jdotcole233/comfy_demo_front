// export const DOMAIN = "manage.visalreinsurance.com";
export const PROTOCOL =
  process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
export const DOMAIN =
  process.env.NODE_ENV === 'development'
    ? 'manage.visalreinsurance.com'
    : 'manage.visalreinsurance.com';
export const COOKIE_NAME_AUTH_TOKEN = 'visal_re_auth_token';
export const PUSHER_KEY = '6732a1bd9862dfe49492';
export const PUSHER_CLUSTER = 'eu';
export const CHANNEL = 'LgzULSz64aed7WJ7YwDq3qmHAeX786dZNZ3Ko4Bisf0';
export const EVENT = 'LgzULSz64aed7WJ7YwDq3qmHAeX786dZNZ3Ko4Bisf0-event';
