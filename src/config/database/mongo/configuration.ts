import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  name: process.env.MONGO_NAME,
}));
