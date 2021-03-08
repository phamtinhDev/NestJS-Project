import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { MongoConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MONGO_HOST: Joi.string().default('localhost'),
        MONGO_PORT: Joi.number().default(27017),
        MONGO_NAME: Joi.string().default('learn-nest'),
      }),
    }),
  ],
  providers: [ConfigService, MongoConfigService],
  exports: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}
