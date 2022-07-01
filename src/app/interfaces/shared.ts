import { SelectionModel } from "@angular/cdk/collections";
import { SortDirection } from "@angular/material/sort";

export interface TokenResponse {
  token: string,
  expiration: number,
  refresh_token: string
}

export interface authResult {
  Result?: boolean;
}

export interface Filterbag {

  idBasket?: string;
  codCliFat?: string;
  codCliSped?: string;
  codStato?: string;
  codTipoOrd?: string;
  codCausaleOrd?: string;
  codCausaleMov?: string;
  codTipoMov?: string;
  segnoMov?: string;
  dataStatoDa?: string;
  dataStatoA?: string;
  customerOrder?: string;
  vendorCode?: string;
  dataORDDa?: string;
  dataORDA?: string;
  dataDDTDa?: string;
  dataDDTA?: string;
  dDTcdm?: string;
  dDTgrb?: string;
  dDTnrb?: number;
  dDTdtb?: number;
  numEva?: number;
  codart?: string;
  anno?: number;
  mese?: number;
  selected?: string[];
  filterColumn?: string;
  filterQuery?: string;
  sortColumn?: string;
  sortOrder?: string;
  pageIndex?: number;
  pageSize?: number;

}

export interface MenuItem {
  label: string;
  icon: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
}

export interface scalarObject {
  Value: string;
}

export class textValue {
  constructor(
    public text?: string,
    public value?: string
  ) { }
}


export class keyValue {
  constructor(
    public key?: string,
    public value?: any
  ) { }
}

export class selected {
  constructor(
    public key0: string,
    public key1: string,
    public stringifiedData: string
  ) { }
}

export interface Totals {
  recCount: number;
  qty: number;
  value: number;
  additionalOutput: string;
}

export interface User {
  Username: string;
  Password: string;
  Email: string;
  DisplayName: string;
}

export interface configModel {
  MinGOrdTrm: number;
  MinGOrdTrmDescription: string;
  FreeStock: boolean;
  FreeStockDescription: string;
  MaxCOrdPrt: number;
  MaxCOrdPrtDescription: string;
  MaxEOrdPrt: number;
  MaxEOrdPrtDescription: string;
}

export interface copyRight {
  year: number;
  companyUrl: string;
  company: string;
  pIVA: string;
}

export interface Criticals {
  unmanagedIncomingOrdersCount?: number;
  unmanagedDeliveryNotesCount?: number;
  unmanagedDropShippingDeliveriesCount?: number;
  unmanagedSalesReportDetailAnomalyCount?: number;

}

export interface ApiResult<T> {
  data: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  sortColumn: string;
  sortOrder: string;
  filterColumn: string;
  filterQuery: string;
  totals: Totals;
}