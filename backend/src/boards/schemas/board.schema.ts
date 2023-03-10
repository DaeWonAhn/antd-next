import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  content: string;

  @Prop()
  title: string;

  @Prop()
  regDate: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
