import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageModule } from 'src/page/page.module';
import { Detail, DetailSchema } from './detail.model';
import { DetailResolver } from './detail.resolver';
import { DetailService } from './detail.service';

@Module({
  imports: [
    forwardRef(() => PageModule),
    MongooseModule.forFeature([{ name: Detail.name, schema: DetailSchema }]),
  ],
  controllers: [],
  providers: [DetailService, DetailResolver],
})
export class DetailModule {}
