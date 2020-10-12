// export const DOMAIN = "manage.visalreinsurance.com";
export const PROTOCOL =
  process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
export const DOMAIN =
  process.env.NODE_ENV === 'development'
    ? '192.168.100.6:8001'
    : 'manage.comfybroker.com';
export const COOKIE_NAME_AUTH_TOKEN = 'visal_re_auth_token';
export const PUSHER_KEY = '8fdc449c93173e31d8a2';
export const PUSHER_CLUSTER = 'eu';
export const CHANNEL = 'a2VrcmUtcHJpdmF0ZS1jaGFubmVs';
export const EVENT = 'a2VrcmUtcHJpdmF0ZS1jaGFubmVs-event';
