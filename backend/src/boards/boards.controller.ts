import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBoard(@Body() board: CreateBoardDto, @Request() req: Request) {
    return this.boardService.save({
      content: board.content,
      title: board.title,
      regUserEmail: (req as any).user.email,
      regDate: new Date(),
    });
  }

  @Get()
  async getBoard() {
    return this.boardService.getBoards();
  }
}
