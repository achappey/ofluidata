import { OFluiView } from "ofluidata-core";

export const toSelect = (fields: string[]): string => {
  const select = fields
      .join(",");

  return `$select=${select}`;
}


export const toUrlQuery = (view: OFluiView, _version: string) => {
  const select = toSelect(
    view.query.fields.map(g => g.name))

      return `${select}`;
 // const expand = toExpand(
  //  toExpandFields(view.query.fields,
   //   properties));

///  const dynamicDates = toDynamicDateFilter(properties, version, view.dynamicDate);
 // const filters = toFilters(properties, version, view.filters);
 // const filterQuery = dynamicDates || filters ? `&$filter=${filters} ${dynamicDates}` : ``;

 // return `${select}&${expand}&${toOrder(view.query.order)}${filterQuery}`;
}
