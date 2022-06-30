import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AbstractMainElement } from '@neptune/core/common/model/mainElement';
import { Detail } from '@neptune/core/detail/detail.model';
import { Zone } from '@neptune/core/zone/zone.model';

@ObjectType()
@Schema({ timestamps: true })
export class Page extends AbstractMainElement {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({
    type: Types.ObjectId,
    ref: Page.name,
  })
  parent: string;

  @Field(() => [Page])
  @Prop({
    type: [Types.ObjectId],
    ref: Page.name,
  })
  childs: Page[];

  @Field(() => [Detail])
  @Prop({
    type: Types.ObjectId,
    ref: Detail.name,
    default: [],
  })
  details: Detail[];

  @Field(() => [Zone], {
    defaultValue: [],
  })
  @Prop({
    type: Types.ObjectId,
    ref: Zone.name,
    default: [],
  })
  zones: Zone[];
}

export type PageDocument = Page & Document;

export const PageSchema = SchemaFactory.createForClass(Page);
