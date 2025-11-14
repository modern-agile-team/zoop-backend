import { Module } from '@nestjs/common';

import { AccountRepositoryModule } from '@module/account/repositories/account/account.repository.module';
import { UpdateAccountController } from '@module/account/use-cases/update-account/update-account.controller';
import { UpdateAccountHandler } from '@module/account/use-cases/update-account/update-account.handler';
import { AvatarRepositoryModule } from '@module/avatar/repositories/avatar/avatar.repository.module';

import { EventStoreModule } from '@core/event-sourcing/event-store.module';

@Module({
  imports: [EventStoreModule, AccountRepositoryModule, AvatarRepositoryModule],
  controllers: [UpdateAccountController],
  providers: [UpdateAccountHandler],
})
export class UpdateAccountModule {}
