import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Detail {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  lang: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => [String])
  @Prop()
  titles: string[];

  @Field(() => [String])
  @Prop()
  descriptions: string[];

  @Field(() => String)
  @Prop()
  url: string;

  @Field(() => String)
  @Prop()
  h1: string;

  @Field(() => String)
  @Prop()
  metaTitle: string;

  @Field(() => String)
  @Prop()
  metaDesc: string;

  @Field(() => String)
  metaKeys: string;
}

export type DetailDocument = Detail & Document;

export const DetailSchema = SchemaFactory.createForClass(Detail);
