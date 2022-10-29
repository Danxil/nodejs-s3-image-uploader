import sharp, { Region } from 'sharp';
import fs from 'fs';

export const resizeImage = (
  imageName: string,
  sharpOptons: Region,
  source: NodeJS.ReadableStream,
) => {
  new Promise((resolve, reject) => {
    const resizer = sharp().extract(sharpOptons).png();

    const writableStream = fs.createWriteStream(
      `${__dirname}/../../${imageName}`,
    );

    writableStream.on('end', () => {
      resolve('success');
    });

    writableStream.on('error', (err) => {
      reject(err);
    });

    source.pipe(resizer).pipe(writableStream);
  });
};
