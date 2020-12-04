import * as React from 'react'
import { Checkbox, ICheckboxProps, Label } from '@fluentui/react'

import { OFluiColumn } from '../../../types/oflui'

export interface OFluiBooleanEditFieldProps extends ICheckboxProps {
  column: OFluiColumn,
  onUpdate: (value: boolean) => void
}

export const OFluiBooleanEditField = (props: OFluiBooleanEditFieldProps) => {
  const onChange = (_ev: any, val?: boolean) => {
    props.onUpdate(val ? val : false);
  }

  return (
    <>
      <Label>
        {props.column.name}
      </Label>

      <Checkbox {...props}
        checked={props.value ? true : false}
        onChange={onChange}
      />
    </>
  )
}
