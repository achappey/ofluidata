import * as React from "react";

import { Spinner } from "@fluentui/react";

import { useLanguage } from "ofluidata-translations";
import { OFluiErrorMessageBar } from "ofluidata-core";

import HttpContext from "../../../context/HttpContext";
import ODataContext from "../../../context/ODataContext";
import { useOData } from "../../../hooks/use-OData";

export interface OFluiODataProviderProps {
    url: string,
    lang?: string,
    title?: string
}

export const OFluiODataProvider: React.FunctionComponent<OFluiODataProviderProps> = (props) => {
    const http = React.useContext(HttpContext);
    const loadMetadata = useOData(props.url, http);
    const { t } = useLanguage(props.lang);

    const loadingText = t('viewLoading',
        {
            name:
                props.title ?
                    props.title
                    : new URL(props.url).hostname
        });

    return <>
        {loadMetadata.error &&
            <OFluiErrorMessageBar
                errorMessage={loadMetadata.error.message}
            />
        }

        {loadMetadata.loading &&
            <Spinner label={loadingText} />
        }

        {loadMetadata.result &&
            <HttpContext.Provider value={http}>
                <ODataContext.Provider value={loadMetadata.result}>
                    {props.children}
                </ODataContext.Provider>
            </HttpContext.Provider>
        }

    </>;
}