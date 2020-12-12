# ofluidata

<a href="https://reactjs.org/">React</a> list and form components that wraps up <a href="https://developer.microsoft.com/en-us/fluentui#/">Microsoft Fluent Design</a> and <a href="https://www.odata.org/">OData</a>.

Install with npm:

```
npm i ofluidata --save
```

## Demos

<a href="https://achappey.github.io/ofluidata/?path=/story/odata-list--default">Default List</a> - 
<a href="https://achappey.github.io/ofluidata/?path=/story/odata-list--custom-views">Custom Views</a> -
<a href="https://achappey.github.io/ofluidata/?path=/story/odata-org-northwind-read-only--tiles">Northwind</a> -
<a href="https://achappey.github.io/ofluidata/?path=/story/odata-org-odatademo-read-write--tiles">ODataDemo</a> -
<a href="https://achappey.github.io/ofluidata/?path=/story/odata-org-trippin-read-write--tiles">TripPin</a>


## Getting started

Tiles component:

```javascript
import { OFluiODataTiles } from 'ofluidata';

// Ex. https://services.odata.org/V3/(S(readwrite))/OData/OData.svc
const url: string = "Your OData url"; 

const options: OFluiODataTilesConfig | undefined = {}; 

<OFluiODataTiles 
  url={url}
  options={options}
/>
```
```
OFluiODataTilesConfig  = {
  title?: string
  lang?: string
  lists?: { [id: string]: OFluiODataListConfig; };
}
```

List component:

```javascript
import { OFluiODataList } from 'ofluidata';

// Ex. https://services.odata.org/V3/(S(readwrite))/OData/OData.svc
const url: string = "Your OData url"; 

// Ex. ODataDemo.Product
const entityType: string = "Your Entity Type Name (incl Namespace)"; 

const options: OFluiODataListConfig | undefined = {}; 

<OFluiODataList 
  url={url}
  entityType={entityType}
  options={options}
/>
```
```
OFluiODataListConfig = {
  views?: OFluiView[]
  image?: string
  lang?: string
}
```
