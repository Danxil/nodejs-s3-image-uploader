import { Controller, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { spawn } from 'child_process';
import { resizeImage } from './utils/imageProcessor';

@Controller('upload')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async upload(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.on('end', () => {
        resolve('success');
      });

      req.on('error', (err) => {
        reject(err);
      });

      const forked = spawn('node', [
        `${__dirname}/utils/imageProcessorChildProcess.js`,
      ]);

      forked.stderr.on('data', (data) => {
        reject(data.toString());
      });

      req.pipe(forked.stdin);

      resizeImage(
        'uploaded.png',
        {
          width: 200,
          height: 200,
          left: 0,
          top: 0,
        },
        req,
      );
    });
  }
}
