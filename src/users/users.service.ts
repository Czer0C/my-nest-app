

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'john', password: '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxx' }, // Hashed password
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async findAll() {
    return this.users;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findOne(username);

    if (!user) {
      return null;
    }

    // const isValidCredential = await bcrypt.compare(pass, user.password)
    const isValidCredential = pass === user.password;
   
    if (isValidCredential) {
      const { password, ...result } = user;
      
      return result;
    }

    return null;
  }
}
