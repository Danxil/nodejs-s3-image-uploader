import { resizeImage } from './imageProcessor';
import { stdin } from 'node:process';

resizeImage(
  'uploaded2.png',
  { width: 400, height: 400, left: 400, top: 400 },
  stdin,
);
