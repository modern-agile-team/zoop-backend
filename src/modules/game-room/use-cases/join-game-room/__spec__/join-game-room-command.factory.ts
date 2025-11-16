import { Factory } from 'fishery';

import { GameRoomMemberRole } from '@module/game-room/entities/game-room-member.entity';
import {
  IJoinGameRoomCommandProps,
  JoinGameRoomCommand,
} from '@module/game-room/use-cases/join-game-room/join-game-room.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const JoinGameRoomCommandFactory = Factory.define<
  JoinGameRoomCommand,
  void,
  JoinGameRoomCommand,
  Partial<IJoinGameRoomCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IJoinGameRoomCommandProps>(
    {
      currentAccountId: generateEntityId(),
      gameRoomId: generateEntityId(),
      role: GameRoomMemberRole.player,
    },
    params,
  );

  return new JoinGameRoomCommand(props);
});
