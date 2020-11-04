import * as React from 'react';
import { Property, PropertyType } from '../../types/OData';

export type OFluiDisplayFieldProps = { value: any, property: Property, language?: string }

export const OFluiDisplayField = (props: OFluiDisplayFieldProps) => {

    let content = <></>;

    switch (props.property.type) {
        case PropertyType.string:
        case PropertyType.number:
        case PropertyType.duration:
        case PropertyType.guid:
            content = <>{props.value}</>;
            break;
        case PropertyType.datetime:
            const displayValue = props.value != undefined
                ? new Intl.DateTimeFormat(window.navigator.language)
                    .format(
                        new Date(props.value))
                : "";

            content = <>{displayValue}</>;
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
