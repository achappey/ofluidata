
import React from 'react';
import faker from "faker";

import { OFluiErrorMessageBar } from "@ofluidata/core";

const Template = (args: any) => <OFluiErrorMessageBar
  errorMessage={faker.lorem.sentence()}
  {...args} />;

export const Default = Template.bind({});
Default.args = { errorMessage: faker.lorem.sentence() };

export const MultipleErrors = Template.bind({});
MultipleErrors.args = {
  errorMessage:
    [
      faker.lorem.sentence(),
      faker.lorem.sentence()
    ]
};

export const Dismiss = Template.bind({});
Dismiss.argTypes = { onDismiss: { action: 'dismiss' } }

export default {
  title: "Core/MessageBar/Error"
}