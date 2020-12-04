
import * as React from 'react';

import { OFluiODataList, OFluiODataTiles } from "ofluidata";
import { defaultConfig } from '../helpers/mock-odata';

const url = "https://services.odata.org/V3/(S(readwrite))/OData/OData.svc";

const Template = (args: any) => <OFluiODataList
    config={defaultConfig}
    url={url}
    {...args} />;

export const Tiles = (args: any) => <OFluiODataTiles
    config={defaultConfig}
    url={url}
    {...args} />

export const Products = Template.bind({});

Products.args = {
    entityType: "ODataDemo.Product"
};

export const Category = Template.bind({});

Category.args = {
    entityType: "ODataDemo.Category"
};

export const Persons = Template.bind({});

Persons.args = {
    entityType: "ODataDemo.Person"
};

export const Advertisements = Template.bind({});

Advertisements.args = {
    entityType: "ODataDemo.Advertisement"
};

export default {
    title: "OData.org/ODataDemo (Read-Write)"
}