import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react';

import { useEditPanel } from '../../../hooks/use-edit-panel';
import { OFluiPanelBase } from '../../../types/OFlui';
import { OFluiEditForm } from '../../Forms/Edit/EditForm';
import { OFluiErrorMessageBar } from '../../MessageBar/Error/ErrorMessageBar';
import { OFluiItemPanel } from '../ItemPanel/ItemPanel';
import { OFluiSpinner } from '../../Spinner/Spinner';
import { Property } from '../../../types/OData';

export interface OFluiEditItemPanelProps extends OFluiPanelBase {
    item: any,
    properties: Property[],
    onSave: (item: any) => Promise<void>,
    image?: string,
}

export const OFluiEditItemPanel = (props: OFluiEditItemPanelProps) => {
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
        <OFluiItemPanel {...props}
            onRenderFooterContent={renderFooter}>

            <OFluiErrorMessageBar
                errorMessage={errorMessage}
            />

            {
                isLoading
                    ? <OFluiSpinner text={spinnerText} />
                    : <OFluiEditForm item={item}
                        onChange={onChange}
                        properties={props.properties}
                    />
            }

        </OFluiItemPanel>
    );
};
