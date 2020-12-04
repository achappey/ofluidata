import * as React from "react";
import { Spinner, Stack } from "@fluentui/react";

import { useList } from "./use-List";

import { OFluiCommandBar } from "../CommandBar/CommandBar";
import { OFluiDetailsList } from "../DetailsList/DetailsList";
import { OFluiErrorMessageBar } from "../MessageBar/Error/ErrorMessageBar";
import { OFluiItemConfig, OFluiListConfig } from "../../types/config";
import { OFluiFilterPanel } from "../Panels/Filter/FilterPanel";
import { OFluiDisplayItemPanel } from "../Panels/DisplayItem/DisplayItemPanel";
import { OFluiSelectColumnsPanel } from "../Panels/SelectColumns/SelectColumnsPanel";
import { OFluiEditItemPanel } from "../Panels/EditItem/EditItemPanel";
import { OFluiFilterPane } from "../Panes/Filter/FilterPane";
import { OFluiPanelContainer } from "../Panels/Container/Container";
import { OFluiListPanel } from "../Panels/List/ListPanel";
import { OFluiProgressIndicator } from "../ProgressIndicator/ProgressIndicator";
import { OFluiActionPanel } from "../Panels/Action/ActionPanel";

export interface OFluiListProps extends OFluiListConfig, OFluiItemConfig {

}

export const OFluiList = (props: OFluiListProps) => {
    const {
        listItems,
        order,
        filters,
        filterToggle,
        filterPanelProperty,
        showFilterPane,
        displayItem,
        errorMessage,
        selectColumns,
        editGroupColumns,
        newItem,
        editGroup,
        childPanels,
        selectedFilters,
        commandBarItems,
        viewProperties,
        selection,
        nextPageLoading,
        lookupItem,
        lookupItemForm,
        lookupItemList,
        deleteItems,
        deleteItemsText,
        currentAction,
        actionItems,
        itemAction,
        deleteAction,
        deleteCompleted,
        onSearch,
        getOptions,
        openFilterPanel,
        onDismissDisplayForm,
        createItem,
        onDismissNewForm,
        onFiltersChanged,
        onItemClick,
        dismissFilterPane,
        onOffsetChanged,
        onFilterCleared,
        actionsCompleted,
        onDeleteItem,
        onEdit,
        onDismissLookupForm,
        onLookupItemClick,
        onDismissEditForm,
        onDismissSelectColumns,
        onUpdate,
        onDismissAction,
        onSelectColumns,
        onApplySelectColumns,
        dismissFilterPanel,
        getNextPage,
        applyFilters,
        onViewChange,
        onOrderChanged
    } = useList(props);

    const onRenderMissingItem = () => {
        if (getNextPage !== undefined && !nextPageLoading)
            getNextPage();

        return <Spinner />;
    }

    const contentStyle = { root: { width: showFilterPane ? "75%" : "100%" } };
    const rootStyle = { root: { paddingLeft: 24, paddingRight: 14 } };
    const paneStyle = { root: { width: "100%" } };

    return <>
        {errorMessage &&
            <OFluiErrorMessageBar errorMessage={errorMessage} />
        }

        <OFluiCommandBar {...props}
            items={commandBarItems}
            filterButton={filterToggle}
            views={props.views}
            image={props.image}
            onSearch={onSearch}
            onOffsetChange={onOffsetChanged}
            onViewChange={onViewChange}
        />

        <Stack horizontal styles={rootStyle}>
            <Stack.Item styles={contentStyle}>
                {deleteItems && deleteAction &&
                    <OFluiProgressIndicator
                        label={deleteItemsText}
                        items={deleteItems}
                        onCompleted={deleteCompleted}
                        itemAction={deleteAction} />
                }

                {actionItems && itemAction &&
                    <OFluiProgressIndicator
                        label={currentAction?.name}
                        items={actionItems}
                        onCompleted={actionsCompleted}
                        itemAction={itemAction} />
                }

                {!itemAction && !deleteItems && listItems &&
                    <OFluiDetailsList
                        items={listItems}
                        order={order}
                        filters={filters}
                        selection={selection}
                        properties={viewProperties}
                        setKey={props.setKey}
                        compact={props.compact}
                        onItemClick={onItemClick}
                        onLookupItemClick={onLookupItemClick}
                        onSelectColumns={onSelectColumns}
                        onRenderMissingItem={onRenderMissingItem}
                        onFilterOpened={openFilterPanel}
                        onFilterCleared={onFilterCleared}
                        onOrderChanged={onOrderChanged}
                    />
                }
            </Stack.Item>

            {showFilterPane &&
                <Stack.Item styles={paneStyle}>
                    <OFluiFilterPane
                        isOpen={showFilterPane}
                        filters={filters}
                        items={listItems}
                        columns={viewProperties}
                        onShowAll={openFilterPanel}
                        onDismiss={dismissFilterPane}
                        onFilterChange={onFiltersChanged}
                    />
                </Stack.Item>
            }
        </Stack>

        <OFluiPanelContainer panels={childPanels} />
        {
            currentAction && currentAction.parameters &&
            <OFluiActionPanel
                headerText={currentAction.name}
                isOpen={true}
                action={currentAction}
                sourceItem={actionItems![0]}
                onDismiss={onDismissAction}
                onLookupSearch={props.onLookupSearch}
            />
        }
        {
            lookupItem && lookupItemForm &&
            <OFluiDisplayItemPanel {...lookupItemForm}
                isOpen={true}
                item={lookupItem}
                onDismiss={onDismissLookupForm}
            />
        }
        {
            lookupItem && lookupItemList &&
            <OFluiListPanel {...lookupItemList}
                isOpen={true}
                onDismiss={onDismissLookupForm}
            />
        }
        {
            displayItem && !editGroup &&
            <OFluiDisplayItemPanel
                isOpen={true}
                item={displayItem}
                columns={props.columns}
                headerText={props.itemName}
                groups={props.groups}
                actions={props.actions}
                readItem={props.readItem}
                onEdit={onEdit}
                deleteItem={onDeleteItem}
                onDismiss={onDismissDisplayForm} />
        }

        {
            editGroup && onUpdate &&
            <OFluiEditItemPanel
                isOpen={true}
                headerText={props.itemName}
                item={displayItem}
                columns={editGroupColumns}
                readItem={props.readItem}
                onSave={onUpdate}
                onLookupSearch={props.onLookupSearch}
                onDismiss={onDismissEditForm} />
        }
        {
            filterPanelProperty && getOptions && applyFilters &&
            <OFluiFilterPanel isOpen={true}
                column={filterPanelProperty}
                selected={selectedFilters}
                getOptions={getOptions}
                onDismiss={dismissFilterPanel}
                onApply={applyFilters}
            />
        }


        {
            selectColumns &&
            <OFluiSelectColumnsPanel
                isOpen={true}
                columns={props.columns}
                selected={viewProperties}
                onApply={onApplySelectColumns}
                onDismiss={onDismissSelectColumns} />
        }


        {
            newItem &&
            <OFluiEditItemPanel
                isOpen={true}
                headerText={props.itemName}
                item={newItem}
                columns={props.columns}
                readItem={props.newItem}
                onSave={createItem}
                onLookupSearch={props.onLookupSearch}
                onDismiss={onDismissNewForm} />
        }
    </>;
}