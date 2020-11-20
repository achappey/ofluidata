import { OFluiColumn, OFluiColumnType, OFluiFieldValidation } from '../types/oflui'

export const useFieldValidation = (column: OFluiColumn, value?: any) => {
  const isValid = column.required
    && (value == undefined || value.length == 0)
    ? OFluiFieldValidation.isRequired : undefined;

  if (isValid === undefined && column.type == OFluiColumnType.number && isNaN(parseFloat(value))) {
    return OFluiFieldValidation.numberInvalid
  }

  return isValid;
}
