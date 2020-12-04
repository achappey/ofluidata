
import * as React from 'react';
import faker from "faker";

import { OFluiPanel } from "ofluidata-core";
import { itemHeader } from '../helpers/mock-data';

const Template = (args: any) => <OFluiPanel
    lang={"en"}
    isOpen={true}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const Header = Template.bind({});
Header.args = { header: itemHeader };

export const Error = Template.bind({});
Error.args = { errorMessage: faker.lorem.sentence() };

export default {
    title: "Core/Panels/Panel",
    argTypes: { onDismiss: { action: 'dismiss' } }
}