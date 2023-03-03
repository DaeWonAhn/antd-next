import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Board, BoardDocument } from './schemas/board.schema';

@Injectable()
export class BoardsRepository {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async find(boardsFilterQuery: FilterQuery<Board>): Promise<Board[]> {
    return this.boardModel.find(boardsFilterQuery);
  }

  async create(board: Board): Promise<Board> {
    const newBoard = new this.boardModel(Board);
    return newBoard.save();
  }
}
