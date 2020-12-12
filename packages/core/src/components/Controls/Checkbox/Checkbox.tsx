import * as React from 'react'

import { Checkbox, ICheckboxProps } from '@fluentui/react'

export interface OFluiCheckboxProps extends ICheckboxProps {
}

export const OFluiCheckbox = (props: OFluiCheckboxProps) => <Checkbox {...props}
    styles={{ root: { paddingBottom: 8, paddingTop: 8 } }} />
