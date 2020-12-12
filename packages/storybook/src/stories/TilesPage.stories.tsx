
import * as React from 'react'
import faker from 'faker'

import { OFluiTilesPage } from 'ofluidata-core'

import { mockTiles } from '../helpers/mock-data'

const Template = (args: any) => <OFluiTilesPage
    lang={'en'}
    tiles={mockTiles()}
    {...args} />

export const Default = Template.bind({})

export const Dutch = Template.bind({})
Dutch.args = { lang: 'nl' }

export const Title = Template.bind({})
Title.args = { title: faker.company.companyName() }

export default {
    title: 'Core/Tiles/Page'
}
