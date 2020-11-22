
import React from 'react';

import { OFluiODataTiles } from 'ofluidata';

const url = "https://services.odata.org/V3/(S(readwrite))/OData/OData.svc";

const Template = (args: any) => <OFluiODataTiles
    lang={"en"}
    url={url}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export default {
    title: "OData/Tiles",
    args: {
    },
}