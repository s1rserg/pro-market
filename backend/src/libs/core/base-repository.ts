import { Model, Document } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  public async create(item: Partial<T>): Promise<T> {
    return this.model.create(item);
  }

  public async find(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  public async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  public async update(id: string, item: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
