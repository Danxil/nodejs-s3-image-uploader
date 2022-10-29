import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import fs from 'fs';
import { Request } from 'express';

@Controller('upload')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async upload(@Req() req: Request) {
    return new Promise((resolve) => {
      const stream = fs.createWriteStream(`${__dirname}/../uploaded.png`);

      stream.on('end', () => {
        resolve('success');
      });
      stream.on('error', (err) => {
        resolve(err);
      });

      req.on('end', () => {
        resolve('success');
      });

      req.on('error', (err) => {
        resolve(err);
      });

      req.pipe(stream);
    });
  }
}
