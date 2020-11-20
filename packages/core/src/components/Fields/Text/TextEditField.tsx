import React, { useState } from 'react'
import { ITextFieldProps, TextField } from '@fluentui/react'
import { OFluiColumn, OFluiFieldValidation } from '../../../types/oflui'
import { useFieldValidation } from '../../../hooks/use-FieldValidation'

export interface OFluiTextEditFieldProps extends ITextFieldProps {
  column: OFluiColumn,
  onUpdate: (value?: string) => void,
  onValidation: (validation: OFluiFieldValidation | undefined) => void,
}

export const OFluiTextEditField = (props: OFluiTextEditFieldProps) => {
  const [value, setValue] = useState(props.value)
  const [blurred, setBlurred] = useState(false)
  const isValid = useFieldValidation(props.column, value)

  const onChange = (_ev: any, newValue?: string | undefined) => {
    setValue(newValue)

    const validation = useFieldValidation(props.column, newValue)

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
        errorMessage={blurred ? isValid === undefined ? '' : 'Is required' : ''}
        autoFocus={props.autoFocus}
        label={props.column.name}
        required={props.column.required}
        onBlur={() => setBlurred(true)}
        onChange={onChange}
      />
    </>
  )
}
