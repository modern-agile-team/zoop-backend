import { Factory } from 'fishery';

import {
  ILeaveGameRoomCommandProps,
  LeaveGameRoomCommand,
} from '@module/game-room/use-cases/leave-game-room/leave-game-room.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const LeaveGameRoomCommandFactory = Factory.define<
  LeaveGameRoomCommand,
  void,
  LeaveGameRoomCommand,
  Partial<ILeaveGameRoomCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ILeaveGameRoomCommandProps>(
    {
      currentAccountId: generateEntityId(),
      gameRoomId: generateEntityId(),
    },
    params,
  );

  return new LeaveGameRoomCommand(props);
});
