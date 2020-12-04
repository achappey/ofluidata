
import * as React from 'react';

import { OFluiActionForm } from "ofluidata-core";
import { mockActions, mockItem } from '../helpers/mock-data';

const Template = (args: any) => <OFluiActionForm
    lang={"en"}
    item={mockItem()}
    action={mockActions[0]}
    {...args} />;

export const Default = Template.bind({});

export const Dutch = Template.bind({});
Dutch.args = { lang: "nl" };

export default {
    title: "Core/Forms/Action",
    argTypes: {
        onUpdated: { action: 'updated' },
        onValidation: { action: 'validation' }
    }
}