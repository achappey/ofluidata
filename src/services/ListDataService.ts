import { HttpClient } from "../types/HttpClient";
import { ODataConfig, Order, Property, Query } from "../types/OData";
import { OFluiView } from "../types/OFlui";
import { DataService } from "./DataService";
import { groupyBy } from "./ODataMapper";

export class ListDataService extends DataService {
    constructor(protected httpClient: HttpClient,
        protected baseUrl: string,
        protected config: ODataConfig,
        public entityType: string) {
        super(httpClient, baseUrl, config);

    }

    createListItem = (item: any) => {
        const entity = this.config.getEntity(this.entityType);

        return this.createItem(entity.entitySets![0].name!, item);
    }

    getListItem = (item: any) => {
        return this.getItem(this.entityType, item);
    }

    deleteListItem = (item: any) => {
        return this.deleteItem(this.entityType, item);
    }


    searchListItems = (query: string) => {
        return this.searchItems(this.entityType, query);
    }

    getEntity = () => {
        return this.config.getEntity(this.entityType);
    }

    getDefaultViews = (): OFluiView[] => {
        const entity = this.config.getEntity(this.entityType);

        return entity.entitySets!.map(g => {
            return {
                id: g.name!,
                entitySet: g.name!,
                name: g.name!,
                query: {
                    fields: entity.properties.map(f => f.name),
                }
            };
        })
    }


    getFilterOptions = async (entitySet: string, query: Query, property: Property) => {
        const data: any = await this.getItems(entitySet,
            {
                ...query,
                fields: [property.name],
                order: {
                    [property.name]: Order.Ascending
                }
            });

        const result: any[] = data.value;

        let nextLink = data.nextLink;

        while (nextLink != undefined) {
            const nextPage = await this.getNextPage(nextLink);

            result.push(...nextPage.value);

            nextLink = nextPage.nextLink;
        }

        return Object.keys(groupyBy(result, property.name));
    }

}