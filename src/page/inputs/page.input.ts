import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePageInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  parent: string;
}

@InputType()
export class UpdatePageInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Number, { nullable: true })
  prio: number;

  @Field(() => String, { nullable: true })
  parent: string;
}
