import { ENV_KEY } from '@common/app-config/app-config.constant';

export const MOCK_ENV: Record<keyof typeof ENV_KEY, unknown> = {
  PORT: 8080,
  NODE_ENV: 'test',
  APP_STAGE: 'test',

  DATABASE_URL: 'postgresql://test:test@localhost:5432/test',

  REDIS_URL: 'redis://localhost:6379',

  JWT_SECRET_KEY: 'test-secret',
  JWT_ISSUER: 'test-issuer',
  JWT_ACCESS_TOKEN_EXPIRES_IN: '1h',

  LOGGER_LEVEL: 'trace',

  ALLOW_COOKIE_DOMAIN: 'localhost',

  AWS_S3_REGION: 'ap-northeast-2',
  AWS_S3_BUCKET_NAME: 'test-bucket',
  AWS_S3_URL: 'https://test.s3.ap-northeast-2.amazonaws.com',
  AWS_S3_ACCESS_KEY: 'test-key',
  AWS_S3_SECRET_KEY: 'test-secret',
  AWS_S3_QUIZ_IMAGE_FILE_PATH: 'quiz-images',
  AWS_S3_SOUND_EFFECT_FILE_PATH: 'sound-effects',
  AWS_S3_AVATAR_FILE_PATH: 'avatars',

  OAUTH_ALLOW_REDIRECT_URLS: 'http://localhost:3000',
  OAUTH_DEFAULT_REDIRECT_URL: 'http://localhost:3000',

  GOOGLE_OAUTH_CLIENT_ID: 'fake',
  GOOGLE_OAUTH_CLIENT_SECRET: 'fake',
  GOOGLE_OAUTH_CALLBACK_URL: 'http://localhost:8080/auth/google/callback',
  GOOGLE_OAUTH_SCOPE: 'email,profile',
};
