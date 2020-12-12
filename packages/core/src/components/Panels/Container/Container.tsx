import * as React from 'react'
import { OFluiChildPanel, OFluiPanelType } from '../../../types/oflui'
import { OFluiDisplayItemPanel } from '../DisplayItem/DisplayItemPanel'
import { OFluiEditItemPanel } from '../EditItem/EditItemPanel'

export interface OFluiPanelContainerProps {
    panels: OFluiChildPanel[]
}

export const OFluiPanelContainer = (props: OFluiPanelContainerProps) => {
    const panels = props.panels.map(g => {
        return <>
            {g.type === OFluiPanelType.display &&
                <OFluiDisplayItemPanel {...g.props}
                />
            }
            {g.type === OFluiPanelType.edit &&
                <OFluiEditItemPanel {...g.props}
                />
            }
        </>
    })

    return (
        <>
            {panels}
        </>
    )
}
