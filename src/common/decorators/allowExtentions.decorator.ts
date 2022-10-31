import { SetMetadata } from '@nestjs/common';

export type Extention = string;

export const ALLOW_EXTENTIONS_KEY = 'allowExtentions';

export const AllowExtentions = (...extentions: Array<Extention>) =>
  SetMetadata(ALLOW_EXTENTIONS_KEY, extentions);
