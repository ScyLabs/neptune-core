import { registerEnumType } from '@nestjs/graphql';
import { PageSchema } from 'src/page/page.model';
import { ZoneSchema } from 'src/zone/zone.model';

export enum ParentType {
  Page = 'Page',
  Zone = 'Zone',
}

export const ParentTypeSchema = {
  Page: PageSchema,
  Zone: ZoneSchema,
};

registerEnumType(ParentType, { name: 'ParentType' });
