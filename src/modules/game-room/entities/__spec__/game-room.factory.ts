import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  GameRoom,
  GameRoomProps,
  GameRoomStatus,
  GameRoomVisibility,
} from '@module/game-room/entities/game-room.entity';

import { BaseEntityProps, generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

type GameRoomFactoryAttributes = GameRoomProps & BaseEntityProps;

export const GameRoomFactory = Factory.define<
  GameRoom,
  void,
  GameRoom,
  Partial<GameRoomFactoryAttributes>
>(({ params }) => {
  const attributes = createFactoryProps<GameRoomFactoryAttributes>(
    {
      id: generateEntityId(),
      hostAccountId: generateEntityId(),
      status: faker.helpers.enumValue(GameRoomStatus),
      visibility: faker.helpers.enumValue(GameRoomVisibility),
      title: faker.string.nanoid(),
      maxMembersCount: faker.number.int({ min: 2, max: 10 }),
      members: [],
      quizTimeLimitInSeconds: faker.number.int({ min: 10, max: 60 }),
      quizzesCount: faker.number.int({ min: 10, max: 30 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    params,
  );

  const { id, createdAt, updatedAt, ...props } = attributes;

  return new GameRoom({ id, createdAt, updatedAt, props });
});
