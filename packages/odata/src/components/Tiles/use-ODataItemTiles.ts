import { OFluiColumn } from 'ofluidata-core'

import { OFluiODataTilesConfig } from '../../types/config'
import { OFluiHttpClient } from '../../types/http'
import { Endpoint, ODataConfig, PropertyType } from '../../types/odata'
import { endpointToEntityType } from '../../utilities/odata'
import { propertyToColumn } from '../../utilities/oflui'
import { useODataList } from '../List/use-ODataList'

export const useODataItemTiles: any = (config: ODataConfig,
    httpClient: OFluiHttpClient,
    singleton: Endpoint,
    options?: OFluiODataTilesConfig) => {
    const entityType = endpointToEntityType(singleton.name, config)

    const tiles = config.entityTypes[entityType!].properties
        .filter(a => a.type === PropertyType.navigation && a.isCollection)
        .map(a => {
            const listConfig =
                useODataList(
                    config!,
                    httpClient,
                    a.typeName!,
                    options?.lists
                        ? options.lists[entityType!]
                        : undefined)

            const views = [{
                key: a.name,
                entitySet: `${singleton.name}/${a.name}`,
                text: a.name,
                query: {
                    pageSize: 100,
                    fields: config.entityTypes[a.typeName!].properties.slice(0, 5).map(f => f.name)
                }
            }]

            const image = options?.lists && options.lists[entityType!]
                ? options?.lists[entityType!]?.image
                : undefined

            return {
                title: a.name,
                image: image,
                icon: image
                    ? undefined
                    : 'List',
                listConfig: listConfig
                    ? {
                        ...listConfig,
                        views: views
                    }
                    : undefined
            }
        })

    const columns: OFluiColumn[] = config.entityTypes[entityType!].properties
        .map(propertyToColumn)

    const itemConfig = {
        columns: columns
    }

    const item = {}

    return {
        tiles,
        itemConfig,
        item
    }
}
