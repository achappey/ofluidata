
import React from 'react';
import faker from 'faker';

import { OFluiList } from '@ofluidata/core';

import { mockColumns, mockStore, mockViews } from '../helpers/mock-data';

const store = mockStore();

const Template = (args: any) => <OFluiList
    lang={"en"}
    getView={store.getView}
    getItem={store.getItem}
    createItem={store.createItem}
    updateItem={store.updateItem}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const Image = Template.bind({});
Image.args = { image: faker.image.abstract() };

export const ItemName = Template.bind({});
ItemName.args = { itemName: faker.commerce.product() };

export const Search = Template.bind({});
Search.args = { onSearch: store.search };

export const Filter = Template.bind({});
Filter.args = { getFilterOptions: store.getOptions };

export default {
    title: "Core/List",
    args: {
        columns: mockColumns,
        views: mockViews
    },
}