import { Module } from '@nestjs/common';

import { AccountRepositoryModule } from '@module/account/repositories/account/account.repository.module';
import { ListAccountsAdminHandler } from '@module/account/use-cases/list-accounts/list-accounts.admin-handler';
import { ListAccountsController } from '@module/account/use-cases/list-accounts/list-accounts.controller';
import { ListAccountsHandler } from '@module/account/use-cases/list-accounts/list-accounts.handler';

@Module({
  imports: [AccountRepositoryModule],
  controllers: [ListAccountsController],
  providers: [ListAccountsHandler, ListAccountsAdminHandler],
})
export class ListAccountsModule {}
