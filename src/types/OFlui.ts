import { Query } from "./OData";


export interface View {
    name: string;
    entitySet: string;
    id: string;
    query: Query;
}


export enum FieldValidation {
    isRequired,
    emailNotValid
}