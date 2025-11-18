import { Factory } from 'fishery';

import {
  GetNicknameSourceQuery,
  IGetNicknameSourceQueryProps,
} from '@module/nickname-source/use-cases/get-nickname-source/get-nickname-source.query';

import { generateEntityId } from '@common/base/base.entity';
import { createFactoryProps } from '@common/factories/factory-builder.util';

export const GetNicknameSourceQueryFactory = Factory.define<
  GetNicknameSourceQuery,
  void,
  GetNicknameSourceQuery,
  Partial<IGetNicknameSourceQueryProps>
>(({ params }) => {
  const props = createFactoryProps<IGetNicknameSourceQueryProps>(
    {
      nicknameSourceId: generateEntityId(),
    },
    params,
  );

  return new GetNicknameSourceQuery(props);
});
