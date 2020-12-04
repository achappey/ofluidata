import * as React from 'react'
import { Label } from '@fluentui/react'

import { OFluiColumn, OFluiColumnType, OFluiFieldValidation, OFluiLookup } from '../../types/oflui'
import { OFluiBooleanEditField } from './Boolean/BooleanEditField'
import { OFluiDateTimeEditField } from './DateTime/DateTimeEditField'
import { OFluiNumberEditField } from './Number/NumberEditField'
import { OFluiTextEditField } from './Text/TextEditField'
import { OFluiChoiceEditField } from './Choice/ChoiceEditField'
import { OFluiLookupEditField } from './Lookup/LookupEditField'

export type OFluiEditFieldProps = {
  value: any,
  column: OFluiColumn,
  onUpdate: (newValue?: any) => void,
  onValidation: (validation: OFluiFieldValidation | undefined) => void,
  lang?: string,
  autoFocus?: boolean
  onSearch?: (query: string) => Promise<OFluiLookup[]>,
}

export const OFluiEditField = (props: OFluiEditFieldProps) => {
  let content = <Label>{props.column.name}</Label>

  switch (props.column.type) {
    case OFluiColumnType.text:
    case OFluiColumnType.multiline:
      content = <OFluiTextEditField {...props} />
      break
    case OFluiColumnType.datetime:
      content = <OFluiDateTimeEditField {...props} />;
      break;
    case OFluiColumnType.number:
      content = <OFluiNumberEditField {...props} />
      break
    case OFluiColumnType.boolean:
      content = <OFluiBooleanEditField {...props} />
      break
    case OFluiColumnType.choice:
      content = <OFluiChoiceEditField {...props} />
      break
    case OFluiColumnType.lookup:
      content = <OFluiLookupEditField {...props} />
      break
    default:
      break
  }

  return (
    <>
      {content}
    </>
  )
}
