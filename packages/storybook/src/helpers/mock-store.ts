import { OFluiColumn, OFluiOrder, OFluiView } from 'ofluidata-core'
import { mockColumns, mockItem, mockLookup, timeOut } from './mock-data'

const extractFields = (items: any[], fields: string[]) => {
    return items.map(y => {
        const result = {
            id: y.id
        }

        fields.forEach(a => {
            result[a] = y[a]
        })

        return result
    })
}

const search = (items: any[], properties: string[], query: string) => {
    return {
        items: items.filter(y => {
            const validations: boolean[] = []

            properties.forEach(g => {
                validations.push(y[g] && y[g].toString()
                    .toLowerCase()
                    .indexOf(query
                        .toLowerCase()) > -1)
            })

            return validations.filter(a => a).length > 0
        })
    }
}

const applyFilter = (items: any[], filters?: any) => {
    if (filters) {
        const filterKeys = Object.keys(filters)

        return items.filter(y => {
            const validations: boolean[] = []

            filterKeys.forEach(g => {
                validations.push(filters[g].indexOf(y[g]) > -1)
            })

            return validations.filter(a => !a).length === 0
        })
    }

    return items
}

const applyOrder = (items: any[], order?: any) => {
    if (order) {
        const filterKeys = Object.keys(order)

        items.sort((a: any, b: any) => {
            let result = 0

            filterKeys.forEach(z => {
                if (result === 0) {
                    result = order[z] === OFluiOrder.ascending
                        ? a[z] && a[z].localeCompare ? a[z].localeCompare(b[z]) : a[z] - b[z]
                        : b[z] && b[z].localeCompare ? b[z].localeCompare(a[z]) : b[z] - a[z]
                }
            })

            return result
        })
    }

    return items
}

export class MockStore {
    lookups: any[] = [];
    items: any[] = [];
    currentPage = 1;
    pageSize?: number;

    // eslint-disable-next-line space-before-function-paren
    constructor(pageSize?: number) {
        for (let i = 0; i < 10; i++) {
            this.lookups.push(mockLookup())
        }

        for (let i = 0; i < 7; i++) {
            this.items.push(mockItem(
                this.lookups[i],
                this.lookups.slice(0, 2)))
        }

        this.pageSize = pageSize
    }

    lookupSearch = (_column: OFluiColumn, query: string) => {
        return timeOut()
            .then(() => this.lookups
                .filter(a => a.string.indexOf(query) > -1)
                .map(h => {
                    return {
                        key: h.id,
                        name: h.string
                    }
                }))
    }

    search = (query: string) => {
        return timeOut()
            .then(() => search(
                this.items,
                mockColumns
                    .map(g => g.name), query))
    }

    updateItem = async (item: any) => {
        await timeOut()

        this.items.splice(this.items.findIndex(a => a.id === item.id), 1, item)

        return item
    }

    deleteItem = (item: any) => {
        return timeOut()
            .then(() => { this.items = this.items.filter(a => a.id !== item.id) })
    }

    createItem = (item: any) => {
        return timeOut()
            .then(() => this.items.push(item))
            .then(() => item)
    }

    getItem = (item: any) => {
        return timeOut()
            .then(() => this.items.find(a => a.id === item.id))
    }

    onAction = (_action: any, item: any, _params: any) => {
        return timeOut()
            .then(() => this.items.find(a => a.id === item.id))
    }

    getPage = (view: OFluiView, page: number) => {
        this.currentPage = page
        return this.getItems(view)
            .then((a) => {
                return {
                    items: a,
                    nextPage: this.items.length / this.pageSize! > page ? page + 1 : undefined
                }
            })
    }

    private getItems = (view: OFluiView) => {
        return timeOut()
            .then(() => this.items)
            .then((a: any[]) => applyFilter(a, view.query.filters))
            .then((a: any[]) => applyOrder(a, view.query.order))
            .then((a: any[]) => extractFields(a, view.query.fields))
            .then((a: any[]) => this.pageSize! > 0
                ? a.slice((this.currentPage - 1) * this.pageSize!,
                    this.pageSize! + ((this.currentPage - 1) * this.pageSize!))
                : a)
    }

    getView = (view: OFluiView) => {
        this.currentPage = 1

        return this.getItems(view)
            .then((a: any[]) => {
                return {
                    items: a,
                    nextPage: this.pageSize && this.pageSize > 0 ? this.currentPage + 1 : undefined
                }
            })
    }

    getOptions = (_view: OFluiView, column: OFluiColumn) => {
        console.log(_view)
        console.log(column)
        return timeOut()
            .then(() => this.items
                .map(h => h[column.name]))
    }
}
