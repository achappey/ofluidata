export interface OFluiHttpClient {
  delete(url: string): Promise<void>;
  post(url: string, data: any): Promise<any>;
  get(url: string): Promise<any>;
  getMetadata(url: string): Promise<XMLDocument>;
}
