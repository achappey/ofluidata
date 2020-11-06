
import React from 'react';

import HttpContext from '../../context/HttpContext';
import { OFluiListOptions } from '../../types/OFlui';
import { OFluiListWrapper } from './ListWrapper';

export type OFluiListProps = {
    url: string,
    entityType: string,
    options?: OFluiListOptions,
}


export const OFluiList = (props: OFluiListProps) => {
    return (
        <HttpContext.Consumer>
            {value => (
                <OFluiListWrapper {...props}
                    http={value}
                />
            )}
        </HttpContext.Consumer>
    );
};
