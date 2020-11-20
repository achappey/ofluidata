import { ComplexType, Endpoint, EntityType, EnumType, Member, ODataConfig, Order, Property, PropertyType } from "../types/odata";
/*

export const toFilters = (filters?: Filter[]): string => {
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
}*/

export const valueToQueryStringValue = (property: Property, value: any, version: string) => {
  switch (property.type) {
    case PropertyType.datetime:
      switch (version) {
        case "4.0":
          return value;
        default:
          return `DateTime'${value}'`;
      }

    default:
      return value;

  }
}

export const toSelectFields = (fields: string[], properties: Property[]): string[] => {
  return fields
    .filter(f => !properties.find(a => a.name == f)!.isNavigation);
}

export const toSelect = (fields: string[]): string => {
  const select = fields
    .join(",");

  return `$select=${select}`;
}


export const toExpandFields = (fields: string[], properties: Property[]): string[] => {
  return fields
    .filter(f => properties.find(a => a.name == f)!.isNavigation);
}


export const toExpand = (fields: string[]): string => {
  const expand = fields
    .join(",");

  return `$expand=${expand}`;
}

export const toOrder = (order?: { [id: string]: Order; }): string => {
  const orderKeys = order != undefined ? Object.keys(order) : [];
  return orderKeys.length > 0
    ? `$orderby=${orderKeys
      .map(g => `${g} ${order![g]}`)
      .join(",")}` : "";
}

export const toSearchFilter = (property: Property, query: string, dataVersion: string): string => {
  switch (dataVersion) {
    case "4.0":
      return `contains(tolower(${property.name}), '${query}')`;
    default:
      return `substringof('${query}', ${property.name})`;
  }
}

export const endpointToEntityType = (endpoint: string, config: ODataConfig) => {
  const types = Object.keys(config.entityTypes);

  return types.find(d => config.entityTypes[d].entitySets.find(z => z.name == endpoint))
}

export const toODataConfig = (url: string, document: XMLDocument, endpoints: Endpoint[]) => {
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

    entityElements
      .forEach(t => {

        const key = t.querySelector("Key PropertyRef");

        const fullName = `${g.getAttribute("Namespace")}.${t.getAttribute("Name")}`;

        entityTypes[fullName] =
        {
          typeName: fullName,
          entitySets: [],
          name: t.getAttribute("Name")!,
          properties: getProperties(t),
          baseType: t.getAttribute("BaseType") != null
            ? t.getAttribute("BaseType")!
            : undefined,
          key: key != undefined ?
            key.getAttribute("Name")!
            : undefined
        };

      });

    complexElements
      .forEach(t => {
        complexTypes[`${g.getAttribute("Namespace")}.${t.getAttribute("Name")}`] =
        {
          properties: getProperties(t),
          name: t.getAttribute("Name")!,
          baseType: t.getAttribute("BaseType")
        };
      });

    enumElements
      .forEach(t => {
        enumTypes[`${g.getAttribute("Namespace")}.${t.getAttribute("Name")}`] =
        {
          name: t.getAttribute("Name")!,
          members: getMembers(t)
        };
      });

    containers
      .forEach(t => {
        const sets = Array.from(t.querySelectorAll("EntitySet"));

        sets.forEach(t => {
          entityTypes[t.getAttribute("EntityType")!].entitySets
            .push(
              {
                name: t.getAttribute("Name")!
              });
        });
      });
  });

  return {
    url: url,
    endpoints: endpoints,
    version: dataServices!.getAttribute("Version")!,
    entityTypes: entityTypes,
    enumTypes: enumTypes,
    complexTypes: complexTypes
  };
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
  const navigationProperties = Array.from(element.querySelectorAll("NavigationProperty"));

  return properties
    .concat(navigationProperties)
    .filter(y =>
      y.getAttribute("Type") !== null &&
      y.getAttribute("Name") !== null
    )
    .map(y => {
      const propertyType = toPropertyType(y.getAttribute("Type")!);

      return {
        ...propertyType,
        name: y.getAttribute("Name")!,
        required: y.hasAttribute("Nullable")
          && y.getAttribute("Nullable") === 'false',
        isNavigation: y.tagName == "NavigationProperty"
      };
    });
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


export const toMetadataUrl = (url: string) => {
  return `${url}/$metadata`;
}
