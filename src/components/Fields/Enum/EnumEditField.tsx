import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';

import { Property } from '../../../types/OData';

export type OFluiEnumEditFieldProps = {
    value: any,
    property: Property,
    options: any[],
    onChange: (value?: Date | null) => void,
    language?: string
}

export const OFluiEnumEditField = (props: OFluiEnumEditFieldProps) => {
    const onChange = (_ev: any, option?: IDropdownOption) => console.log(option);

    return (
        <>
            <Dropdown onChange={onChange}
                options={props.options}
                label={props.property.name}
            />
        </>
    );
};
