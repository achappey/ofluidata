import * as React from 'react';
import { useEffect, useState } from 'react';
import { DefaultButton, Panel, PrimaryButton } from '@fluentui/react';

import { useLanguage } from '../../../hooks/use-language';
import { Property } from '../../../types/OData';
import { OFluiEditForm } from '../../Forms/Edit/EditForm';
import { OFluiErrorMessageBar } from '../../MessageBar/Error/ErrorMessageBar';
import { OFluiSpinner } from '../../Spinner/Spinner';
import { validateField } from '../../../services/ODataMapper';

export type OFluiNewItemPanelProps = {
    isOpen: boolean,
    properties: Property[],
    entityTypeName: string,
    onOpened: () => Promise<any>,
    onSave: (item: any) => Promise<void>,
    onDismiss: () => void,
    language?: string,
}

export const OFluiNewItemPanel = (props: OFluiNewItemPanelProps) => {
    const { t } = useLanguage(props.language);
    const [item, setItem] = useState<any | undefined>(undefined);
    const [saving, setSaving] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const onChange = (item: any) => setItem(item);

    const isValid = item != undefined && props.properties
        .map(t => validateField(t, item[t.name]))
        .filter(r => r != undefined).length == 0;

    const onSave = () => {
        setSaving(true);

        props
            .onSave(item)
            .catch(t => {
                setErrorMessage(t.toString());
                setSaving(false);
            })
    };

    useEffect(() => {
        setErrorMessage(undefined);
        setSaving(false);

        if (props.isOpen) {
            props.onOpened()
                .then(v => setItem(v))
        }
        else {
            setItem(undefined);
        }

    }, [props.isOpen]);

    const renderFooter = () => {
        return <>
            <PrimaryButton
                onClick={onSave}
                disabled={!isValid}
                style={{ marginRight: 8 }}
                text={t('save')}
            />

            <DefaultButton
                onClick={props.onDismiss}
                text={t('cancel')}
            />
        </>;
    }

    const spinnerText = saving ? t('saving') : t('loading');
    const isLoading = saving || item == undefined;

    return (
        <Panel isFooterAtBottom={true}
            onRenderFooterContent={renderFooter}
            onDismiss={props.onDismiss}
            headerText={`${t('new')} ${props.entityTypeName}`}
            isOpen={props.isOpen}>

            <OFluiErrorMessageBar
                errorMessage={errorMessage}
            />
            {
                isLoading ? <OFluiSpinner text={spinnerText} />
                    : <OFluiEditForm item={item}
                        onChange={onChange}
                        properties={props.properties}
                    />
            }

        </Panel>
    );
};
