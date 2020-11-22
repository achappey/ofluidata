
import React from 'react';

import { OFluiODataList } from 'ofluidata';
import { defaultConfig, nlConfig } from '../helpers/mock-odata';

const url = "https://services.odata.org/V3/(S(readwrite))/OData/OData.svc";

const Template = (args: any) => <OFluiODataList
    config={defaultConfig}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { config: nlConfig };

export default {
    title: "OData/List",
    args: {
        url: url,
        entityType: "ODataDemo.Product"
    },
}