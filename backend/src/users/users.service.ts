import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private authService: AuthService,

    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async loginUser(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({ order: { price: 'desc' } });
  }

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
      favoriteFoods: [],
    });
  }

  async save(user: CreateUserDto): Promise<User> {
    // await this.transformPassword(createUserDto);
    await this.transformPassword(user);
    return this.usersRepository.create({
      userId: uuidv4(),
      email: user.email,
      age: user.age,
      favoriteFoods: [],
      password: user.password,
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async deleteUserFromUserId(userId: string) {
    return await this.userModel.findOneAndDelete({
      userId,
    });
  }

  async login2(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    // const user = await this.usersRepository.selectUser(email, password);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    return this.authService.login(user);
  }

  // 암호화
  async transformPassword(user: CreateUserDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}
