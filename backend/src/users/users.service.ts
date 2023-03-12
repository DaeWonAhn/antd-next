import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,

    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({ _id: id });
  }

  async loginUser(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({ order: { price: 'desc' } });
  }

  /*
  
  async createUser(
    email: string,
    age: number,
    password: string,
    ): Promise<User> {
      return this.usersRepository.create({
        userId: uuidv4(),
        email,
        age,
        password,
        phone,
        favoriteFoods: [],
      });
    }
    */

  async save(user: CreateUserDto): Promise<User> {
    // await this.transformPassword(createUserDto);
    await this.transformPassword(user);
    return this.usersRepository.create({
      email: user.email,
      age: user.age,
      phone: user.phone,
      password: user.password,
    });
  }

  async updateUser(id: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ _id: id }, userUpdates);
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async deleteUserFromUserId(userId: string) {
    return await this.userModel.findOneAndDelete({
      userId,
    });
  }

  async transformPassword(user: CreateUserDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}
