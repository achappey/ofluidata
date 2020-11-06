import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../hooks/use-language';
import { OFluiTilesProps } from './Tiles';
import { ODataConfig } from '../../types/OData';
import { ODataLoader } from '../../services/ODataLoader';
import { HttpService } from '../../services/HttpService';
import { OFluiTilesBase } from './TilesBase';
import { OFluiSpinner } from '../Spinner/Spinner';
import { OFluiErrorMessageBar } from '../MessageBar/Error/ErrorMessageBar';
import { tileOptions } from '../../services/OFluiMapper';
import { ScrollablePane } from '@fluentui/react';

export interface OFluiTilesWrapperProps extends OFluiTilesProps {
    http: HttpService
}

export const OFluiTilesWrapper = (props: OFluiTilesWrapperProps) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [odata, setOdata] = useState<ODataConfig | undefined>(undefined);
    const options = tileOptions(props.options);
    const { t } = useLanguage(options.language);

    const loader = new ODataLoader(props.http, props.url);

    useEffect(() => {
        loader.load()
            .then(y => setOdata(y))
            .catch(t => setErrorMessage(t.toString()));
    }, [props.url, props.http]);

    const hostName = new URL(props.url).hostname;

    const content = odata != undefined
        ? <OFluiTilesBase
            {...props}
            config={odata}
        />
        : errorMessage != undefined
            ? <OFluiErrorMessageBar errorMessage={errorMessage} />
            : <OFluiSpinner text={t('viewLoading', { name: hostName })} />;

    return (
        <>

            {options.stickyHeader ?
                <ScrollablePane>
                    {content}
                </ScrollablePane>
                :
                <>
                    {content}
                </>
            }
        </>
    )
};
