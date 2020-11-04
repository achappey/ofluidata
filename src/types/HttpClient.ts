
export interface HttpClient {
    delete(url: string): Promise<void>;
    post(url: string, data: any): Promise<any>;
    get(url: string): Promise<any>;
    getMetadata(url: string): Promise<XMLDocument>;
}