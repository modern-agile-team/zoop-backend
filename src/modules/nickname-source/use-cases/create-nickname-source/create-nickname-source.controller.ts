import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { NicknameSourceDtoAssembler } from '@module/nickname-source/assemblers/nickname-source-dto.assembler';
import { NicknameSourceAdminDto } from '@module/nickname-source/dto/nickname-source.admin-dto';
import { NicknameSource } from '@module/nickname-source/entities/nickname-source.entity';
import { NicknameSourceAlreadyExistsError } from '@module/nickname-source/errors/nickname-source-already-exists.error';
import { CreateNicknameSourceAdminDto } from '@module/nickname-source/use-cases/create-nickname-source/create-nickname-source.admin-dto';
import { CreateNicknameSourceCommand } from '@module/nickname-source/use-cases/create-nickname-source/create-nickname-source.command';

import { BaseHttpException } from '@common/base/base-http-exception';
import {
  PermissionDeniedError,
  RequestValidationError,
  UnauthorizedError,
} from '@common/base/base.error';
import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';
import { AdminGuard } from '@common/guards/admin.guard';

@ApiTags('nickname-source')
@Controller()
export class CreateNicknameSourceController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: '닉네임 소스 생성' })
  @ApiErrorResponse({
    [HttpStatus.BAD_REQUEST]: [RequestValidationError],
    [HttpStatus.UNAUTHORIZED]: [UnauthorizedError],
    [HttpStatus.FORBIDDEN]: [PermissionDeniedError],
    [HttpStatus.CONFLICT]: [NicknameSourceAlreadyExistsError],
  })
  @ApiCreatedResponse({ type: NicknameSourceAdminDto })
  @UseGuards(AdminGuard)
  @Post('admin/nickname-sources')
  async createNicknameSourceAdmin(
    @Body() body: CreateNicknameSourceAdminDto,
  ): Promise<NicknameSourceAdminDto> {
    try {
      const command = new CreateNicknameSourceCommand({
        name: body.name,
      });

      const nicknameSource = await this.commandBus.execute<
        CreateNicknameSourceCommand,
        NicknameSource
      >(command);

      return NicknameSourceDtoAssembler.convertToAdminDto(nicknameSource);
    } catch (error) {
      if (error instanceof NicknameSourceAlreadyExistsError) {
        throw new BaseHttpException(HttpStatus.CONFLICT, error);
      }

      throw error;
    }
  }
}
