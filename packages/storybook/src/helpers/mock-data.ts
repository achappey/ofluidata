import faker from 'faker'

import {
    OFluiAction,
    OFluiColumn, OFluiColumnType,
    OFluiItemHeader, OFluiLookup, OFluiOrder, OFluiView
} from 'ofluidata-core'
import { MockStore } from './mock-store'

export const mockStore = (pageSize?: number) => new MockStore(pageSize)

export const mockLookup = () => {
    return {
        id: faker.random.number(),
        string: faker.company.companyName()
    }
}

export const timeOut = () => new Promise<void>(resolve =>
    setTimeout(() => {
        resolve()
    }, 500))

export const mockError = () =>
    timeOut()
        .then(() => { throw new Error(faker.lorem.sentence()) })

export const mockItem = (lookup?: any, lookupList?: any) => {
    return {
        id: faker.random.number(),
        string: faker.name.firstName(),
        multiline: faker.lorem.paragraph(),
        datetime: faker.date.past(),
        boolean: faker.random.boolean(),
        lookup: lookup,
        lookup_list: lookupList,
        complex: {
            fileName: faker.system.fileName()
        },
        complex_list: [{
            fileName: faker.system.fileName()
        }, {
            fileName: faker.system.fileType()
        }],
        string_list: [
            faker.name.lastName(),
            faker.name.jobDescriptor(),
            faker.name.jobTitle()
        ],
        datetime_list: [
            faker.date.past(),
            faker.date.future(),
            faker.date.soon()
        ]

    }
}

export const mockItems = () => [
    mockItem(),
    mockItem(),
    mockItem(),
    mockItem()
]

export const mockColumns: OFluiColumn[] = [
    {
        name: 'id',
        required: true,
        type: OFluiColumnType.number
    },
    {
        name: 'string',
        required: true,
        type: OFluiColumnType.text
    },
    {
        name: 'datetime',
        type: OFluiColumnType.datetime
    },
    {
        name: 'lookup',
        type: OFluiColumnType.lookup,
        required: true,
        getValue: (item: any) => item ? item.string : '',
        getForm: () => {
            return {
                columns: mockColumns,
                //  groups: mockGroups(),
                item: mockItem(mockLookup(), [mockLookup(), mockLookup()])
            }
        }
    },
    {
        name: 'lookup_list',
        isArray: true,
        type: OFluiColumnType.lookup,
        //  getValues: (item) => item ? item.length.toString() : "",
        getList: () => {
            return {
                columns: mockColumns,
                views: [],
                // views: mockViews,
                setKey: 'id',
                getView: () => timeOut().then(() => { return { items: mockItems() } })
            }
        }
    },
    {
        name: 'complex',
        type: OFluiColumnType.complex
    },
    {
        name: 'multiline',
        type: OFluiColumnType.multiline
    },
    {
        name: 'boolean',
        type: OFluiColumnType.boolean
    },
    {
        name: 'choice',
        type: OFluiColumnType.choice,
        options: [
            '1', '2', '3'
        ]
    }
]

export const mockGroups = () => [{
    name: 'Group 1',
    columns: mockColumns
        .map(f => f.name)
}]

export const mockViews: OFluiView[] = [
    {
        key: '1',
        text: 'View 1',
        query: {
            order: { id: OFluiOrder.ascending },
            fields: mockColumns.map(d => d.name)
        },
        entitySet: 'items'
    },
    {
        key: '2',
        text: 'View 2',
        query: {
            order: { id: OFluiOrder.ascending },
            fields: mockColumns.slice(0, 2).map(d => d.name)
        },
        entitySet: 'items'
    },
    {
        key: '3',
        text: 'Dynamic view 1',
        query: {
            order: { id: OFluiOrder.ascending },
            fields: mockColumns.slice(2, 4).map(d => d.name)
        },
        dynamicDate: {
            fields: 'datetime',
            offset: 0
        },
        entitySet: 'items'
    }
]

export const itemHeader: OFluiItemHeader =
{
    title: faker.company.companyName(),
    shortDescription: faker.internet.domainName(),
    longDescription: faker.lorem.paragraph(),
    color: faker.internet.color(),
    image: faker.image.abstract(),
    buttons: [
        {
            key: '1',
            text: 'Text Only'
        },
        {
            key: '2',
            text: 'Text & Icon',
            icon: 'PageLink'
        },
        {
            key: '3',
            icon: 'Delete'
        }
    ]
}

export const mockActions: OFluiAction[] = [
    {
        name: 'Action1',
        onExecute: (params: any) => timeOut().then(() => {
            console.log(params)
            return {
                ...params,
                id: params.id * 100,
                string: 'Something happened here ' + params.string,
                datetime: new Date()
            }
        }),
        parameters: {
            columns: mockColumns.slice(0, 3)
        },
        returnType: {
            columns: mockColumns.slice(0, 3)
        }
    },
    {
        name: 'Action2',
        onExecute: () => timeOut().then(null)
    }
]

export const mockGetView = () => timeOut()
    .then(mockItems)

export const mockOptions = () => timeOut()
    .then(() => mockItems()
        .map(h => h[mockColumns[0].name]))

export const mockSearch = (_column: OFluiColumn, query: string): Promise<OFluiLookup[]> => {
    return timeOut()
        .then(() => mockItems()
            .filter(a => a.string.indexOf(query) > -1)
            .map(i => {
                return {
                    key: i.id,
                    name: i.string
                }
            }))
}

export const mockListConfig = () => {
    return {
        views: mockViews,
        columns: mockColumns,
        getView: mockGetView
    }
}

export const mockTiles = () => {
    return [
        {
            title: 'List',
            image: faker.image.food(),
            listConfig: mockListConfig()
        },
        {
            title: 'Custom render',
            image: faker.image.nightlife()
        },
        {
            title: 'Item tiles',
            image: faker.image.nightlife(),
            itemTiles: {
                itemConfig: {
                    columns: mockColumns
                },
                item: mockItem(),
                tiles: [{
                    title: 'Another list',
                    image: faker.image.food(),
                    listConfig: mockListConfig()
                },
                {
                    title: 'Another more tiles',
                    image: faker.image.cats(),
                    tiles: [{
                        title: 'Yet another list',
                        image: faker.image.food(),
                        listConfig: mockListConfig()
                    }]
                },
                {
                    title: 'Another redirect',
                    image: faker.image.transport(),
                    url: 'https://www.1112.net/lastpage.html'
                }]
            }
        },
        {
            title: 'More tiles',
            image: faker.image.cats(),
            tiles: [{
                title: 'Another list',
                image: faker.image.food(),
                listConfig: mockListConfig()
            },
            {
                title: 'Another more tiles',
                image: faker.image.cats(),
                tiles: [{
                    title: 'Yet another list',
                    image: faker.image.food(),
                    listConfig: mockListConfig()
                }]
            },
            {
                title: 'Another redirect',
                image: faker.image.transport(),
                url: 'https://www.1112.net/lastpage.html'
            }]
        },
        {
            title: 'Redirect',
            image: faker.image.transport(),
            url: 'https://www.1112.net/lastpage.html'
        }
    ]
}
