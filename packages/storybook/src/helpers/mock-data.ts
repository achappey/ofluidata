import faker from "faker"

import {
  OFluiColumn, OFluiColumnType,
  OFluiItemHeader, OFluiOrder, OFluiView
} from "@ofluidata/core";
import { MockStore } from "./mock-store";

export const mockStore = () => new MockStore();

export const itemHeader: OFluiItemHeader =
{
  title: faker.company.companyName(),
  shortDescription: faker.internet.domainName(),
  longDescription: faker.lorem.paragraph(),
  color: faker.internet.color(),
  image: faker.image.abstract(),
  buttons: [
    {
      key: "1",
      text: "Text Only"
    },
    {
      key: "2",
      text: "Text & Icon",
      icon: "PageLink"
    },
    {
      key: "3",
      icon: "Delete"
    }
  ]
}

export const mockColumns: OFluiColumn[] = [
  {
    name: "id",
    type: OFluiColumnType.number
  },
  {
    name: "string",
    type: OFluiColumnType.text
  },
  {
    name: "datetime",
    type: OFluiColumnType.datetime
  },
  {
    name: "custom",
    type: OFluiColumnType.custom
  },
  {
    name: "multiline",
    type: OFluiColumnType.multiline
  }
]

export const mockViews: OFluiView[] = [
  {
    key: "1",
    text: "View 1",
    query: {
      order: { "id": OFluiOrder.ascending },
      fields: mockColumns.slice(0, 4)
    },
    entitySet: "items"
  },
  {
    key: "2",
    text: "View 2",
    query: {
      order: { "id": OFluiOrder.ascending },
      fields: mockColumns.slice(0, 2)
    },
    entitySet: "items"
  },
  {
    key: "3",
    text: "Dynamic view 1",
    query: {
      order: { "id": OFluiOrder.ascending },
      fields: mockColumns.slice(2, 4)
    },
    dynamicDate: {
      fields: "datetime",
      offset: 0
    },
    entitySet: "items"
  }
];

export const mockGetView = () => timeOut()
  .then(mockItems)

export const mockGroups = () => [{ name: "Group 1", columns: mockColumns }];

export const mockOptions = () => timeOut()
  .then(() => mockItems()
    .map(h => h[mockColumns[0].name]));

export const timeOut = () => new Promise(resolve =>
  setTimeout(() => {
    resolve();
  }, 500));

export const mockItems = () => [
  mockItem(),
  mockItem(),
  mockItem(),
  mockItem()
]

export const mockItem = () => {
  return {
    id: faker.random.number(),
    string: faker.name.firstName(),
    multiline: faker.lorem.paragraph(),
    datetime: faker.date.past(),
    custom: {
      fileName: faker.system.fileName()
    },
    custom_list: [{
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
    ],

  }
}


export const mockListConfig = () => {
  return {
    views: mockViews,
    columns: mockColumns,
    getView: mockGetView
  };
}

export const mockTiles = () => {
  return [
    {
      title: "List",
      image: faker.image.food(),
      listConfig: mockListConfig()
    },
    {
      title: "Custom render",
      image: faker.image.nightlife()
    },
    {
      title: "More tiles",
      image: faker.image.cats(),
      tiles: [{
        title: "Another list",
        image: faker.image.food(),
        listConfig: mockListConfig()
      },
      {
        title: "Another more tiles",
        image: faker.image.cats(),
        tiles: [{
          title: "Yet another list",
          image: faker.image.food(),
          listConfig: mockListConfig()
        }]
      },
      {
        title: "Another redirect",
        image: faker.image.transport(),
        url: "https://www.1112.net/lastpage.html"
      }],
    },
    {
      title: "Redirect",
      image: faker.image.transport(),
      url: "https://www.1112.net/lastpage.html"
    }
  ]
}

