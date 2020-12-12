
import * as React from 'react'

import { OFluiODataList, OFluiODataTiles } from 'ofluidata'
import { defaultConfig } from '../helpers/mock-odata'

const url = 'https://services.odata.org/V3/Northwind/Northwind.svc'

const Template = (args: any) => <OFluiODataList
    config={defaultConfig}
    url={url}
    {...args} />

export const Tiles = (args: any) => <OFluiODataTiles
    lang={defaultConfig}
    url={url}
    {...args} />

export const Customers = Template.bind({})

Customers.args = {
    entityType: 'NorthwindModel.Customer'
}

export const Employees = Template.bind({})

Employees.args = {
    entityType: 'NorthwindModel.Employee'
}

export const Orders = Template.bind({})

Orders.args = {
    entityType: 'NorthwindModel.Order'
}

export const Products = Template.bind({})

Products.args = {
    entityType: 'NorthwindModel.Product'
}

export const Regions = Template.bind({})

Regions.args = {
    entityType: 'NorthwindModel.Region'
}

export const Suppliers = Template.bind({})

Suppliers.args = {
    entityType: 'NorthwindModel.Supplier'
}

export const Territories = Template.bind({})

Territories.args = {
    entityType: 'NorthwindModel.Territory'
}

export default {
    title: 'OData.org/Northwind (Read-Only)'
}
