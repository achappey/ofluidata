import { useEffect, useState } from 'react'

import { ICommandBarItemProps, Selection } from '@fluentui/react'

import { useLanguage } from 'ofluidata-translations'

import { OFluiListProps } from './List'
import { useListFilter } from './use-ListFilter'
import {
    OFluiAction,
    OFluiChildPanel, OFluiColumn, OFluiColumnGroup,
    OFluiPanelType, OFluiView, OFluiViewResult
} from '../../types/oflui'
import { actionToCommandBar } from '../../utilities/oflui'

export const useList = (props: OFluiListProps) => {
    const defaultView = props.views[0]

    const { t } = useLanguage(props.lang)

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const [panels, setPanels] = useState<OFluiChildPanel[]>([])

    const [currentView, setCurrentView] = useState<OFluiView>(defaultView)
    const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
    const [newItem, setNewItem] = useState<any | undefined>(undefined)
    const [lookupItem, setLookupItem] = useState<any | undefined>(undefined)
    const [lookupItemForm, setLookupItemForm] = useState<any | undefined>(undefined)
    const [lookupItemList, setLookupItemList] = useState<any | undefined>(undefined)

    const [displayItem, setDisplayItem] = useState<any | undefined>(undefined)
    const [items, setItems] = useState<any[] | undefined>(undefined)
    const [selectedItems, setSelectedItems] = useState<any[]>([])
    const [deleteItems, setDeleteItems] = useState<any[] | undefined>(undefined)

    const [actionItems, setActionItems] = useState<any[] | undefined>(undefined)
    const [currentAction, setCurrentAction] = useState<OFluiAction | undefined>(undefined)

    const [nextPage, setNextPage] = useState<any>(undefined)
    const [nextPageLoading, setNextPageLoading] = useState<boolean>(false)
    const [selectColumns, setSelectColumns] = useState<boolean>(false)
    const [editGroup, setEditGroup] = useState<OFluiColumnGroup | undefined>(undefined)

    const onItemClick = (item: any) => setDisplayItem(item)

    // eslint-disable-next-line prefer-const
    let selection: Selection | undefined

    const selectionChanged = () => setSelectedItems(selection!.getSelection())

    selection = new Selection({
        onSelectionChanged: selectionChanged
    })

    const childPanels = panels.map((t, c) => {
        return {
            ...t,
            onDismiss: c === panels.length - 1
                ? setPanels(panels.slice(0, panels.length - 1))
                : undefined
        }
    })

    const onDismissDisplayForm = () => setDisplayItem(undefined)
    const onDismissNewForm = () => setNewItem(undefined)

    const getOptions = props.getFilterOptions
        ? (column: OFluiColumn) => {
            return props
                .getFilterOptions!(currentView, column)
        }
        : undefined

    const onFiltersChanged = (filters: { [id: string]: any[]; }) => {
        setCurrentView({
            ...currentView,
            query: {
                ...currentView.query,
                filters: filters
            }
        })
    }

    const listFilter = useListFilter(currentView.query.filters, getOptions, onFiltersChanged)

    const resetView = () => {
        setNextPage(undefined)
        setItems(undefined)
    }

    const setPage = (viewResult: OFluiViewResult) => {
        setItems([...viewResult.items])
        setNextPage(viewResult.nextPage)
    }

    const addPage = (viewResult: OFluiViewResult) => {
        if (items !== undefined) {
            setItems([...items, ...viewResult.items])
            setNextPage(viewResult.nextPage)

            setNextPageLoading(false)
        }
    }

    const getView = (currentView: OFluiView, searchQuery?: string) => {
        resetView()

        return searchQuery
            ? props
                .onSearch!(searchQuery)
            : props
                .getView(currentView)
    }

    const getNextPage = nextPage
        ? () => {
            setNextPageLoading(true)

            return props
                .getNextPage!(currentView, nextPage)
                .then(result => addPage(result))
                .catch(error => setErrorMessage(error.toString()))
        }
        : undefined

    useEffect(() => {
        let isSubscribed = true

        getView(currentView, searchQuery)
            .then(result => (isSubscribed ? setPage(result) : null))
            .catch(error => (isSubscribed ? setErrorMessage(error.toString()) : null))

        return () => { isSubscribed = false }
    }, [currentView, searchQuery])

    const onViewChange = (view?: OFluiView) => {
        setSearchQuery(undefined)

        setCurrentView(view || defaultView)
    }

    const onSearch = props.onSearch
        ? setSearchQuery
        : undefined

    const onOrderChanged = (order: any) => {
        setCurrentView({
            ...currentView,
            query: {
                ...currentView.query,
                order: order
            }
        })
    }

    const onOffsetChanged = (offset: number) => {
        setCurrentView({
            ...currentView,
            dynamicDate: {
                ...currentView.dynamicDate!,
                offset: offset
            }
        })
    }

    const order = currentView.query.order
    const filters = currentView.query.filters

    const commandBarItems: ICommandBarItemProps[] = props.createItem
        ? [{
            key: 'new',
            text: t('new'),
            disabled: deleteItems !== undefined,
            iconProps: { iconName: 'Add' },
            onClick: () => {
                props.newItem
                    ? props.newItem()
                        .then(setNewItem)
                    : setNewItem({})
            }
        }]
        : []

    if (props.deleteItem) {
        commandBarItems.push({
            key: 'delete',
            iconOnly: true,
            disabled: deleteItems !== undefined || selectedItems.length === 0,
            iconProps: { iconName: 'Delete' },
            onClick: () => setDeleteItems(selectedItems)
        })
    }

    if (props.actions && props.onAction) {
        commandBarItems.push(...props.actions.map(actionToCommandBar)
            .map(b => {
                return {
                    ...b,
                    disabled: deleteItems !== undefined || selectedItems.length === 0,
                    onClick: () => {
                        setCurrentAction(props.actions!.find(a => a.name === b.text))
                        setActionItems(selectedItems)
                    }
                }
            }))
    }

    const createItem = (item: any) => props
        .createItem!(item)
        .then((a) => setItems([a, ...items!]))
        .then(() => setNewItem(undefined))

    const onSelectColumns = () => setSelectColumns(true)
    const onDismissSelectColumns = () => setSelectColumns(false)

    const onDismissEditForm = () => setEditGroup(undefined)

    const onApplySelectColumns = (columns: OFluiColumn[]) => {
        setCurrentView({
            ...currentView,
            query: {
                ...currentView.query,
                fields: columns.map(g => g.name)
            }
        })

        onDismissSelectColumns()
    }

    const onUpdate = props.updateItem
        ? (item: any) => props.updateItem!(item)
            .then(() => setEditGroup(undefined))
        : undefined

    const onEdit = onUpdate ? (group: OFluiColumnGroup) => setEditGroup(group) : undefined

    const viewProperties = currentView.query.fields
        .map(h => props.columns.find(g => g.name === h)!)

    const listItems = items ? nextPage ? [...items, undefined] : [...items] : [undefined]

    const editGroupColumns = editGroup
        ? editGroup.columns
            .map(r => props.columns.find(f => f.name === r)!)
        : []

    const editItem = panels.find(r => r.type === OFluiPanelType.display)?.props.item

    const onLookupItemClick = (val: any, column: OFluiColumn) => {
        setLookupItem(val)

        column.getList !== undefined
            ? setLookupItemList(column.getList(val))
            : setLookupItemForm(column.getForm!(val))
    }

    const onDismissLookupForm = () => setLookupItem(undefined)
    const deleteAction = props.deleteItem
        ? (item: any) => props.deleteItem!(item)
            .catch((a) => setErrorMessage(a.toString()))
        : undefined

    const itemAction = props.onAction && currentAction && !currentAction.parameters
        ? (item: any) => props.onAction!(currentAction!, item)
            .catch((a) => setErrorMessage(a.toString()))
        : undefined

    const actionsCompleted = () => {
        setSelectedItems([])
        setCurrentAction(undefined)
        setActionItems(undefined)
    }

    const deleteCompleted = () => {
        setItems([...items!.filter(a => deleteItems!.find(z => a[props.setKey] === z[props.setKey]) === undefined)])
        setSelectedItems([])
        setDeleteItems(undefined)
    }

    const onDeleteItem = props.deleteItem
        ? (item: any) => props.deleteItem!(item)
            .then(() => {
                setItems([...items!.filter(a => a[props.setKey] !== item[props.setKey])])

                setDisplayItem(undefined)
            })
        : undefined

    const deleteItemsText = t('deletingItems')

    const onDismissAction = () => setCurrentAction(undefined)

    return {
        ...listFilter,
        listItems,
        order,
        filters,
        displayItem,
        errorMessage,
        editGroupColumns,
        newItem,
        childPanels,
        commandBarItems,
        selectColumns,
        editGroup,
        lookupItem,
        lookupItemForm,
        selection,
        lookupItemList,
        editItem,
        deleteItems,
        viewProperties,
        nextPageLoading,
        deleteItemsText,
        actionItems,
        currentAction,
        onSearch,
        onItemClick,
        itemAction,
        onDismissAction,
        onDismissLookupForm,
        actionsCompleted,
        onEdit,
        deleteAction,
        onDeleteItem,
        deleteCompleted,
        onUpdate,
        onLookupItemClick,
        getNextPage,
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
        onViewChange,
        t
    }
}
