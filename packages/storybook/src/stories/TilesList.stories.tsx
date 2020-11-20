
import React from 'react';

import { OFluiTilesList } from 'ofluidata-core';

import { mockTiles } from '../helpers/mock-data';

const Template = (args: any) => <OFluiTilesList
    lang={"en"}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export default {
    title: "Core/Tiles/List",
    args: {
        tiles: mockTiles()
    },
}