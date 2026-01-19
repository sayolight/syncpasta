import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private AWS_S3_BUCKET = 'syncpasta';
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    console.log(this.configService.get<string>('S3_ENDPOINT'))
    this.s3 = new AWS.S3({
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
      s3ForcePathStyle: true,
      accessKeyId: this.configService.get<string>('S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY'),
    });
    this.s3.createBucket({ Bucket: this.AWS_S3_BUCKET }, (err, data) => {
      if (err && err.code !== 'BucketAlreadyOwnedByYou') {
        console.error('Error creating bucket:', err);
      }
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    filename: string,
    contentType: string,
  ) {
    return await this.s3
      .upload({
        Key: filename,
        Body: file.buffer,
        ContentType: contentType,
        Bucket: this.AWS_S3_BUCKET,
      })
      .promise();
  }
}
