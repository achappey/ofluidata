import { IColumn, ICommandBarItemProps } from "@fluentui/react";
import { EntityType, Property } from "../types/OData";
import { OFluiFormOptions, OFluiListOptions, OFluiPropertyGroup, OFluiTilesOptions, OFluiView } from "../types/OFlui";

export const toColumn = (field: Property): IColumn => {
    return {
        key: field.name,
        fieldName: field.name,
        name: field.name,
        isResizable: true,
        minWidth: 100,
    }
};


export const toFieldGroups = (entityType: EntityType, config?: OFluiFormOptions): OFluiPropertyGroup[] => {
    return !config || !config[entityType.typeName!] || !config[entityType.typeName!].formGroups
        ?
        [
            {
                name: "Group",
                properties: entityType.properties
            }
        ]
        : config[entityType.typeName!].formGroups.map((p: any) => {
            return {
                ...p,
                properties: entityType.properties.filter(a => p.properties.indexOf(a.name) > -1)
            }
        });
}

export const toCommandBarItems = (views: OFluiView[]): ICommandBarItemProps[] => {
    return views.map(g => {
        return {
            key: g.id,
            text: g.name
        };
    });
}


export const toListOptions = (options?: OFluiTilesOptions): OFluiListOptions => {
    return options ? {
        stickyHeader: options.stickyHeader,
        language: options.language,
    } : {};
}

export const listOptions = (options?: OFluiListOptions): OFluiListOptions => {
    return options ? options : {};
}

export const tileOptions = (options?: OFluiTilesOptions): OFluiTilesOptions => {
    return options ? options : {};
}