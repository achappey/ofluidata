
import * as React from 'react'

import { OFluiColumnType, OFluiChoiceEditField } from 'ofluidata-core'
import { mockColumns } from '../helpers/mock-data'

const Template = (args: any) => <OFluiChoiceEditField
    column={mockColumns.find(a => a.type === OFluiColumnType.choice)}
    {...args} />

export const Default = Template.bind({})

export const Required = Template.bind({})
Required.args = {
    column: {
        ...mockColumns.find(a => a.type === OFluiColumnType.choice),
        required: true
    }
}

export const Multi = Template.bind({})
Multi.args = {
    column: {
        ...mockColumns.find(a => a.type === OFluiColumnType.choice),
        isArray: true
    }
}

export const Value = Template.bind({})
Value.args = {
    value: '1'
}

export default {
    title: 'Core/Fields/Choice/Edit',
    args: {

    },
    argTypes: {
        onUpdate: { action: 'update' },
        onValidation: { action: 'validation' }
    }
}
