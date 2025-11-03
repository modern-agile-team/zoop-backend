import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface ICurrentUser {
  id: string;
}

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const { user } = request;

    return {
      id: user?.id,
    };
  },
);
