import * as React from 'react';
import { ITilesGridSegment, TilesGridMode, TilesList } from '@uifabric/experiments';

import { OFluiTileItem } from '../Item/TileItem';
import { OFluiTile } from '../../../types/oflui';

const defaultTileListSettings = {
    minRowHeight: 96,
    key: "tiles",
    minAspectRatio: 2,
    spacing: 7,
    marginBottom: 7,
    mode: TilesGridMode.fill,
};

export interface OFluiTilesListProps {
    tiles: OFluiTile[]
    onClick: (tile: OFluiTile) => void
}

export const OFluiTilesList = (props: OFluiTilesListProps) => {
    const tileItems = props
        .tiles
        .map(r => {
            const onClick = () => props.onClick(r);

            return {
                key: r.title,
                content: r,
                onRender: (z: OFluiTile) =>
                    <OFluiTileItem {...z}
                        onClick={onClick}
                    />
            }
        });

    const tiles: ITilesGridSegment<OFluiTile>[] = [{
        ...defaultTileListSettings,
        items: tileItems
    }]

    return <TilesList items={tiles} />;
};
