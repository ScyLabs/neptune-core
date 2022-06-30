import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './page.model';
import { PageResolver } from './page.resolver';
import { PageService } from './page.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [],
  providers: [PageService, PageResolver],
})
export class PageModule {}
