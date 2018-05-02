# from-reasonml-to-javascript

> Samples of bucklescript's ReasonMl transpils to javascript 

## Development

```bash
yarn install
```

## Samples

* [Bs New Object](#bs_new_object_1)
* [Global](#global_3)
* [Nullable](#nullable_4)
* [Raw Js](#raw_js_2)
* [Sample](#sample_0)

### Bs New Object


**Reason Input** : [Bs_New_Object_Module.re](./src/Bs_New_Object_1/Bs_New_Object_Module.re)
```reason
type t;
[@bs.module "myLib"] [@bs.new] external create_date_with_module : unit => t = "Date";
let date = create_date_with_module();
```


**Javascript Output** : [Bs_New_Object_Module.bs.js](./src/Bs_New_Object_1/Bs_New_Object_Module.bs.js)
```js
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


**Javascript Output** : [Bs_New_Object.bs.js](./src/Bs_New_Object_1/Bs_New_Object.bs.js)
```js
'use strict';


var date = new Date();

exports.date = date;
/* date Not a pure module */
```



### Global


**Reason Input** : [Global_value.re](./src/Global_3/Global_value.re)
```reason
[@bs.val] external setTimeout : (unit => unit, int) => float = "setTimeout";
```


**Javascript Output** : [Global_value.bs.js](./src/Global_3/Global_value.bs.js)
```js
/* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */
```


**Reason Input** : [Global_module.re](./src/Global_3/Global_module.re)
```reason
[@bs.val] [@bs.scope "Math"] external random : unit => float = "random";
let someNumber = random();

[@bs.val] [@bs.scope ("window", "location", "ancestorOrigins")] external length : int = "length";
let ancestorOriginsLength = length;
```


**Javascript Output** : [Global_module.bs.js](./src/Global_3/Global_module.bs.js)
```js
'use strict';


var someNumber = Math.random();

var ancestorOriginsLength = window.location.ancestorOrigins.length;

exports.someNumber = someNumber;
exports.ancestorOriginsLength = ancestorOriginsLength;
/* someNumber Not a pure module */
```



### Nullable


**Reason Input** : [Nullable_convert_to_option.re](./src/Nullable_4/Nullable_convert_to_option.re)
```reason
type element;

[@bs.val][@bs.scope "document"] [@bs.return nullable] external getElementById : string => option(element) = "getElementById";
let div = getElementById("myId");
```


**Javascript Output** : [Nullable_convert_to_option.bs.js](./src/Nullable_4/Nullable_convert_to_option.bs.js)
```js
'use strict';


var div = document.getElementById("myId");

var div$1 = (div == null) ? /* None */0 : [div];

exports.div = div$1;
/* div Not a pure module */
```


**Reason Input** : [Nullable.re](./src/Nullable_4/Nullable.re)
```reason
let jsNull = Js.Nullable.null;
let jsUndefined = Js.Nullable.undefined;

let result1: Js.Nullable.t(string) = Js.Nullable.return("hello");
let result2: Js.Nullable.t(int) = Js.Nullable.fromOption(Some(10));
let result3: option(int) = Js.Nullable.toOption(Js.Nullable.return(10));
```


**Javascript Output** : [Nullable.bs.js](./src/Nullable_4/Nullable.bs.js)
```js
'use strict';

var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");

var result2 = Js_null_undefined.fromOption(/* Some */[10]);

var jsNull = null;

var jsUndefined = undefined;

var result1 = "hello";

var result3 = Js_primitive.null_undefined_to_opt(10);

exports.jsNull = jsNull;
exports.jsUndefined = jsUndefined;
exports.result1 = result1;
exports.result2 = result2;
exports.result3 = result3;
/* result2 Not a pure module */
```



### Raw Js


**Reason Input** : [Raw_Js.re](./src/Raw_Js_2/Raw_Js.re)
```reason
let add = [%raw "a + b"];
[%%raw "var a = 1"];
let myFunction = [%raw (a, b) => "return a + b"];
```


**Javascript Output** : [Raw_Js.bs.js](./src/Raw_Js_2/Raw_Js.bs.js)
```js
'use strict';


var add = (a + b);

var a = 1
;

var myFunction = function (a,b){return a + b};

exports.add = add;
exports.myFunction = myFunction;
/* add Not a pure module */
```



### Sample

> This is a basic sample to how type a sample.



**Reason Input** : [Sample.re](./src/Sample_0/Sample.re)
```reason
let sample = "sample";
```


**Javascript Output** : [Sample.bs.js](./src/Sample_0/Sample.bs.js)
```js
'use strict';


var sample = "sample";

exports.sample = sample;
/* No side effect */
```

