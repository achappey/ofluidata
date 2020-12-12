import * as React from 'react'
import { ITextFieldProps, TextField } from '@fluentui/react'
import { OFluiColumn, OFluiColumnType, OFluiFieldValidation } from '../../../types/oflui'
import { toFieldValidation } from '../../../utilities/oflui'
import { useLanguage } from 'ofluidata-translations'

export interface OFluiTextEditFieldProps extends ITextFieldProps {
    column: OFluiColumn,
    onUpdate: (value?: string) => void,
    onValidation: (validation: OFluiFieldValidation | undefined) => void,

}

export const OFluiTextEditField = (props: OFluiTextEditFieldProps) => {
    const { t } = useLanguage(props.lang)

    const [value, setValue] = React.useState(props.value)
    const [blurred, setBlurred] = React.useState(false)
    const isValid = toFieldValidation(props.column, value)

    const onChange = (_ev: any, newValue?: string | undefined) => {
        setValue(newValue)

        const validation = toFieldValidation(props.column, newValue)

        props.onValidation(validation)

        if (validation === undefined) {
            props.onUpdate(newValue)
        }
    }

    return (
        <>
            <TextField {...props}
                validateOnLoad={false}
                validateOnFocusIn={false}
                validateOnFocusOut={true}
                value={value}
                errorMessage={blurred
                    ? isValid === undefined
                        ? ''
                        : `${t('requiredField', { fieldLabel: props.column.name })}`
                    : ''}
                autoFocus={props.autoFocus}
                label={props.column.name}
                required={props.column.required}
                multiline={props.column.type === OFluiColumnType.multiline}
                onBlur={() => setBlurred(true)}
                onChange={onChange}
            />
        </>
    )
}
