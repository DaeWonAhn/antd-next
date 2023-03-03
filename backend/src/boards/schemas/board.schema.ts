import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TestingModule } from '@nestjs/testing';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop()
  title: string;

  @Prop()
  age: number;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
