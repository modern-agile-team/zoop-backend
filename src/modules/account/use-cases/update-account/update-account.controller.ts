import { Body, Controller, HttpStatus, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccountDtoAssembler } from '@module/account/assemblers/account-dto.assembler';
import { AccountDto } from '@module/account/dto/account.dto';
import { Account } from '@module/account/entities/account.entity';
import { AccountAvatarNotFoundError } from '@module/account/errors/account-avatar-not-found.error';
import { AccountNicknameAlreadyOccupiedError } from '@module/account/errors/account-nickname-already-occupied.error';
import { AccountNotFoundError } from '@module/account/errors/account-not-found.error';
import { UpdateAccountCommand } from '@module/account/use-cases/update-account/update-account.command';
import { UpdateAccountDto } from '@module/account/use-cases/update-account/update-account.dto';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import {
  CurrentUser,
  ICurrentUser,
} from '@common/decorator/current-user.decorator';

@ApiTags('account')
@Controller()
export class UpdateAccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '본인 계정 수정' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [
      RequestValidationError,
      AccountNicknameAlreadyOccupiedError,
      AccountAvatarNotFoundError,
    ],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.NOT_FOUND]: [AccountNotFoundError],
  })
  @ApiOkResponse({ type: AccountDto })
  @Patch('accounts/me')
  async updateAccount(
    @CurrentUser() currentUser: ICurrentUser,
    @Body() body: UpdateAccountDto,
  ): Promise<AccountDto> {
    try {
      const command = new UpdateAccountCommand({
        accountId: currentUser.id,
        nickname: body.nickname,
        avatarFileName: body.avatarFileName,
      });

      const account = await this.commandBus.execute<
        UpdateAccountCommand,
        Account
      >(command);

      return AccountDtoAssembler.convertToDto(account);
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        throw new BaseHttpException(HttpStatus.NOT_FOUND, error);
      }

      if (error instanceof AccountNicknameAlreadyOccupiedError) {
        throw new BaseHttpException(HttpStatus.BAD_REQUEST, error);
      }

      if (error instanceof AccountAvatarNotFoundError) {
        throw new BaseHttpException(HttpStatus.BAD_REQUEST, error);
      }

      throw error;
    }
  }
}
