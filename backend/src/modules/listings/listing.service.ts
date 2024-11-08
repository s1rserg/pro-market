import { IListing } from './listing.model';
import { ListingRepository } from './listing.repository';

export class ListingService {
  private repository: ListingRepository;

  constructor() {
    this.repository = new ListingRepository();
  }

  async create(skillData: Partial<IListing>) {
    return this.repository.create(skillData);
  }

  async getAll() {
    return this.repository.findAll();
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
