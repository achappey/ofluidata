import * as React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';

export type OFluiErrorMessageBarProps = {
    errorMessage?: string | string[],
    onDismiss?: () => void,
    language?: string
}

export const OFluiErrorMessageBar = (props: OFluiErrorMessageBarProps) => {

    const errorMessage = props.errorMessage != undefined ?
        Array.isArray(props.errorMessage) ?
            props.errorMessage.map(t => <div>{t}</div>)
            : <>{props.errorMessage}</>
        : undefined;

    return (
        <>
            {errorMessage &&
                <MessageBar messageBarType={MessageBarType.error}
                    onDismiss={props.onDismiss}>
                    {errorMessage}
                </MessageBar>
            }
        </>
    );
};
