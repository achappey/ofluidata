import { OFluiLookup, OFluiOrder, OFluiView, OFluiViewResult } from "ofluidata-core";
import { ODataConfig, Property, PropertyType } from "../types/odata";


export const toNextLink = (data: any, config: ODataConfig): string => {
  return data["@odata.nextLink"] ?
    data["@odata.nextLink"] :
    data["odata.nextLink"] ?
      `${config.url}/${data["odata.nextLink"]}`
      : undefined;
}

export const toViewResult = (data: any, config: ODataConfig): OFluiViewResult => {
  return {
    items: data.value,
    nextPage: toNextLink(data, config)
  }
}

export const toSelect = (fields: string[]): string => {
  const select = fields
    .join(",");

  return `$select=${select}`;
}

export const toPageQuery = (pageSize?: number, skip?: number) => {
  const skipQuery = skip !== undefined ? `&$skip=${skip}` : '';
  return pageSize !== undefined ? `$top=${pageSize}${skipQuery}` : '';
}

export const toUrlQuery = (view: OFluiView, _version: string, properties: Property[], key: string, skip?: number,) => {
  const selectProperties = view.query.fields.filter(f => properties.find(a => a.name == f && a.type != PropertyType.navigation));

  if (view.query.fields.indexOf(key) == -1)
    selectProperties.push(key)

  const select = toSelect(selectProperties);

  const order = toOrder(view.query.order);
  const expand = toExpand(
    view.query.fields.filter(f => properties.find(a => a.name == f && a.type == PropertyType.navigation)));

  const pager = toPageQuery(view.query.pageSize, skip);

  return `${select}&${expand}&${order}&${pager}`;
  ///  const dynamicDates = toDynamicDateFilter(properties, version, view.dynamicDate);
  // const filters = toFilters(properties, version, view.filters);
  // const filterQuery = dynamicDates || filters ? `&$filter=${filters} ${dynamicDates}` : ``;

  // return `${select}&${expand}&${toOrder(view.query.order)}${filterQuery}`;
}

export const toSearchFilter = (property: Property, query: string, dataVersion: string): string => {
  switch (dataVersion) {
    case "4.0":
      return `contains(tolower(${property.name}), '${query}')`;
    default:
      return `substringof('${query}', ${property.name})`;
  }
}


/*

export const toFilters = (filters?: Filter[]): string => {
    const groupedFilter = filters != undefined
        && filters.length > 0
        ? groupyBy(filters, "property.name") : {};

    const groupedKeys = Object.keys(groupedFilter);

    const filterQuery = filters != undefined
        && filters.length > 0
        ? `&$filter=${groupedKeys
            .map(g => `(${groupedFilter[g]
                .map((z: any) => `${z.property.name} ${z.operator} ${toUrlValue(z.value, z.property)}`)
                .join(" or ")})`)
            .join(" and ")}` : "";

    return filterQuery;
}*/

export const valueToQueryStringValue = (property: Property, value: any, version: string) => {
  switch (property.type) {
    case PropertyType.datetime:
      switch (version) {
        case "4.0":
          return value;
        default:
          return `DateTime'${value}'`;
      }

    default:
      return value;

  }
}

export const toQueryId = (property: Property, value: any, _version: string) => {
  switch (property.type) {
    case PropertyType.string:
      return `'${value}'`
    default:
      return value;
  }
}

export const toExpand = (fields: string[]): string => {
  const expand = fields
    .join(",");

  return `$expand=${expand}`;
}

export const toOrder = (order?: { [id: string]: OFluiOrder; }): string => {
  const orderKeys = order != undefined ? Object.keys(order) : [];
  return orderKeys.length > 0
    ? `$orderby=${orderKeys
      .map(g => `${g} ${toAscDesc(order![g])}`)
      .join(",")}` : "";
}


export const toAscDesc = (order: OFluiOrder) => {
  return order == OFluiOrder.ascending ? "asc" : "desc";
}


export const endpointToEntityType = (endpoint: string, config: ODataConfig) => {
  const types = Object.keys(config.entityTypes);

  return types.find(d => config.entityTypes[d].entitySets.find(z => z.name == endpoint)
    || config.entityTypes[d].singletons.find(z => z.name == endpoint))
}


export const toODataEntity = (item: any, entityType: string, config: ODataConfig) => {
  const navigationProps = config.entityTypes[entityType].properties
    .filter(a => a.type == PropertyType.navigation);

  const resultItem = {
    ...item
  };

  navigationProps.forEach(h => {
    if (item[h.name]) {
      const relatedType = config.entityTypes[h.typeName!];

      resultItem[h.name] = h.isCollection ?
        item[h.name]
          .map((h: OFluiLookup) => {
            return {
              [relatedType.key!]: h.key
            };
          }) :
        {
          [relatedType.key!]: item[h.name].key
        };

    }
  })

  return resultItem;
}