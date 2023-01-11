import { hash, compare } from 'bcryptjs';

export class User {
  private _password: string;
  constructor(
    private readonly _email: string,
    private readonly _name: string,
    private readonly passHash?: string,
  ) {
    if (passHash) this._password = passHash;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt);
  }

  public async validatePassword(pass: string): Promise<boolean> {
    if (!this._password) return false;
    return compare(pass, this._password);
  }
}
