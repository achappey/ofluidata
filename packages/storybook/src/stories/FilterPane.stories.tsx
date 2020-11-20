
import React from 'react';

import { OFluiFilterPane } from "@ofluidata/core";

import { mockColumns } from '../helpers/mock-data';

const Template = (args: any) => <OFluiFilterPane
    lang={"en"}
    isOpen={true}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export default {
    title: "Core/Panes/Filter",
    args: { columns: mockColumns, selected: [] },
    argTypes: { onDismiss: { action: 'dismiss' }, onApply: { action: 'apply' } }
}