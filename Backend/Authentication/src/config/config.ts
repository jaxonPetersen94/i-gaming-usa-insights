import dotenv from 'dotenv';
import { join } from 'path';

const envFilePath =
  process.env.NODE_ENV === 'production'
    ? join(process.cwd(), '/.env')
    : join(process.cwd(), '/.env.development');

dotenv.config({ path: envFilePath });

export default process.env;
