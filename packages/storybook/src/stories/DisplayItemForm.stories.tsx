
import React from 'react';

import { OFluiDisplayItemForm } from "ofluidata-core";
import { mockGroups, mockItem } from '../helpers/mock-data';

const Template = (args: any) => <OFluiDisplayItemForm
    lang={"en"}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const Edit = Template.bind({});
Edit.argTypes = { onEdit: { action: 'edit' } }

export default {
    title: "Core/Forms/DisplayItem",
    args: {
        groups: mockGroups(),
        item: mockItem()
    },
    argTypes: { onDismiss: { action: 'dismiss' } }
}