import { OFluiView } from "ofluidata-core";
import { toColumn } from "../../common/oflui";
import { useODataService } from "../../hooks/use-ODataService";
import { OFluiODataListConfig } from "../../types/config";
import { OFluiHttpClient } from "../../types/http";
import { ODataConfig } from "../../types/odata";


const toDefaultViews = (config: ODataConfig, entityType: string): OFluiView[] => {
  const entity = config.entityTypes[entityType];

  return entity.entitySets.map(g => {
    return {
      key: g.name,
      entitySet: g.name,
      text: g.name,
      query: {
        //                pageSize: pageSize,
        fields: entity.properties
          .filter(g => !g.isNavigation)
          .map(toColumn),
      }
    };
  })

}
export const useODataList = ((config: ODataConfig,
  httpClient: OFluiHttpClient,
  entityType: string,
  options?: OFluiODataListConfig) => {

  const { getData, search } = useODataService(config, httpClient);
  const views = options?.views ? options.views : toDefaultViews(config, entityType);

  const onSearch = (query: string) => search(entityType, query);
  const getView = (view: OFluiView) => getData(entityType, view);

  const typeConfig = {
    //...options?.typeConfig,
    properties: config.entityTypes[entityType].properties,
    setKey: config.entityTypes[entityType].key!,
  };

  const columns = config.entityTypes[entityType].properties.map(toColumn);

  return {
    views,
    columns,
    getView,
    onSearch
  }
})