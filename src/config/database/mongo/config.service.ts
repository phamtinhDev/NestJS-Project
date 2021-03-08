import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoConfigService {
  constructor(private configService: ConfigService) {}

  get mongoHost(): string {
    return this.configService.get<string>('mongo.host');
  }

  get mongoPort(): number {
    return this.configService.get<number>('mongo.port');
  }

  get mongoName(): string {
    return this.configService.get<string>('mongo.name');
  }
}
