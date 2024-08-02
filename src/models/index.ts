import { Instance } from 'mobx-state-tree';
import MeterStore from './MeterStore';

const rootStore = MeterStore.create({
  meters: [],
  currentPage: 1,
  totalCount: 0,
  loading: false,
  addresses: {},
});

export type RootStoreInstance = Instance<typeof MeterStore>;

export { rootStore };
