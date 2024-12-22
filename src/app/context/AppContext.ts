import React from 'react';

export type TAuth = {
  provider_name: string;
  authorized_at: number;
  access_token: string;
};

export type TAppContext = {
  auth?: TAuth;
};

export const AppContext = React.createContext<TAppContext>({});
