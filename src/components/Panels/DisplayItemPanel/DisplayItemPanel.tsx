import * as React from 'react';
import { useState } from 'react';
import {
    OFluiItemPanelHeaderProperties,
    OFluiPanelBase,
    OFluiPanelType, OFluiPropertyGroup
} from '../../../types/OFlui';
import { OFluiDisplayForm } from '../../Forms/Display/DisplayForm';
import { OFluiEditItemPanelProps } from '../EditItemPanel/EditItemPanel';
import { OFluiItemPanel } from '../ItemPanel/ItemPanel';
import { OFluiNewItemPanelProps } from '../NewItemPanel/NewItemPanel';
import { OFluiPanel } from '../Panel';

export interface OFluiDisplayItemPanelProps extends OFluiPanelBase {
    item: any,
    groups: OFluiPropertyGroup[],
    onSave: (item: any) => Promise<void>,
    onDelete: (item: any) => Promise<void>,
    image?: string,
    headerProperties?: OFluiItemPanelHeaderProperties
}

export const OFluiDisplayItemPanel = (props: OFluiDisplayItemPanelProps) => {
    const [childPanel, setChildPanel] = useState<OFluiNewItemPanelProps
        | OFluiEditItemPanelProps
        | OFluiDisplayItemPanelProps | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const onEdit = (group: OFluiPropertyGroup) => setChildPanel({
        panelType: OFluiPanelType.editItem,
        isOpen: true,
        headerProperties: props.headerProperties,
        onPanelOpened: async () => props.item,
        onDismiss: () => setChildPanel(undefined),
        properties: group.properties,
        item: props.item,
        image: props.image,
        onSave: (item: any) => props
            .onSave(item)
            .then(() => setChildPanel(undefined))
    });

    const buttons = [{
        key: "delete",
        iconProps: { iconName: "Delete" },
        onClick: () => props
            .onDelete(props.item)
            .catch(t => setErrorMessage(t.toString()))
    }];

    return (
        <>
            <OFluiItemPanel {...props}
                buttons={buttons}
                errorMessage={errorMessage}
                isOpen={childPanel == undefined ? props.isOpen : false}>

                {
                    props.onRender ? props.onRender(props.item) :
                        <OFluiDisplayForm {...props} onEdit={onEdit} />
                }

            </OFluiItemPanel>
            {
                childPanel && <OFluiPanel panel={childPanel} />
            }


        </>
    );
};
