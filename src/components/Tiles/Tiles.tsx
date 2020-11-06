import * as React from 'react';
import HttpContext from '../../context/HttpContext';
import { OFluiTilesOptions } from '../../types/OFlui';
import { OFluiTilesWrapper } from './TilesWrapper';

export type OFluiTilesProps = {
    url: string,
    options?: OFluiTilesOptions,
}

export const OFluiTiles = (props: OFluiTilesProps) => {
    return (
        <HttpContext.Consumer>
            {value => (
                <OFluiTilesWrapper {...props}
                    http={value}
                />
            )}
        </HttpContext.Consumer>
    );
};
