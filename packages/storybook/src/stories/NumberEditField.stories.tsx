
import React from 'react';

import { OFluiColumnType, OFluiNumberEditField } from "@ofluidata/core";
import { mockColumns } from '../helpers/mock-data';

const Template = (args: any) => <OFluiNumberEditField
  column={mockColumns.find(a => a.type === OFluiColumnType.number)}
  {...args} />;

export const Default = Template.bind({});

export const Required = Template.bind({});
Required.args = {
  column: {
    ...mockColumns.find(a => a.type === OFluiColumnType.number),
    required: true
  }
}

export default {
  title: "Core/Fields/Number/Edit",
  argTypes: {
    onUpdate: { action: 'update' },
    onValidation: { action: 'validation' }
  }
}