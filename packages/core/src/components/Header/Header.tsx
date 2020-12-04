import * as React from "react";

import {
    DefaultPalette,
    IButtonStyles,
    IconButton,
    Image,
    IStackItemStyles,
    Stack,
} from "@fluentui/react";
import { OFluiButton, OFluiItemHeader } from "../../types/oflui";
import { OFluiErrorMessageBar } from "../MessageBar/Error/ErrorMessageBar";
import { OFluiButtonRow } from "../Controls/Buttons/ButtonRow/ButtonRow";


export interface OFluiHeaderProps {
    header: OFluiItemHeader,
    buttons?: OFluiButton[],
    errorMessage?: string,
    onClose?: () => void
}


const headerStyles: IStackItemStyles = {
    root: {
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        height: 88,
    },
};

const headerTitleStyles: IStackItemStyles = {
    root: {
        fontSize: 15,
    },
};

const headerTextStyles: IStackItemStyles = {
    root: {
        fontSize: 13,
    },
};

const linkStyles: IButtonStyles = {
    root: {
        color: DefaultPalette.white,
    },
};

export const OFluiHeader = (props: OFluiHeaderProps) => {
    return (
        <Stack>
            <Stack.Item>
                <Stack horizontal styles={headerStyles}>
                    {
                        props.header?.image &&
                        <Stack.Item disableShrink>
                            <Image src={props.header?.image}
                                style={{ maxHeight: 88 }}
                            />
                        </Stack.Item>
                    }

                    <Stack.Item grow>
                        <Stack>
                            <Stack.Item styles={headerTitleStyles}>
                                {props.header.title}
                            </Stack.Item>
                            <Stack.Item styles={headerTextStyles}>
                                {props.header.shortDescription}
                            </Stack.Item>
                            <Stack.Item styles={headerTextStyles}>
                                {props.header.longDescription}
                            </Stack.Item>
                        </Stack>
                    </Stack.Item>
                    {props.onClose &&
                        <Stack.Item disableShrink >
                            <IconButton styles={linkStyles}
                                iconProps={{
                                    iconName: "ChromeClose"
                                }}
                                onClick={props.onClose}
                            />
                        </Stack.Item>
                    }
                </Stack>
            </Stack.Item>

            <OFluiErrorMessageBar errorMessage={props.errorMessage} />

            {props.buttons != undefined &&
                <Stack.Item>
                    <OFluiButtonRow buttons={props.buttons} />
                </Stack.Item>
            }

        </Stack>
    );
}


