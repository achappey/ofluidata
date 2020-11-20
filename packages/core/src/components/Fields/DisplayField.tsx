import React from 'react'
import { useDisplayValue } from '../../hooks/use-DisplayValue'
import { OFluiColumn } from '../../types/oflui'

export type OFluiDisplayFieldProps = {
  value: any,
  property: OFluiColumn,
  lang?: string
}

export const OFluiDisplayField = (props: OFluiDisplayFieldProps) => {
  const displayValue = useDisplayValue(props.property, props.value)

  return (
    <>
      {displayValue}
    </>
  )
}
