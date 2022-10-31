import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  ALLOW_EXTENTIONS_KEY,
  Extention,
} from '../decorators/allowExtentions.decorator';

@Injectable()
export class AllowExtentionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedExtentions = this.reflector.getAllAndOverride<Extention[]>(
      ALLOW_EXTENTIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    const fileName = context.switchToHttp().getRequest<Request>()
      .params.fileName;

    const extention = fileName.split('.').reverse()[0];
    return allowedExtentions.includes(extention);
  }
}
