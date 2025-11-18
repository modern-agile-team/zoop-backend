import { Factory } from 'fishery';

import {
  IListGameRoomMembersQueryProps,
  ListGameRoomMembersQuery,
} from '@module/game-room/use-cases/list-game-room-members/list-game-room-members.query';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListGameRoomMembersQueryFactory = Factory.define<
  ListGameRoomMembersQuery,
  void,
  ListGameRoomMembersQuery,
  Partial<IListGameRoomMembersQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListGameRoomMembersQueryProps>(
    {
      gameRoomId: generateEntityId(),
    },
    params,
  );

  return new ListGameRoomMembersQuery(props);
});
