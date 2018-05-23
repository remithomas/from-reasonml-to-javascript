# from-reasonml-to-javascript

> Samples of bucklescript's ReasonMl transpils to javascript 

**Why ? ** Because it's important to know how your code will be generated. It's also usefull when you create some bindings or also when you start coding with `ReasonML`.

## Development

```bash
yarn install
```

To create a new sample, you can use the boilerplate [here](src/0_Sample)

* Create your folder prefixed with the correct number, the format is snaked case based.
* Inside create a *reason* file 
* Run the npm task `yarn run readme`.
* That's it. Commit, Push and thanks !

Note: if you add a `.md` file (markdown), it will be print at the top of your generated section.

## Samples

* [Sample](#sample)
* [Bs New Object](#bs-new-object)
* [Raw Js](#raw-js)
* [Global](#global)
* [Nullable](#nullable)
* [Object](#object)

### Sample

> This is a basic sample to how type a sample.


***
**Reason Input** : [Sample.re](./src/0_Sample/Sample.re)
```reason
let sample = "sample";
```


**Javascript Output** : [Sample.bs.js](./src/0_Sample/Sample.bs.js)
```js
'use strict';


var sample = "sample";

exports.sample = sample;
/* No side effect */
```



### Bs New Object

***
**Reason Input** : [Bs_New_Object_Module.re](./src/1_Bs_New_Object/Bs_New_Object_Module.re)
```reason
type t;
[@bs.module "myLib"] [@bs.new] external create_date_with_module : unit => t = "Date";
let date = create_date_with_module();
```


**Javascript Output** : [Bs_New_Object_Module.bs.js](./src/1_Bs_New_Object/Bs_New_Object_Module.bs.js)
```js
'use strict';

var MyLib = require("myLib");

var date = new MyLib.Date();

exports.date = date;
/* date Not a pure module */
```

***
**Reason Input** : [Bs_New_Object.re](./src/1_Bs_New_Object/Bs_New_Object.re)
```reason
type t;
[@bs.new] external create_date : unit => t = "Date";
let date = create_date();
```


**Javascript Output** : [Bs_New_Object.bs.js](./src/1_Bs_New_Object/Bs_New_Object.bs.js)
```js
'use strict';


var date = new Date();

exports.date = date;
/* date Not a pure module */
```



### Raw Js

***
**Reason Input** : [Raw_Js.re](./src/2_Raw_Js/Raw_Js.re)
```reason
let add = [%raw "a + b"];
[%%raw "var a = 1"];
let myFunction = [%raw (a, b) => "return a + b"];
```


**Javascript Output** : [Raw_Js.bs.js](./src/2_Raw_Js/Raw_Js.bs.js)
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



### Global

***
**Reason Input** : [Global_value.re](./src/3_Global/Global_value.re)
```reason
[@bs.val] external setTimeout : (unit => unit, int) => float = "setTimeout";
```


**Javascript Output** : [Global_value.bs.js](./src/3_Global/Global_value.bs.js)
```js
/* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */
```

***
**Reason Input** : [Global_module.re](./src/3_Global/Global_module.re)
```reason
[@bs.val] [@bs.scope "Math"] external random : unit => float = "random";
let someNumber = random();

[@bs.val] [@bs.scope ("window", "location", "ancestorOrigins")] external length : int = "length";
let ancestorOriginsLength = length;
```


**Javascript Output** : [Global_module.bs.js](./src/3_Global/Global_module.bs.js)
```js
'use strict';


var someNumber = Math.random();

var ancestorOriginsLength = window.location.ancestorOrigins.length;

exports.someNumber = someNumber;
exports.ancestorOriginsLength = ancestorOriginsLength;
/* someNumber Not a pure module */
```



### Nullable

***
**Reason Input** : [Nullable_convert_to_option.re](./src/4_Nullable/Nullable_convert_to_option.re)
```reason
type element;

[@bs.val][@bs.scope "document"] [@bs.return nullable] external getElementById : string => option(element) = "getElementById";
let div = getElementById("myId");
```


**Javascript Output** : [Nullable_convert_to_option.bs.js](./src/4_Nullable/Nullable_convert_to_option.bs.js)
```js
'use strict';


var div = document.getElementById("myId");

var div$1 = (div == null) ? /* None */0 : [div];

exports.div = div$1;
/* div Not a pure module */
```

***
**Reason Input** : [Nullable.re](./src/4_Nullable/Nullable.re)
```reason
let jsNull = Js.Nullable.null;
let jsUndefined = Js.Nullable.undefined;

let result1: Js.Nullable.t(string) = Js.Nullable.return("hello");
let result2: Js.Nullable.t(int) = Js.Nullable.fromOption(Some(10));
let result3: option(int) = Js.Nullable.toOption(Js.Nullable.return(10));
```


**Javascript Output** : [Nullable.bs.js](./src/4_Nullable/Nullable.bs.js)
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



### Object

***
**Reason Input** : [Record_mode.re](./src/4_Object/Record_mode.re)
```reason
[@bs.deriving abstract]
type person = {
  [@bs.optional] name: string,
  age: int,
  mutable job: string,
};

[@bs.send] external getNickname : person => string = "getNickname";

[@bs.val] external john : person = "john";

let age = john |. age;
john |. jobSet("Accountant");
let nick = john |. getNickname;
```


**Javascript Output** : [Record_mode.bs.js](./src/4_Object/Record_mode.bs.js)
```js
'use strict';


var age = john.age;

john.job = "Accountant";

var nick = john.getNickname();

exports.age = age;
exports.nick = nick;
/* age Not a pure module */
```

***
**Reason Input** : [New_instance.re](./src/4_Object/New_instance.re)
```reason
type t;
[@bs.new] external createDate : unit => t = "Date";

/* example */
let date = createDate();
```


**Javascript Output** : [New_instance.bs.js](./src/4_Object/New_instance.bs.js)
```js
'use strict';


var date = new Date();

exports.date = date;
/* date Not a pure module */
```

***
**Reason Input** : [Hash_map_mode.re](./src/4_Object/Hash_map_mode.re)
```reason
let myMap = Js.Dict.empty();
Js.Dict.set(myMap, "Allison", 10);
```


**Javascript Output** : [Hash_map_mode.bs.js](./src/4_Object/Hash_map_mode.bs.js)
```js
'use strict';


var myMap = { };

myMap["Allison"] = 10;

exports.myMap = myMap;
/*  Not a pure module */
```

