import * as React from 'react'

import { IPanelProps } from '@fluentui/react'

import { OFluiPanel } from '../Panel/Panel'
import { OFluiActionForm, OFluiActionFormProps } from '../../Forms/Action/ActionForm'
import { OFluiItemHeader } from '../../../types/oflui'

export interface OFluiActionPanelProps extends OFluiActionFormProps, IPanelProps {
    header?: OFluiItemHeader
}

export const OFluiActionPanel = (props: OFluiActionPanelProps) => {
    return <>
        <OFluiPanel {...props}
            header={props.header}
            isFooterAtBottom={true}>

            <OFluiActionForm {...props} />

        </OFluiPanel>
    </>
}
