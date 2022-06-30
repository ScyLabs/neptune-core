import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Zone, ZoneSchema } from './zone.model';
import { ZoneService } from './zone.service';
import { ZoneResolver } from './zone.resolver';
import { PageModule } from 'libs/neptune-core/src/page/page.module';

@Module({
  imports: [
    forwardRef(() => PageModule),
    MongooseModule.forFeature([{ name: Zone.name, schema: ZoneSchema }]),
  ],
  controllers: [],
  providers: [ZoneService, ZoneResolver],
})
export class ZoneModule {}
