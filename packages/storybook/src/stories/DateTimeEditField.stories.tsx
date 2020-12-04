
import * as React from 'react';

import { OFluiColumnType, OFluiDateTimeEditField } from "ofluidata-core";
import { mockColumns } from '../helpers/mock-data';

const Template = (args: any) => <OFluiDateTimeEditField
  column={mockColumns.find(a => a.type === OFluiColumnType.datetime)}
  {...args} />;

export const Default = Template.bind({});

export const Required = Template.bind({});
Required.args = {
  column: {
    ...mockColumns.find(a => a.type === OFluiColumnType.datetime),
    required: true
  }
}


export const Value = Template.bind({});
Value.args = {
  value: new Date()
}

export default {
  title: "Core/Fields/DateTime/Edit",
  argTypes: {
    onUpdate: { action: 'update' },
    onValidation: { action: 'validation' }
  }
}