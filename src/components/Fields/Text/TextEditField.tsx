import * as React from 'react';
import { TextField } from '@fluentui/react';

import { Property } from '../../../types/OData';
import { validateField } from '../../../services/ODataMapper';

export type OFluiTextEditFieldProps = {
    value: any,
    property: Property,
    onChange: (value?: string) => void,
    language?: string,
    autoFocus?: boolean
}

export const OFluiTextEditField = (props: OFluiTextEditFieldProps) => {
    const [blurred, setBlurred] = React.useState(false);
    const isValid = validateField(props.property, props.value);

    const onChange = (_ev: any, newValue?: string | undefined) => props
        .onChange(newValue);

    return (
        <>
            <TextField onChange={onChange}
                required={props.property.required}
                validateOnLoad={false}
                validateOnFocusIn={false}
                validateOnFocusOut={true}
                autoFocus={props.autoFocus}
                label={props.property.name}
                onBlur={() => setBlurred(true)}
                errorMessage={blurred ? isValid == undefined ? "" : "Is required" : ""}
                value={props.value}
            />
        </>
    );
};
