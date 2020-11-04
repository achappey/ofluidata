import React from 'react';
import { useEffect, useState } from 'react';

import { OFluiSpinner } from '../Spinner/Spinner';
import { useLanguage } from '../../hooks/use-language';
import { HttpService } from '../../services/HttpService';
import { ODataConfig } from '../../types/OData';
import { ODataLoader } from '../../services/ODataLoader';
import { OFluiListProps } from './List';
import { OFluiListBase } from './ListBase';
import { OFluiErrorMessageBar } from '../MessageBar/Error/ErrorMessageBar';

export interface OFluiListWrapperProps extends OFluiListProps {
    http: HttpService;
}

export const OFluiListWrapper = (props: OFluiListWrapperProps) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [odata, setOdata] = useState<ODataConfig | undefined>(undefined);

    const { t } = useLanguage(props.options != undefined ? props.options.language : undefined);

    const loader = new ODataLoader(props.http, props.url);

    useEffect(() => {
        loader.load()
            .then(y => setOdata(y))
            .catch(t => setErrorMessage(t.toString()));
    }, [props.url, props.http]);

    const hostName = new URL(props.url).hostname;

    return (
        <>
            {odata != undefined
                ? <OFluiListBase
                    {...props}
                    config={odata}
                />
                : errorMessage != undefined
                    ? <OFluiErrorMessageBar errorMessage={errorMessage} />
                    : <OFluiSpinner text={t('viewLoading', { name: hostName })} />
            }
        </>
    )
};