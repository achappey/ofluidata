
import * as React from 'react';

import faker from "faker";

import { OFluiDisplayItemPanel } from "ofluidata-core";
import { itemHeader, mockActions, mockColumns, mockGroups, mockItem, mockLookup, timeOut } from '../helpers/mock-data';

const Template = (args: any) => <OFluiDisplayItemPanel
    lang={"en"}
    isOpen={true}
    columns={mockColumns}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const Header = Template.bind({});
Header.args = { header: itemHeader };

export const Actions = Template.bind({});
Actions.args = {
    actions: mockActions
};

export const Delete = Template.bind({});
Delete.args = {
    deleteItem: () => timeOut()
};

export const DeleteError = Template.bind({});
DeleteError.args = {
    deleteItem: () => timeOut()
        .then(() => { throw new Error(faker.lorem.sentence()) })
};

export const Complete = Template.bind({});
Complete.args = {
    header: itemHeader,
    actions: mockActions,
    deleteItem: () => timeOut()
        .then(() => { throw new Error(faker.lorem.sentence()) })
};

export default {
    title: "Core/Panels/DisplayItem",
    args: {
        groups: mockGroups(),
        item: mockItem(mockLookup(), [mockLookup(), mockLookup()])
    },
    argTypes: {
        onAction: { action: "action" },
        onDismiss: { action: 'dismiss' }
    }
}