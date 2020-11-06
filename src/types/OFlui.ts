import { IPanelProps } from "@fluentui/react";
import { Property, Query } from "./OData";


export interface OFluiView {
    name: string;
    entitySet: string;
    id: string;
    query: Query;
}


export interface OFluiPropertyGroup {
    name: string;
    properties: Property[];
}


export interface OFluiTile {
    title: string;
    image?: string;
}

export interface OFluiItemFormHeader {
    title: string;
    description?: string;
    secondaryDescription?: string;
    color?: string;
}

export enum FieldValidation {
    isRequired,
    emailNotValid
}

export type OFluiListOptions = {
    views?: OFluiView[],
    image?: string,
    stickyHeader?: boolean,
    translations?: any,
    language?: string,
    onNewItem?: () => Promise<any>,
    formOptions?: OFluiFormOptions
}


export type OFluiTilesOptions = {
    stickyHeader?: boolean,
    translations?: any,
    language?: string
}

export interface OFluiPanelBase extends IPanelProps {
    panelType: OFluiPanelType,
    isOpen: boolean,
    onPanelOpened: () => Promise<any>,
    onDismiss: () => void,
    onRender?: (item: any) => React.ReactElement,
    language?: string,
}

export enum OFluiPanelType {
    newItem,
    displayItem,
    editItem
}

export interface OFluiItemPanelHeaderProperties {
    titleProperty?: string,
    descriptionProperty?: string,
    secondaryDescriptionProperty?: string,
}

export interface OFluiFormOptions {
    entities: { [id: string]: FormOptions; };
}

export interface FormOptions {
    fieldGroups?: FormFieldGroup[],
    onRenderDisplayForm?: (item: any) => React.ReactElement
}

export interface FormFieldGroup {
    name: string,
    properties: string[]
}
