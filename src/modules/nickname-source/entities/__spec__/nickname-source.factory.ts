import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import {
  NicknameSource,
  NicknameSourceProps,
} from '@module/nickname-source/entities/nickname-source.entity';

import { BaseEntityProps, generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

type NicknameSourceFactoryAttributes = NicknameSourceProps & BaseEntityProps;

export const NicknameSourceFactory = Factory.define<
  NicknameSource,
  void,
  NicknameSource,
  Partial<NicknameSourceFactoryAttributes>
>(({ params }) => {
  const attributes = createFactoryProps<NicknameSourceFactoryAttributes>(
    {
      id: generateEntityId(),
      name: faker.string.nanoid(10),
      sequence: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    params,
  );

  const { id, createdAt, updatedAt, ...props } = attributes;

  return new NicknameSource({ id, createdAt, updatedAt, props });
});
