
import * as React from 'react'

import { OFluiEditItemForm } from 'ofluidata-core'
import { mockColumns, mockItem, mockSearch } from '../helpers/mock-data'

const Template = (args: any) => <OFluiEditItemForm
    lang={'en'}
    onSearch={mockSearch}
    {...args} />

export const Default = Template.bind({})

export const Dutch = Template.bind({})
Dutch.args = { lang: 'nl' }

export default {
    title: 'Core/Forms/EditItem',
    args: {
        columns: mockColumns,
        item: mockItem()
    },
    argTypes: {
        onUpdated: { action: 'updated' },
        onValidation: { action: 'validation' }
    }
}
