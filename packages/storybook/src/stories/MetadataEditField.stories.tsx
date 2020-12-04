
import * as React from 'react';

import { OFluiColumnType, OFluiMetadataEditField } from "ofluidata-core";
import { mockColumns } from '../helpers/mock-data';

const Template = (args: any) => <OFluiMetadataEditField
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


export const Multi = Template.bind({});
Multi.args = {
  column: {
    ...mockColumns.find(a => a.type === OFluiColumnType.text),
    isArray: true
  }
}

export const Value = Template.bind({});
Value.args = {
  value: "1"
}

export default {
  title: "Core/Fields/Metadata/Edit",
  args: {
    options: [
      { key: "1", text: "1" },
      { key: "2", text: "2" },
      { key: "3", text: "3" }
    ]
  },
  argTypes: {
    onUpdate: { action: 'update' },
    onValidation: { action: 'validation' }
  }
}