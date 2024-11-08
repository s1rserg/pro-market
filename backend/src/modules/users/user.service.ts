import { encryption } from '~/libs/encryption/encryption';
import { UserRepository } from './user.repository';
import { token } from '~/libs/token/token';

class UserService {
  private userRepository = new UserRepository();

  public async create(name: string, email: string, password: string) {
    if ((await this.userRepository.findByEmail(email)).length !== 0) {
      throw { status: 409, errors: 'This email is already registered' };
    }

    password = await encryption.encrypt(password);
    const user = await this.userRepository.create({ name, email, password });
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), jwtToken };
  }

  public async signIn(email: string, password: string) {
    const [user] = await this.userRepository.findByEmail(email);
    if (!(await encryption.compare(password, user.password))) {
      throw { status: 403, errors: 'Wrong email or password' };
    }
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), jwtToken };
  }

  public async getById(id: string) {
    const user = await this.userRepository.find(id);
    return user ? this.selectUserFields(user) : null;
  }

  private selectUserFields(user: { id?: string; name: string; email: string }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export { UserService };
