import { OFluiColumn, OFluiView, OFluiViewResult } from 'ofluidata-core'
import { toFilters, toODataEntity, toQueryId, toSearchFilter, toSelect, toUrlQuery, toViewResult } from '../utilities/odata'
import { OFluiHttpClient } from '../types/http'
import { ODataConfig, PropertyType } from '../types/odata'

export const useODataService = (config: ODataConfig, httpClient: OFluiHttpClient) => {
    console.log(config)

    const entitySets = config.endpoints

    const getEndpointUrl = (name: string) =>
        config
            .endpoints
            .find(g => g.name === name)!.url

    const getItemName = (entityType: string) => {
        const entity = config.entityTypes[entityType]
        return entity.name
    }

    const getItemActions = (entityType: string) => {
        const entity = config.entityTypes[entityType]
        return [...entity.functions, ...entity.actions]
    }

    const toItemUrl = (entityType: string, item: any) => {
        const entity = config.entityTypes[entityType]
        const endpointUrl = getEndpointUrl(entity.entitySets[0].name)
        const key = item[entity.key!]
        const keyValue = toQueryId(entity
            .properties
            .find(d => d.name === entity.key)!, key, config.version)

        return `${config.url}/${endpointUrl}(${keyValue})`
    }

    const deleteEntity = (entityType: string, item: any) => {
        return httpClient
            .delete(toItemUrl(entityType, item))
    }

    const itemFunction = (entityType: string, item: any, name: string, params: any) => {
        return httpClient
            .get(`${toItemUrl(entityType, item)}/${name}(${params})`)
    }

    const itemAction = (entityType: string, item: any, name: string, params: any) => {
        return httpClient
            .post(`${toItemUrl(entityType, item)}/${name}`, params)
    }

    const createEntity = (entityType: string, item: any) => {
        const entity = config.entityTypes[entityType]
        const endpointUrl = getEndpointUrl(entity.entitySets[0].name)

        return httpClient
            .post(`${config.url}/${endpointUrl}`, toODataEntity(item, entityType, config))
    }

    const getKey = (entityType: string) => {
        const entity = config.entityTypes[entityType]
        return entity.key
    }

    const getItem = (entityType: string, item: any) => {
        return httpClient
            .get(toItemUrl(entityType, item))
    }

    const getCount = (entityType: string, view: OFluiView) =>
        httpClient
            .get(`${config.url}/${view.entitySet}/$count?${toFilters(config.entityTypes[entityType].properties, config.version, view.query.filters)}`)

    const withPager = async (entityType: string, view: OFluiView, data: OFluiViewResult, skip?: number) => {
        if (data.nextPage !== undefined || view.query.pageSize === undefined) { return data }

        const count = await getCount(entityType, view)

        const nextPage = count > view.query.pageSize + (skip || 0)
            ? skip !== undefined
                ? skip + view.query.pageSize
                : view.query.pageSize
            : undefined

        return {
            ...data,
            nextPage: nextPage
        }
    }

    const getData = (entityType: string, view: OFluiView, skip?: number) =>
        httpClient
            .get(`${config.url}/${view.entitySet}?${toUrlQuery(view,
                config.version,
                config.entityTypes[entityType].properties,
                config.entityTypes[entityType].key!,
                skip!)}`)
            .then(a => toViewResult(a, config))
            .then(a => withPager(entityType, view, a, skip))

    const getFilterOptions = async (view: OFluiView, column: OFluiColumn) => {
        const result = []

        let page = await httpClient
            .get(`${config.url}/${view.entitySet}?${toSelect([column.name])}`)
            .then(a => toViewResult(a, config))

        result.push(...page.items.map(y => y[column.name]))

        while (page.nextPage !== undefined) {
            page = await httpClient.get(page.nextPage)
                .then(a => toViewResult(a, config))

            result.push(...page.items.map(y => y[column.name]))
        }

        return result
    }

    const getNextLinkPage = (url: string) =>
        httpClient
            .get(url)
            .then(a => toViewResult(a, config))

    const search = (entityType: string, query: string) => {
        const entity = config.entityTypes[entityType]

        const filterQuery = entity.properties
            .filter(r => r.type === PropertyType.string && !r.isCollection)
            .map(v => toSearchFilter(v, query, config.version))
            .join(' or ')

        return httpClient
            .get(`${config.url}/${getEndpointUrl(entity.entitySets[0].name)}?$filter=${filterQuery}`)
            .then(a => toViewResult(a, config))
    }

    const searchLookup = (entityType: string, query: string) => {
        return search(entityType, query).then(a => {
            const keyProp = config.entityTypes[entityType].key!
            const stringProp = config.entityTypes[entityType].properties.find(z => z.type === PropertyType.string)!.name

            return a.items.map(y => {
                return {
                    key: y[keyProp],
                    name: y[stringProp],
                    sourceItem: y
                }
            })
        })
    }

    return {
        entitySets,
        getItem,
        getKey,
        getNextLinkPage,
        createEntity,
        itemFunction,
        deleteEntity,
        getFilterOptions,
        getItemName,
        searchLookup,
        itemAction,
        getItemActions,
        search,
        getData
    }
}
