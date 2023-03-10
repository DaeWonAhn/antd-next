import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardDocument } from './schemas/board.schema';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async save(board: CreateBoardDto) {
    return this.boardModel.create(board);
  }

  async getBoards() {
    return this.boardModel.find();
  }
}
