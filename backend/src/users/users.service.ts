import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdNewUser = new this.userModel(createUserDto);
    return createdNewUser.save();
  }

  async findOne(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email: email });
  }

  findOneById(id: string) {
    return this.userModel.findById(new mongoose.Types.ObjectId(id)).exec();
  }

  findAll() {
    return this.userModel.find().exec();
  }
}
