
import * as React from 'react'

import { OFluiActionPanel } from 'ofluidata-core'
import { itemHeader, mockActions, mockError, mockItem } from '../helpers/mock-data'

const Template = (args: any) => <OFluiActionPanel
    lang={'en'}
    isOpen={true}
    item={mockItem()}
    action={mockActions[0]}
    {...args} />

export const Default = Template.bind({})

export const Dutch = Template.bind({})
Dutch.args = { lang: 'nl' }

export const Header = Template.bind({})
Header.args = { header: itemHeader }

export const Error = Template.bind({})
Error.args = {
    onSave: mockError
}

export default {
    title: 'Core/Panels/Action',
    argTypes: {
        onDismiss: { action: 'dismiss' },
        onSave: { action: 'save' }
    }
}
