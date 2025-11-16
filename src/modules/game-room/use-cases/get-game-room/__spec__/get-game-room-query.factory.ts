import { Factory } from 'fishery';

import {
  GetGameRoomQuery,
  IGetGameRoomQueryProps,
} from '@module/game-room/use-cases/get-game-room/get-game-room.query';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetGameRoomQueryFactory = Factory.define<
  GetGameRoomQuery,
  void,
  GetGameRoomQuery,
  Partial<IGetGameRoomQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetGameRoomQueryProps>(
    {
      gameRoomId: generateEntityId(),
    },
    params,
  );

  return new GetGameRoomQuery(props);
});
