import * as React from 'react';
import { useState } from 'react';
import { Stack } from '@fluentui/react';

import { Property } from '../../../types/OData';
import { OFluiEditField } from '../../Fields/EditField';

export type OFluiEditFormProps = {
    item: any,
    properties: Property[],
    onChange: (item: any) => void,
    language?: string
}

export const OFluiEditForm = (props: OFluiEditFormProps) => {
    const [item, setItem] = useState<any>(props.item);

    const onChange = (property: Property, newValue?: any) => {
        const updatedItem = {
            ...item,
            [property.name]: newValue
        };

        setItem(updatedItem);

        props.onChange(updatedItem);
    };

    const formFields = props.properties.map((t, i) => {
        const value = item[t.name];

        const onPropertyChange = (newValue?: any) => onChange(t, newValue);

        return <Stack.Item key={t.name}>
            <OFluiEditField
                onChange={onPropertyChange}
                property={t}
                autoFocus={i == 0}
                value={value}
            />
        </Stack.Item>
    });

    return (
        <Stack>
            {formFields}
        </Stack>
    );
};
