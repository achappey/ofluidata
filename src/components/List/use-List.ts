import { useEffect, useState } from 'react';
import { flatten, ICommandBarItemProps } from '@fluentui/react';

import { useLanguage } from '../../hooks/use-language';
import { useProgress } from '../../hooks/use-progress';
import { extractNextLink, getDefaultViews, groupyBy } from '../../services/ODataMapper';
import { ODataService } from '../../services/ODataService';
import { Order, Property, Query } from '../../types/OData';
import { View } from '../../types/OFlui';
import { OFluiListOptions } from './List';

export default (service: ODataService,
    options: OFluiListOptions) => {

    const { t } = useLanguage(options.language);

    const entityType = service.getEntity();

    const { progressIndicator, processItems } = useProgress();

    const listViews = options.views != undefined && options.views.length > 0 ? options.views : getDefaultViews(entityType);

    const [errorMessage, setErrorMessage] = useState<string | string[] | undefined>(undefined);
    const [nextPageLink, setNextPageLink] = useState<string | undefined>(undefined);
    const [items, setItems] = useState<any[] | undefined>(undefined);
    const [currentView, setCurrentView] = useState<View>(listViews[0]);
    const [showNewForm, setShowNewForm] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => {
        getData(currentView.entitySet, currentView.query);
    }, []);

    const onSelectionChanged = (items: any[]) => setSelectedItems(items);

    const onSearch = (query: string) => {
        if (query != null && query.length > 0) {
            service
                .searchItems(
                    entityType.entitySets![0]!.name!,
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
                setNextPageLink(
                    extractNextLink(service.baseUrl, data));
            })
            .catch(e => setErrorMessage(e.toString()));
    };

    const deleteItem = (item: any) => service.deleteItem
        (
            currentView.entitySet,
            item,
            entityType.properties
                .find(e => e.name == entityType.key)!
        );

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
                            .find(d => d[entityType.key!] == r[entityType.key!]) != undefined
                        ||
                        // Not selected
                        selectedItems
                            .find(d => d[entityType.key!] == r[entityType.key!]) == undefined))
            });
    }

    const commandBarItems: ICommandBarItemProps[] =
        [
            {
                key: "newItem",
                text: t("new"),
                iconProps: { iconName: "Add" },
                onClick: () => setShowNewForm(true)
            },
            {
                key: "deleteItem",
                text: t("delete"),
                disabled: selectedItems.length == 0,
                iconProps: { iconName: "Delete" },
                onClick: () => deleteSelectedItems()
            }
        ];

    const onViewChange = (view: View | undefined) => {
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

    const getFilterOptions = async (property: Property) => {
        const data: any = await service.getItems(currentView.entitySet,
            {
                ...currentView.query,
                fields: [property.name],
                filters: currentView.query.filters != undefined ?
                    currentView.query.filters.filter(r => r.property.name != property.name)
                    : undefined,
                order: {
                    [property.name]: Order.Ascending
                }
            });

        const result: any[] = data.value;

        let nextLink = extractNextLink(service.baseUrl, data);

        while (nextLink != undefined) {
            const nextPage = await service.getNextPage(nextLink);

            result.push(...nextPage.value);

            nextLink = extractNextLink(service.baseUrl, nextPage)
        }

        return Object.keys(groupyBy(result, property.name));
    }

    const viewProperties = entityType.properties
        .filter(i => currentView.query.fields.indexOf(i.name) > -1);

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
                    setNextPageLink(
                        extractNextLink(service.baseUrl,
                            data
                        )
                    );
                })
                .catch(e => setErrorMessage(e.toString()));

        }
        : undefined;

    const onDismissNewForm = () => setShowNewForm(false);

    const onSaveNewItem = (item: any) => service
        .createItem(currentView.entitySet, item)
        .then(h => {
            setItems([h, ...items!]);

            setShowNewForm(false);
        });

    const onNewItemOpened = async (): Promise<any> => {
        return options.onNewItem != undefined
            ? options.onNewItem() : {};
    }

    const onDismissError = () => setErrorMessage(undefined);

    return {
        items,
        listViews,
        errorMessage,
        currentView,
        viewProperties,
        commandBarItems,
        showNewForm,
        entityType,
        progressIndicator,
        t,
        onDismissError,
        onSelectionChanged,
        onNewItemOpened,
        onSaveNewItem,
        onDismissNewForm,
        getFilterOptions,
        getNextPage,
        onViewChange,
        onQueryChange,
        getData,
        onSearch
    };
}