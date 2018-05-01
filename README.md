# from-reasonml-to-javascript

> Samples of bucklescript's ReasonMl transpils to javascript 

## Development

```bash
yarn install
```

## Samples

* [Bs New Object](#bs_new_object_1)
* [Sample](#sample_0)

### Bs New Object


**Reason Input** : [Bs_New_Object_Module.re](./src/Bs_New_Object_1/Bs_New_Object_Module.re)
```reason
type t;
[@bs.module "myLib"] [@bs.new] external create_date_with_module : unit => t = "Date";
let date = create_date_with_module();
```


**Reason Input** : [Bs_New_Object_Module.bs.js](./src/Bs_New_Object_1/Bs_New_Object_Module.bs.js)
```reason
'use strict';

var MyLib = require("myLib");

var date = new MyLib.Date();

exports.date = date;
/* date Not a pure module */
```


**Reason Input** : [Bs_New_Object.re](./src/Bs_New_Object_1/Bs_New_Object.re)
```reason
type t;
[@bs.new] external create_date : unit => t = "Date";
let date = create_date();
```


**Reason Input** : [Bs_New_Object.bs.js](./src/Bs_New_Object_1/Bs_New_Object.bs.js)
```reason
'use strict';


var date = new Date();

exports.date = date;
/* date Not a pure module */
```



### Sample

> This is a basic sample to how type a sample.



**Reason Input** : [Sample.re](./src/Sample_0/Sample.re)
```reason
let sample = "sample";
```


**Reason Input** : [Sample.bs.js](./src/Sample_0/Sample.bs.js)
```reason
'use strict';


var sample = "sample";

exports.sample = sample;
/* No side effect */
```

