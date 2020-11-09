import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Checkbox, DefaultButton, 
    Panel, PrimaryButton} from '@fluentui/react';

import { useLanguage } from '../../../hooks/use-language';
import { Property } from '../../../types/OData';
import { OFluiSpinner } from '../../Spinner/Spinner';


export type OFluiColumnsPanelConfig = {
    options: Property[],
    selected: string[]
}

export type OFluiColumnsPanelProps = {
    isOpen: boolean, 
    onOpened: () => Promise<OFluiColumnsPanelConfig>,
    onApply: (filters: Property[]) => void,
    onDismiss: () => void,
    language?: string,
}

export const OFluiColumnsPanel = (props: OFluiColumnsPanelProps) => {
    const [options, setOptions] = useState<Property[] | undefined>(undefined);
    const [selected, setSelected] = useState<string[]>([]);

    const { t } = useLanguage(props.language);

    useEffect(() => {
        if (props.isOpen) {
            props.onOpened()
                .then(v => {
                    setOptions(v.options);
                    setSelected(v.selected);
                });
        }
        else {
            setOptions(undefined);
        }
    }, [props.isOpen]);


    const addSelected = (t: Property) => setSelected([...selected, t.name]);
    const removeSelected = (t: Property) => setSelected(selected.filter(e => e != t.name));

    const optionsContent = options != undefined ? options.map(t => {
        const checked = selected.find(r => r == t.name) != undefined;

        const onChange = (_e: any, isChecked: boolean) => isChecked
            ? addSelected(t)
            : removeSelected(t);

        return <Checkbox key={t.name}
            label={t.name}
            checked={checked}
            onChange={onChange} />;
    }) : <></>;

    const content = options != undefined ?
        <>           
            {optionsContent}

        </>
        : <OFluiSpinner />;

    const title = `${t('chooseColumns')}`;

    const clearFilters = () => setSelected([]);
    const applyFilters = () => props.onApply(selected.map(h => options!.find(a => a.name == h)!));

    const renderFooter = () => {
        return options != undefined ?
            <>
                <PrimaryButton
                    onClick={applyFilters}
                    style={{ marginRight: 8 }}
                    text={t('save')}
                />
                <DefaultButton
                    onClick={clearFilters}
                    text={t('restore')}
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
