import { pagesPerPage } from '@/assets/config';
import { MeterType } from '@/assets/types';
import { MetersType, Table } from '@/components';
import { useRootStore } from '@/context/RootStoreContext';
import { formatDate } from '@/utils/format-date';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { DeleteButton } from '../delete-button/DeleteButton';

const headers = [
  'N',
  'Тип',
  'Дата установки',
  'Автоматический',
  'Текущие показания',
  'Адрес',
  'Примечание',
  '',
];
const columnWidths = [
  '48px',
  '120px',
  '160px',
  '138px',
  '176px',
  '350px',
  '304px',
  '64px',
];

export const MetersTable = observer(() => {
  const {
    fetchMeters,
    currentPage,
    totalCount,
    fetchPage,
    meters,
    loading,
    deleteMeter,
  } = useRootStore();

  const data = meters.map((meter, i) => {
    const onDeleteMeter = async (id: string) => await deleteMeter(id);

    return [
      i + 1,
      <MetersType type={meter.type as MeterType} key={i} />,
      formatDate(meter.installation_date),
      meter.is_automatic ? 'да' : 'нет',
      meter.initial_value,
      meter.address,
      meter.description,
      <DeleteButton callback={() => onDeleteMeter(meter.id)} key={i} />,
    ];
  });

  const totalPages = Math.ceil(totalCount / pagesPerPage);

  const onPageChange = (page: number) => {
    void fetchPage(page);
  };

  useEffect(() => {
    void fetchMeters(0);
  }, [fetchMeters]);

  return (
    <Table
      headers={headers}
      columnWidths={columnWidths}
      data={data}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      height="90%"
      loading={loading}
    />
  );
});
