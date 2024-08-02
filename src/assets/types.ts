export interface Area {
  id: string;
}

export interface Meter {
  id: string;
  _type: MeterType[];
  area: Area;
  is_automatic: boolean | null;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string;
  model_name: string;
  initial_values: number[];
}

export interface FetchMetersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Meter[];
}

export type MeterType =
  | 'HotWaterAreaMeter'
  | 'AreaMeter'
  | 'ColdWaterAreaMeter';

export interface FetchAddressesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Address[];
}

export interface Address {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: {
    address: string;
    id: string;
    fias_addrobjs: string[];
  };
}
