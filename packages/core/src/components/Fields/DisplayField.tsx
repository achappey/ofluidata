import * as React from 'react'
import { Link } from '@fluentui/react'

import { OFluiColumn, OFluiColumnType } from '../../types/oflui'
import { toDisplayValue } from '../../utilities/oflui'
import { OFluiBooleanDisplayField } from './Boolean/BooleanDisplayField'

export type OFluiDisplayFieldProps = {
    value: any,
    property: OFluiColumn,
    lang?: string,
    onClick?: (value: any) => void
}

const getValueFromArray = (property: OFluiColumn, value: any) => {
    return property.getValues !== undefined
        ? property.getValues(value)
        : value
            ? property.getValue !== undefined
                ? value.map((a: any) => {
                    return {
                        displayValue: property.getValue!(a),
                        value: a
                    }
                })
                : value.map((a: any) => {
                    return {
                        displayValue: toDisplayValue(property, a),
                        value: a
                    }
                })
            : []
}

const getValue = (property: OFluiColumn, value: any) => {
    return value
        ? property.getValue !== undefined
            ? property.getValue(value)
            : toDisplayValue(property, value)
        : ''
}

const OFluiGenericDisplayField = (props: OFluiDisplayFieldProps) => {
    const displayValue = props.property.isArray
        ? getValueFromArray(props.property, props.value)
        : getValue(props.property, props.value)

    return (
        <>
            {
                props.property.isArray && !props.property.getValues
                    ? displayValue
                        .map((b: any) => {
                            return props.onClick
                                ? <div>
                                    <Link onClick={() => props.onClick!(b.value)}>
                                        {b.displayValue}
                                    </Link>
                                </div>
                                : <div>
                                    {b.displayValue}
                                </div>
                        })
                    : props.onClick
                        ? <Link onClick={() => props.onClick!(props.value)}>
                            {displayValue}
                        </Link>
                        : <>
                            {displayValue}
                        </>
            }
        </>
    )
}

export const OFluiDisplayField = (props: OFluiDisplayFieldProps) => {
    return (
        <>
            {props.property.type === OFluiColumnType.boolean &&
                <OFluiBooleanDisplayField {...props}
                    column={props.property}
                />
            }
            {props.property.type !== OFluiColumnType.boolean &&
                <OFluiGenericDisplayField {...props} />
            }
        </>
    )
}
