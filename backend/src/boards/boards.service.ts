import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { Board } from './schemas/board.schema';
import { BoardsRepository } from './boards.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async create(email: string, title: string, age: number): Promise<Board> {
    return this.boardsRepository.create({
      userId: uuidv4(),
      title,
      email,
      age,
    });
  }

  async findAll(): Promise<Board[]> {
    return this.boardsRepository.find({ order: { price: 'desc' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
