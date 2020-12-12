import {
    ComplexType, Endpoint, EntityType, EnumType,
    Member, Parameter, Property, PropertyType
} from '../types/odata'

export const isCollection = (type: string) => {
    return type.startsWith('Collection(')
}

const stripCollection = (type: string) => {
    if (isCollection(type)) {
        const parsed = type.replace('Collection(', '')

        return parsed.substring(0, parsed.length - 1)
    }

    return type
}

export const toPropertyType = (type: string, navigationProperty: boolean) => {
    const parsed = stripCollection(type)

    let propertyType: PropertyType = navigationProperty
        ? PropertyType.navigation
        : PropertyType.complex

    switch (parsed) {
        case 'Edm.String':
            propertyType = PropertyType.string
            break
        case 'Edm.Guid':
            propertyType = PropertyType.guid
            break
        case 'Edm.Boolean':
            propertyType = PropertyType.boolean
            break
        case 'Edm.Double':
        case 'Edm.Int64':
        case 'Edm.Int32':
        case 'Edm.Int16':
        case 'Edm.Decimal':
            propertyType = PropertyType.number
            break
        case 'Edm.DateTimeOffset':
        case 'Edm.DateTime':
            propertyType = PropertyType.datetime
            break
        default:
            break
    }

    return {
        type: propertyType,
        typeName: parsed,
        isCollection: isCollection(type)
    }
}

export const toMetadataUrl = (url: string) => {
    return `${url}/$metadata`
}

const getMembers = (element: Element): Member[] => {
    const members = Array.from(element.querySelectorAll('Member'))

    return members
        .map(y => {
            return {
                name: y.getAttribute('Name')!,
                value: y.getAttribute('Value')
            }
        })
}

const getProperties = (element: Element): Property[] => {
    const properties = Array.from(element.querySelectorAll('Property'))
    const navigationProperties = Array.from(element.querySelectorAll('NavigationProperty'))

    return properties
        .concat(navigationProperties)
        .filter(y =>
            y.getAttribute('Type') !== null &&
            y.getAttribute('Name') !== null
        )
        .map(y => {
            const propertyType = toPropertyType(y.getAttribute('Type')!, y.tagName === 'NavigationProperty')

            return {
                ...propertyType,
                name: y.getAttribute('Name')!,
                required: y.hasAttribute('Nullable') &&
                    y.getAttribute('Nullable') === 'false'
            }
        })
}

const getFunctionAction = (element: Element) => {
    const returnType = element.querySelector('ReturnType')
    const params = element.querySelectorAll('Parameter')
    const parameters: Parameter[] = []

    params.forEach(p => {
        parameters.push({
            name: p.getAttribute('Name')!,
            type: p.getAttribute('Type')!
        })
    })

    return {
        name: element.getAttribute('Name')!,
        parameters: parameters,
        returnType: returnType?.getAttribute('Type')!
    }
}

export const toODataConfig = (url: string, document: XMLDocument, endpoints: Endpoint[]) => {
    const entityTypes: { [id: string]: EntityType; } = {}
    const complexTypes: { [id: string]: ComplexType; } = {}
    const enumTypes: { [id: string]: EnumType; } = {}

    const schemas = document.querySelectorAll('Schema')
    const dataServices = document.querySelector('Edmx')

    schemas.forEach(g => {
        const entityElements = Array.from(g.querySelectorAll('EntityType'))

        entityElements
            .forEach(t => {
                const key = t.querySelector('Key PropertyRef')

                const fullName = `${g.getAttribute('Namespace')}.${t.getAttribute('Name')}`

                entityTypes[fullName] =
                {
                    typeName: fullName,
                    entitySets: [],
                    singletons: [],
                    name: t.getAttribute('Name')!,
                    properties: getProperties(t),
                    actions: [],
                    functions: [],
                    baseType: t.getAttribute('BaseType') != null
                        ? t.getAttribute('BaseType')!
                        : undefined,
                    key: key !== null
                        ? key.getAttribute('Name')!
                        : undefined
                }
            })

        const complexElements = Array.from(g.querySelectorAll('ComplexType'))

        complexElements
            .forEach(t => {
                complexTypes[`${g.getAttribute('Namespace')}.${t.getAttribute('Name')}`] =
                {
                    properties: getProperties(t),
                    name: t.getAttribute('Name')!,
                    baseType: t.getAttribute('BaseType')
                }
            })

        const enumElements = Array.from(g.querySelectorAll('EnumType'))

        enumElements
            .forEach(t => {
                enumTypes[`${g.getAttribute('Namespace')}.${t.getAttribute('Name')}`] =
                {
                    name: t.getAttribute('Name')!,
                    members: getMembers(t)
                }
            })

        const enumTypeKeys = Object.keys(enumTypes)
        const entityTypeKeys = Object.keys(entityTypes)

        enumTypeKeys.forEach(key => {
            entityTypeKeys.forEach(type => {
                entityTypes[type].properties = entityTypes[type].properties.map(g => {
                    return g.typeName === key
                        ? {
                            ...g,
                            type: PropertyType.enum,
                            options: enumTypes[key].members.map(n => n.name)
                        }
                        : g
                })
            })
        })

        const containers = Array.from(g.querySelectorAll('EntityContainer'))

        containers
            .forEach(t => {
                const sets = Array.from(t.querySelectorAll('EntitySet'))

                sets.forEach(z => {
                    entityTypes[z.getAttribute('EntityType')!].entitySets
                        .push(
                            {
                                name: z.getAttribute('Name')!
                            })
                })

                const singletons = Array.from(t.querySelectorAll('Singleton'))

                singletons.forEach(z => {
                    entityTypes[z.getAttribute('Type')!].singletons
                        .push(
                            {
                                name: z.getAttribute('Name')!
                            })
                })
            })

        const annotations = Array.from(g.querySelectorAll('Annotations'))

        annotations
            .forEach(t => {
                const computedAnnotation = t.querySelector("[Term*='Org.OData.Core.V1.Computed']")
                const target = computedAnnotation?.parentElement?.getAttribute('Target')!.split('/')

                if (target) {
                    const entityTypeName = target[0]
                    const propertyName = target[1]
                    const property = entityTypes[entityTypeName].properties.find(f => f.name === propertyName)

                    if (property) {
                        property.computed = JSON.parse(computedAnnotation?.getAttribute('Bool')!)
                    }
                }
            })

        const actions = Array.from(g.querySelectorAll('Action'))

        actions
            .forEach(t => {
                if (t.getAttribute('IsBound')) {
                    const boundProperty = t.firstElementChild!.getAttribute('Type')

                    entityTypes[boundProperty!].actions.push(getFunctionAction(t))
                }
            })

        const functions = Array.from(g.querySelectorAll('Function'))

        functions
            .forEach(t => {
                if (t.getAttribute('IsBound')) {
                    const boundProperty = t.firstElementChild!.getAttribute('Type')

                    entityTypes[boundProperty!].functions.push(getFunctionAction(t))
                }
            })
    })

    return {
        url: url,
        endpoints: endpoints,
        version: dataServices!.getAttribute('Version')!,
        entityTypes: entityTypes,
        enumTypes: enumTypes,
        complexTypes: complexTypes
    }
}
