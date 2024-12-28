import React from 'react';

import {Empty as empty} from '@shared/api/Empty.ts';
import {Disk as yandex} from '@shared/api/yandex/Disk.ts';

export type TCloudAccess<T = unknown> = {
  provider: TCloudProvider;
  credentials: T;
};

export type TCloudContext = {
  access: TCloudAccess;
  provider: ICloudProvider;
};

export const emptyAccess: TCloudAccess<undefined> = {
  provider: 'empty',
  credentials: undefined,
};

const getProviderByAccess = ({provider, credentials}: TCloudAccess) => {
  const providers = {yandex, empty};
  const Provider = providers[provider];

  return 'instance' in Provider ? Provider.instance(credentials as never) : new Provider();
};

export const createContextByAccess = (access: TCloudAccess): TCloudContext => ({
  access,
  provider: getProviderByAccess(access),
});

export const CloudContext = React.createContext<TCloudContext>(createContextByAccess(emptyAccess));
