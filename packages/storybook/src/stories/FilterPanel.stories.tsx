
import React from 'react';

import { OFluiFilterPanel } from "@ofluidata/core";

import { mockColumns, mockOptions } from '../helpers/mock-data';

const Template = (args: any) => <OFluiFilterPanel
    lang={"en"}
    isOpen={true}
    getOptions={mockOptions}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export default {
    title: "Core/Panels/Filter",
    args: { column: mockColumns[0], selected: [] },
    argTypes: {
        onDismiss: { action: 'dismiss' },
        onApply: { action: 'apply' }
    }
}