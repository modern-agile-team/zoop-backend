import { Module } from '@nestjs/common';

import Redis from 'ioredis';

import { AppConfigModule } from '@common/app-config/app-config.module';
import { AppConfigService } from '@common/app-config/app-config.service';

import { CacheClient } from '@shared/cache/cache.client';
import { CACHE_CLIENT } from '@shared/cache/cache.client.interface';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      useFactory: () => {
        /**
         * @description 테스트 환경에서 동적으로 주입한 redis URL을 사용하지 못하기 때문에 process.env에서 직접 가져옴
         * @see global-setup.ts
         */
        const redis = new Redis(`${process.env.REDIS_URL}/1`);

        return new CacheClient<unknown>(redis);
      },
      provide: CACHE_CLIENT,
      inject: [AppConfigService],
    },
  ],
  exports: [CACHE_CLIENT],
})
export class CacheModule {}
