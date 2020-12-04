import { OFluiAction, OFluiColumn, OFluiColumnGroup, OFluiLookup, OFluiTile, OFluiView, OFluiViewResult } from "./oflui";

export interface OFluiItemConfig {
  columns: OFluiColumn[],
  itemName?: string,
  groups?: OFluiColumnGroup[],
  header?: any,
  actions?: OFluiAction[],
  newItem?: () => Promise<any>,
  createItem?: (item: any) => Promise<any>,
  readItem?: (item: any) => Promise<any>,
  updateItem?: (item: any) => Promise<any>,
  deleteItem?: (item: any) => Promise<any>,
  onAction?: (action: OFluiAction, item: any, params?: any) => Promise<any>,
  onLookupSearch?: (column: OFluiColumn, query: string) => Promise<OFluiLookup[]>,
}

export interface OFluiListConfig {
  views: OFluiView[],
  setKey: string,

  getView: (view: OFluiView) => Promise<OFluiViewResult>,

  stickyHeader?: boolean,
  lang?: string,
  image?: string,
  compact?: boolean,

  onSearch?: (query: string) => Promise<OFluiViewResult>,
  getFilterOptions?: (column: OFluiColumn) => Promise<any[]>,
  getNextPage?: (view: OFluiView, nextPage: any) => Promise<OFluiViewResult>,
}

export interface OFluiItemTilesConfig {
  tiles: OFluiTile[]
  itemConfig: OFluiItemConfig
  item: any,
}

export interface OFluiTilesPageConfig {
  tiles: OFluiTile[],
  title?: string
  stickyHeader?: boolean,
  lang?: string
}