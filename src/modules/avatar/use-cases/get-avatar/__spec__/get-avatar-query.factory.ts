import { Factory } from 'rosie';

import { GetAvatarQuery } from '@module/avatar/use-cases/get-avatar/get-avatar.query';

import { generateEntityId } from '@common/base/base.entity';

export const GetAvatarQueryFactory = Factory.define<GetAvatarQuery>(
  GetAvatarQuery.name,
  GetAvatarQuery,
).attrs({
  avatarId: () => generateEntityId(),
});
