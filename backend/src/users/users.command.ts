import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersCommand {
  constructor(private readonly usersService: UsersService) {}

  // DB seed service
  // npx nestjs-command create:accounts
  @Command({
    command: 'create:accounts',
    describe: 'creates default user accounts',
  })
  async create() {
    const admin = await this.usersService.createUser({
      fullName: 'Admin account',
      email: 'admin@admin.com',
      zipCode: 1234,
      phone: 1234,
      password: 'Administrator1',
      gender: 'Prefer not to say',
      dateOfBirth: new Date('1900-03-25'),
      roles: [Role.Admin],
    });
    const user = await this.usersService.createUser({
      fullName: 'Default user',
      email: 'user@user.com',
      zipCode: 1234,
      phone: 1234,
      password: 'UserAccount1',
      gender: 'Prefer not to say',
      dateOfBirth: new Date('1900-03-25'),
      roles: [Role.User],
    });

    if (user && admin) {
      console.log('Default user accounts seeded successfully');
    }
  }
}
