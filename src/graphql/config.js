export const PROTOCOL =
  process.env.NODE_ENV === "development" ? "https://" : "http://";
export const DOMAIN =
  process.env.NODE_ENV === "development"
    ? "manage.kekrebrokerapp.com"
    : "127.0.0.1:8001";
export const COOKIE_NAME_AUTH_TOKEN = "kek_re_auth_token";
export const COOKIE_NAME_AUTH = "kek_re_auth";
export const PUSHER_KEY = "8fdc449c93173e31d8a2";
export const PUSHER_CLUSTER = "eu";
export const CHANNEL = "a2VrcmUtcHJpdmF0ZS1jaGFubmVs";
export const EVENT = "a2VrcmUtcHJpdmF0ZS1jaGFubmVs-event";
// https://fb91-41-155-11-155.ngrok.io
