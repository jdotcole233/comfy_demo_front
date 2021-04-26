export const PROTOCOL =
  process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
export const DOMAIN =
  process.env.NODE_ENV === 'development'
    ? '192.168.100.21:8000'
    : 'manage.kekrebrokerapp.com';
export const COOKIE_NAME_AUTH_TOKEN = 'kek_re_auth_token';
export const COOKIE_NAME_AUTH = 'kek_re_auth';
export const PUSHER_KEY = '8fdc449c93173e31d8a2';
export const PUSHER_CLUSTER = 'eu';
export const CHANNEL = 'a2VrcmUtcHJpdmF0ZS1jaGFubmVs';
export const EVENT = 'a2VrcmUtcHJpdmF0ZS1jaGFubmVs-event';
