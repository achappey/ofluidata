import { useState } from "react";
import {
    ContextualMenuItemType, DirectionalHint,
    IColumn, IContextualMenuItem, Selection
} from "@fluentui/react";
import { useTranslation } from "react-i18next";

import { toColumn } from "../../services/OFluiMapper";
import { Order, Property, Query } from "../../types/OData";

export type OFluiContaxtMenuColumn = {
    column: IColumn,
    element: any
}

export default (properties: Property[],
    query: Query,
    items: any[],
    onQueryChange: (query: Query) => void,
    onSelectionChanged: (selection: any[]) => void,
    onNextPage?: () => void,
    getFilterOptions?: (property: Property) => Promise<any[]>) => {

    const [filterPanelProperty, setFilterPanelProperty] = useState<Property | undefined>(undefined);
    const [columns] = useState<IColumn[]>(properties.map(toColumn));
    const [contextMenuColumn, setContextMenuColumn] = useState<OFluiContaxtMenuColumn | undefined>(undefined);
    const { t } = useTranslation();

    const selectionChanged = () => onSelectionChanged(selection.getSelection());

    const selection: Selection = new Selection({
        onSelectionChanged: selectionChanged
    });

    const onColumnHeaderDismiss = () => setContextMenuColumn(undefined);

    const onColumnHeaderClick = (ev: React.MouseEvent<HTMLElement | MouseEvent> | undefined, column: IColumn) => {
        if (ev != undefined) {
            setContextMenuColumn({
                column: column,
                element: ev.currentTarget
            })

        }
    };

    const sortByColumn = (column: string, order: Order) => {
        const newQuery = { ...query };

        if (newQuery.order == undefined) {
            newQuery.order = {};
        }

        if (newQuery.order[column] == order) {
            delete newQuery.order![column];
        }
        else {
            newQuery.order[column] = order;
        }

        onQueryChange(newQuery);
    }

    const contextMenuItems: IContextualMenuItem[] = [];

    const columnProperty = contextMenuColumn != undefined
        ? properties
            .find(e => e.name == contextMenuColumn.column.key)
        : undefined;

    if (columnProperty != undefined) {
        if (!columnProperty.isCollection) {

            const currentFilters = query.filters != undefined ? query.filters
                .filter(z => z.property.name == columnProperty.name) : [];

            contextMenuItems
                .push({
                    key: `filter`,
                    name: currentFilters.length > 0
                        ? `${t('filterBy')} (${currentFilters.length})`
                        : t('filterBy'),
                    onClick: () => setFilterPanelProperty(columnProperty)
                });

            if (currentFilters.length > 0) {
                contextMenuItems
                    .push({
                        key: `clearfilters`,
                        name: t('clearFilters'),
                        onClick: () => {
                            onQueryChange({
                                ...query,
                                filters: query.filters!.filter(z => z.property.name != columnProperty.name)
                            })
                        }
                    });
            }

            contextMenuItems
                .push({
                    key: `divider`,
                    itemType: ContextualMenuItemType.Divider
                });

            contextMenuItems
                .push({
                    key: 'ascending',
                    name: t('sortOnTextAscending'),
                    canCheck: true,
                    checked: query.order != undefined
                        && contextMenuColumn != undefined
                        && query.order[contextMenuColumn!.column.key] == Order.Ascending,
                    onClick: () => sortByColumn(contextMenuColumn!.column.key!, Order.Ascending)
                });

            contextMenuItems
                .push({
                    key: 'descending',
                    name: t('sortOnTextDescending'),
                    canCheck: true,
                    onClick: () => sortByColumn(contextMenuColumn!.column.key!, Order.Descending),
                    checked: query.order != undefined
                        && contextMenuColumn != undefined
                        && query.order[contextMenuColumn!.column.key] == Order.Descending,
                });

        }
    }

    const contextualItemProps = contextMenuColumn != undefined
        && contextMenuItems.length > 0
        ? {
            items: contextMenuItems,
            target: contextMenuColumn.element,
            directionalHint: DirectionalHint.bottomLeftEdge,
            gapSpace: 10,
            isBeakVisible: true,
            onDismiss: onColumnHeaderDismiss
        }
        : undefined;

    const currentColumns = columns.map(f => {
        return {
            ...f,
            maxWidth: window.innerWidth / columns.length,
            isFiltered: query.filters != undefined
                && query.filters.find(l => l.property.name == f.key) != undefined,
            isSorted: query.order != undefined
                && query.order[f.key] != undefined,
            isSortedDescending: query.order != undefined
                && query.order[f.key] == Order.Descending
        }
    });

    const showFilterPanel = filterPanelProperty != undefined;

    const dismissFilterPanel = () => setFilterPanelProperty(undefined);

    const currentItems = onNextPage != undefined
        ? [...items, null]
        : items;

    const applyFilters = (filters: any[]) => {

        const newFilters = filters.map(r => {
            return {
                property: filterPanelProperty!,
                operator: "eq",
                value: r
            }
        });

        onQueryChange({
            ...query,
            filters: query.filters != undefined
                ? [...query.filters.filter(e => e.property.name != filterPanelProperty!.name),
                ...newFilters]
                : newFilters
        })

        setFilterPanelProperty(undefined);
    };

    const getFilterPanelConfig = (property: Property) => {
        return getFilterOptions!(property)
            .then(t => {
                return {
                    options: t,
                    selected: query.filters != undefined ? query.filters
                        .filter(t => t.property.name == property.name)
                        .map(e => e.value)
                        : []
                }
            });
    }

    return {
        currentItems,
        currentColumns,
        contextualItemProps,
        showFilterPanel,
        filterPanelProperty,
        selection,
        getFilterPanelConfig,
        applyFilters,
        dismissFilterPanel,
        onColumnHeaderClick
    };
}