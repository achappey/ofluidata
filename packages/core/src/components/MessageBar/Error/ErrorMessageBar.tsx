import * as React from 'react'
import { IMessageBarProps, MessageBar, MessageBarType } from '@fluentui/react'

export interface OFluiErrorMessageBarProps extends IMessageBarProps {
  errorMessage?: string | string[],
}

export const OFluiErrorMessageBar = (props: OFluiErrorMessageBarProps) => {
  const errorMessage = props.errorMessage !== undefined
    ? Array.isArray(props.errorMessage)
      ? props.errorMessage
        .map(t => <div key={t}>{t}</div>)
      : <>{props.errorMessage}</>
    : undefined

  return (
    <>
      {errorMessage &&
        <MessageBar {...props}
          messageBarType={MessageBarType.error}>
          {errorMessage}
        </MessageBar>
      }
    </>
  )
}
