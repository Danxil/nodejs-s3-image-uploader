import sharp, { Region } from 'sharp';
import s3uploader from './s3uploader';

export const resizeImage = (
  source: NodeJS.ReadableStream,
  sharpOptons: Region,
) => {
  const resizer = sharp().extract(sharpOptons).png();

  return source.pipe(resizer);
};

export const processImage = (
  source: NodeJS.ReadableStream,
  imageName: string,
  sharpOptons: Region,
) => {
  const { promise: uploadPromise, passsStream } = s3uploader(imageName);

  resizeImage(source, sharpOptons).pipe(passsStream);

  return uploadPromise;
};
