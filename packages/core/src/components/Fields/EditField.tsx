import React from 'react'
import { OFluiColumn, OFluiColumnType, OFluiFieldValidation } from '../../types/oflui'

import { OFluiNumberEditField } from './Number/NumberEditField'
import { OFluiTextEditField } from './Text/TextEditField'

export type OFluiEditFieldProps = {
  value: any,
  column: OFluiColumn,
  onUpdate: (newValue?: any) => void,
  onValidation: (validation: OFluiFieldValidation | undefined) => void,
  lang?: string,
  autoFocus?: boolean
}

export const OFluiEditField = (props: OFluiEditFieldProps) => {
  let content = <></>

  switch (props.column.type) {
    case OFluiColumnType.text:
      content = <OFluiTextEditField {...props} />
      break
    /*     case PropertyType.datetime:
                 content = <OFluiDateEditField {...props} />;
                 break; */
    case OFluiColumnType.number:
      content = <OFluiNumberEditField {...props} />
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
