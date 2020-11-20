import { OFluiColumn, OFluiColumnType } from "ofluidata-core";
import { Property, PropertyType } from "../types/odata";

export const toColumn = (property: Property): OFluiColumn => {
  return {
    ...property,
    type: toColumnType(property.type)
  }
}

export const toColumnType = (type: PropertyType): OFluiColumnType => {
  switch (type) {
    case PropertyType.string:
    case PropertyType.guid:
      return OFluiColumnType.text;
    case PropertyType.datetime:
      return OFluiColumnType.datetime;
    case PropertyType.custom:
      return OFluiColumnType.custom;
    default:
      return OFluiColumnType.text;
  }
}
