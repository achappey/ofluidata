import * as React from 'react'
import { DefaultButton, Label, PrimaryButton } from '@fluentui/react'

import { OFluiButton, OFluiColumn } from '../../../types/oflui'

export interface OFluiMetadataEditFieldProps {
  column: OFluiColumn,
  options: OFluiButton[],
  value?: string | string[];
  onUpdate: (value?: string | string[]) => void
}

export const OFluiMetadataEditField = (props: OFluiMetadataEditFieldProps) => {
  const [value, setValue] = React.useState(props.value)

  const isSelected = (val?: string) => {
    if (!val || !value)
      return false;

    return props.column.isArray ? (value as string[]).findIndex(v => v == val) > -1 : val == value
  }

  const updateValue = (val?: string | string[]) => {
    setValue(val);

    props.onUpdate(val);
  }

  const onSelect = (val: string) => {
    const newValue = props.column.isArray ? value ?
      [...value,
        val]
      : [val] :
      val;

    updateValue(newValue);
  }

  const onDeselect = (val: string) => {
    const newValue = props.column.isArray ?
      [...(value as string[]).filter(d => d != val)] :
      value == val ? props.column.required ?
        value :
        undefined :
        val
    updateValue(newValue);
  }

  const buttons = props.options.map((d: OFluiButton) => {
    const select = () => onSelect(d.key);
    const deselect = () => onDeselect(d.key);

    return isSelected(d.key) ?
      <PrimaryButton {...d} onClick={deselect} /> :
      <DefaultButton {...d} onClick={select} />;
  });

  return (
    <>
      <Label required={props.column.required}>
        {props.column.name}
      </Label>

      {buttons}
    </>
  )
}
