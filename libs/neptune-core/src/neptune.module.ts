import { Module } from '@nestjs/common';
import { DetailModule } from './detail/detail.module';
import { NeptuneService } from './neptune.service';
import { PageModule } from './page/page.module';
import { ZoneModule } from './zone/zone.module';

@Module({
  imports: [PageModule, DetailModule, ZoneModule],
  providers: [NeptuneService],
  exports: [NeptuneService],
})
export class NeptuneModule {}
