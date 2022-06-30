import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ZoneService } from './zone.service';
import { Zone } from './zone.model';
import { CreateZoneInput, UpdateZoneInput } from './inputs/zone.input';

@Resolver()
export class ZoneResolver {
  constructor(
    @Inject(forwardRef(() => ZoneService))
    private readonly zoneService: ZoneService,
  ) {}
  @Query(() => [Zone])
  getZones(
    @Args('ids', {
      type: () => [String],
    })
    ids: string[],
  ) {
    return this.zoneService.getZones(ids);
  }

  @Mutation(() => Zone)
  createZone(@Args('input') input: CreateZoneInput) {
    return this.zoneService.createZone(input);
  }

  @Mutation(() => Zone)
  updateZone(@Args('_id') _id: string, @Args('input') input: UpdateZoneInput) {
    return this.zoneService.updateZone(_id, input);
  }
}
