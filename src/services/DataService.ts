import { PropertyType, Query } from "../types/OData";
import { HttpClient } from "../types/HttpClient";
import { ODataConfig } from "../types/OData";
import { addODataType, toQueryString, toSearchFilter, toUrlValue, withNextLink } from "./ODataMapper";

export class DataService {
    constructor(protected httpClient: HttpClient,
        protected baseUrl: string,
        protected config: ODataConfig) {

    }


    getEntities = () => {
        return this.config.getEntities();
    }

    getEndpoints = () => {
        return this.config.endpoints;
    }

    getNextPage = (url: string) => {
        return this.httpClient
            .get(url)
            .then(t => withNextLink(t, this.baseUrl));
    }

    getItem = (entityType: string, item: any) => {
        const entity = this.config.getEntity(entityType);
        const idValue = toUrlValue(item[entity.keyProperty!.name], entity.keyProperty!);

        return this.httpClient
            .get(`${this.baseUrl}/${this.config.getDefaultEndpointUrl(entityType)}(${idValue})`)
            .then(t => t.value);
    }

    deleteItem = (entityType: string, item: any) => {
        const entity = this.config.getEntity(entityType);
        const idValue = toUrlValue(item[entity.keyProperty!.name], entity.keyProperty!);

        return this.httpClient
            .delete(`${this.baseUrl}/${this.config.getDefaultEndpointUrl(entityType)}(${idValue})`)
            .then(_t => item[entity.keyProperty!.name]);
    }

    createItem = (entitySet: string, item: any) => {
        const entity = this.config.getEntityByEntitySet(entitySet);

        return this.httpClient
            .post(`${this.baseUrl}/${this.config.endpoints
                .find(g => g.name == entitySet)!.url}`,
                addODataType(entity!.typeName!,
                    item,
                    this.config.getVersion()));
    }

    getItems = (entitySet: string, query: Query) => {
        return this.httpClient
            .get(`${this.baseUrl}/${this.config.endpoints
                .find(g => g.name == entitySet)!.url}?${toQueryString(query)}`)
            .then(t => withNextLink(t, this.baseUrl));
    }

    searchItems = (entityType: string, query: string) => {
        const entity = this.config.getEntity(entityType);

        const filterQuery = entity.properties
            .filter(r => r.type == PropertyType.string && !r.isCollection)
            .map(v => toSearchFilter(v, query, this.config.metadata.version))
            .join(" or ");

        return this.httpClient
            .get(`${this.baseUrl}/${this.config.endpoints
                .find(g => g.name == entity.entitySets![0].name)!.url}?$filter=${filterQuery}`)
            .then(t => t.value);
    }


}