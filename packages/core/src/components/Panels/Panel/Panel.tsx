import React from "react";
import { FunctionComponent } from "react";

import {
    IPanelProps,
    Panel,
    PanelType,
} from "@fluentui/react";

import { OFluiErrorMessageBar } from "../../MessageBar/Error/ErrorMessageBar";
import { OFluiItemHeader } from "../../../types/oflui";
import { OFluiHeader } from "../../Header/Header";

export interface OFluiPanelProps extends IPanelProps {
    header?: OFluiItemHeader,
    errorMessage?: string,
}

export const OFluiPanel: FunctionComponent<OFluiPanelProps> = (props) => {
    const onRenderHeader = () => <></>;

    const onRenderNavigation = () => <OFluiHeader
        header={props.header!}
        errorMessage={props.errorMessage}
        onClose={props.onDismiss}
    />

    const panelContent = <>
        <OFluiErrorMessageBar
            errorMessage={props.errorMessage} />

        {props.children}
    </>;

    return (
        <>
            {
                props.header ?
                    <Panel {...props}
                        type={PanelType.medium}
                        onRenderHeader={onRenderHeader}
                        onRenderNavigation={onRenderNavigation}>

                        {panelContent}
                    </Panel> :
                    <Panel {...props}
                        type={props.type ? props.type : PanelType.medium}>

                        {panelContent}
                    </Panel>
            }
        </>
    );
}


