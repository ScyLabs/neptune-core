import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AbstractMainElement } from '@neptune/core/common/model/mainElement';
import { ParentType } from '@neptune/core/common/types/parent-type';
import { Detail } from '@neptune/core/detail/detail.model';

@ObjectType()
@Schema({ timestamps: true })
export class Zone extends AbstractMainElement {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => [Detail])
  @Prop({
    type: Types.ObjectId,
    ref: Detail.name,
    default: [],
  })
  details: Detail[];
}

export type ZoneDocument = Zone & Document;

export const ZoneSchema = SchemaFactory.createForClass(Zone);
