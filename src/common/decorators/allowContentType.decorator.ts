import { SetMetadata } from '@nestjs/common';

export type ContentType = string;

export const CONTENT_TYPE_KEY = 'contentType';

export const AllowContentType = (...contentTypes: Array<ContentType>) =>
  SetMetadata(CONTENT_TYPE_KEY, contentTypes);
