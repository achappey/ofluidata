
import * as React from 'react';

import { OFluiODataList } from 'ofluidata';
import { defaultConfig, nlConfig, customViewsConfig } from '../helpers/mock-odata';

const url = "https://services.odata.org/V4/(S(2epkvxlhhkis1eb2hsy3isfe))/TripPinServiceRW";

const Template = (args: any) => <OFluiODataList
    config={defaultConfig}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { config: nlConfig };

export const CustomViews = Template.bind({});
CustomViews.args = { config: customViewsConfig };

export default {
    title: "OData/List",
    args: {
        url: url,
        entityType: "Microsoft.OData.SampleService.Models.TripPin.Person"
    },
}