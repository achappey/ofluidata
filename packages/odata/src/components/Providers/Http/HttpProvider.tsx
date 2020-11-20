import React, { FunctionComponent } from "react";

import HttpContext from "../../../context/HttpContext";
import { HttpService } from "../../../common/httpService";
import { OFluiHttpClient } from "../../../types/http";

export interface OFluiHttpProviderProps {
    httpClient?: OFluiHttpClient
}

export const OFluiHttpProvider: FunctionComponent<OFluiHttpProviderProps> = (props) => {
    const httpClient = props.httpClient ?
        props.httpClient :
        new HttpService();

    return (
        <HttpContext.Provider value={httpClient}>
            {props.children}
        </HttpContext.Provider>
    );
}