interface IENV {
  //core
  NODE_ENV: string;
  MONGODB_URI: string;

  ACCESS_TOKEN_SEC: string;
  REFRESH_TOKEN_SEC: string;
  BCRYPT_SALT: string;
  TOKEN_EXPIRATION_TIME: string;

  //   Frontend
  CLIENT_URI?: string;
  CLIENT_REQUEST_TOKEN_URL?: string;
  CLIENT_PASSWORD_RESET_URL?: string;

  //   @EMAILSERVICE
  MAIL_HOST?: string;
  MAIL_USERNAME?: string;
  MAIL_PORT?: string;
  MAIL_PASSWORD?: string;

  // @STORAGE_BUCKET
  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;

  //   GOOGLE OAUTH
  GOOGLE_CLIENT_ID?: string;
}

const ENV: IENV = process.env as unknown as IENV;

export default ENV;
