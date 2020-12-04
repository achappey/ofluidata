import { OFluiAction, OFluiColumn, OFluiColumnType, OFluiItemConfig, OFluiView } from "ofluidata-core";

import { parameterToColumn, propertyToColumn } from "../../utilities/oflui";
import { useODataService } from "../../hooks/use-ODataService";
import { OFluiODataListConfig } from "../../types/config";
import { OFluiHttpClient } from "../../types/http";
import { ODataConfig, PropertyType } from "../../types/odata";

const toLookupDisplayForm = (config: ODataConfig, entityType: string, columnName: string, _value: any): OFluiItemConfig => {
  const property = config.entityTypes[entityType].properties.find(a => a.name == columnName);

  return {
    columns: config.entityTypes[property?.typeName!]
      .properties
      .map(propertyToColumn),
    groups: [{
      name: "",
      columns: config.entityTypes[property?.typeName!]
        .properties
        .map(y => y.name)
    }]

  }
}

const toLookupDisplayValue = (config: ODataConfig, entityType: string, columnName: string, value: any) => {
  if (!value)
    return "";

  const property = config.entityTypes[entityType].properties.find(a => a.name == columnName);
  const firstText = config.entityTypes[property?.typeName!].properties.find(a => a.type == PropertyType.string);

  return firstText ? value[firstText.name] : value.toString();
}

const toDefaultViews = (config: ODataConfig, entityType: string): OFluiView[] => {
  const entity = config.entityTypes[entityType];

  return entity.entitySets.map(g => {
    return {
      key: g.name,
      entitySet: g.name,
      text: g.name,
      query: {
        pageSize: 100,
        fields: entity.properties.slice(0, 5).map(f => f.name)
      }
    };
  });
}

export const useODataList = ((config: ODataConfig,
  httpClient: OFluiHttpClient,
  entityType: string,
  options?: OFluiODataListConfig) => {

  const {
    getData,
    getItemName,
    getItemActions,
    createEntity,
    searchLookup,
    itemAction,
    itemFunction,
    deleteEntity,
    getNextLinkPage,
    getKey,
    search,
    getItem } = useODataService(config, httpClient);

  const views = options?.views ? options.views : toDefaultViews(config, entityType);

  const onSearch = (query: string) => search(entityType, query);
  const getView = (view: OFluiView) => getData(entityType, view);

  const readItem = (item: any) => getItem(entityType, item);
  const createItem = (item: any) => createEntity(entityType, item);
  const deleteItem = (item: any) => deleteEntity(entityType, item);
  const onAction = (action: OFluiAction, item: any, params: any) => itemAction(entityType, item, action.name, params);

  const columns: OFluiColumn[] = config.entityTypes[entityType].properties
    .map(propertyToColumn)
    .map(g => {
      return {
        ...g,
        getValue: g.type == OFluiColumnType.lookup ?
          (val: any) => toLookupDisplayValue(config, entityType, g.name, val) :
          undefined,
        getForm: g.type == OFluiColumnType.lookup ?
          (val: any) => {
            return {
              ...toLookupDisplayForm(config, entityType, g.name, val),
              readItem: async (item: any) => item
            }
          } :
          undefined,
      }
    });

  const itemName = getItemName(entityType);
  const actions: OFluiAction[] = getItemActions(entityType)
    .map(h => {

      const inputParams = h.parameters ? h.parameters.filter(t => t.name != "bindingParameter") : undefined;

      return {
        name: h.name,
        returnType: h.returnType && config.complexTypes[h.returnType] ? {
          columns: config.complexTypes[h.returnType].properties.map(propertyToColumn)
        } : undefined,
        parameters: inputParams && inputParams.length > 0 ? {
          columns:
            inputParams.map(parameterToColumn)
        } : undefined,
        onExecute: (sourceItem: any, params: any) => itemFunction(entityType, sourceItem, h.name, `Company='${params.Company}'`)
      }
    });

  const setKey = getKey(entityType)!;

  const getNextPage = (view: OFluiView, nextPage: any) => typeof nextPage == 'string' ?
    getNextLinkPage(nextPage) :
    getData(entityType, view, nextPage);

  const onLookupSearch = (column: OFluiColumn, query: string) => {
    const property = config.entityTypes[entityType].properties.find(y => y.name == column.name);

    return searchLookup(property!.typeName!, query);

  }

  return {
    views,
    columns,
    actions,
    itemName,
    setKey,
    getView,
    deleteItem,
    onLookupSearch,
    onAction,
    getNextPage,
    createItem,
    readItem,
    onSearch
  }
})