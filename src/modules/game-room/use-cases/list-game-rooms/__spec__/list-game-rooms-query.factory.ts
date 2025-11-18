import { Factory } from 'fishery';

import {
  IListGameRoomsQueryProps,
  ListGameRoomsQuery,
} from '@module/game-room/use-cases/list-game-rooms/list-game-rooms.query';

import { createFactoryProps } from '@common/factories/factory-builder.util';

export const ListGameRoomsQueryFactory = Factory.define<
  ListGameRoomsQuery,
  void,
  ListGameRoomsQuery,
  Partial<IListGameRoomsQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IListGameRoomsQueryProps>(
    {
      sort: [{ field: 'createdAt', direction: 'asc' }],
    },
    params,
  );

  return new ListGameRoomsQuery(props);
});
