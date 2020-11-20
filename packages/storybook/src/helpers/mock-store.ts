import { OFluiColumn, OFluiOrder, OFluiView } from "@ofluidata/core";
import { mockColumns, mockItem, timeOut } from "./mock-data";


const extractFields = (items: any[], fields: OFluiColumn[]) => {
  return items.map(y => {
    let result = {
      id: y.id
    };

    fields.forEach(a => {
      result[a.name] = y[a.name];
    });

    return result;
  });
}

const search = (items: any[], properties: string[], query: string) => {
  return items.filter(y => {
    const validations: boolean[] = [];

    properties.forEach(g => {
      validations.push(y[g] && y[g].toString()
        .toLowerCase()
        .indexOf(query
          .toLowerCase()) > -1);
    });

    return validations.filter(a => a).length > 0;
  });

}


const applyFilter = (items: any[], filters?: any) => {
  if (filters) {
    const filterKeys = Object.keys(filters);

    return items.filter(y => {
      const validations: boolean[] = [];

      filterKeys.forEach(g => {
        validations.push(filters[g].indexOf(y[g]) > -1);
      });

      return validations.filter(a => !a).length == 0;
    });
  }

  return items;
}


const applyOrder = (items: any[], order?: any) => {
  console.log(items);
  if (order) {
    const filterKeys = Object.keys(order);

    items.sort((a: any, b: any) => {
      let result = 0;

      filterKeys.forEach(z => {
        if (result == 0) {
          result = order[z] == OFluiOrder.ascending ?
            a[z] && a[z].localeCompare ? a[z].localeCompare(b[z]) : a[z] - b[z]
            : b[z] && b[z].localeCompare ? b[z].localeCompare(a[z]) : b[z] - a[z];
        }
      });

      return result;
    });
  }

  return items;
}

export class MockStore {

  items: any[] = [];

  constructor() {
    for (let i = 0; i < 200; i++) {
      this.items.push(mockItem())
    }
  }

  search = (query: string) => {
    return timeOut()
      .then(() => search(
        this.items,
        mockColumns
          .map(g => g.name), query));
  }

  updateItem = (item: any) => {
    return timeOut()
      .then(() => {
        this.items.splice(this.items.findIndex(a => a.id == item.id), item);
        return item;
      })
  }

  createItem = (item: any) => {
    return timeOut()
      .then(() => this.items.push(item));
  }

  getItem = (item: any) => {
    return timeOut()
      .then(() => this.items.find(a => a.id == item.id));
  }

  getView = (view: OFluiView) => {
    return timeOut()
      .then(() => this.items)
      .then((a: any[]) => applyFilter(a, view.query.filters))
      .then((a: any[]) => applyOrder(a, view.query.order))
      .then((a: any[]) => extractFields(a, view.query.fields));
  }

  getOptions = (column: OFluiColumn) =>
    timeOut()
      .then(() => this.items
        .map(h => h[column.name]));


}