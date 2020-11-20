import React from 'react';

import { OFluiTile } from '../../../types/oflui';

import { OFluiList } from '../../List/List';
import { OFluiTilesList } from '../List/TilesList';

export type OFluiTileContentProps = {
    tile: OFluiTile
    onClick: (tile: OFluiTile) => void
}

export const OFluiTileContent = (props: OFluiTileContentProps) => {
    return <>
        {props.tile.onRender ?
            props.tile.onRender() :
            props.tile.listConfig ?
                <OFluiList {...props.tile.listConfig} /> :
                props.tile.tiles ?
                    <OFluiTilesList
                        tiles={props.tile.tiles}
                        onClick={props.onClick}
                    /> :
                    <></>
        }
    </>
};
