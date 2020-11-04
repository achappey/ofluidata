import * as React from 'react';
import { useEffect, useState } from 'react';
import { Position, SpinButton } from '@fluentui/react';
import { useDebounce } from 'use-debounce';

import { Property } from '../../../types/OData';
import { isCommaDecimalLocale } from '../../../services/ODataMapper';

export type OFluiNumberEditFieldProps = {
    value: any,
    property: Property,
    onChange: (value?: number) => void,
    language?: string
}

export const OFluiNumberEditField = (props: OFluiNumberEditFieldProps) => {
    const [fieldValue, setFieldValue] = useState(props.value);
    const [value] = useDebounce(fieldValue, 1000);

    useEffect(() => props.onChange(value), [value]);

    const onChange = (_ev: React.FormEvent<HTMLDivElement>) => {
        const newValue = (_ev.target as HTMLInputElement).value;

        const parsedValue =
            newValue == undefined || newValue.trim().length == 0 || isNaN(parseFloat(newValue))
                ? undefined
                : isCommaDecimalLocale()
                    ? parseFloat(newValue.replace(",", "."))
                    : parseFloat(newValue);

        setFieldValue(parsedValue);

        return (_ev.target as HTMLInputElement).value;
    };

    const onCrement = (newValue: string, _ev: any) => props.onChange(parseFloat(newValue));

    return (
        <>
            <SpinButton
                onChange={onChange}
                onDecrement={onCrement}
                labelPosition={Position.top}
                onIncrement={onCrement}
                label={props.property.name}
                value={fieldValue != undefined ? fieldValue : ""}
            />
        </>
    );
};
