
import React from 'react';
import {
    ContextualMenu, DetailsList, IColumn, Selection,
    IRenderFunction, IDetailsHeaderProps, SpinnerSize,
    ITooltipHostProps, TooltipHost, StickyPositionType, Sticky, Link
} from '@fluentui/react';

import { useLanguage } from '../../hooks/use-language';
import useDetailsList from './use-DetailsList';
import { Property, Query } from '../../types/OData';
import { OFluiDisplayField } from '../Fields/DisplayField';
import { OFluiSpinner } from '../Spinner/Spinner';
import { OFluiFilterPanel } from '../Panels/FilterPanel/FilterPanel';
import { OFluiColumnsPanel } from '../Panels/ColumnsPanel/ColumnsPanel';

export type OFluiDetailsListProps = {
    items: any[],
    viewProperties: Property[],  
    query: Query,
    entityKey: string,
    onQueryChange: (query: Query) => void,
    getFilterOptions: (property: Property) => Promise<any[]>,
    itemTitleColumn?: string,
    allProperties?: Property[],
    stickyHeader?: boolean,
    language?: string
    onNextPage?: () => void,
    onItemClick?: (item: any) => void,
    selection?: Selection
}

export const OFluiDetailsList = (props: OFluiDetailsListProps) => {
    useLanguage(props.language);

    const { contextualItemProps,
        currentColumns,
        showFilterPanel,
        currentItems,
        filterPanelProperty,
        titleColumn,
        showColumnPanel,
        getColumnsPanelConfig,
        applyColumns,
        dismissColumnPanel,
        onItemClick,
        getFilterPanelConfig,
        applyFilters,
        dismissFilterPanel,
        onColumnHeaderClick } = useDetailsList(props.viewProperties,
            props.query,
            props.items,
            props.onQueryChange,
            props.itemTitleColumn,
            props.allProperties,
            props.onNextPage,
            props.getFilterOptions,
            props.onItemClick);

    const renderItemColumn = (item: any, _index: number, column: IColumn) => {
        const value = item[column.key];
        const property = props.viewProperties.find(d => d.name == column.key);

        return property != undefined ?
         titleColumn == undefined
            || titleColumn != column.key
            || onItemClick == undefined ?
            <OFluiDisplayField
                value={value}
                property={property}
            />
            :
            <Link
                onClick={() => onItemClick(item)}>
                {value}
            </Link> 
            : <></>;
    };

    const nextPage = () => {
        props.onNextPage!();

        return <OFluiSpinner
            size={SpinnerSize.small}
            text={""} />
    }

    const renderHeader = (detailsHeaderProps: IDetailsHeaderProps,
        defaultRender: IRenderFunction<IDetailsHeaderProps>) => {
        const content = defaultRender({
            ...detailsHeaderProps,
            onRenderColumnHeaderTooltip: (tooltipHostProps: ITooltipHostProps) => (
                <TooltipHost {...tooltipHostProps} />
            )
        });

        return props.stickyHeader ?
            <Sticky stickyPosition={StickyPositionType.Header} >
                {content}
            </Sticky>
            :
            <>
                {content}
            </>;
    };

    return (
        <>
            <DetailsList items={currentItems}
                onRenderItemColumn={renderItemColumn}
                onRenderMissingItem={nextPage}
                selection={props.selection}
                setKey={props.entityKey}
                onRenderDetailsHeader={renderHeader}
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

            <OFluiColumnsPanel
                isOpen={showColumnPanel}             
                onApply={applyColumns}
                onDismiss={dismissColumnPanel}
                onOpened={getColumnsPanelConfig} />
        </>

    );
};


