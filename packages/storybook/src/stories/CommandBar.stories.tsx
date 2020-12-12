
import * as React from 'react'
import faker from 'faker'

import { OFluiCommandBar } from 'ofluidata-core'

import { mockViews } from '../helpers/mock-data'

const Template = (args: any) => <OFluiCommandBar
    lang={'en'}
    items={[]}
    {...args} />

export const Default = Template.bind({})

export const Dutch = Template.bind({})
Dutch.args = { lang: 'nl' }

export const Image = Template.bind({})
Image.args = { image: faker.image.abstract() }

export const WithViews = Template.bind({})
WithViews.args = { views: mockViews }

export const WithSearch = Template.bind({})
WithSearch.argTypes = { onSearch: { action: 'search' } }

export const Complete = Template.bind({})
Complete.args = {
    views: mockViews,
    image: faker.image.abstract()
}

Complete.argTypes = {
    onSearch: { action: 'search' }
}

export default {
    title: 'Core/CommandBar',
    argTypes: {
        onViewChange: { action: 'viewChange' },
        onOffsetChange: { action: 'offsetChange' }
    }
}
