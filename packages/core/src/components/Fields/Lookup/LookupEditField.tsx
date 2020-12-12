import * as React from 'react'

import { ITag, Label, TagPicker } from '@fluentui/react'

import { OFluiColumn, OFluiFieldValidation, OFluiLookup } from '../../../types/oflui'
import { toFieldValidation } from '../../../utilities/oflui'

export interface OFluiLookupEditFieldProps {
    column: OFluiColumn,
    onUpdate: (value?: OFluiLookup | OFluiLookup[]) => void
    onValidation: (validation: OFluiFieldValidation | undefined) => void,

    value?: OFluiLookup | OFluiLookup[];
    onSearch?: (query: string) => Promise<OFluiLookup[]>

}

export const OFluiLookupEditField = (props: OFluiLookupEditFieldProps) => {
    const [value, setValue] = React.useState<any>(props.value
        ? props.column.isArray
            ? props.value
            : [props.value]
        : [])

    const onChange = (val?: ITag[]) => {
        setValue(val)

        const newValue = props.column.isArray
            ? val
            : val && val?.length > 0
                ? val[0]
                : undefined

        props.onUpdate(newValue)

        const validation = toFieldValidation(props.column, newValue)

        props.onValidation(validation)
    }

    const onResolve = (filter: string, _selectedItems?: ITag[]) => {
        return props.onSearch ? props.onSearch(filter) : [{ key: filter, name: filter }]
    }
    const itemLimit = props.column.isArray ? undefined : 1

    return (
        <>
            <Label required={props.column.required}>
                {props.column.name}
            </Label>

            <TagPicker
                resolveDelay={300}
                selectedItems={value}
                itemLimit={itemLimit}
                onChange={onChange}
                onResolveSuggestions={onResolve}
            />
        </>
    )
}
