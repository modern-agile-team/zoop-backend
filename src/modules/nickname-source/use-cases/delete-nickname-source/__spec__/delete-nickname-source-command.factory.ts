import { Factory } from 'fishery';

import {
  DeleteNicknameSourceCommand,
  IDeleteNicknameSourceCommandProps,
} from '@module/nickname-source/use-cases/delete-nickname-source/delete-nickname-source.command';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const DeleteNicknameSourceCommandFactory = Factory.define<
  DeleteNicknameSourceCommand,
  void,
  DeleteNicknameSourceCommand,
  Partial<IDeleteNicknameSourceCommandProps>
>(({ params }) => {
  const props = createFactoryProps<IDeleteNicknameSourceCommandProps>(
    {
      nicknameSourceId: generateEntityId(),
    },
    params,
  );

  return new DeleteNicknameSourceCommand(props);
});
