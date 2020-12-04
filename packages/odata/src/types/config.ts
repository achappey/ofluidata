import { OFluiView } from "ofluidata-core";

export interface OFluiODataListConfig {
  views?: OFluiView[]
  image?: string
  lang?: string
}

export interface OFluiODataTilesConfig {
  title?: string
  lang?: string
  lists?: { [id: string]: OFluiODataListConfig; };
}
