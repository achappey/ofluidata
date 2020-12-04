import * as React from 'react'

import { IButtonProps, IconButton } from '@fluentui/react'

export interface OFluiIconButtonProps extends IButtonProps {
    icon?: string
}

export const OFluiIconButton = (props: OFluiIconButtonProps) => <IconButton {...props}
    iconProps={props.icon ? { iconName: props.icon } : undefined}
    styles={{ root: { borderRadius: 0 } }} />
