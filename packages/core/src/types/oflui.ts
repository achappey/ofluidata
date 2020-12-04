/* eslint-disable no-unused-vars */
import { ICommandBarItemProps, ITag } from '@fluentui/react'
import { OFluiListProps } from '../components/List/List';
import { OFluiItemConfig, OFluiItemTilesConfig, OFluiListConfig } from './config';

export interface OFluiView extends ICommandBarItemProps {
  entitySet: string;
  query: OFluiQuery;

}

export interface OFluiLookup extends ITag {
}

export interface OFluiViewResult {
  items: any[];
  nextPage?: any;
}

export interface OFluiButton {
  key: string,
  text?: string,
  icon?: string
  onClick?: () => void,
}

export interface OFluiItemHeader {
  title: string;
  shortDescription?: string;
  longDescription?: string;
  image?: string;
  color?: string;
  buttons?: OFluiButton[]
}

export interface OFluiColumnGroup {
  name: string;
  columns: string[];
}

export interface OFluiAction {
  name: string;
  onExecute: (sourceItem: any, parameters?: any) => Promise<any>
  icon?: string,
  parameters?: OFluiItemConfig,
  returnType?: OFluiItemConfig,

}

export interface OFluiColumn {
  name: string
  type: OFluiColumnType,
  required?: boolean,
  computed?: boolean,
  isArray?: boolean,
  options?: any[],

  getValue?: (value: any) => string,
  getForm?: (value: any) => OFluiItemConfig
  getValues?: (values: any[]) => string,
  getList?: (values: any[]) => OFluiListConfig,
}


export interface OFluiQuery {
  fields: string[];
  filters?: { [id: string]: any[]; }
  order?: { [id: string]: OFluiOrder; }
  pageSize?: number
}

export interface OFluiTile {
  title: string,
  image?: string,
  onRender?: () => React.ReactElement,
  listConfig?: OFluiListProps
  url?: string,
  tiles?: OFluiTile[],
  itemTiles?: OFluiItemTilesConfig
}


export interface OFluiChildPanel {
  type: OFluiPanelType,
  props: any
}

export enum OFluiOrder {
  ascending,
  descending
}

export enum OFluiColumnType {
  text,
  number,
  datetime,
  multiline,
  metadata,
  lookup,
  choice,
  complex,
  boolean
}

export enum OFluiFieldValidation {
  isRequired,
  emailNotValid,
  numberInvalid
}

export enum OFluiPanelType {
  display,
  edit,
  list
}