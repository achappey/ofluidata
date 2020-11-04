import * as React from 'react';
import { DatePicker } from '@fluentui/react';

import { Property } from '../../../types/OData';

export type OFluiDateEditFieldProps = {
    value: any,
    property: Property,
    onChange: (value?: Date | null) => void,
    language?: string
}

export const OFluiDateEditField = (props: OFluiDateEditFieldProps) => {
    return (
        <>
            <DatePicker onSelectDate={props.onChange}
                label={props.property.name}
                value={props.value}
            />
        </>
    );
};
