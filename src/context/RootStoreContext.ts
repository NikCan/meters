import { createContext, useContext } from 'react';
import { RootStoreInstance } from '../models';

const RootStoreContext = createContext<RootStoreInstance | null>(null);

export const RootStoreProvider = RootStoreContext.Provider;

export const useRootStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return store;
};
