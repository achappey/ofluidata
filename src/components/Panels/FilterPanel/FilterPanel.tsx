import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Checkbox, DefaultButton, ITag,
    Panel, PrimaryButton, TagPicker
} from '@fluentui/react';

import { useLanguage } from '../../../hooks/use-language';
import { Property } from '../../../types/OData';
import { OFluiSpinner } from '../../Spinner/Spinner';


export type OFluiFilterPanelConfig = {
    options: any[],
    selected: any[]
}

export type OFluiFilterPanelProps = {
    isOpen: boolean,
    property: Property,
    onOpened: (property: Property) => Promise<OFluiFilterPanelConfig>,
    onApply: (filters: any[]) => void,
    onDismiss: () => void,
    language?: string,
}

export const OFluiFilterPanel = (props: OFluiFilterPanelProps) => {
    const [options, setOptions] = useState<any[] | undefined>(undefined);
    const [selected, setSelected] = useState<any[]>([]);

    const { t } = useLanguage(props.language);

    useEffect(() => {
        if (props.isOpen) {
            props.onOpened(props.property)
                .then(v => {
                    setOptions(v.options);
                    setSelected(v.selected);
                });
        }
        else {
            setOptions(undefined);
        }
    }, [props.isOpen]);


    const addSelected = (t: any) => setSelected([...selected, t]);
    const removeSelected = (t: any) => setSelected(selected.filter(e => e != t));

    const optionsContent = options != undefined ? options.map(t => {
        const checked = selected.find(r => r == t) != undefined;

        const onChange = (_e: any, isChecked: boolean) => isChecked
            ? addSelected(t)
            : removeSelected(t);

        return <Checkbox key={t}
            label={t}
            checked={checked}
            onChange={onChange} />;
    }) : <></>;

    const onGetSuggestions = (filter: string): ITag[] => {
        const items = options != undefined
            ? filter != undefined ?
                filter.length == 1 ?
                    options.filter(r => r
                        .substring(0, 1)
                        .toLowerCase() == filter.toLowerCase())
                    : options.filter(r => r
                        .toLowerCase()
                        .indexOf(filter.toLowerCase()) > -1)
                : []
            : [];

        return items.map(y => {
            return {
                name: y,
                key: y
            }
        })
    };

    const onFilterSelected = (items?: ITag[] | undefined) => {
        if (items != undefined) {
            items.forEach(t => {
                if (selected.indexOf(t.key) > -1) {
                    removeSelected(t.key);
                }
                else {
                    addSelected(t.key);
                }
            });
        }
    };

    const content = options != undefined ?
        <>
            <TagPicker
                resolveDelay={500}
                onResolveSuggestions={onGetSuggestions}
                inputProps={{ autoFocus: true }}
                onChange={onFilterSelected}
                selectedItems={[]}
            />

            {optionsContent}

        </>
        : <OFluiSpinner />;

    const title = `${t('filterBy')} ${props.property.name}`;

    const clearFilters = () => setSelected([]);
    const applyFilters = () => props.onApply(selected);

    const renderFooter = () => {
        return options != undefined ?
            <>
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

    return (
        <>
            <style>
                {`.ofluiFilterPanel .ms-Checkbox { padding: 8px 0; }`}
            </style>
            <Panel
                isOpen={props.isOpen}
                className={"ofluiFilterPanel"}
                headerText={title}
                isFooterAtBottom={true}
                onRenderFooterContent={renderFooter}
                onDismiss={props.onDismiss}>

                {content}

            </Panel>
        </>
    );
};
