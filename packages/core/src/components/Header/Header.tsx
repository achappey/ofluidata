import React from "react";

import {
    ActionButton,
    DefaultPalette,
    IButtonStyles,
    IconButton,
    Image,
    IStackItemStyles,
    Stack,
} from "@fluentui/react";
import { OFluiItemHeader } from "../../types/oflui";
import { OFluiErrorMessageBar } from "../MessageBar/Error/ErrorMessageBar";


export interface OFluiHeaderProps {
    header: OFluiItemHeader,
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

            {props.header.buttons != undefined &&
                <Stack.Item>
                    <Stack horizontal
                        horizontalAlign="end">
                        {props.header.buttons
                            .map(b =>
                                <Stack.Item key={b.key}>
                                    <ActionButton
                                        iconProps={b.icon ? { iconName: b.icon } : undefined}
                                        onClick={b.onClick}>
                                        {b.text}
                                    </ActionButton>
                                </Stack.Item>
                            )
                        }
                    </Stack>
                </Stack.Item>
            }
        </Stack>
    );
}


