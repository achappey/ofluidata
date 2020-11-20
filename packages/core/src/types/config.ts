import { OFluiColumn, OFluiTile, OFluiView } from "./oflui";

export interface OFluiListConfig {
  views: OFluiView[],
  columns: OFluiColumn[],
  getView: (view: OFluiView) => Promise<any[]>,

  stickyHeader?: boolean,
  lang?: string,
  image?: string,
  itemName?: string,
  // customTypes?: { [id: string]: OFluiTypeConfig[]; }

  onSearch?: (query: string) => Promise<any[]>,
  getFilterOptions?: (column: OFluiColumn) => Promise<any[]>,
  getItem?: (item: any) => Promise<any>,
  createItem?: (item: any) => Promise<any>,
  updateItem?: (item: any) => Promise<any>,
  newItem?: () => Promise<any>,
}

export interface OFluiTilesPageConfig {
  tiles: OFluiTile[],
  title?: string
  stickyHeader?: boolean,
  lang?: string
}