import * as React from "react";

import { ContextualMenu, DefaultPalette, IPanelProps, Label, Link, Stack } from "@fluentui/react";

import { OFluiCheckbox } from "../../Controls/Checkbox/Checkbox";
import { OFluiIconButton } from "../../Controls/Buttons/IconButton/IconButton";
import { OFluiColumn } from "../../../types/oflui";
import { useLanguage } from "ofluidata-translations";
import { toDisplayValue } from "../../../utilities/oflui";

export interface OFluiFilterPaneProps extends IPanelProps {
    columns: OFluiColumn[],
    filters?: { [id: string]: any[]; },
    onFilterChange: (filters?: { [id: string]: any[]; }) => void
    items?: any[],
    onShowAll?: (column: OFluiColumn) => void
}

interface FilterValues {
    column: OFluiColumn,
    values: FilterValue[]
}

export const OFluiFilterPane = (props: OFluiFilterPaneProps) => {
    const { t } = useLanguage(props.lang);

    const [filterValues, setFilterValues] = React.useState<FilterValues[]>([]);

    React.useEffect(() => {
        setFilterValues(toDefaultFilters(props.columns, props.filters, props.items))
    }, [props.isOpen]);

    React.useEffect(() => {

    }, [props.filters]);

    const hasFilters = props.filters != undefined && Object.keys(props.filters).length > 0;

    const headerStyle = { root: { marginBottom: 18 } };
    const headerTitleStyle = { margin: 0 };

    const rootStyles = {
        root: {
            paddingTop: 23,
            paddingBottom: 20,
            paddingLeft: 16,
            width: "100%",
            borderLeftStyle: "solid",
            borderLeftColor: DefaultPalette.neutralLighter
        }
    };


    const onClear = (column: OFluiColumn) => {
        const newValue = props.filters ? { ...props.filters } : {};
        delete newValue[column.name];

        props.onFilterChange(newValue);
    }

    const filterContent = filterValues.map(v => {


        const onRemove = () => onClear(v.column);
        const onShowAll = props.onShowAll ? () => props.onShowAll!(v.column) : undefined;
        const onToggle = (filter: any, checked: boolean) => {
            let currentFilter = props.filters && props.filters[v.column.name] ? [...props.filters[v.column.name]] : [];

            if (checked) {
                currentFilter.push(filter);

            }
            else {
                currentFilter = currentFilter.filter(a => a != filter);
            }

            const newFilters: any = {
                ...props.filters,
            }

            if (currentFilter.length == 0) {
                delete newFilters[v.column.name];
            }
            else {
                newFilters[v.column.name] = currentFilter;
            }


            props.onFilterChange(newFilters);

        }
        return <OFluiFilterPaneColumn
            column={v.column}
            filters={v.values}
            onToggle={onToggle}
            onRemove={onRemove}
            onShowAll={onShowAll}
        />;
    });

    const onDismiss = props.onDismiss ? () => props.onDismiss!() : undefined;

    return props.isOpen ? <Stack styles={rootStyles}>
        <Stack.Item>
            <Stack horizontal
                horizontalAlign="space-between"
                styles={headerStyle}>
                <Stack.Item>
                    <h2 style={headerTitleStyle}>
                        {t('filters')}
                    </h2>
                </Stack.Item>
                <Stack.Item>
                    <Stack horizontal>
                        <Stack.Item>
                            <OFluiIconButton
                                disabled={!hasFilters}
                                icon={"ClearFilter"}
                            />

                        </Stack.Item>

                        {onDismiss &&
                            <Stack.Item>
                                <OFluiIconButton
                                    icon={"Clear"}
                                    onClick={onDismiss}
                                />
                            </Stack.Item>
                        }
                    </Stack>
                </Stack.Item>
            </Stack>
        </Stack.Item>
        <Stack.Item>
            <Stack>
                {filterContent}
            </Stack>
        </Stack.Item>
    </Stack> : <></>
}

interface FilterValue {
    filter: any,
    checked: boolean
}

export interface OFluiFilterPaneColumnProps {
    column: OFluiColumn,
    filters: FilterValue[],
    onRemove: () => void,
    onToggle: (filter: any, checked: boolean) => void
    onShowAll?: () => void
    lang?: string
}

const OFluiFilterPaneColumn = (props: OFluiFilterPaneColumnProps) => {
    const { t } = useLanguage(props.lang);
    const [showContextMenu, setShowContextMenu] = React.useState<boolean>(false);
    const contextMenuRef = React.useRef(null);

    const items = [{
        key: 'remove',
        text: t('delete'),
        onClick: () => {
            props.onRemove();

            setShowContextMenu(false);
        }
    }];

    const filters = props.filters.map((g) => {
        const onClick = (_ev: any, checked: any) => props
            .onToggle(g.filter, checked);

        const displayValue = toDisplayValue(props.column, g.filter);

        return <OFluiCheckbox
            onChange={onClick}
            defaultChecked={g.checked}
            label={displayValue}
        />
    });

    const toggleContext = () => setShowContextMenu(!showContextMenu);

    return <Stack.Item>
        <Stack>
            <Stack.Item>
                <Stack horizontal
                    horizontalAlign="space-between">
                    <Stack.Item>
                        <Label>
                            {`${props.column.name} (${props.filters.length})`}
                        </Label>
                    </Stack.Item>
                    <Stack.Item>
                        <div ref={contextMenuRef}>
                            <OFluiIconButton
                                icon={"More"}
                                onClick={toggleContext}
                            />
                        </div>
                        <ContextualMenu
                            hidden={!showContextMenu}
                            target={contextMenuRef}
                            items={items} />
                    </Stack.Item>
                </Stack>
            </Stack.Item>
            <Stack.Item>
                {filters}
            </Stack.Item>
            {props.onShowAll &&
                <Stack.Item>
                    <Link onClick={props.onShowAll} >
                        {t('showAll')}
                    </Link>
                </Stack.Item>
            }
        </Stack>
    </Stack.Item>
}


export const toDefaultFilter = (column: OFluiColumn,
    currentFilters?: { [id: string]: any[]; },
    items?: any): FilterValues => {
    return {
        column: column,
        values: currentFilters
            && currentFilters[column.name]
            && currentFilters[column.name].length > 0
            ? currentFilters[column.name]
                .map(g => {
                    return {
                        filter: g,
                        checked: true,
                    }
                }) : items ? []
                /*  toSummary(column, items, column.name).map(p => {
                      return {
                          filter: p,
                          checked: false
                      };
                  })*/
                : []
    }


}


export const toDefaultFilters = (columns: OFluiColumn[],
    currentFilters?: { [id: string]: any[]; },
    items?: any): FilterValues[] => {
    return columns.map(f => toDefaultFilter(f, currentFilters, items));
}
