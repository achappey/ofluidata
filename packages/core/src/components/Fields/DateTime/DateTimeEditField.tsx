import * as React from 'react'
import { DatePicker, IDatePickerProps, Stack } from '@fluentui/react'

import { OFluiColumn } from '../../../types/oflui'
import { OFluiIconButton } from '../../Controls/Buttons/IconButton/IconButton'

export interface OFluiDateTimeEditFieldProps extends IDatePickerProps {
  column: OFluiColumn,
  onUpdate: (value?: Date) => void
}

export const OFluiDateTimeEditField = (props: OFluiDateTimeEditFieldProps) => {
  const [value, setValue] = React.useState(props.value)

  const onChange = (val?: any) => {
    setValue(val);

    props.onUpdate(val);
  }

  const onClear = () => {
    onChange(undefined);
  }

  return (
    <Stack horizontal>
      <Stack.Item grow>
        <DatePicker value={value}
          onSelectDate={onChange}
          isRequired={props.column.required}
          label={props.column.name}
        />
      </Stack.Item>

      {!props.column.required &&
        <Stack.Item>
          {value != undefined &&
            <OFluiIconButton icon={"Clear"}
              onClick={onClear}
            />
          }
        </Stack.Item>
      }
    </Stack>
  )
}
