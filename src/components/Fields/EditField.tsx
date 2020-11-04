import * as React from 'react';
import { Label } from '@fluentui/react';

import { Property, PropertyType } from '../../types/OData';
import { OFluiDateEditField } from './Date/DateEditField';
import { OFluiNumberEditField } from './Number/NumberEditField';
import { OFluiTextEditField } from './Text/TextEditField';

export type OFluiEditFieldProps = {
    value: any,
    property: Property,
    onChange: (newValue?: any) => void,
    language?: string
    autoFocus?: boolean,
}

export const OFluiEditField = (props: OFluiEditFieldProps) => {

    let content = <Label>{props.property.name}</Label>;

    switch (props.property.type) {
        case PropertyType.string:
            content = <OFluiTextEditField {...props} />;
            break;
        case PropertyType.datetime:
            content = <OFluiDateEditField {...props} />;
            break;
        case PropertyType.number:
            content = <OFluiNumberEditField {...props} />;
            break;
        default:
            break;
    }

    return (
        <>
            {content}
        </>
    );
};
