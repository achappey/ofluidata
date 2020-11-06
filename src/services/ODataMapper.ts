import {
    ComplexType, EntityType,
    EnumType, Filter, Member,
    ODataMetadata, Property,
    PropertyType, Query
} from "../types/OData";
import { FieldValidation } from "../types/OFlui";

export const validateField = (property: Property, value: any) => {
    const isValid = property.required
        && (value == undefined || value.length == 0)
        ? FieldValidation.isRequired : undefined;

    return isValid;
};

export const isCommaDecimalLocale = () => {
    var n = 1.1;
    return n.toLocaleString("nl-NL").substring(1, 2) == ",";
}

export const toUrlValue = (value: any, property: Property): string => {
    switch (property.type) {
        case PropertyType.string:
            return `'${encodeURIComponent(value).replace(/[']/g, '%27%27')}'`;
        case PropertyType.datetime:
            return `DateTime'${value}'`;
        default:
            return value;
    }
}



const toFilters = (filters?: Filter[]): string => {
    const groupedFilter = filters != undefined
        && filters.length > 0
        ? groupyBy(filters, "property.name") : {};

    const groupedKeys = Object.keys(groupedFilter);

    const filterQuery = filters != undefined
        && filters.length > 0
        ? `&$filter=${groupedKeys
            .map(g => `(${groupedFilter[g]
                .map((z: any) => `${z.property.name} ${z.operator} ${toUrlValue(z.value, z.property)}`)
                .join(" or ")})`)
            .join(" and ")}` : "";

    return filterQuery;
}

export const toQueryString = (query: Query): string => {
    const orderKeys = query.order != undefined ? Object.keys(query.order) : [];
    const selectFields = query.fields.join(",");
    const orderQuery = orderKeys.length > 0
        ? `&$orderby=${orderKeys
            .map(g => `${g} ${query!.order![g]}`)
            .join(",")}` : "";

    return `$select=${selectFields}${orderQuery}${toFilters(query.filters)}`;
}

export const toSearchFilter = (property: Property, query: string, dataVersion: string): string => {
    switch (dataVersion) {
        case "4.0":
            return `contains(tolower(${property.name}), '${query}')`;
        default:
            return `substringof('${query}', ${property.name})`;
    }
}

export const addODataType = (itemType: string, item: any, dataVersion: string): string => {
    switch (dataVersion) {
        case "4.0":
            return {
                ...item,
                ["@odata.type"]: itemType
            }
        default:
            return {
                ...item,
                ["odata.type"]: itemType
            };
    }
}

export const withNextLink = (data: any, baseUrl: string) => {
    let nextLink = data["@odata.nextLink"] != undefined ? data["@odata.nextLink"]
        : data["odata.nextLink"] != undefined ? data["odata.nextLink"]
            : undefined;

    if (nextLink != undefined && nextLink.indexOf("http") == -1) {
        nextLink = `${baseUrl}/${nextLink}`;
    }

    return {
        ...data,
        nextLink: nextLink
    };
}

export const discoverMetadata = (baseUrl: string, data: any) => {
    return data["@odata.context"] != undefined ? data["@odata.context"]
        : data["odata.metadata"] != undefined ? data["odata.metadata"]
            : `${baseUrl}/$metadata`;
}

export const ensureProtocol = (baseUrl: string, metadataUrl: string) => {
    const base = new URL(baseUrl);
    const meta = new URL(metadataUrl);
    meta.protocol = base.protocol;

    return meta.toString();
}

const isCollection = (type: string) => {
    return type.startsWith("Collection(");
}

const stripCollection = (type: string) => {
    if (isCollection(type)) {
        const parsed = type.replace("Collection(", "");

        return parsed.substring(0, parsed.length - 1);
    }

    return type;
}

const toPropertyType = (type: string) => {
    const parsed = stripCollection(type);

    let propertyType: PropertyType = PropertyType.custom;

    switch (parsed) {
        case "Edm.String":
            propertyType = PropertyType.string;
            break;
        case "Edm.Guid":
            propertyType = PropertyType.guid;
            break;
        case "Edm.Double":
        case "Edm.Int64":
        case "Edm.Int32":
        case "Edm.Int16":
        case "Edm.Decimal":
            propertyType = PropertyType.number;
            break;
        case "Edm.DateTimeOffset":
        case "Edm.DateTime":
            propertyType = PropertyType.datetime;
            break;
        default:
            break;
    }

    return {
        type: propertyType,
        typeName: parsed,
        isCollection: isCollection(type)
    }
}

const getMembers = (element: Element): Member[] => {
    const members = Array.from(element.querySelectorAll("Member"));

    return members
        .map(y => {
            return {
                name: y.getAttribute("Name")!,
                value: y.getAttribute("Value"),
            };
        });
}

const getProperties = (element: Element): Property[] => {
    const properties = Array.from(element.querySelectorAll("Property"));

    return properties
        .filter(y => y.getAttribute("Type") !== null && y.getAttribute("Name") !== null)
        .map(y => {
            const propertyType = toPropertyType(y.getAttribute("Type")!);

            return {
                ...propertyType,
                name: y.getAttribute("Name")!,
                required: y.hasAttribute("Nullable") && y.getAttribute("Nullable") === 'false',
            };
        });
}

const byString = (o: any, s: string) => {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

export const groupyBy = (array: any[], propertyName: string) => {
    return array
        .reduce((r, a) => {
            const val = byString(a, propertyName);
            r[val] = r[val] || [];
            r[val].push(a);
            return r;
        }, Object.create(null));
}

export const toODataMetadata = (document: XMLDocument): ODataMetadata => {
    const entityTypes: { [id: string]: EntityType; } = {};
    const complexTypes: { [id: string]: ComplexType; } = {};
    const enumTypes: { [id: string]: EnumType; } = {};
    const schemas = document.querySelectorAll("Schema");
    const dataServices = document.querySelector("Edmx");

    schemas.forEach(g => {
        const enumElements = Array.from(g.querySelectorAll("EnumType"));
        const complexElements = Array.from(g.querySelectorAll("ComplexType"));
        const entityElements = Array.from(g.querySelectorAll("EntityType"));
        const containers = Array.from(g.querySelectorAll("EntityContainer"));

        entityElements.forEach(t => {

            const key = t.querySelector("Key PropertyRef");

            const fullName = `${g.getAttribute("Namespace")}.${t.getAttribute("Name")}`;

            entityTypes[fullName] =
                new EntityType(t.getAttribute("Name"),
                    fullName,
                    getProperties(t),
                    t.getAttribute("BaseType"),
                    key != undefined ? key.getAttribute("Name") : undefined);
        });

        complexElements.forEach(t => {
            complexTypes[`${g.getAttribute("Namespace")}.${t.getAttribute("Name")}`] = {
                properties: getProperties(t),
                name: t.getAttribute("Name"),
                baseType: t.getAttribute("BaseType")
            };
        });

        enumElements.forEach(t => {
            enumTypes[`${g.getAttribute("Namespace")}.${t.getAttribute("Name")}`] = {
                name: t.getAttribute("Name"),
                members: getMembers(t)
            };
        });

        containers.forEach(t => {
            const sets = Array.from(t.querySelectorAll("EntitySet"));

            sets.forEach(t => {
                entityTypes[t.getAttribute("EntityType")!].entitySets!.push(
                    {
                        name: t.getAttribute("Name")
                    });
            });
        });
    });

    return {
        version: dataServices!.getAttribute("Version")!,
        entityTypes: entityTypes,
        enumTypes: enumTypes,
        complexTypes: complexTypes
    };
};