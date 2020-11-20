
import React from 'react';
import faker from "faker";

import { itemHeader } from '../helpers/mock-data';
import { OFluiHeader } from 'ofluidata-core';

const Template = (args: any) => <OFluiHeader
    lang={"en"}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const Error = Template.bind({});
Error.args = { errorMessage: faker.lorem.sentence() };

export const Close = Template.bind({});
Close.argTypes = { onClose: { action: 'close' } };

export default {
    title: "Core/Header",
    args: { header: itemHeader }
}