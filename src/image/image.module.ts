import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [ConfigModule, AwsModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
