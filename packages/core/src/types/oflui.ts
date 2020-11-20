/* eslint-disable no-unused-vars */
import { ICommandBarItemProps } from '@fluentui/react'
import { OFluiListConfig } from './config';

export interface OFluiView extends ICommandBarItemProps {
  entitySet: string;
  query: OFluiQuery;

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
  columns: OFluiColumn[];
}

export interface OFluiColumn {
  name: string
  type: OFluiColumnType,
  required?: boolean,
  isArray?: boolean
}

export interface OFluiQuery {
  fields: OFluiColumn[];
  filters?: { [id: string]: any[]; }
  order?: { [id: string]: OFluiOrder; }
}

export interface OFluiTile {
  title: string,
  image?: string,
  onRender?: () => React.ReactElement,
  listConfig?: OFluiListConfig
  url?: string,
  tiles?: OFluiTile[]
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
  custom
}

export enum OFluiFieldValidation {
  isRequired,
  emailNotValid,
  numberInvalid
}
