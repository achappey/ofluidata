
import * as React from 'react';

import { OFluiDetailsList } from 'ofluidata-core';

import { mockColumns, mockItems } from '../helpers/mock-data';

const Template = (args: any) => <OFluiDetailsList
    lang={"en"}
    properties={mockColumns}
    items={mockItems()}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export const SelectColumns = Template.bind({});
SelectColumns.argTypes = { onSelectColumns: { action: 'selectColumns' } };

export default {
    title: "Core/DetailsList"
}