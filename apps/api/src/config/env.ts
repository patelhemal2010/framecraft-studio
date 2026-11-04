import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('4000').transform((v) => parseInt(v, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_URL: z.string().default('http://localhost:4000'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  DATABASE_URL: z
    .string()
    .default('postgresql://framecraft:framecraft_secret_password@localhost:5433/framecraft_db?schema=public'),
  JWT_SECRET: z.string().min(16).default('super_secret_framecraft_jwt_key_at_least_32_characters_long_2026'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  COOKIE_SECRET: z.string().default('framecraft_cookie_secret_key_2026'),
  UPLOAD_DIR: z.string().default('uploads'),
  MAX_FILE_SIZE_MB: z.string().default('25').transform((v) => parseInt(v, 10)),
  MAX_PHOTOS_PER_PROJECT: z.string().default('30').transform((v) => parseInt(v, 10)),
});

export const env = envSchema.parse(process.env);
