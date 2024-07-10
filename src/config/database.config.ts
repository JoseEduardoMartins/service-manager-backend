import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  userpassword: process.env.DATABASE_USERPASSWORD,
}));
