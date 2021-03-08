import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfigModule } from '../../../config/database/mongo/config.module';
import { MongoConfigService } from '../../../config/database/mongo/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfig: MongoConfigService) => ({
        uri: `mongodb://${mongoConfig.mongoHost}:${mongoConfig.mongoPort}/${mongoConfig.mongoName}`,
      }),
      inject: [MongoConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class MongoModule {}
