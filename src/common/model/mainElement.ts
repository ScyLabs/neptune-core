import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class AbstractMainElement {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Number)
  @Prop()
  prio: number;

  @Field(() => Boolean, { defaultValue: true })
  @Prop({ default: true })
  active: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ default: false })
  deleted: boolean;
}
