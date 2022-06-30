import { Field, InputType } from '@nestjs/graphql';
import { ParentType } from '@neptune/core/common/types/parent-type';

@InputType()
export class CreateZoneInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  parent: string;

  @Field(() => ParentType)
  parentType: ParentType;
}

@InputType()
export class UpdateZoneInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Number, { nullable: true })
  prio: number;

  @Field(() => String, { nullable: true })
  parent: string;
}
