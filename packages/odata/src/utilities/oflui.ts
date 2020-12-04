import { OFluiColumn, OFluiColumnType } from "ofluidata-core";
import { Property, PropertyType, Parameter } from "../types/odata";
import { isCollection, toPropertyType } from "./odataParser";

export const propertyToColumn = (property: Property): OFluiColumn => {
  return {
    ...property,
    isArray: property.isCollection,
    type: toColumnType(property.type),
    //   getDisplayValue: getDisplayValue 
  }
}

export const stringToColumn = (value: string): OFluiColumn => {
  return {
    name: value,
    isArray: isCollection(value),
    type: toColumnType(toPropertyType(value, true).type),
    //   getDisplayValue: getDisplayValue 
  }
}
export const parameterToColumn = (property: Parameter): OFluiColumn => {
  return {
    ...property,
    isArray: isCollection(property.type),
    type: toColumnType(toPropertyType(property.type, true).type),
    //   getDisplayValue: getDisplayValue 
  }
}
/*

export const toAction = (action: Action | Function, onExecute: any): OFluiAction => {
  return {
    ...action,
    parameters: action.parameters?.to
    onExecute: onExecute
  }
}*/

export const toColumnType = (property: PropertyType): OFluiColumnType => {
  switch (property) {
    case PropertyType.boolean:
      return OFluiColumnType.boolean;
    case PropertyType.number:
      return OFluiColumnType.number;
    case PropertyType.string:
    case PropertyType.guid:
      return OFluiColumnType.text;
    case PropertyType.datetime:
      return OFluiColumnType.datetime;
    case PropertyType.navigation:
      return OFluiColumnType.lookup;
    case PropertyType.complex:
      return OFluiColumnType.complex;
    case PropertyType.enum:
      return OFluiColumnType.choice;
    default:
      return OFluiColumnType.text;
  }
}
