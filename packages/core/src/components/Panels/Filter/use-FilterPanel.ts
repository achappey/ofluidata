import { useEffect, useState } from 'react'
import { ITag } from '@fluentui/react'

import { OFluiFilterPanelProps } from './FilterPanel'
import { useLanguage } from 'ofluidata-translations'

const uniqueValues = (value: any, index: number, self: any[]) => {
    return self.indexOf(value) === index
}

export const useFilterPanel = (props: OFluiFilterPanelProps) => {
    const { t } = useLanguage(props.lang)

    const [selected, setSelected] = useState<any[]>(props.selected)
    const [options, setOptions] = useState<any[] | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    useEffect(() => {
        props.getOptions()
            .then(t => setOptions(t.filter(uniqueValues)))
            .catch(error => setErrorMessage(error.toString()))
    }, [props.column])

    const addSelected = (t: any) => setSelected([...selected, t])
    const removeSelected = (t: any) => setSelected(selected.filter(e => e !== t))

    const clearFilters = () => setSelected([])
    const applyFilters = () => props
        .onApply(selected)

    const onFilterSelected = (items?: ITag[] | undefined) => {
        if (items !== undefined) {
            items.forEach(t => {
                selected.indexOf(t.key) > -1
                    ? removeSelected(t.key)
                    : addSelected(t.key)
            })
        }
    }

    const onGetSuggestions = (filter: string): ITag[] => {
        const compareOptions = options
            ? options
                .map(h => h
                    .toString()
                    .toLowerCase())
            : undefined

        const items = compareOptions !== undefined
            ? filter !== undefined
                ? filter.length === 1
                    ? compareOptions
                        .filter(r => r
                            .substring(0, 1) === filter.toLowerCase())
                    : compareOptions
                        .filter(r => r
                            .indexOf(filter.toLowerCase()) > -1)
                : []
            : []

        return items
            .map(y => {
                return {
                    name: y,
                    key: y
                }
            })
    }

    const title = `${t('filterBy')} ${props.column.name}`

    return {
        title,
        options,
        errorMessage,
        selected,
        onGetSuggestions,
        onFilterSelected,
        addSelected,
        removeSelected,
        clearFilters,
        applyFilters
    }
}
