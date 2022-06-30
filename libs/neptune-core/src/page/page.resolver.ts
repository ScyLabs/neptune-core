import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePageInput, UpdatePageInput } from './inputs/page.input';
import { Page } from './page.model';
import { PageService } from './page.service';

@Resolver()
export class PageResolver {
  constructor(
    @Inject(forwardRef(() => PageService))
    private readonly pageService: PageService,
  ) {}
  @Query(() => [Page])
  getPages() {
    return this.pageService.getPages();
  }

  @Mutation(() => Page)
  createPage(@Args('input') input: CreatePageInput) {
    return this.pageService.createPage(input);
  }

  @Mutation(() => Page)
  updatePage(@Args('_id') _id: string, @Args('input') input: UpdatePageInput) {
    return this.pageService.updatePage(_id, input);
  }
}
