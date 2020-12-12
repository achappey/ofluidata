
import {
    OFluiOrder, OFluiView
} from 'ofluidata-core'
import { OFluiODataListConfig } from 'ofluidata/lib/types/config'

export const defaultConfig = { lang: 'en' }

export const nlConfig = { lang: 'nl' }

export const odataMockViews: OFluiView[] = [
    {
        key: '1',
        text: 'Sorted on FirstName',
        query: {
            order: { FirstName: OFluiOrder.ascending },
            fields: ['UserName', 'FirstName', 'LastName']
        },
        entitySet: 'People'
    },
    {
        key: '2',
        text: 'Sorted on LastName',
        query: {
            order: { LastName: OFluiOrder.ascending },
            fields: ['UserName', 'FirstName', 'LastName', 'Emails']
        },
        entitySet: 'People'
    },
    {
        key: '3',
        text: 'Custom PageSize',
        query: {
            pageSize: 2,
            order: { UserName: OFluiOrder.ascending },
            fields: ['UserName', 'FirstName', 'LastName', 'Emails']
        },
        entitySet: 'People'
    },
    {
        key: '4',
        text: 'Dynamic view 1',
        query: {
            order: { UserName: OFluiOrder.ascending },
            fields: ['UserName', 'FirstName', 'LastName', 'Emails']
        },
        dynamicDate: {
            fields: 'datetime',
            offset: 0
        },
        entitySet: 'People'
    }
]

export const customViewsConfig: OFluiODataListConfig = {
    ...defaultConfig,
    views: odataMockViews
}
