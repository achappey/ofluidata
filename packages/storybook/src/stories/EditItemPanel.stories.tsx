
import React from 'react';

import { OFluiEditItemPanel } from "@ofluidata/core";
import { itemHeader, mockColumns, mockItem } from '../helpers/mock-data';

const Template = (args: any) => <OFluiEditItemPanel
    lang={"en"}
    isOpen={true}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const Header = Template.bind({});
Header.args = { header: itemHeader };

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