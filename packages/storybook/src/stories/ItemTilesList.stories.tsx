
import * as React from 'react'

import { OFluiItemTilesList } from 'ofluidata-core'

import { mockColumns, mockItem, mockTiles } from '../helpers/mock-data'

const itemConfig = {
    columns: mockColumns
}

const Template = (args: any) => <OFluiItemTilesList
    lang={'en'}
    itemConfig={itemConfig}
    item={mockItem()}
    tiles={mockTiles()}
    {...args} />

export const Default = Template.bind({})

export const Dutch = Template.bind({})
Dutch.args = { lang: 'nl' }

export default {
    title: 'Core/Tiles/ItemList'
    // args: {
    //    tiles: mockTiles()
    // },
}
