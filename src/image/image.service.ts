import sharp, { ResizeOptions } from 'sharp';
import { Injectable } from '@nestjs/common';
import { S3UploaderService } from '../aws/s3Uploader.service';
import { ConfigService } from '@nestjs/config';
import { IMAGE_DIMENTIONS } from '../config';

@Injectable()
export class ImageService {
  constructor(
    private s3UploaderService: S3UploaderService,
    private readonly configService: ConfigService,
  ) {}

  processImageForMultipleDimentions(
    source: NodeJS.ReadableStream,
    fileName: string,
  ) {
    return Promise.all(
      IMAGE_DIMENTIONS.map((dimentions) =>
        this.processImage(source, `${new Date().getTime()}_${fileName}`, {
          width: dimentions[0],
          height: dimentions[1],
        }),
      ),
    );
  }

  resizeImage(source: NodeJS.ReadableStream, sharpOptons: ResizeOptions) {
    const resizer = sharp().resize(sharpOptons).png();

    return source.pipe(resizer);
  }

  processImage(
    source: NodeJS.ReadableStream,
    imageName: string,
    sharpOptons: ResizeOptions,
  ) {
    const { promise: uploadPromise, passsStream } =
      this.s3UploaderService.upload(imageName);

    this.resizeImage(source, sharpOptons).pipe(passsStream);

    return uploadPromise;
  }
}
