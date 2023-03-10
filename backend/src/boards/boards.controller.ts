import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './schemas/board.schema';

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
  async getBoards() {
    return this.boardService.getBoards();
  }

  @Get(':id')
  async getBoard(@Param('id') id: string): Promise<Board> {
    return this.boardService.getBoard(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.boardService.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() board: CreateBoardDto) {
    return this.boardService.update(id, board);
  }
}
