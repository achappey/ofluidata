
import * as React from 'react';
import faker from "faker";

import { OFluiEditItemPanel } from "ofluidata-core";
import { itemHeader, mockColumns, mockError, mockItem, timeOut } from '../helpers/mock-data';

const Template = (args: any) => <OFluiEditItemPanel
    lang={"en"}
    isOpen={true}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const Header = Template.bind({});
Header.args = { header: itemHeader };

export const Error = Template.bind({});
Error.args = {
    onSave: mockError
};

export default {
    title: "Core/Panels/EditItem",
    args: {
        columns: mockColumns,
        item: mockItem()
    },
    argTypes: {
        onDismiss: { action: 'dismiss' },
        onSave: { action: 'save' }
    }
}