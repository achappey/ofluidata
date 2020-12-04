import { OFluiHttpClient } from "../types/http";

import axios from 'axios';

export class HttpService implements OFluiHttpClient {

  delete = (url: string) => {
    return axios
      .delete(
        url,
        {
          headers:
          {
            "If-Match": "*"
          }
        })
      .then(g => g.data)
      .catch(this.handleError);
  }

  post = (url: string, data: any) => {
    return axios
      .post(
        url,
        data,
        {
          responseType: "json",
        })
      .then(t => t.data)
      .catch(this.handleError);
  }

  get = (url: string) => {
    return axios
      .get(
        url,
        {
          responseType: "json"
        })
      .then(t => t.data)
      .catch(this.handleError);
  }

  getMetadata = (url: string): Promise<XMLDocument> => {
    return axios
      .get(
        url,
        {
          responseType: "document"
        })
      .then(v => v.data)
      .catch(this.handleError);
  }

  private handleError = (error: any) => {
    throw error.response?.data ?
      new Error(error.response.data.error.message)
      : error;
  }


}