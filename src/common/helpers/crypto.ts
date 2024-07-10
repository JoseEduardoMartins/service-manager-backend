import * as md5 from 'md5';
const key = process.env.APP_KEY;

export const encrypt = (value: string) => md5(value + key);
