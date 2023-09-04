import bcrypt from 'bcrypt';

export class PasswordUtils {
  async hashPass(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }

  async comparePass(password: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(password, hash);
    return isEqual;
  }
}

export default new PasswordUtils();
