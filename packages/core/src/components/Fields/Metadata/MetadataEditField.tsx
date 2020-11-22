import React from 'react'
import { PrimaryButton } from '@fluentui/react'

import { OFluiColumn, OFluiFieldValidation } from '../../../types/oflui'

export interface OFluiMetadataEditFieldProps {
  column: OFluiColumn,
  options: any[],
  onUpdate: (value?: string) => void,
  onValidation: (validation: OFluiFieldValidation | undefined) => void,
}

export const OFluiMetadataEditField = (props: OFluiMetadataEditFieldProps) => {
 
  const buttons = props.options.map((d: any) => {
      return <PrimaryButton {...d} />; 
  });

  return (
    <>
      {buttons}
    </>
  )
}
