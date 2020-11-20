import { useState } from "react";

import { ICommandBarItemProps } from "@fluentui/react";
import { useAsync } from "react-async-hook";

import { OFluiListProps } from "./List";
import { useListFilter } from "./use-ListFilter";
import { OFluiColumn, OFluiColumnGroup, OFluiView } from "../../types/oflui";
import { useLanguage } from "ofluidata-translations";

export const useList = (props: OFluiListProps) => {
    const defaultView = props.views[0];

    const { t } = useLanguage(props.lang);

    const [currentView, setCurrentView] = useState<OFluiView>(defaultView);
    const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
    const [newItem, setNewItem] = useState<any | undefined>(undefined);
    const [displayItem, setDisplayItem] = useState<any | undefined>(undefined);
    const [items, setItems] = useState<any[]>([undefined]);
    const [selectColumns, setSelectColumns] = useState<boolean>(false);
    const [editGroup, setEditGroup] = useState<OFluiColumnGroup | undefined>(undefined);

    const onItemClick = (item: any) => setDisplayItem(item);
    const onDismissDisplayForm = () => setDisplayItem(undefined);
    const onDismissNewForm = () => setNewItem(undefined);

    const getOptions = props.getFilterOptions ?
        (column: OFluiColumn) => props
            .getFilterOptions!(column) : undefined;

    const onFiltersChanged = (filters: { [id: string]: any[]; }) => {
        setCurrentView({
            ...currentView,
            query: {
                ...currentView.query,
                filters: filters
            }
        });
    }

    const listFilter = useListFilter(currentView.query.filters, getOptions, onFiltersChanged);

    const resetView = () => setItems([undefined]);

    const getPage = () => {
        resetView();

        return searchQuery ?
            props
                .onSearch!(searchQuery)
                .then(setItems)
            :
            props
                .getView(currentView)
                .then(setItems)
    }

    const loadPage = useAsync(getPage, [searchQuery, currentView]);

    const onViewChange = (view?: OFluiView) => {
        setSearchQuery(undefined);

        setCurrentView(view ? view : defaultView)
    };

    const onSearch = props
        .onSearch ? setSearchQuery : undefined;

    const onOrderChanged = (order: any) => {
        setCurrentView({
            ...currentView,
            query: {
                ...currentView.query,
                order: order
            }
        });
    }

    const onOffsetChanged = (offset: number) => {
        setCurrentView({
            ...currentView,
            dynamicDate: {
                ...currentView.dynamicDate!,
                offset: offset
            }
        });
    }

    const order = currentView.query.order;
    const filters = currentView.query.filters;

    const displayFormGroups = [{ name: "default", columns: props.columns }];

    const commandBarItems: ICommandBarItemProps[] = props.createItem ? [{
        key: "new",
        text: t('new'),
        iconProps: { iconName: "Add" },
        onClick: () => {
            props.newItem ?
                props.newItem()
                    .then(setNewItem)
                : setNewItem({})
        }

    }] : [];

    const createItem = (item: any) => props
        .createItem!(item)
        .then((a) => setItems([a, ...items]))
        .then(() => setNewItem(undefined));

    const onSelectColumns = () => setSelectColumns(true);
    const onDismissSelectColumns = () => setSelectColumns(false);

    const onDismissEditForm = () => setEditGroup(undefined);

    const onApplySelectColumns = (columns: OFluiColumn[]) => {
        setCurrentView({
            ...currentView,
            query: {
                ...currentView.query,
                fields: columns
            }
        });

        onDismissSelectColumns();
    }

    const onUpdate = props.updateItem ?
        (item: any) => props.updateItem!(item)
            .then(() => setEditGroup(undefined)) : undefined;

    const onEdit = onUpdate ? (group: OFluiColumnGroup) => setEditGroup(group) : undefined;

    return {
        ...listFilter,
        items,
        currentView,
        order,
        filters,
        loadPage,
        displayItem,
        displayFormGroups,
        newItem,
        commandBarItems,
        selectColumns,
        editGroup,
        onSearch,
        onItemClick,
        onEdit,
        onUpdate,
        onDismissEditForm,
        onDismissDisplayForm,
        onDismissSelectColumns,
        onApplySelectColumns,
        onSelectColumns,
        onOffsetChanged,
        createItem,
        onFiltersChanged,
        onDismissNewForm,
        onOrderChanged,
        onViewChange
    }
}