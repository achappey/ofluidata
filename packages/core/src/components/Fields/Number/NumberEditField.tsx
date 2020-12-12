import * as React from 'react'
import { useDebounce } from 'use-debounce'
import { ISpinButtonProps, Label, SpinButton } from '@fluentui/react'

import { useLanguage } from 'ofluidata-translations'

import { OFluiColumn, OFluiFieldValidation } from '../../../types/oflui'
import { toFieldValidation, toNumberValue } from '../../../utilities/oflui'
import { OFluiErrorMessage } from '../../Controls/ErrorMessage/ErrorMessage'

export interface OFluiNumberEditFieldProps extends ISpinButtonProps {
    column: OFluiColumn,
    onUpdate: (value?: number) => void,
    onValidation: (validation: OFluiFieldValidation | undefined) => void,
}

export const OFluiNumberEditField = (props: OFluiNumberEditFieldProps) => {
    const { t } = useLanguage(props.lang)
    const [fieldValue, setFieldValue] = React.useState(props.value)
    const [validation, setValidation] = React.useState<OFluiFieldValidation | undefined>(undefined)
    const [value] = useDebounce(fieldValue, 1000)

    const onValidate = (value?: string) => {
        toFieldValidation(props.column, value)?.toString()
    }

    const validate = (value?: string) => {
        const validation = toFieldValidation(props.column, value)

        setValidation(validation)

        props.onValidation(validation)
    }

    React.useEffect(() => validate(value), [value])

    const onChange = (_ev: React.FormEvent<HTMLDivElement>) => {
        const newValue = (_ev.target as HTMLInputElement).value

        setFieldValue(newValue)

        const parsedValue = toNumberValue(newValue)
        const validation = toFieldValidation(props.column, value)

        if (!validation) {
            props.onUpdate(parsedValue)
        }

        return (_ev.target as HTMLInputElement).value
    }

    const onCrement = (newValue: string, _ev: any) => props.onUpdate(parseFloat(newValue))

    const validationMessage = validation !== undefined
        ? validation === OFluiFieldValidation.isRequired
            ? t('requiredField', { fieldLabel: props.column.name })
            : validation === OFluiFieldValidation.numberInvalid
                ? t('numberNotValid', { fieldLabel: props.column.name })
                : t('notValid', { fieldLabel: props.column.name })
        : ''

    return (
        <>
            {validation !== undefined &&
                <style>
                    {'.ofluiSpinButton div:nth-child(2)::after { border-color: rgb(164, 38, 44);}'}
                </style>
            }

            <Label required={props.column.required}>
                {props.column.name}
            </Label>

            <SpinButton {...props}
                className={'ofluiSpinButton'}
                inputMode={'numeric'}
                value={fieldValue}
                onValidate={onValidate}
                onIncrement={onCrement}
                onDecrement={onCrement}
                onChange={onChange}
            />

            {validation !== undefined &&
                <OFluiErrorMessage
                    message={validationMessage}
                />
            }
        </>
    )
}
