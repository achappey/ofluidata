import * as React from 'react';

import {
    DefaultPalette, IStackItemStyles,
    Image, Panel, Stack, ActionButton, PanelType,
    IRenderFunction, IPanelProps, IconButton, IButtonStyles
} from '@fluentui/react';
import { FunctionComponent } from 'react';
import { OFluiErrorMessageBar } from '../../MessageBar/Error/ErrorMessageBar';
import { OFluiItemPanelHeaderProperties } from '../../../types/OFlui';


export interface OFluiItemPanelProps extends IPanelProps {
    item: any,
    onDismiss: () => void,
    headerProperties?: OFluiItemPanelHeaderProperties,
    image?: string,
    language?: string,
    buttons?: any[],
    errorMessage?: string,
    onRenderFooterContent?: IRenderFunction<IPanelProps>
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

export const OFluiItemPanel: FunctionComponent<OFluiItemPanelProps> = (props) => {
    const onRenderHeader = () => <></>;

    const title = props.headerProperties
        && props.headerProperties.titleProperty
        ? props.item[props.headerProperties.titleProperty]
        : "";

    const description = props.headerProperties
        && props.headerProperties.descriptionProperty
        ? props.item[props.headerProperties.descriptionProperty]
        : "";

    const secondaryDescription = props.headerProperties
        && props.headerProperties.secondaryDescriptionProperty
        ? props.item[props.headerProperties.secondaryDescriptionProperty]
        : "";

    const onRenderNavigation = () => <Stack>
        <Stack.Item>
            <Stack horizontal styles={headerStyles}>
                {props.image && <Stack.Item disableShrink>
                    <Image src={props.image} style={{ maxHeight: 88 }} />
                </Stack.Item>
                }
                <Stack.Item grow>
                    <Stack>
                        <Stack.Item styles={headerTitleStyles}>
                            {title}
                        </Stack.Item>
                        <Stack.Item styles={headerTextStyles}>
                            {description}
                        </Stack.Item>
                        <Stack.Item styles={headerTextStyles}>
                            {secondaryDescription}
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
                <Stack.Item disableShrink >
                    <IconButton styles={linkStyles}
                        iconProps={{ iconName: "ChromeClose" }}
                        onClick={props.onDismiss}
                    />
                </Stack.Item>
            </Stack>
        </Stack.Item>

        <OFluiErrorMessageBar errorMessage={props.errorMessage} />

        {props.buttons != undefined &&
            <Stack.Item>
                <Stack horizontal horizontalAlign="end">
                    {props.buttons
                        .map(b =>
                            <Stack.Item key={b.key}>
                                <ActionButton
                                    iconProps={b.iconProps}
                                    onClick={b.onClick}>
                                    {b.text}
                                </ActionButton>
                            </Stack.Item>
                        )
                    }
                </Stack>
            </Stack.Item>
        }
    </Stack>;

    return (
        <Panel isOpen={props.isOpen}
            type={PanelType.medium}
            isFooterAtBottom={true}
            onDismiss={props.onDismiss}
            onRenderHeader={onRenderHeader}
            onRenderFooterContent={props.onRenderFooterContent}
            onRenderNavigation={onRenderNavigation}>

            {props.children}

        </Panel>
    );
};
