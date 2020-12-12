import * as React from 'react'
import { OFluiTilesPage } from 'ofluidata-core'

import HttpContext from '../../context/HttpContext'
import ODataContext from '../../context/ODataContext'
import { OFluiODataTilesConfig } from '../../types/config'
import { useODataTiles } from './use-ODataTiles'

export interface OFluiODataTilesCoreProps {
    config?: OFluiODataTilesConfig
}

export const OFluiODataTilesCore = (props: OFluiODataTilesCoreProps) => {
    const http = React.useContext(HttpContext)
    const odataConfig = React.useContext(ODataContext)

    const { tiles } = useODataTiles(
        odataConfig!,
        http,
        props.config)

    return (
        <OFluiTilesPage title={props.config?.title} tiles={tiles} />
    )
}
