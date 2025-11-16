import { Factory } from 'fishery';

import {
  IStartGameCommandProps,
  StartGameCommand,
} from '@module/game-room/use-cases/start-game/start-game.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const StartGameCommandFactory = Factory.define<
  StartGameCommand,
  void,
  StartGameCommand,
  Partial<IStartGameCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IStartGameCommandProps>(
    {
      gameRoomId: generateEntityId(),
    },
    params,
  );

  return new StartGameCommand(props);
});
