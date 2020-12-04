import * as React from 'react';
import { useState } from 'react';

import { DefaultPalette } from '@fluentui/react';

import { OFluiButton, OFluiTile } from '../../../types/oflui';
import { OFluiItemTilesConfig } from '../../../types/config';
import { OFluiTilesList } from '../List/TilesList';
import { OFluiCommandBar } from '../../CommandBar/CommandBar';
import { OFluiDisplayItemForm } from '../../Forms/DisplayItem/DisplayItemForm';

export interface OFluiItemTilesListProps extends OFluiItemTilesConfig {
    onTileClick: (tile: OFluiTile) => void
}

const itemPaneButton: OFluiButton = {
    key: "item",
    icon: "Info"
}

export const OFluiItemTilesList = (props: OFluiItemTilesListProps) => {
    const [showItemPane, setShowItemPane] = useState<boolean>(true);

    const itemToggle = {
        ...itemPaneButton,
        buttonStyles: showItemPane ? { root: { backgroundColor: DefaultPalette.neutralLighter } } : undefined,
        onClick: () => setShowItemPane(!showItemPane)
    }

    const rootStyle = { paddingLeft: 24, paddingRight: 14 };
    const contentClass = showItemPane ? "ms-sm8" : "ms-sm12";

    return <>
        <OFluiCommandBar
            items={[]}
            filterButton={itemToggle}
        />

        <div className="ms-Grid" dir="ltr" style={rootStyle}>
            <div className="ms-Grid-row">
                <div className={`ms-Grid-col ${contentClass}`}>
                    <OFluiTilesList
                        tiles={props.tiles}
                        onClick={props.onTileClick}
                    />
                </div>

                {showItemPane &&
                    <div className="ms-Grid-col ms-sm4">
                        <OFluiDisplayItemForm
                            {...props.itemConfig}
                            item={props.item}
                        />
                    </div>
                }
            </div>
        </div>
    </>;
};
