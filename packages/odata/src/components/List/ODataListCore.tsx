import { OFluiList } from 'ofluidata-core';
import React, { useContext } from 'react'
import HttpContext from '../../context/HttpContext';

import ODataContext from '../../context/ODataContext';

import { OFluiODataListConfig } from '../../types/config';
import { useODataList } from './use-ODataList';

export interface OFluiODataListCoreProps {
  entityType: string,
  config?: OFluiODataListConfig
}

export const OFluiODataListCore = (props: OFluiODataListCoreProps) => {
  //const http = useContext(HttpContext);
  const http = useContext(HttpContext);
  const odataConfig = useContext(ODataContext);
console.log(odataConfig);
  const { views,
    columns,
    getView,
    onSearch } = useODataList(
      odataConfig!,
      http,
      props.entityType,
      props.config);

  return (
    <OFluiList
      views={views}
      columns={columns}
      getView={getView}
      onSearch={onSearch}
    />
  );
};
