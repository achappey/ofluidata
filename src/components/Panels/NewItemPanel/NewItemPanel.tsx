import * as React from 'react';
import { DefaultButton, Panel, PrimaryButton } from '@fluentui/react';

import { OFluiEditForm } from '../../Forms/Edit/EditForm';
import { OFluiErrorMessageBar } from '../../MessageBar/Error/ErrorMessageBar';
import { OFluiSpinner } from '../../Spinner/Spinner';
import { useEditPanel } from '../../../hooks/use-edit-panel';
import { OFluiPanelBase } from '../../../types/OFlui';
import { Property } from '../../../types/OData';

export interface OFluiNewItemPanelProps extends OFluiPanelBase {
    properties: Property[],
    entityTypeName: string,
    onSave: (item: any) => Promise<void>,
}

export const OFluiNewItemPanel = (props: OFluiNewItemPanelProps) => {
    const { item,
        isValid,
        spinnerText,
        errorMessage,
        isLoading,
        onChange,
        saveItem, t } = useEditPanel(props.isOpen,
            props.properties,
            props.onPanelOpened,
            props.onSave,
            props.language);

    const renderFooter = () => {
        return <>
            <PrimaryButton
                onClick={saveItem}
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
