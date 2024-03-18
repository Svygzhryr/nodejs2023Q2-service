import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
