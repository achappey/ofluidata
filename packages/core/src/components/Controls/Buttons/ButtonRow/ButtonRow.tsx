import { ActionButton, Stack } from '@fluentui/react';
import * as React from 'react'
import { OFluiButton } from '../../../../types/oflui';

export interface OFluiButtonRowProps {
  buttons: OFluiButton[]
}

export const OFluiButtonRow = (props: OFluiButtonRowProps) => {
  return (
    <Stack horizontal
      horizontalAlign="end">
      {props.buttons
        .map(b =>
          <Stack.Item key={b.key}>
            <ActionButton
              iconProps={b.icon ? { iconName: b.icon } : undefined}
              onClick={() => b.onClick!()}>
              {b.text}
            </ActionButton>
          </Stack.Item>
        )
      }
    </Stack>
  );
}