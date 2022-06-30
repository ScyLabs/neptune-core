import { Field, InputType } from '@nestjs/graphql';
import { ParentType } from '@neptune/core/common/types/parent-type';

@InputType()
export class CreateDetailInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  lang: string;

  @Field(() => [String])
  titles: string[];

  @Field(() => [String])
  descriptions: string[];

  @Field(() => String)
  url: string;

  @Field(() => String)
  h1: string;

  @Field(() => String)
  metaTitle: string;

  @Field(() => String)
  metaDesc: string;

  @Field(() => String)
  metaKeys: string;

  @Field(() => String)
  parent: string;

  @Field(() => ParentType)
  parentType: ParentType;
}
