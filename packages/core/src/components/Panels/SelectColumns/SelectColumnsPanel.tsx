import React, { useState } from "react";
import { DefaultButton, IPanelProps, Panel, PrimaryButton } from "@fluentui/react";

import { OFluiCheckbox } from "../../Controls/Checkbox/Checkbox";
import { OFluiColumn } from "../../../types/oflui";
import { useLanguage } from "ofluidata-translations";

export interface OFluiSelectColumnsPanelProps extends IPanelProps {
    columns: OFluiColumn[],
    selected: OFluiColumn[],
    onApply: (properties: OFluiColumn[]) => void
}

export const OFluiSelectColumnsPanel = (props: OFluiSelectColumnsPanelProps) => {
    const { t } = useLanguage(props.lang);

    const [selected, setSelected] = useState<string[]>(props.selected.map(f => f.name));

    const addSelected = (t: OFluiColumn) => setSelected([...selected, t.name]);
    const removeSelected = (t: OFluiColumn) => setSelected(selected.filter(e => e != t.name));

    const applyFilters = () => props
        .onApply(selected
            .map(h => props.columns
                .find(a => a.name == h)!));

    const optionsContent = props.columns
        .map(t => {
            const checked = selected.find(r => r == t.name) != undefined;

            const onChange = (_e: any, isChecked: boolean) => isChecked
                ? addSelected(t)
                : removeSelected(t);

            return <OFluiCheckbox key={t.name}
                label={t.name}
                checked={checked}
                onChange={onChange}
            />;
        });

    const onClose = props.onDismiss ? () => props.onDismiss!() : undefined;

    const renderFooter = () => {
        return props.columns != undefined ?
            <>
                <PrimaryButton
                    onClick={applyFilters}
                    style={{ marginRight: 8 }}
                    text={t('save')}
                />
                {onClose &&
                    <DefaultButton
                        onClick={onClose}
                        text={t('cancel')}
                    />
                }
            </>
            : <></>
    }

    return <>
        <Panel  {...props}
            isFooterAtBottom={true}
            headerText={t('chooseColumns')}
            onRenderFooterContent={renderFooter}>

            {optionsContent}

        </Panel>
    </>;
}