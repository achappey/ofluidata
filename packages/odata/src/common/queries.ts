import { OFluiView } from "@ofluidata/core";
import { Property } from "../types/odata";
/*
export const toUrlQuery = (view: OFluiView, properties: Property[], version: string) => {
  const select = toSelect(
    toSelectFields(view.query.fields,
      properties));

  const expand = toExpand(
    toExpandFields(view.query.fields,
      properties));

  const dynamicDates = toDynamicDateFilter(properties, version, view.dynamicDate);
  const filters = toFilters(properties, version, view.filters);
  const filterQuery = dynamicDates || filters ? `&$filter=${filters} ${dynamicDates}` : ``;

  return `${select}&${expand}&${toOrder(view.query.order)}${filterQuery}`;
}
*/