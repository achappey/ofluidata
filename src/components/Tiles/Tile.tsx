import * as React from 'react';
import { Tile } from '@uifabric/experiments';
import { AnimationClassNames, Link } from '@fluentui/react';

export type OFluiTileProps = {
    title: string,
    onClick: () => void


}

export const OFluiTile = (props: OFluiTileProps) => {
    const namePlate = <>
        {props.title}
    </>;

    return (
        <Link onClick={props.onClick} >
            <Tile tileSize={"large"}
                className={AnimationClassNames.fadeIn400}
                itemName={namePlate} />
        </Link>
    );
};
