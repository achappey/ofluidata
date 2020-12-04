
import * as React from 'react';

import { OFluiColumnType, OFluiTextEditField } from "ofluidata-core";
import { mockColumns } from '../helpers/mock-data';

const Template = (args: any) => <OFluiTextEditField
  column={mockColumns.find(a => a.type === OFluiColumnType.text)}
  {...args} />;

export const Default = Template.bind({});

export const Required = Template.bind({});
Required.args = {
  column: {
    ...mockColumns.find(a => a.type === OFluiColumnType.text),
    required: true
  }
}

export const Value = Template.bind({});
Value.args = {
  value: "Your value"
}

export default {
  title: "Core/Fields/Text/Edit",
  argTypes: {
    onUpdate: { action: 'update' },
    onValidation: { action: 'validation' }
  }
}