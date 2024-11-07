import { BaseRepository } from '~/libs/core/base-repository';
import { User, IUser } from './user.model';

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  public async findByEmail(email: string) {
    return await this.model.find({ email }).exec();
  }
}

export { UserRepository };
