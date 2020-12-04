import * as React from 'react'

import { OFluiList } from 'ofluidata-core';

import HttpContext from '../../context/HttpContext';
import ODataContext from '../../context/ODataContext';

import { OFluiODataListConfig } from '../../types/config';
import { useODataList } from './use-ODataList';

export interface OFluiODataListCoreProps {
  entityType: string,
  config?: OFluiODataListConfig
}

export const OFluiODataListCore = (props: OFluiODataListCoreProps) => {
  const http = React.useContext(HttpContext);
  const odataConfig = React.useContext(ODataContext);

  const { views,
    columns,
    itemName,
    setKey,
    actions,
    getView,
    onAction,
    getNextPage,
    onLookupSearch,
    createItem,
    deleteItem,
    readItem,
    onSearch } = useODataList(
      odataConfig!,
      http,
      props.entityType,
      props.config);

  return (
    <OFluiList
      views={views}
      setKey={setKey}
      itemName={itemName}
      columns={columns}
      actions={actions}
      onAction={onAction}
      getView={getView}
      onLookupSearch={onLookupSearch}
      getNextPage={getNextPage}
      createItem={createItem}
      deleteItem={deleteItem}
      readItem={readItem}
      onSearch={onSearch}
    />
  );
};
