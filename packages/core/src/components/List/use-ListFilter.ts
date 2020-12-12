import { DefaultPalette } from '@fluentui/react'
import { useState } from 'react'
import { OFluiButton, OFluiColumn } from '../../types/oflui'

const filterPaneButton: OFluiButton = {
    key: 'filterpane',
    icon: 'Filter'
}

export const useListFilter = (currentFilters?: { [id: string]: any[]; },
    getFilterOptions?: (column: OFluiColumn) => Promise<any[]>,
    onFiltersChanged?: (filters?: { [id: string]: any[]; }) => void) => {
    const [showFilterPane, setShowFilterPane] = useState<boolean>(false)
    const [filterPanelProperty, setFilterPanelProperty] = useState<OFluiColumn | undefined>(undefined)

    const dismissFilterPane = () => setShowFilterPane(false)
    const dismissFilterPanel = () => setFilterPanelProperty(undefined)
    const openFilterPanel = getFilterOptions ? (column: OFluiColumn) => setFilterPanelProperty(column) : undefined

    const selectedFilters = filterPanelProperty && currentFilters && currentFilters[filterPanelProperty.name]
        ? currentFilters[filterPanelProperty.name]
        : []

    const filterToggle = getFilterOptions
        ? {
            ...filterPaneButton,
            buttonStyles: showFilterPane
                ? { root: { backgroundColor: DefaultPalette.neutralLighter } }
                : undefined,
            onClick: () => setShowFilterPane(!showFilterPane)
        }
        : undefined

    const applyFilters = onFiltersChanged
        ? (filters: any[]) => {
            const currentFilter = currentFilters
                ? { ...currentFilters }
                : {}

            if (filters.length > 0) {
                onFiltersChanged({
                    ...currentFilter,
                    [filterPanelProperty!.name]: filters
                })
            } else {
                delete currentFilter[filterPanelProperty!.name]

                onFiltersChanged({
                    ...currentFilter
                })
            }

            dismissFilterPanel()
        }
        : undefined

    const onFilterCleared = getFilterOptions && onFiltersChanged
        ? (column: OFluiColumn) => {
            const filter = {
                ...currentFilters
            }

            delete filter[column.name]

            onFiltersChanged({
                ...filter
            })
        }
        : undefined

    const getOptions = filterPanelProperty && getFilterOptions
        ? () => getFilterOptions!(filterPanelProperty)
        : undefined

    return {
        showFilterPane,
        filterPanelProperty,
        filterToggle,
        selectedFilters,
        applyFilters,
        getOptions,
        onFilterCleared,
        dismissFilterPane,
        dismissFilterPanel,
        openFilterPanel
    }
}
