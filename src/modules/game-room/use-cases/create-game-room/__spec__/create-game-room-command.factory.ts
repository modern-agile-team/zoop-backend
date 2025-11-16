import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  CreateGameRoomCommand,
  ICreateGameRoomCommandProps,
} from '@module/game-room/use-cases/create-game-room/create-game-room.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const CreateGameRoomCommandFactory = Factory.define<
  CreateGameRoomCommand,
  void,
  CreateGameRoomCommand,
  Partial<ICreateGameRoomCommandProps>
>(({ params }) => {
  const props = createFactoryProps<ICreateGameRoomCommandProps>(
    {
      currentAccountId: generateEntityId(),
      title: faker.string.nanoid(),
      quizzesCount: faker.number.int({ min: 1, max: 10 }),
    },
    params,
  );

  return new CreateGameRoomCommand(props);
});
