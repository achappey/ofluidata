import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { useLanguage } from '../../hooks/use-language';

export type OFluiSpinnerSpinnerProps = {
    size?: SpinnerSize,
    text?: string,
    language?: string
}

export const OFluiSpinner = (props: OFluiSpinnerSpinnerProps) => {
    const { t } = useLanguage(props.language);

    const spinnerSize = props.size != undefined ? props.size : SpinnerSize.medium;
    const spinnerLabel = props.text != undefined ? props.text : t('loading');

    return (
        <Spinner
            size={spinnerSize}
            label={spinnerLabel}
        />
    );
};
