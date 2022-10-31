import {
  Controller,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ImageService } from './image/image.service';
import { AllowContentType } from './common/decorators/allowContentType.decorator';
import { IMAGE_CONTENT_TYPES, IMAGE_EXTENTIONS } from './config';
import { AllowExtentions } from './common/decorators/allowExtentions.decorator';
import { AllowExtentionsGuard } from './common/guards/allowExtentions.guard';
import { ReqSizeLimitInterceptor } from './common/interceptors/reqSizeLimit.interceptor';
import { AllowContentTypeGuard } from './common/guards/allowContentType.guard';

@Controller()
export class AppController {
  constructor(private readonly imageService: ImageService) {}

  @Post(':fileName')
  @AllowContentType(...IMAGE_CONTENT_TYPES)
  @AllowExtentions(...IMAGE_EXTENTIONS)
  @UseGuards(AllowContentTypeGuard, AllowExtentionsGuard)
  @UseInterceptors(ReqSizeLimitInterceptor)
  async upload(
    @Req() req: Request,
    @Res() res: Response,
    @Param() { fileName },
  ) {
    return this.imageService
      .processImageForMultipleDimentions(req, fileName)
      .then((msg) => res.status(HttpStatus.CREATED).send(msg))
      .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err));
  }
}
