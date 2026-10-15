import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'node:crypto';
import { PresignUploadDto } from './dto/presign-upload.dto.js';

@Injectable()
export class UploadsService {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    this.bucket = this.config.get<string>('S3_BUCKET', 'vyoma-website-assets');
    this.client = new S3Client({
      region: this.config.get<string>('S3_REGION', 'ap-south-1'),
      credentials: {
        accessKeyId: this.config.get<string>('S3_ACCESS_KEY_ID', ''),
        secretAccessKey: this.config.get<string>('S3_SECRET_ACCESS_KEY', ''),
      },
    });
  }

  async presign(dto: PresignUploadDto) {
    const safeName = dto.filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const key = `images/${randomUUID()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: dto.contentType,
      ContentLength: dto.sizeBytes,
    });

    const uploadUrl = await getSignedUrl(this.client, command, { expiresIn: 300 });
    const publicUrl = `https://${this.bucket}.s3.${this.config.get('S3_REGION', 'ap-south-1')}.amazonaws.com/${key}`;

    return { uploadUrl, publicUrl, key };
  }
}
