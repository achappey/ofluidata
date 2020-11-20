import { OFluiColumn, OFluiColumnType } from '../types/oflui'

export const useDisplayValue = (column: OFluiColumn, value?: any) => {
  if (!value) {
    return value;
  }
  /*
    if (column.isArray) {
      return value
        .map((f: any) => toStringValue({
          ...column,
          isCollection: false
        }, f))
        .join(", ");
    }*/

  switch (column.type) {
    case OFluiColumnType.text:
    case OFluiColumnType.number:
      // case OFluiColumnType.duration:
      // case OFluiColumnType.guid:
      return value;
    case OFluiColumnType.custom:
      return value.toString()
    //   return objectToStringValue(value);
    case OFluiColumnType.datetime:
      return value != undefined
        ? new Intl.DateTimeFormat(window.navigator.language)
          .format(
            new Date(value))
        : "";
    default:
      return value?.toString();
  }

}
