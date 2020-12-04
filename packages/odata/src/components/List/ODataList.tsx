import * as React from 'react'

import { OFluiODataListConfig } from '../../types/config';
import { OFluiHttpClient } from '../../types/http';
import { OFluiHttpProvider } from '../Providers/Http/HttpProvider';
import { OFluiODataProvider } from '../Providers/OData/ODataProvider';
import { OFluiODataListCore } from './ODataListCore';

export interface OFluiODataListProps {
  url: string,
  entityType: string,
  config?: OFluiODataListConfig,
  httpClient?: OFluiHttpClient
}

export const OFluiODataList = (props: OFluiODataListProps) => {
  return (
    <OFluiHttpProvider httpClient={props.httpClient}>
      <OFluiODataProvider url={props.url}
        lang={props.config?.lang} >

        <OFluiODataListCore {...props} />

      </OFluiODataProvider>
    </OFluiHttpProvider>
  );
};
