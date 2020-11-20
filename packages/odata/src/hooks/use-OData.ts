import { useAsync } from "react-async-hook";
import { toODataConfig } from "../common/odataParser";
import { OFluiHttpClient } from "../types/http"

const toMetadataUrl = (url: string) => {
  return `${url}/$metadata`;
}

export const useOData = ((url: string, httpClient: OFluiHttpClient) => {
  const odataConfig = (url: string) =>
    httpClient
      .get(url)
      .then(a =>
        httpClient
          .getMetadata(
            toMetadataUrl(url))
          .then(g => toODataConfig(url, g, a.value)));

  const loadMetadata = useAsync(odataConfig, [url]);

  return loadMetadata;
})