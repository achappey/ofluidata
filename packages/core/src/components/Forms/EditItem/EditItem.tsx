import * as React from 'react';
import { Stack } from '@fluentui/react';

import { useState } from 'react';
import { OFluiEditField } from '../../Fields/EditField';
import { OFluiColumn, OFluiFieldValidation } from '../../../types/oflui';


export type OFluiEditItemFormProps = {
    item: any;
    columns: OFluiColumn[],
    onUpdated: (item: any) => void,
    onValidation: (column: OFluiColumn, result?: OFluiFieldValidation) => void,
    lang?: string
}

export const OFluiEditItemForm = (props: OFluiEditItemFormProps) => {
    const [item, setItem] = useState<any>(props.item);

    const onChange = (property: OFluiColumn, newValue?: any) => {
        const updatedItem = {
            ...item,
            [property.name]: newValue
        };

        setItem(updatedItem);

        props.onUpdated(updatedItem);
    };

    const formFields = item != undefined ? props.columns.map((t, i) => {
        const value = item[t.name];

        const onPropertyChange = (newValue?: any) => onChange(t, newValue);
        const onValidated = (validation: OFluiFieldValidation | undefined) => props.onValidation(t, validation);

        return <Stack.Item key={t.name}>
            <OFluiEditField
                column={t}
                autoFocus={i == 0}
                value={value}
                onUpdate={onPropertyChange}
                onValidation={onValidated}
            />
        </Stack.Item>
    }) : <></>;



    return (
        <Stack>
            {formFields}
        </Stack>
    );

};
