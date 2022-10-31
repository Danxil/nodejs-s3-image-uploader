import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReqSizeLimitInterceptor implements NestInterceptor {
  private readonly maxSizeErrorText = 'Max size exceeded';

  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    let readBytes = 0;

    request.on('data', (chunk) => {
      readBytes += chunk.length;

      if (
        readBytes / 1000 >
        this.configService.get<number>('IMAGE_MAX_SIZE_KB')
      ) {
        response.status(HttpStatus.NOT_ACCEPTABLE).send(this.maxSizeErrorText);
        request.destroy();
      }
    });

    return next.handle();
  }
}
