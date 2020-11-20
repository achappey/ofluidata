import { IColumn } from "@fluentui/react";

import { OFluiColumn, OFluiOrder } from "../../types/oflui";
import { OFluiDetailsListProps } from "./DetailsList";
import { useContextualMenu } from "./use-ContextualMenu";

const getDefaultTitleColumn = (properties: OFluiColumn[]) => {
    return properties.length > 0 ?
        properties[0].name :
        undefined;
}

const withFiltered = (field: IColumn, filters?: any): IColumn => {
    return {
        ...field,
        isFiltered: filters != undefined
            && filters[field.key] != undefined && filters[field.key].length > 0
    }
};

const withSorted = (field: IColumn, order?: any): IColumn => {
    return {
        ...field,
        isSorted: order != undefined
            && order[field.key] != undefined,
        isSortedDescending: order != undefined
            && order[field.key] == OFluiOrder.descending
    }
};

const withMaxWidth = (field: IColumn, totalColumns?: number): IColumn => {
    return {
        ...field,
        maxWidth: totalColumns ? window.innerWidth / totalColumns : undefined
    }
};

const toColumn = (field: OFluiColumn): IColumn => {
    return {
        key: field.name,
        fieldName: field.name,
        name: field.name,
        isResizable: true,
        minWidth: 100
    }
};

export const useDetailsList = (props: OFluiDetailsListProps) => {
    const { selectColumn,
        contextualItemProps,
        onHeaderClick,
        onColumnHeaderDismiss } = useContextualMenu(props.properties, props.lang,
            props.filters,
            props.order,
            props.onSelectColumns,
            props.onOrderChanged,
            props.onFilterOpened,
            props.onFilterCleared);

    const showColumnSelect = props.onSelectColumns !== undefined;

    const columnCount = showColumnSelect ?
        props.properties.length + 1
        : props.properties.length;

    const listColumns = props
        .properties
        .map(a => toColumn(a))
        .map(a => withSorted(a, props.order))
        .map(a => withFiltered(a, props.filters))
        .map(a => withMaxWidth(a, columnCount));

    const currentColumns = showColumnSelect ? [...listColumns, selectColumn] : listColumns;
    /*
        const getPage = (page: number, pageCount?: number) => props
            .getPage(page)
            .then(a => {
                const hasNextPage = pageCount && pageCount > page;
    
                if (hasNextPage) {
                    setNextPage(page + 1);
                }
    
                setItems(page == 1
                    ? hasNextPage
                        ? [...a, undefined]
                        : [...a]
                    : hasNextPage
                        ? [...items.filter(z => z), ...a, undefined]
                        : [...items.filter(z => z), ...a]);
            });
    
        const getNextPage = () => getPage(nextPage, props.pageCount);
    */

    const titleColumn = props.onItemClick
        ? props.itemTitleColumn
            ? props.itemTitleColumn
            : getDefaultTitleColumn(props.properties) : undefined;


    return {
        currentColumns,
        contextualItemProps,
        titleColumn,
        onColumnHeaderDismiss,
        onHeaderClick
    }

}