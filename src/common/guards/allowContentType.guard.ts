import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  CONTENT_TYPE_KEY,
  ContentType,
} from '../decorators/allowContentType.decorator';

@Injectable()
export class AllowContentTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedContentTypes = this.reflector.getAllAndOverride<ContentType[]>(
      CONTENT_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    );
    const currentContentType = context
      .switchToHttp()
      .getRequest<Request>()
      .get('Content-Type');

    return allowedContentTypes.includes(currentContentType);
  }
}
