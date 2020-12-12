import * as React from 'react'

import {
    DefaultButton,
    IPanelProps,
    Panel,
    PrimaryButton,
    Spinner,
    TagPicker
} from '@fluentui/react'

import { OFluiColumn } from '../../../types/oflui'

import { OFluiErrorMessageBar } from '../../MessageBar/Error/ErrorMessageBar'
import { OFluiCheckbox } from '../../Controls/Checkbox/Checkbox'

import { useFilterPanel } from './use-FilterPanel'
import { useLanguage } from 'ofluidata-translations'
import { toDisplayValue } from '../../../utilities/oflui'

export interface OFluiFilterPanelProps extends IPanelProps {
    column: OFluiColumn,
    selected: any[],
    getOptions: () => Promise<any[]>,
    onApply: (filters: any[]) => void
}

export const OFluiFilterPanel = (props: OFluiFilterPanelProps) => {
    const {
        title,
        options,
        selected,
        errorMessage,
        onFilterSelected,
        onGetSuggestions,
        addSelected,
        removeSelected,
        applyFilters,
        clearFilters
    } = useFilterPanel(props)

    const { t } = useLanguage(props.lang)

    const optionsContent = options !== undefined
        ? options.map((z: any) => {
            const checked = selected.find(r => r === z) !== undefined

            const onChange = (_e: any, isChecked: boolean) => isChecked
                ? addSelected(z)
                : removeSelected(z)

            const displayValue = toDisplayValue(props.column, z)

            return <OFluiCheckbox key={z}
                label={displayValue}
                checked={checked}
                onChange={onChange} />
        })
        : <></>

    const renderFooter = () => {
        return options !== undefined
            ? <>
                <PrimaryButton
                    onClick={applyFilters}
                    style={{ marginRight: 8 }}
                    text={t('apply')}
                />

                <DefaultButton
                    onClick={clearFilters}
                    text={t('clearFilters')}
                />
            </>
            : <></>
    }

    return <>
        <Panel {...props}
            isFooterAtBottom={true}
            headerText={title}
            onRenderFooterContent={renderFooter}>

            {errorMessage !== undefined && <OFluiErrorMessageBar errorMessage={errorMessage} />}

            {options === undefined && <Spinner />}

            {options !== undefined &&
                <>
                    <TagPicker
                        selectedItems={[]}
                        resolveDelay={500}
                        inputProps={{ autoFocus: true }}
                        onResolveSuggestions={onGetSuggestions}
                        onChange={onFilterSelected}
                    />

                    {optionsContent}
                </>
            }
        </Panel>
    </>
}
