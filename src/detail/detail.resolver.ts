import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Detail } from './detail.model';
import { DetailService } from './detail.service';
import { CreateDetailInput } from './inputs/detail.input';

@Resolver()
export class DetailResolver {
  constructor(
    @Inject(forwardRef(() => DetailService))
    private readonly detailService: DetailService,
  ) {}
  @Mutation(() => Detail)
  createDetail(@Args('input') input: CreateDetailInput) {
    return this.detailService.createDetail(input);
  }
}
