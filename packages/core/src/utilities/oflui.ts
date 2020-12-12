import { ICommandBarItemProps } from '@fluentui/react'
import { OFluiAction, OFluiButton, OFluiColumn, OFluiColumnType, OFluiFieldValidation } from '../types/oflui'

const isCommaDecimalLocale = () => {
    const n = 1.1

    return n.toLocaleString().substring(1, 2) === ','
}

export const toDisplayValue = (column: OFluiColumn, value?: any) => {
    if (!value) {
        return value
    }

    switch (column.type) {
        case OFluiColumnType.text:
        case OFluiColumnType.number:
            return value
        case OFluiColumnType.metadata:
            return value.toString()
        case OFluiColumnType.lookup:
            return value.toString()
        case OFluiColumnType.datetime:
            return value !== undefined
                ? new Intl.DateTimeFormat(window.navigator.language)
                    .format(
                        new Date(value))
                : ''
        default:
            return value?.toString()
    }
}

export const toNumberValue = (value?: string) => {
    return value === undefined || (value.trim && value.trim().length === 0) || isNaN(parseFloat(value))
        ? undefined
        : isCommaDecimalLocale()
            ? parseFloat(value.replace(',', '.'))
            : parseFloat(value)
}

export const actionToCommandBar = (action: OFluiAction): ICommandBarItemProps => {
    return {
        key: action.name,
        text: action.name,
        iconProps: action.icon ? { iconName: action.icon } : undefined
    }
}

export const actionToButton = (action: OFluiAction): OFluiButton => {
    return {
        key: action.name,
        text: action.name
    }
}

export const toFieldValidation = (column: OFluiColumn, value?: any) => {
    if (column.type === OFluiColumnType.boolean) return undefined

    const isValid = column.required &&
        (value === undefined || value.length === 0)
        ? OFluiFieldValidation.isRequired
        : undefined

    if (isValid === undefined &&
        column.type === OFluiColumnType.number &&
        value !== undefined &&
        value.length > 0 &&
        isNaN(parseFloat(value))) {
        return OFluiFieldValidation.numberInvalid
    }

    return isValid
}
