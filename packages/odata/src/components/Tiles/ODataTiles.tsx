import * as React from 'react'
import { OFluiODataTilesConfig } from '../../types/config'
import { OFluiHttpClient } from '../../types/http'
import { OFluiHttpProvider } from '../Providers/Http/HttpProvider'
import { OFluiODataProvider } from '../Providers/OData/ODataProvider'
import { OFluiODataTilesCore } from './ODataTilesCore'

export interface OFluiODataTilesProps {
    url: string,
    config?: OFluiODataTilesConfig,
    httpClient?: OFluiHttpClient
}

export const OFluiODataTiles = (props: OFluiODataTilesProps) => {
    return (
        <OFluiHttpProvider httpClient={props.httpClient}>
            <OFluiODataProvider url={props.url}
                lang={props.config?.lang} >

                <OFluiODataTilesCore {...props} />

            </OFluiODataProvider>
        </OFluiHttpProvider>
    )
}
