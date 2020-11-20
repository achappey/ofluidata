import React from "react";
import { Spinner, Stack } from "@fluentui/react";

import { useList } from "./use-List";

import { OFluiCommandBar } from "../CommandBar/CommandBar";
import { OFluiDetailsList } from "../DetailsList/DetailsList";
import { OFluiErrorMessageBar } from "../MessageBar/Error/ErrorMessageBar";
import { OFluiListConfig } from "../../types/config";
import { OFluiFilterPanel } from "../Panels/Filter/FilterPanel";
import { OFluiDisplayItemPanel } from "../Panels/DisplayItem/DisplayItemPanel";
import { OFluiSelectColumnsPanel } from "../Panels/SelectColumns/SelectColumnsPanel";
import { OFluiEditItemPanel } from "../Panels/EditItem/EditItemPanel";
import { OFluiFilterPane } from "../Panes/Filter/FilterPane";

export interface OFluiListProps extends OFluiListConfig {

}

export const OFluiList = (props: OFluiListProps) => {
    const {
        items,
        currentView,
        order,
        filters,
        filterToggle,
        filterPanelProperty,
        loadPage,
        showFilterPane,
        displayItem,
        selectColumns,
        displayFormGroups,
        //  newItem,
        editGroup,
        selectedFilters,
        commandBarItems,
        onSearch,
        getOptions,
        openFilterPanel,
        onDismissDisplayForm,
        //     createItem,
        //  onDismissNewForm,
        onFiltersChanged,
        onItemClick,
        dismissFilterPane,
        onOffsetChanged,
        onFilterCleared,
        onEdit,
        onDismissEditForm,
        onDismissSelectColumns,
        onUpdate,
        onSelectColumns,
        onApplySelectColumns,
        dismissFilterPanel,
        applyFilters,
        onViewChange,
        onOrderChanged
    } = useList(props);

    const onRenderMissingItem = () => {
        return <>
            {!loadPage.error
                && <Spinner />
            }
        </>
    }

    const contentStyle = { root: { width: showFilterPane ? "75%" : "100%" } };
    const rootStyle = { root: { paddingLeft: 24, paddingRight: 14 } };
    const paneStyle = { root: { width: "100%" } };
    // filterButton={filterToggle}
    return <>
        {loadPage.error &&
            <OFluiErrorMessageBar errorMessage={loadPage.error.message} />
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
                <OFluiDetailsList
                    items={items}
                    order={order}
                    filters={filters}
                    properties={currentView.query.fields}
                    onItemClick={onItemClick}
                    onSelectColumns={onSelectColumns}
                    onRenderMissingItem={onRenderMissingItem}
                    onFilterOpened={openFilterPanel}
                    onFilterCleared={onFilterCleared}
                    onOrderChanged={onOrderChanged}
                />
            </Stack.Item>

            {showFilterPane &&
                <Stack.Item styles={paneStyle}>
                    <OFluiFilterPane
                        isOpen={showFilterPane}
                        filters={filters}
                        items={items}
                        columns={currentView.query.fields}
                        onShowAll={openFilterPanel}
                        onDismiss={dismissFilterPane}
                        onFilterChange={onFiltersChanged}
                    />
                </Stack.Item>
            }
        </Stack>

        {filterPanelProperty && getOptions && applyFilters &&
            <OFluiFilterPanel isOpen={true}
                column={filterPanelProperty}
                selected={selectedFilters}
                getOptions={getOptions}
                onDismiss={dismissFilterPanel}
                onApply={applyFilters}
            />
        }

        {displayItem && !editGroup &&
            <OFluiDisplayItemPanel
                isOpen={true}
                headerText={props.itemName}
                item={displayItem}
                groups={displayFormGroups}
                getItem={props.getItem}
                onEdit={onEdit}
                onDismiss={onDismissDisplayForm} />
        }

        {selectColumns &&
            <OFluiSelectColumnsPanel
                isOpen={true}
                columns={props.columns}
                selected={currentView.query.fields}
                onApply={onApplySelectColumns}
                onDismiss={onDismissSelectColumns} />
        }

        {editGroup && onUpdate &&
            <OFluiEditItemPanel
                isOpen={true}
                headerText={props.itemName}
                item={displayItem}
                columns={editGroup.columns}
                getItem={props.getItem}
                onSave={onUpdate}
                onDismiss={onDismissEditForm} />
        }
    </>;
}