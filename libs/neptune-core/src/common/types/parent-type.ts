import { registerEnumType } from '@nestjs/graphql';
import { PageSchema } from '@neptune/core/page/page.model';
import { ZoneSchema } from '@neptune/core/zone/zone.model';

export enum ParentType {
  Page = 'Page',
  Zone = 'Zone',
}

export const ParentTypeSchema = {
  Page: PageSchema,
  Zone: ZoneSchema,
};

registerEnumType(ParentType, { name: 'ParentType' });
