
import React from 'react';

import { OFluiDisplayItemPanel } from "ofluidata-core";
import { itemHeader, mockGroups, mockItem } from '../helpers/mock-data';

const Template = (args: any) => <OFluiDisplayItemPanel
    lang={"en"}
    isOpen={true}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const Header = Template.bind({});
Header.args = { header: itemHeader };

export default {
    title: "Core/Panels/DisplayItem",
    args: {
        groups: mockGroups(),
        item: mockItem()
    },
    argTypes: { onDismiss: { action: 'dismiss' } }
}