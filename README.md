# ofluidata

React components that wraps up <a href="https://developer.microsoft.com/en-us/fluentui#/">Microsoft Fluent Design</a> and <a href="https://www.odata.org/">OData</a>.

Install with npm:

```
npm i ofluidata --save
```

## Demos

<a href="https://achappey.github.io/ofluidata-storybook/?path=/story/list--default">Default List</a> - 
<a href="https://achappey.github.io/ofluidata-storybook/?path=/story/odata-org-northwind">Northwind</a> -
<a href="https://achappey.github.io/ofluidata-storybook/?path=/story/odata-org-odatademo">ODataDemo</a> -
<a href="https://achappey.github.io/ofluidata-storybook/?path=/story/odata-org-trippin">TripPin</a>


## Getting started

List component:

```javascript
import { OFluiList } from 'ofluidata';

const url: string = "Your OData url"; // Ex. https://services.odata.org/V3/(S(readwrite))/OData/OData.svc
const entityType: string = "Your Entity Type Name (incl Namespace)"; // Ex. ODataDemo.Product
const options: OFluiListOptions | undefined = {}; 

<OFluiList url={url}
  entityType={entityType}
  options={options}
/>
```
```
OFluiListOptions = {
    views?: View[],
    image?: string,
    translations?: any,
    language?: string,
    onNewItem?: () => Promise<any>,
}
```
