/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StoreApi } from 'zustand';

export const createZustandContext = <TInitial, TStore extends StoreApi<any>>(
  // eslint-disable-next-line no-unused-vars
  getStore: (initial: TInitial) => TStore
) => {
  const Context = React.createContext(null as any as TStore);

  const Provider = (props: {
    children?: React.ReactNode;
    initialValue: TInitial;
  }) => {
    const [store] = React.useState(getStore(props.initialValue));

    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };

  return {
    useContext: () => React.useContext(Context),
    Context,
    Provider,
  };
};
