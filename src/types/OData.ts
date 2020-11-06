
export enum Order {
    Ascending = "asc",
    Descending = "desc"
}

export class ODataConfig {

    constructor(public endpoints: Endpoint[],
        public metadata: ODataMetadata) {
    }

    getDefaultEndpointUrl = (typeName: string) => {
        const entity = this.getEntity(typeName);

        return this.endpoints.find(e => e.name == entity.entitySets![0].name)!.url;
    }

    getVersion = () => {
        return this.metadata.version;
    }

    getEntity = (entityType: string) => {
        return this.metadata.entityTypes[entityType];
    }

    getEntityByEntitySet = (entitySet: string) => {
        return this.getEntities()
            .find(f => f.entitySets!.find(a => a.name == entitySet));
    }

    getEntities = () => {
        return Object
            .keys(this.metadata.entityTypes)
            .map(f => this.metadata.entityTypes[f]);
    }
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

export class EntityType {
    entitySets?: EntitySet[] = [];

    constructor(public name: string | null,
        public typeName: string | null,
        public properties: Property[],
        public baseType?: string | null,
        public key?: string | null) {

    }

    get keyProperty() {
        return this.properties.find(r => r.name == this.key);
    }


    get keyPropertyName() {
        return this.keyProperty!.name;
    }
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