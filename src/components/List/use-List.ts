import { useEffect, useState } from 'react';
import { flatten, Selection, ICommandBarItemProps } from '@fluentui/react';

import { useLanguage } from '../../hooks/use-language';
import { useProgress } from '../../hooks/use-progress';
import { Property, Query } from '../../types/OData';
import {
    OFluiListOptions, OFluiPanelType, OFluiView
} from '../../types/OFlui';
import { OFluiNewItemPanelProps } from '../Panels/NewItemPanel/NewItemPanel';
import { OFluiEditItemPanelProps } from '../Panels/EditItemPanel/EditItemPanel';
import { OFluiDisplayItemPanelProps } from '../Panels/DisplayItemPanel/DisplayItemPanel';
import { ListDataService } from '../../services/ListDataService';
import { toFieldGroups } from '../../services/OFluiMapper';

export default (service: ListDataService,
    options: OFluiListOptions) => {

    const { t } = useLanguage(options.language);

    const entityType = service.getEntity();

    const { progressIndicator, processItems } = useProgress();

    const listViews = options.views != undefined && options.views.length > 0 ? options.views : service.getDefaultViews();

    const [errorMessage, setErrorMessage] = useState<string | string[] | undefined>(undefined);
    const [nextPageLink, setNextPageLink] = useState<string | undefined>(undefined);
    const [items, setItems] = useState<any[] | undefined>(undefined);
    const [currentView, setCurrentView] = useState<OFluiView>(listViews[0]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [currentPanel, setCurrentPanel] = useState<OFluiNewItemPanelProps
        | OFluiEditItemPanelProps
        | OFluiDisplayItemPanelProps | undefined>(undefined);

    useEffect(() => {
        getData(currentView.entitySet, currentView.query);
    }, []);


    const selectionChanged = () => setSelectedItems(selection.getSelection());

    const selection: Selection = new Selection({
        onSelectionChanged: selectionChanged
    });

    const onSearch = (query: string) => {
        if (query != null && query.length > 0) {
            service
                .searchListItems(
                    query.toLowerCase()
                )
                .then(data => setItems(data))
                .catch(e => setErrorMessage(e.message));
        }
    }

    const getData = (entitySet: string, query: Query) => {
        setItems(undefined);
        setNextPageLink(undefined);

        return service.getItems(entitySet, query)
            .then(data => {
                setItems(data.value);
                setNextPageLink(data.nextLink);
            })
            .catch(e => setErrorMessage(e.toString()));
    };

    const deleteItem = (item: any) => service.deleteListItem(item);

    const keyProperty = entityType.keyPropertyName;

    const deleteSelectedItems = () => {
        processItems(
            t('deletingItems'),
            selectedItems,
            deleteItem)
            .then(errorMap => {

                const deleteFailed = errorMap != undefined ? flatten(Object
                    .keys(errorMap)
                    .map(a => errorMap[a])) : [];

                if (errorMap != undefined)
                    setErrorMessage(Object
                        .keys(errorMap)
                        .map(a => `${a} (${errorMap[a].length} items)`));

                setItems(items!
                    .filter(r =>
                        // Not delete failed
                        deleteFailed
                            .find(d => d[keyProperty] == r[keyProperty]) != undefined
                        ||
                        // Not selected
                        selectedItems
                            .find(d => d[keyProperty] == r[keyProperty]) == undefined))
            });
    }

    const commandBarItems: ICommandBarItemProps[] =
        [
            {
                key: "newItem",
                text: t("new"),
                iconProps: { iconName: "Add" },
                onClick: () => setCurrentPanel({
                    panelType: OFluiPanelType.newItem,
                    isOpen: true,
                    onPanelOpened: onNewItemOpened,
                    onDismiss: () => setCurrentPanel(undefined),
                    properties: entityType.properties,
                    entityTypeName: entityType.name!,
                    onSave: onSaveNewItem
                })
            },
            {
                key: "deleteItem",
                text: t("delete"),
                disabled: selectedItems.length == 0,
                iconProps: { iconName: "Delete" },
                onClick: () => deleteSelectedItems()
            }
        ];

    const onViewChange = (view: OFluiView | undefined) => {
        const newView = view != undefined ? view : listViews[0];

        setCurrentView(newView);

        getData(newView.entitySet, newView.query);
    };

    const onQueryChange = (newQuery: Query) => {
        setCurrentView({
            ...currentView,
            query: newQuery
        })

        getData(currentView.entitySet, newQuery);
    };

    const getFilterOptions = (property: Property) => service
        .getFilterOptions(currentView.entitySet,
            {
                ...currentView.query,
                filters: currentView.query.filters != undefined ?
                    currentView.query.filters.filter(r => r.property.name != property.name)
                    : undefined,
            },
            property
        );

    const viewProperties = currentView.query.fields
        .map(n => entityType.properties.find(z => z.name == n)!);

    const getNextPage = nextPageLink != undefined
        ? () => {
            setNextPageLink(undefined);

            service.getNextPage(nextPageLink)
                .then(data => {
                    setItems(
                        [
                            ...items!,
                            ...data.value
                        ]
                    );

                    setNextPageLink(data.nextLink);
                })
                .catch(e => setErrorMessage(e.toString()));
        }
        : undefined;

    const onSaveNewItem = (item: any) => service
        .createListItem(item)
        .then(h => {
            setItems([h, ...items!]);

            setCurrentPanel(undefined);
        });

    const onNewItemOpened = async (): Promise<any> => {
        return options.onNewItem != undefined
            ? options.onNewItem() : {};
    }

    const onDismissError = () => setErrorMessage(undefined);

    const showItemDisplayForm = (item: any) => setCurrentPanel({
        panelType: OFluiPanelType.displayItem,
        isOpen: true,
        groups: toFieldGroups(entityType, options.formOptions),
        image: options.image,
        headerProperties: entityType.properties.length > 2 ? {
            titleProperty: entityType.properties[0].name,
            descriptionProperty: entityType.properties[1].name,
            secondaryDescriptionProperty: entityType.properties[2].name
        } : undefined,
        onRender: options.formOptions
            && options.formOptions[entityType.typeName!] ?
            options.formOptions[entityType.typeName!].onRenderDisplayForm : undefined,
        item: item,
        onPanelOpened: async () => item,
        onDismiss: () => setCurrentPanel(undefined),
        onDelete: (item: any) => deleteItem(item)
            .then(() => {
                const newItems = items!
                    .filter(r => r[keyProperty] != item[keyProperty]);

                setItems(newItems);

                selection.setAllSelected(false);

                setCurrentPanel(undefined);
            }),
        onSave: async (item: any) => console.log(item)
    });

    const allProperties = entityType.properties;

    return {
        items,
        listViews,
        errorMessage,
        currentView,
        viewProperties,
        commandBarItems,
        progressIndicator,
        currentPanel,
        keyProperty,
        selection,
        options,
        allProperties,
        showItemDisplayForm,
        onDismissError,
        getFilterOptions,
        getNextPage,
        onViewChange,
        onQueryChange,
        getData,
        onSearch, t
    };
}