import { processImage } from './imageProcessing';
import { stdin } from 'node:process';
import stream from 'node:stream';

const bufferStream = new stream.PassThrough();

bufferStream.pipe(process.stdout);

processImage(stdin, 'uploaded2.png', {
  width: 400,
  height: 400,
  left: 400,
  top: 400,
})
  .then((result) => {
    const buffer = Buffer.from(JSON.stringify(result));

    bufferStream.end(buffer);
  })
  .catch((e) => {
    const buffer = Buffer.from(JSON.stringify(e.toString()));

    bufferStream.end(buffer);
  });
