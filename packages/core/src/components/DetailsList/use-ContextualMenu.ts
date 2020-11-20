import { useState } from "react";

import { ContextualMenuItemType, DirectionalHint, IColumn, IContextualMenuItem } from "@fluentui/react";
import { OFluiColumn, OFluiOrder } from "../../types/oflui";
import { useLanguage } from "ofluidata-translations";

type OFluiContextColumn = {
    column: IColumn,
    element: any
}

const selectColumnsKey = "oflui_columnselect";

export const useContextualMenu = (properties: OFluiColumn[],
    lang?: string,
    currentFilters?: { [id: string]: any[]; },
    currentOrder?: any,
    onSelectColumns?: () => void,
    onOrderChanged?: (order: any) => void,
    onFilterOpened?: (column: OFluiColumn) => void,
    onFilterCleared?: (column: OFluiColumn) => void) => {

    const { t } = useLanguage(lang);

    const [contextMenuColumn, setContextMenuColumn] = useState<OFluiContextColumn | undefined>(undefined);
    const [isSelectColumnPanelOpen, setIsSelectColumnPanelOpen] = useState<boolean>(false);

    const contextMenuItems: IContextualMenuItem[] = [];

    const columnProperty = contextMenuColumn != undefined
        ? properties
            .find(e => e.name == contextMenuColumn.column.key)
        : undefined;

    const dismissSelectColumnsPanel = () => setIsSelectColumnPanelOpen(false);
    const onColumnHeaderDismiss = () => setContextMenuColumn(undefined);

    const sortByColumn = onOrderChanged ? (column: string, newOrder: OFluiOrder) => {
        const order: any = currentOrder ? { ...currentOrder }
            : {};

        if (order[column] == newOrder) {
            delete order[column];
        }
        else {
            order[column] = newOrder;
        }

        onOrderChanged(order);
    } : undefined;


    if (columnProperty != undefined) {
        if (!columnProperty.isArray) {

            const filters = currentFilters != undefined && currentFilters[columnProperty.name]
                ? currentFilters[columnProperty.name]!
                : [];

            if (onFilterOpened) {
                contextMenuItems
                    .push({
                        key: `filter`,
                        name: filters.length > 0
                            ? `${t('filterBy')} (${filters.length})`
                            : t('filterBy'),
                        onClick: () => onFilterOpened(columnProperty)
                        //    onClick: () => setFilterPanelProperty(columnProperty)
                    });

                if (filters.length > 0 && onFilterCleared) {
                    contextMenuItems
                        .push({
                            key: `clearfilters`,
                            name: t('clearFilters'),
                            onClick: () => onFilterCleared(columnProperty)
                        });
                }

                contextMenuItems
                    .push({
                        key: `divider`,
                        itemType: ContextualMenuItemType.Divider
                    });
            }

            if (onOrderChanged && sortByColumn != undefined) {
                contextMenuItems
                    .push({
                        key: 'ascending',
                        name: t('sortOnTextAscending'),
                        canCheck: true,
                        checked: currentOrder != undefined
                            && contextMenuColumn != undefined
                            && currentOrder[contextMenuColumn!.column.key] == OFluiOrder.ascending,
                        onClick: () => sortByColumn(contextMenuColumn!.column.key!, OFluiOrder.ascending)
                    });

                contextMenuItems
                    .push({
                        key: 'descending',
                        name: t('sortOnTextDescending'),
                        canCheck: true,
                        onClick: () => sortByColumn(contextMenuColumn!.column.key!, OFluiOrder.descending),
                        checked: currentOrder != undefined
                            && contextMenuColumn != undefined
                            && currentOrder[contextMenuColumn!.column.key] == OFluiOrder.descending,
                    });
            }

        }
    }

    const onHeaderClick = (ev: React.MouseEvent<HTMLElement | MouseEvent> | undefined, column: IColumn) => {
        if (ev != undefined) {
            column.key != selectColumnsKey ?
                setContextMenuColumn(
                    {
                        column: column,
                        element: ev.currentTarget
                    })
                : onSelectColumns!();
        }
    }

    const selectColumn = {
        key: selectColumnsKey,
        name: ` ${t('chooseColumns')}`,
        minWidth: 140,
        maxWidth: window.innerWidth / properties.length + 1,
        iconName: "ColumnOptions"
    };

    const contextualItemProps =
        contextMenuColumn != undefined
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
    /*  const getOptions = getFilterOptions && filterPanelProperty ? () => getFilterOptions(filterPanelProperty)
          .then(o => {
              return {
                  options: o,
                  selected: []
              }
          }) : undefined;*/

    return {
        selectColumn,
        isSelectColumnPanelOpen,
        contextualItemProps,
        onHeaderClick,
        dismissSelectColumnsPanel,
        onColumnHeaderDismiss

    }
}