const isCommaDecimalLocale = () => {
  var n = 1.1;
  return n.toLocaleString().substring(1, 2) == ",";
}

export const useNumberValue = (value?: string) => {
  return value === undefined || (value.trim && value.trim().length == 0) || isNaN(parseFloat(value))
    ? undefined
    : isCommaDecimalLocale()
      ? parseFloat(value.replace(",", "."))
      : parseFloat(value)
}
