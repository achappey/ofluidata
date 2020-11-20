import { OFluiView } from "ofluidata-core";
import { OFluiHttpClient } from "../types/http"
import { ODataConfig, PropertyType } from "../types/odata";



export const useODataService = ((config: ODataConfig, httpClient: OFluiHttpClient) => {
  console.log(config);

  const entitySets = config.endpoints;

  const getData = (_entityType: string, view: OFluiView) =>
    httpClient
      .get(`${config.url}/${view.entitySet}`)
      .then(g => { console.log(g); return g.value; });
  /* const getData2 = (entityType: string, view: OFluiView) =>
     httpClient
       .get(`${config.url}/${view.entitySet}?${toUrlQuery(view,
         config.entityTypes[entityType].properties, config.version)}`)
       .then(g => { console.log(g); return g.value; });*/

  const getEndpointUrl = (name: string) =>
    config
      .endpoints
      .find(g => g.name == name)!.url;

  const search = (entityType: string, query: string) => {
    const entity = config.entityTypes[entityType];

    const filterQuery = entity.properties
      .filter(r => r.type == PropertyType.string && !r.isCollection)
      //.map(v => toSearchFilter(v, query, config.version))
      .join(" or ");

    return httpClient
      .get(`${config.url}/${getEndpointUrl(entity.entitySets[0].name)}?$filter=${filterQuery}`)
      .then(t => t.value);
  }

  return {
    entitySets,
    search,
    getData
  }
})