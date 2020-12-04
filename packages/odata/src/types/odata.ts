export type ODataConfig = {
  url: string,
  version: string;
  entityTypes: { [id: string]: EntityType; };
  enumTypes: { [id: string]: EnumType; };
  complexTypes: { [id: string]: ComplexType; };
  endpoints: Endpoint[]
}

export interface Parameter {
  name: string;
  type: string;
}

export interface Action {
  name: string;
  parameters?: Parameter[]
  returnType?: string;
}

export interface Function {
  name: string;
  parameters?: Parameter[]
  returnType?: string;
}

export interface Endpoint {
  name: string;
  url: string;
  kind: string;
}

export interface EntitySet {
  name: string;
}

export interface Singleton {
  name: string;
}

export interface EnumType {
  members: Member[];
  name: string;
}

export interface Member {
  name: string;
  value: any;
}

export interface ComplexType {
  properties: Property[];
  name: string;
  baseType?: string | null;
}

export interface EntityType {
  name: string;
  typeName: string;
  properties: Property[],
  entitySets: EntitySet[],
  singletons: Singleton[],
  actions: Action[],
  functions: Function[],
  baseType?: string;
  key?: string;
}


export type Query = {
  fields: string[];
  order?: { [id: string]: Order; }
  filters?: { [id: string]: any[]; }
  pageSize?: number,
  page?: number,
  totalPages?: number
}

export interface Property {
  name: string;
  type: PropertyType;
  typeName?: string;
  required?: boolean;
  isCollection?: boolean;
  computed?: boolean;
  options?: any[]
}

export enum PropertyType {
  string,
  number,
  datetime,
  duration,
  guid,
  complex,
  enum,
  navigation,
  boolean
}

export enum Order {
  Ascending = "asc",
  Descending = "desc"
}