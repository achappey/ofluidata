
import * as React from 'react';

import { OFluiSelectColumnsPanel } from "ofluidata-core";

import { mockColumns } from '../helpers/mock-data';

const Template = (args: any) => <OFluiSelectColumnsPanel
    lang={"en"}
    isOpen={true}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export default {
    title: "Core/Panels/SelectColumns",
    args: { columns: mockColumns, selected: [] },
    argTypes: { onDismiss: { action: 'dismiss' }, onApply: { action: 'apply' } }
}