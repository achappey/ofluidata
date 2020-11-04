
export enum Order {
    Ascending = "asc",
    Descending = "desc"
}

export interface ODataConfig {
    endpoints: Endpoint[];
    metadata: ODataMetadata;
}

export interface ODataMetadata {
    version: string;
    entityTypes: { [id: string]: EntityType; };
    enumTypes: { [id: string]: EnumType; };
    complexTypes: { [id: string]: ComplexType; };
}

export interface Endpoint {
    name: string;
    url: string;
}

export interface Filter {
    property: Property;
    operator: string;
    value: string;
}

export type Query = {
    fields: string[];
    order?: { [id: string]: Order; }
    filters?: Filter[];
}

export interface Schema {
    namespace: string | null;
    entityTypes?: EntityType[];
    containers?: Container[];
}

export interface Container {
    name: string | null;
    entitySets?: EntitySet[];
}

export interface EntitySet {
    name: string | null;
}

export interface ComplexType {
    properties: Property[];
    name: string | null;
    baseType?: string | null;
}

export interface EntityType {
    properties: Property[];
    key?: string | null;
    name: string | null;
    entitySets?: EntitySet[];
    baseType?: string | null;
}

export interface EnumType {
    members: Member[];
    name: string | null;
}

export interface Member {
    name: string;
    value: any;
}

export interface Property {
    name: string;
    type: PropertyType;
    typeName: string;
    required?: boolean;
    isCollection?: boolean;
}

export enum PropertyType {
    string,
    number,
    datetime,
    duration,
    guid,
    custom
}