import * as React from "react";
import { FunctionComponent } from "react";

import {
    IPanelProps,
    Panel,
    PanelType,
} from "@fluentui/react";

import { OFluiErrorMessageBar } from "../../MessageBar/Error/ErrorMessageBar";
import { OFluiButton, OFluiItemHeader } from "../../../types/oflui";
import { OFluiHeader } from "../../Header/Header";
import { OFluiButtonRow } from "../../Controls/Buttons/ButtonRow/ButtonRow";

export interface OFluiPanelProps extends IPanelProps {
    header?: OFluiItemHeader,
    buttons?: OFluiButton[],
    errorMessage?: string,
}

export const OFluiPanel: FunctionComponent<OFluiPanelProps> = (props) => {
    const onRenderHeader = () => <></>;

    const onRenderNavigation = () => <OFluiHeader
        header={props.header!}
        buttons={props.buttons}
        errorMessage={props.errorMessage}
        onClose={props.onDismiss}
    />

    return (
        <>
            {
                props.header ?
                    <Panel {...props}
                        type={PanelType.medium}
                        onRenderHeader={onRenderHeader}
                        onRenderNavigation={onRenderNavigation}>

                        {props.children}
                    </Panel> :
                    <Panel {...props}
                        type={props.type ? props.type : PanelType.medium}>

                        <OFluiErrorMessageBar
                            errorMessage={props.errorMessage} />

                        {props.buttons != undefined &&
                            <OFluiButtonRow buttons={props.buttons} />
                        }

                        {props.children}
                    </Panel>
            }
        </>
    );
}


