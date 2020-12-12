import * as React from 'react'

import { IPanelProps } from '@fluentui/react'

import { OFluiPanel } from '../Panel/Panel'
import { OFluiList } from '../../List/List'
import { OFluiItemConfig, OFluiListConfig } from '../../../types/config'

export interface OFluiListPanelProps extends OFluiItemConfig, OFluiListConfig, IPanelProps {
    header?: any,
}

export const OFluiListPanel = (props: OFluiListPanelProps) => {
    return <>
        <OFluiPanel isOpen={props.isOpen}
            header={props.header}
            onDismiss={props.onDismiss}>

            <OFluiList {...props}
                compact={true}
            />
        </OFluiPanel>
    </>
}
