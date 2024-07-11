import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  to: process.env.MAIL_TO,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASSWORD,
}));
