import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  GameRoomMember,
  GameRoomMemberProps,
  GameRoomMemberRole,
} from '@module/game-room/entities/game-room-member.entity';

import { BaseEntityProps, generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

type GameRoomMemberFactoryAttributes = GameRoomMemberProps & BaseEntityProps;

export const GameRoomMemberFactory = Factory.define<
  GameRoomMember,
  void,
  GameRoomMember,
  Partial<GameRoomMemberFactoryAttributes>
>(({ params }) => {
  const attributes = createFactoryProps<GameRoomMemberFactoryAttributes>(
    {
      id: generateEntityId(),
      accountId: generateEntityId(),
      role: faker.helpers.enumValue(GameRoomMemberRole),
      nickname: generateEntityId(),
      avatarFileName: faker.string.nanoid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    params,
  );

  const { id, createdAt, updatedAt, ...props } = attributes;

  return new GameRoomMember({ id, createdAt, updatedAt, props });
});
