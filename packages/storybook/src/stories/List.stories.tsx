
import * as React from 'react';
import faker from 'faker';

import { OFluiList } from 'ofluidata-core';

import { mockActions, mockColumns, mockStore, mockViews } from '../helpers/mock-data';

const store = mockStore();
const pagedStore = mockStore(2);

const Template = (args: any) => <OFluiList
    lang={"en"}
    setKey={"id"}
    actions={mockActions}
    onAction={store.onAction}
    getView={store.getView}
    readItem={store.getItem}
    createItem={store.createItem}
    deleteItem={store.deleteItem}
    onLookupSearch={store.lookupSearch}
    updateItem={store.updateItem}
    {...args}
/>;

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


export const Paged = (args: any) => <OFluiList
    lang={"en"}
    setKey={"id"}
    getView={pagedStore.getView}
    readItem={pagedStore.getItem}
    onSearch={pagedStore.search}
    createItem={pagedStore.createItem}
    updateItem={pagedStore.updateItem}
    getNextPage={pagedStore.getPage}
    {...args}
/>;

export default {
    title: "Core/List",
    args: {
        columns: mockColumns,
        views: mockViews
    },
}