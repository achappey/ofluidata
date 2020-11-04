import { Property, PropertyType, Query } from "../types/OData";
import { HttpClient } from "../types/HttpClient";
import { ODataConfig } from "../types/OData";
import { toQueryString, toSearchFilter, toUrlValue } from "./ODataMapper";

export class ODataService {
    constructor(private httpClient: HttpClient,
        public baseUrl: string,
        private config: ODataConfig,
        private entityType: string) {

    }

    getNextPage = (url: string) => {
        return this.httpClient
            .get(url);
    }

    deleteItem = (entitySet: string, item: any, property: Property) => {
        const idValue = toUrlValue(item[property.name], property);

        return this.httpClient
            .delete(`${this.baseUrl}/${this.config.endpoints
                .find(g => g.name == entitySet)!.url}(${idValue})`)
            .then(_t => item[property.name]);
    }

    createItem = (entitySet: string, item: any) => {
        return this.httpClient
            .post(`${this.baseUrl}/${this.config.endpoints
                .find(g => g.name == entitySet)!.url}`, item);
    }

    getItems = (entitySet: string, query: Query) => {
        return this.httpClient
            .get(`${this.baseUrl}/${this.config.endpoints
                .find(g => g.name == entitySet)!.url}?${toQueryString(query)}`);
    }

    searchItems = (entitySet: string, query: string) => {
        const filterQuery = this.config.metadata.entityTypes[this.entityType].properties
            .filter(r => r.type == PropertyType.string && !r.isCollection)
            .map(v => toSearchFilter(v, query, this.config.metadata.version))
            .join(" or ");

        return this.httpClient
            .get(`${this.baseUrl}/${this.config.endpoints
                .find(g => g.name == entitySet)!.url}?$filter=${filterQuery}`)
            .then(t => t.value);
    }

    getEntity = () => {
        return this.config.metadata.entityTypes[this.entityType];
    }

}