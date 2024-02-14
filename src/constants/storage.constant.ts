import ENV from "./env.constant";

export const BUCKET_URL = `https://res.cloudinary.com/${ENV.CLOUDINARY_CLOUD_NAME}`;

export enum FOLDERS {
  // avaters = "avaters",
  uploads = "uploads",
  // products = 'products',
}
