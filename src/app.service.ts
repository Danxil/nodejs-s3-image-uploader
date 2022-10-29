import fs from 'fs';
import { Injectable } from '@nestjs/common';
import S3 from 'aws-sdk/clients/s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async uploadFile() {
    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
    });

    const stream = fs.createReadStream(__dirname + '/../test.png');

    const result = await s3
      .upload({
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Body: stream,
        Key: 'test2.png',
      })
      .promise();

    console.log(result);
  }
}
