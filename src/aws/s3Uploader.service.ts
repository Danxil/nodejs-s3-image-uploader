import S3 from 'aws-sdk/clients/s3';
import { Stream } from 'stream';

export class S3UploaderService {
  upload(fileName: string) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    });

    const passsStream = new Stream.PassThrough();

    const promise = s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Body: passsStream,
        Key: fileName,
      })
      .promise();

    return { promise, passsStream };
  }
}
