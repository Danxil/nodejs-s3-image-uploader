import { Controller, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { spawn } from 'child_process';
import { processImage } from './utils/imageProcessing';

@Controller('upload')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async upload(@Req() req: Request) {
    const childProcessPromise = new Promise((res, rej) => {
      const forked = spawn('node', [
        `${__dirname}/utils/imageProcessorChildProcess.js`,
      ]);

      let childErroOut = '';
      forked.stderr.on('data', (data) => {
        childErroOut += data.toString();
      });

      let childOut = '';
      forked.stdout.on('data', (data) => {
        childOut += data.toString();
      });

      forked.on('exit', function () {
        if (childErroOut) rej(childErroOut);
        else res(JSON.parse(childOut));
      });

      req.pipe(forked.stdin);
    });

    const maniProcessPromise = processImage(req, 'uploaded.png', {
      width: 200,
      height: 200,
      left: 0,
      top: 0,
    });
    return Promise.all([maniProcessPromise, childProcessPromise]);
  }
}
