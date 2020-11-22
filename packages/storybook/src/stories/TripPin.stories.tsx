
import React from 'react';

import { OFluiODataList, OFluiODataTiles } from "ofluidata";
import { defaultConfig } from '../helpers/mock-odata';

const url = "https://services.odata.org/V4/(S(2epkvxlhhkis1eb2hsy3isfe))/TripPinServiceRW";

const Template = (args: any) => <OFluiODataList
    config={defaultConfig}
    url={url}
    {...args} />;


export const Tiles = (args: any) => <OFluiODataTiles
    config={defaultConfig}
    url={url}
    {...args} />

export const Airports = Template.bind({});

Airports.args = {
    entityType: "Microsoft.OData.SampleService.Models.TripPin.Airport"
};

export const Airlines = Template.bind({});

Airlines.args = {
    entityType: "Microsoft.OData.SampleService.Models.TripPin.Airline"
};

export const People = Template.bind({});

People.args = {
    entityType: "Microsoft.OData.SampleService.Models.TripPin.Person"
};

export const Photos = Template.bind({});

Photos.args = {
    entityType: "Microsoft.OData.SampleService.Models.TripPin.Photo"
};

export default {
    title: "OData.org/TripPin (Read-Write)"
}