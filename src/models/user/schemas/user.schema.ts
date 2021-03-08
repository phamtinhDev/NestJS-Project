import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocment = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  userName: string;

  @Prop()
  age: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  coin: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
