import * as React from 'react'

import { OFluiColumn } from '../../../types/oflui'
import { useLanguage } from 'ofluidata-translations';

export interface OFluiBooleanDisplayFieldProps {
  column: OFluiColumn
  value?: boolean
  lang?: string
}

export const OFluiBooleanDisplayField = (props: OFluiBooleanDisplayFieldProps) => {
  const { t } = useLanguage(props.lang);

  const value = props.value === true ?
    t('yes') :
    props.value === false ?
      t('no') : "";

  return (
    <>
      {value}
    </>
  )
}
