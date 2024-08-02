import { flow, t } from 'mobx-state-tree';
import MeterModel from './MeterModel';
import { FetchAddressesResponse, FetchMetersResponse } from '@/assets/types';
import { apiConfig, pagesPerPage } from '@/assets/config';

const MeterStore = t
  .model('MeterStore', {
    meters: t.array(MeterModel),
    currentPage: t.number,
    totalCount: t.number,
    loading: t.boolean,
    addresses: t.map(t.string),
  })
  .actions((self) => ({
    fetchMeters: flow(function* (offset: number) {
      try {
        self.loading = true;
        const response: Response = yield fetch(
          `${apiConfig.METERS}/?limit=${pagesPerPage}&offset=${offset}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: FetchMetersResponse = yield response.json();
        const areaIds = [...new Set(data.results.map((el) => el.area.id))];

        // Запрос на получение адресов только для тех, которые еще не загружены
        const missingAreaIds = areaIds.filter((id) => !self.addresses.has(id));

        if (missingAreaIds.length > 0) {
          const addressesResponse: Response = yield fetch(
            `${apiConfig.AREAS}/?id__in=${missingAreaIds.join('&id__in=')}`
          );
          if (!addressesResponse.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const addressesData: FetchAddressesResponse =
            yield addressesResponse.json();

          addressesData.results.forEach((el) => {
            self.addresses.set(
              el.id,
              `${el.house.address}, ${el.str_number_full}`
            );
          });
        }

        self.meters.replace(
          data.results.map((meter) =>
            MeterModel.create({
              ...meter,
              initial_value: meter.initial_values[0],
              type: meter._type[0],
              is_automatic: !!meter.is_automatic,
              address: self.addresses.get(meter.area.id) ?? '',
            })
          )
        );
        self.currentPage = 1;
        self.totalCount = data.count;
      } catch (error) {
        console.error('Failed to fetch meters', error);
      } finally {
        self.loading = false;
      }
    }),
  }))
  .actions((self) => ({
    fetchPage: flow(function* (page: number) {
      yield self.fetchMeters((page - 1) * pagesPerPage);
      self.currentPage = page;
    }),
    deleteMeter: flow(function* (meterId) {
      try {
        const response = yield fetch(`${apiConfig.METERS}/${meterId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to delete the meter');
        }

        yield self.fetchMeters((self.currentPage - 1) * pagesPerPage);
      } catch (error) {
        console.error('Error deleting the meter:', error);
      }
    }),
  }));

export default MeterStore;
