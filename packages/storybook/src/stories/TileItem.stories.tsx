
import * as React from 'react'

import { OFluiTileItem } from 'ofluidata-core'

import { mockTiles } from '../helpers/mock-data'

const Template = (args: any) => <OFluiTileItem
    lang={'en'}
    {...args} />

export const Default = Template.bind({})

export const Dutch = Template.bind({})
Dutch.args = { lang: 'nl' }

export default {
    title: 'Core/Tiles/Item',
    args: {
        title: mockTiles()[0].title,
        image: mockTiles()[0].image
    }
}
