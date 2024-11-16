import { GetAllRequestDto } from 'shared/src';
import { IListing } from './listing.model';
import { ListingRepository } from './listing.repository';
import { Types } from 'mongoose';

export class ListingService {
  private repository: ListingRepository;

  constructor() {
    this.repository = new ListingRepository();
  }

  async create(skillData: Partial<IListing>, userId: Types.ObjectId) {
    const dataToCreate: Partial<IListing> = {
      ...skillData,
      creator: userId,
    };

    return this.repository.create(dataToCreate);
  }

  async getAll({ page, pageSize, name }: GetAllRequestDto) {
    const skip = (page - 1) * pageSize;
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {};

    return this.repository.findAll(filter, skip, pageSize);
  }

  async getById(skillId: string) {
    return this.repository.find(skillId);
  }

  async update(skillId: string, updateData: Partial<IListing>) {
    return this.repository.update(skillId, updateData);
  }

  async delete(skillId: string) {
    return this.repository.delete(skillId);
  }
}
