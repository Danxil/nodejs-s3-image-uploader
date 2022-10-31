import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3UploaderService } from './s3Uploader.service';

@Module({
  imports: [ConfigModule],
  providers: [S3UploaderService],
  exports: [S3UploaderService],
})
export class AwsModule {}
