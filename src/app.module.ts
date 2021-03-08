import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { AppConfigModule } from './config/app/config.module';
import { MongoModule } from './providers/database/mongo/provider.module';

@Module({
  imports: [AppConfigModule, MongoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
