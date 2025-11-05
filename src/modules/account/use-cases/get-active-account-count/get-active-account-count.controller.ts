import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ActiveAccountCountDto } from '@module/account/dto/active-account-count.dto';
import { GetActiveAccountCountQuery } from '@module/account/use-cases/get-active-account-count/get-active-account-count.query';

import { ApiErrorResponse } from '@common/decorator/api-fail-response.decorator';

@ApiTags('account')
@Controller()
export class GetActiveAccountCountController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: '활성 유저 수 조회' })
  @ApiErrorResponse({})
  @ApiOkResponse({
    type: ActiveAccountCountDto,
  })
  @Get('accounts/active-account-count')
  async getActiveAccountCount() {
    const query = new GetActiveAccountCountQuery({});

    const activeAccountCount = await this.queryBus.execute<
      GetActiveAccountCountQuery,
      number
    >(query);

    return new ActiveAccountCountDto(activeAccountCount);
  }
}
