import { S3 } from '@aws-sdk/client-s3';
import fs from 'fs';
import { ImageRepository } from './image.repository';
import { IImage } from './image.model';
import config from '~/libs/config/config';

const s3 = new S3({
  credentials: {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretKey,
  },
  region: config.aws.region,
});

class ImageService {
  private imageRepository = new ImageRepository();

  async upload(filePath: string, fileName: string): Promise<IImage> {
    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
      Bucket: config.aws.bucket,
      Key: `uploads/${Date.now()}-${fileName}`,
      Body: fileStream,
    };

    await s3.putObject(uploadParams);

    const fileUrl = `https://${config.aws.bucket}.s3.${config.aws.region}.amazonaws.com/${uploadParams.Key}`;
    return await this.imageRepository.create({
      url: fileUrl,
      key: uploadParams.Key,
    });
  }

  async getById(id: string): Promise<IImage | null> {
    return await this.imageRepository.find(id);
  }
}

export { ImageService };
