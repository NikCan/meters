import { t } from 'mobx-state-tree';

const MeterModel = t.model('Meter', {
  id: t.identifier,
  type: t.string,
  installation_date: t.string,
  is_automatic: t.boolean,
  initial_value: t.number,
  address: t.string,
  description: t.string,
});

export default MeterModel;
