import { ODataConfig } from "../types/OData";
import { HttpClient } from "../types/HttpClient";
import { discoverMetadata, ensureProtocol, toODataMetadata } from "./ODataMapper";

export class ODataLoader {
    constructor(private httpClient: HttpClient,
        public baseUrl: string) {
    }

    load = (): Promise<ODataConfig> => {
        return this.httpClient
            .get(this.baseUrl)
            .then(data => this.httpClient
                .getMetadata(
                    ensureProtocol(this.baseUrl,
                        discoverMetadata(this.baseUrl, data)))
                .then(result =>
                    new ODataConfig(data.value,
                        toODataMetadata(result)))
            );
    }

}