import { BaseRepository } from '~/libs/core/base-repository';
import { Image, IImage } from './image.model';

class ImageRepository extends BaseRepository<IImage> {
  constructor() {
    super(Image);
  }
}

export { ImageRepository };
