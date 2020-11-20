import React from 'react'
import {
    ContextualMenu, DetailsList,
    IColumn, IDetailsHeaderProps,
    IDetailsListProps, TooltipHost,
    IRenderFunction, ITooltipHostProps,
    Link, Sticky, StickyPositionType
} from '@fluentui/react'

import { useDetailsList } from './use-DetailsList'
import { OFluiDisplayField } from '../Fields/DisplayField'
import { OFluiColumn, OFluiOrder } from '../../types/oflui'

export interface OFluiDetailsListProps extends IDetailsListProps {
    properties: OFluiColumn[],
    pageCount?: number;
    stickyHeader?: boolean,
    lang?: string,
    order?: { [id: string]: OFluiOrder; },
    filters?: { [id: string]: any[]; },
    itemTitleColumn?: string,
    onSelectColumns?: () => void,
    onOrderChanged?: (order: { [id: string]: OFluiOrder; }) => void,
    onFilterCleared?: (column: OFluiColumn) => void,
    onFilterOpened?: (column: OFluiColumn) => void,
    onItemClick?: (item: any) => void
}

export const OFluiDetailsList = (props: OFluiDetailsListProps) => {
    const {
        currentColumns,
        contextualItemProps,
        titleColumn,
        onHeaderClick
    } = useDetailsList(props)

    const renderItemColumn = (item: any, _index: number, column: IColumn) => {
        const value = item[column.key]
        const property = props.properties.find(d => d.name == column.key)

        const itemClick = props.onItemClick
            ? () => props.onItemClick!(item)
            : undefined

        return property != undefined
            ? titleColumn == undefined || titleColumn != column.key || itemClick == undefined
                ? <OFluiDisplayField
                    value={value}
                    property={property}
                />
                : <Link onClick={itemClick}>
                    {value}
                </Link>
            : <></>
    }

    const renderHeader = (detailsHeaderProps: IDetailsHeaderProps,
        defaultRender: IRenderFunction<IDetailsHeaderProps>) => {
        const content = defaultRender(
            {
                ...detailsHeaderProps,
                onRenderColumnHeaderTooltip:
                    (tooltipHostProps: ITooltipHostProps) =>
                        <TooltipHost {...tooltipHostProps} />
            })

        return props.stickyHeader
            ? <Sticky stickyPosition={StickyPositionType.Header} >
                {content}
            </Sticky>
            : <> {content} </>
    }

    return <>
        <DetailsList {...props}
            items={props.items}
            columns={currentColumns}
            onRenderItemColumn={renderItemColumn}
            onColumnHeaderClick={onHeaderClick}
            onRenderDetailsHeader={renderHeader}
        />

        {contextualItemProps && (
            <ContextualMenu {...contextualItemProps} />
        )}

    </>
}
