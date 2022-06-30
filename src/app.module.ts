import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PageModule } from './page/page.module';
import { DetailModule } from './detail/detail.module';
import { ZoneModule } from './zone/zone.module';
@Module({
  imports: [
    DetailModule,
    ZoneModule,
    PageModule,
    ConfigModule.forRoot({
      envFilePath: [
        '.env.prod.local',
        '.env.prod',
        '.env.dev.local',
        '.env.dev',
        '.env.local',
        '.env',
      ],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
