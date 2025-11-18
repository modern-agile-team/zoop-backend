import { Factory } from 'fishery';

import {
  GetAvatarQuery,
  IGetAvatarQueryProps,
} from '@module/avatar/use-cases/get-avatar/get-avatar.query';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetAvatarQueryFactory = Factory.define<
  GetAvatarQuery,
  void,
  GetAvatarQuery,
  Partial<IGetAvatarQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetAvatarQueryProps>(
    {
      avatarId: generateEntityId(),
    },
    params,
  );

  return new GetAvatarQuery(props);
});
