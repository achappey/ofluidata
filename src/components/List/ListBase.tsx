
import React from 'react';

import { ODataService } from '../../services/ODataService';
import { OFluiSpinner } from '../Spinner/Spinner';
import { OFluiCommandBar } from '../CommandBar/CommandBar';
import { OFluiDetailsList } from '../DetailsList/DetailsList';
import { ODataConfig } from '../../types/OData';
import { OFluiListWrapperProps } from './ListWrapper';
import useList from './use-List';
import { OFluiNewItemPanel } from '../Panels/NewItemPanel/NewItemPanel';
import { OFluiErrorMessageBar } from '../MessageBar/Error/ErrorMessageBar';
import { ProgressIndicator } from '@fluentui/react';

interface OFluiListBaseProps extends OFluiListWrapperProps {
    config: ODataConfig
}

export const OFluiListBase = (props: OFluiListBaseProps) => {
    const oDataService = new ODataService(props.http, props.url, props.config, props.entityType);

    const options = props.options != undefined ? props.options : {};

    const { items,
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
        onQueryChange,
        onViewChange,
        onSearch } = useList(oDataService, options);

    return (
        <>
            <OFluiErrorMessageBar
                errorMessage={errorMessage}
                onDismiss={onDismissError}
            />

            <OFluiCommandBar items={commandBarItems}
                image={options.image}
                views={listViews}
                onSearch={onSearch}
                onViewChange={onViewChange}
            />

            {progressIndicator != undefined
                ? <ProgressIndicator {...progressIndicator} />
                : items != undefined
                    ? <OFluiDetailsList
                        properties={viewProperties}
                        query={currentView.query}
                        items={items}
                        onSelectionChanged={onSelectionChanged}
                        onNextPage={getNextPage}
                        getFilterOptions={getFilterOptions}
                        onQueryChange={onQueryChange}
                    />
                    : <OFluiSpinner
                        text={t('viewLoading', { name: currentView.name })} />
            }

            <OFluiNewItemPanel
                entityTypeName={entityType.name!}
                isOpen={showNewForm}
                properties={entityType.properties}
                onOpened={onNewItemOpened}
                onDismiss={onDismissNewForm}
                onSave={onSaveNewItem}
            />
        </>
    );
};
