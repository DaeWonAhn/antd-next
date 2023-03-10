import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Post()
  async createBoard(@Body() board: CreateBoardDto) {
    console.log('board: ', board);

    return this.boardService.save({
      content: board.content,
      title: board.title,
      regDate: new Date(),
    });
  }

  @Get()
  async getBoard() {
    return this.boardService.getBoards();
  }
}
