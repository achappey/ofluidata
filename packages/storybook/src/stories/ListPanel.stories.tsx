
import * as React from 'react'

import { OFluiListPanel } from 'ofluidata-core'
import { itemHeader, mockColumns, mockStore, mockViews } from '../helpers/mock-data'

const store = mockStore()

const Template = (args: any) => <OFluiListPanel
    lang={'en'}
    isOpen={true}
    columns={mockColumns}
    views={mockViews}
    getView={store.getView}
    getItem={store.getItem}
    createItem={store.createItem}
    updateItem={store.updateItem}
    {...args} />

export const Default = Template.bind({})

export const Dutch = Template.bind({})
Dutch.args = { lang: 'nl' }

export const Header = Template.bind({})
Header.args = { header: itemHeader }

export default {
    title: 'Core/Panels/List',
    argTypes: { onDismiss: { action: 'dismiss' } }
}
