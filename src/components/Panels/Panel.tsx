import * as React from 'react';
import {
    OFluiPanelType
} from '../../types/OFlui';
import { OFluiDisplayItemPanel, OFluiDisplayItemPanelProps } from './DisplayItemPanel/DisplayItemPanel';
import { OFluiEditItemPanel, OFluiEditItemPanelProps } from './EditItemPanel/EditItemPanel';
import { OFluiNewItemPanel, OFluiNewItemPanelProps } from './NewItemPanel/NewItemPanel';

export type OFluiPanelProps = {
    panel: OFluiNewItemPanelProps
    | OFluiEditItemPanelProps
    | OFluiDisplayItemPanelProps,
}

export const OFluiPanel = (props: OFluiPanelProps) => {
    let content = <></>;

    switch (props.panel.panelType) {
        case OFluiPanelType.displayItem:
            content = <OFluiDisplayItemPanel
                {...props.panel as OFluiDisplayItemPanelProps} />;
            break;
        case OFluiPanelType.editItem:
            content = <OFluiEditItemPanel
                {...props.panel as OFluiEditItemPanelProps} />;
            break;
        case OFluiPanelType.newItem:
            content = <OFluiNewItemPanel
                {...props.panel as OFluiNewItemPanelProps} />;
            break;
        default:
            return <></>;
    }

    return (
        <>
            {content}
        </>
    );
};
