import React, { useEffect, useState } from 'react'
import { ISpinButtonProps, Position, SpinButton } from '@fluentui/react'

import { OFluiColumn, OFluiFieldValidation } from '../../../types/oflui'
import { useDebounce } from 'use-debounce'
import { useNumberValue } from '../../../hooks/use-NumberValue'
import { useFieldValidation } from '../../../hooks/use-FieldValidation'
// import { useDebounce } from 'use-debounce';

// import { isCommaDecimalLocale } from '../../../../mappings/oflui';

export interface OFluiNumberEditFieldProps extends ISpinButtonProps {
  column: OFluiColumn,
  onUpdate: (value?: number) => void,
  onValidation: (validation: OFluiFieldValidation | undefined) => void,
}

/*
const _toNumberValue = (value?: string) => {
    return value == undefined || (value.trim && value.trim().length == 0) || isNaN(parseFloat(value))
        ? undefined
        : isCommaDecimalLocale()
            ? parseFloat(value.replace(",", "."))
            : parseFloat(value);
} */


export const OFluiNumberEditField = (props: OFluiNumberEditFieldProps) => {
  const [fieldValue, setFieldValue] = useState(props.value)
  const [isValid] = useState(true)
  const [value] = useDebounce(fieldValue, 1000);

  const onValidate = (value?: string) => {
    console.log(useFieldValidation(props.column, value)?.toString());
    useFieldValidation(props.column, value)?.toString()
  };

  const validate = (value?: string) => {
    const parsedValue = useNumberValue(value);
    const validation = useFieldValidation(props.column, value);

    props.onValidation(validation);

    if (!validation) {
      props.onUpdate(parsedValue);
    }
  }

  useEffect(() => validate(value), [value]);

  const onChange = (_ev: React.FormEvent<HTMLDivElement>) => {
    const newValue = (_ev.target as HTMLInputElement).value
    setFieldValue(newValue)
    /*   const parsedValue =
               newValue == undefined || newValue.trim().length == 0 || isNaN(parseFloat(newValue))
                   ? undefined
                   : isCommaDecimalLocale()
                       ? parseFloat(newValue.replace(",", "."))
                       : parseFloat(newValue);
   */
    //   setFieldValue(toNumberValue(newValue));

    return (_ev.target as HTMLInputElement).value
  }

  const onCrement = (newValue: string, _ev: any) => props.onUpdate(parseFloat(newValue))

  return (
    <>
      {!isValid && <style>
        {'.ofluiSpinButton div:nth-child(2)::after { border-color: rgb(164, 38, 44);}'}
      </style>
      }
      <SpinButton {...props}
        className={'ofluiSpinButton'}
        //       styles={styles}
        onChange={onChange}
        onDecrement={onCrement}
        labelPosition={Position.top}
        inputMode={'numeric'}
        onValidate={onValidate}
        onIncrement={onCrement}
        label={props.column.name}
        value={fieldValue}
      // value={fieldValue ? fieldValue.toString() : ""}
      // value={fieldValue != undefined ? fieldValue : ""}
      />
    </>
  )
}
