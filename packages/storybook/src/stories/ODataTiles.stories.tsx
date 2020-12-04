
import * as React from 'react';
import faker from "faker";

import { OFluiODataTiles } from 'ofluidata';

const url = "https://services.odata.org/V4/(S(2epkvxlhhkis1eb2hsy3isfe))/TripPinServiceRW";

const Template = (args: any) => <OFluiODataTiles
    lang={"en"}
    url={url}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const Title = Template.bind({});
Title.args = { config: { title: faker.company.companyName() } };

export default {
    title: "OData/Tiles",
    args: {
    },
}