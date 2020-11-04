
import React from 'react';
import { ContextualMenu, DetailsList, IColumn, SpinnerSize } from '@fluentui/react';

import { useLanguage } from '../../hooks/use-language';
import useDetailsList from './use-DetailsList';
import { Property, Query } from '../../types/OData';
import { OFluiDisplayField } from '../Fields/DisplayField';
import { OFluiSpinner } from '../Spinner/Spinner';
import { OFluiFilterPanel } from '../Panels/FilterPanel/FilterPanel';

export type OFluiDetailsListProps = {
    items: any[],
    properties: Property[],
    query: Query,
    onQueryChange: (query: Query) => void,
    onSelectionChanged: (selection: any[]) => void,
    getFilterOptions: (property: Property) => Promise<any[]>,
    onNextPage?: () => void,
    language?: string
}

export const OFluiDetailsList = (props: OFluiDetailsListProps) => {
    useLanguage(props.language);

    const { contextualItemProps,
        currentColumns,
        showFilterPanel,
        currentItems,
        filterPanelProperty,
        selection,
        getFilterPanelConfig,
        applyFilters,
        dismissFilterPanel,
        onColumnHeaderClick } = useDetailsList(props.properties,
            props.query,
            props.items,
            props.onQueryChange,
            props.onSelectionChanged,
            props.onNextPage,
            props.getFilterOptions);

    const renderItemColumn = (item: any, _index: number, column: IColumn) => {
        const value = item[column.key];
        const property = props.properties.find(d => d.name == column.key)!;

        return <OFluiDisplayField
            value={value}
            property={property}
        />;
    };

    const nextPage = () => {
        props.onNextPage!();

        return <OFluiSpinner
            size={SpinnerSize.small}
            text={""} />
    }

    return (
        <>
            <DetailsList items={currentItems}
                onRenderItemColumn={renderItemColumn}
                onRenderMissingItem={nextPage}
                selection={selection}
                onColumnHeaderClick={onColumnHeaderClick}
                columns={currentColumns}
            />

            {contextualItemProps && (
                <ContextualMenu {...contextualItemProps} />
            )}

            {filterPanelProperty && <OFluiFilterPanel
                isOpen={showFilterPanel}
                property={filterPanelProperty}
                onApply={applyFilters}
                onDismiss={dismissFilterPanel}
                onOpened={getFilterPanelConfig} />
            }

        </>

    );
};


