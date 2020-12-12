import { OFluiTile } from 'ofluidata-core'
import { OFluiODataTilesConfig } from '../../types/config'
import { OFluiHttpClient } from '../../types/http'
import { ODataConfig } from '../../types/odata'
import { endpointToEntityType } from '../../utilities/odata'
import { useODataList } from '../List/use-ODataList'
import { useODataItemTiles } from './use-ODataItemTiles'

export const useODataTiles = (config: ODataConfig,
    httpClient: OFluiHttpClient,
    options?: OFluiODataTilesConfig) => {
    const tiles: OFluiTile[] = config.endpoints.map(b => {
        const entityType = endpointToEntityType(b.name, config)

        const listConfig = !b.kind || b.kind === 'EntitySet'
            ? useODataList(
                config!,
                httpClient,
                entityType!,
                options?.lists
                    ? options.lists[entityType!]
                    : undefined)
            : undefined

        const itemListConfig = b.kind === 'Singleton'
            ? useODataItemTiles(config!,
                httpClient,
                b, options)
            : undefined

        const image = options?.lists && options.lists[entityType!]
            ? options?.lists[entityType!]?.image
            : undefined

        return {
            title: b.name,
            image: image,
            icon: image
                ? undefined
                : b.kind === 'Singleton'
                    ? 'SingleColumn'
                    : 'List',
            listConfig: listConfig
                ? { ...listConfig }
                : undefined,
            itemTiles: itemListConfig
                ? { ...itemListConfig }
                : undefined
        }
    })

    return {
        tiles
    }
}
