import dotenv from 'dotenv';

dotenv.config();

export const IMAGE_CONTENT_TYPES = process.env.IMAGE_CONTENT_TYPES.split(',');
export const IMAGE_EXTENTIONS = process.env.IMAGE_EXTENTIONS.split(',');
export const IMAGE_DIMENTIONS = process.env.IMAGE_DIMENTIONS.split(',').map(
  (item) => item.split('x').map((item) => parseInt(item)),
);
