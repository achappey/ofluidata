import { IColumn, ICommandBarItemProps } from "@fluentui/react";
import { Property } from "../types/OData";
import { View } from "../types/OFlui";

export const toColumn = (field: Property): IColumn => {
    return {
        key: field.name,
        fieldName: field.name,
        name: field.name,
        isResizable: true,
        minWidth: 100,
    }
};


export const toCommandBarItems = (views: View[]): ICommandBarItemProps[] => {
    return views.map(g => {
        return {
            key: g.id,
            text: g.name
        };
    });
}