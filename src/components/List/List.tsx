
import React from 'react';

import HttpContext from '../../context/HttpContext';
import { View } from '../../types/OFlui';
import { OFluiListWrapper } from './ListWrapper';

export type OFluiListProps = {
    url: string,
    entityType: string,
    options?: OFluiListOptions,
}

export type OFluiListOptions = {
    views?: View[],
    image?: string,
    translations?: any,
    language?: string,
    onNewItem?: () => Promise<any>,
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
