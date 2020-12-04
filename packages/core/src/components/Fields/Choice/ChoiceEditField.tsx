import * as React from 'react'
import { Dropdown, IDropdownOption } from '@fluentui/react'

import { OFluiColumn, OFluiFieldValidation } from '../../../types/oflui'

export interface OFluiChoiceEditFieldProps {
  column: OFluiColumn,
  value?: any | any[],
  onUpdate: (value?: any | any[]) => void
  onValidation: (validation: OFluiFieldValidation | undefined) => void,

}

export const OFluiChoiceEditField = (props: OFluiChoiceEditFieldProps) => {
  const [value, setValue] = React.useState<any | any[] | undefined>(props.value ?
    props.value :
    props.column.isArray ?
      [] :
      undefined);

  const options: IDropdownOption[] = props.column.options ?
    props.column.options.map(a => {
      return {
        key: a,
        text: a
      };
    }) : [];

  const onChange = (_ev: any, val?: IDropdownOption) => {
    if (props.column.isArray) {
      const newValue = val && val.selected ? [
        ...value,
        val?.key
      ] : [
          ...value.filter((a: any) => a != val?.key)
        ];

      setValue(newValue);

      props.onUpdate(newValue);
    }
    else {
      setValue(val?.key);

      props.onUpdate(val?.key);
    }
  }

  const dropdownConfig = props.column.isArray ?
    {
      selectedKeys: value,
      multiSelect: true
    } :
    {
      selectedKey: value
    };

  return (
    <Dropdown {...dropdownConfig}
      options={options}
      label={props.column.name}
      required={props.column.required}
      onChange={onChange}
    />
  )
}
