
import React from 'react';
import { ProgressIndicator, Sticky, StickyPositionType } from '@fluentui/react';

import { OFluiSpinner } from '../Spinner/Spinner';
import { OFluiCommandBar } from '../CommandBar/CommandBar';
import { OFluiDetailsList } from '../DetailsList/DetailsList';
import { ODataConfig } from '../../types/OData';
import { OFluiListWrapperProps } from './ListWrapper';
import useList from './use-List';
import { OFluiErrorMessageBar } from '../MessageBar/Error/ErrorMessageBar';
import { OFluiPanel } from '../Panels/Panel';
import { ListDataService } from '../../services/ListDataService';
import { listOptions } from '../../services/OFluiMapper';

interface OFluiListBaseProps extends OFluiListWrapperProps {
    config: ODataConfig
}

export const OFluiListBase = (props: OFluiListBaseProps) => {
    const dataService = new ListDataService(props.http, props.url, props.config, props.entityType);

    const { items,
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
        showItemDisplayForm,
        onDismissError,
        getFilterOptions,
        getNextPage,
        onQueryChange,
        onViewChange,
        onSearch, t } = useList(dataService, listOptions(props.options));

    const headerContent = <>
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
    </>;

    const mainContent = progressIndicator != undefined
        ? <ProgressIndicator {...progressIndicator} />
        : items != undefined
            ? <OFluiDetailsList
                properties={viewProperties}
                query={currentView.query}
                items={items}
                selection={selection}
                entityKey={keyProperty}
                stickyHeader={options.stickyHeader}
                onItemClick={showItemDisplayForm}
                onNextPage={getNextPage}
                getFilterOptions={getFilterOptions}
                onQueryChange={onQueryChange}
            />
            : <OFluiSpinner
                text={t('viewLoading', { name: currentView.name })} />;

    return (
        <>
            {
                options.stickyHeader ?
                    <Sticky stickyPosition={StickyPositionType.Header}>
                        {headerContent}
                    </Sticky>
                    :
                    <>
                        {headerContent}
                    </>
            }

            {mainContent}

            {currentPanel &&
                <OFluiPanel panel={currentPanel} />}
        </>
    );
};
