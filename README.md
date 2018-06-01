# from-reasonml-to-javascript

> Samples of bucklescript's ReasonMl transpils to javascript 

**Why ?** Because it's important to know how your code will be generated. It's also usefull when you create some bindings or also when you start coding with `ReasonML` and you do not know what it looks like.

## Development

Installation development kit.

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
* [Fast Pipe](#fast-pipe)
* [Bs New Object](#bs-new-object)
* [Raw Js](#raw-js)
* [Global](#global)
* [Nullable](#nullable)
* [Object](#object)
* [Import](#import)
* [Regular Expression](#regular-expression)
* [Exceptions](#exceptions)
* [JSON](#json)

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



### Fast Pipe

***
**Reason Input** : [Pipelining.re](./src/10_Fast_Pipe/Pipelining.re)
```reason
/* let foo = n => n + 1;
let bar = () => 2;

let a = 1;
let b = 2;

let result = a
|. foo(b)
|. bar */
```


**Javascript Output** : [Pipelining.bs.js](./src/10_Fast_Pipe/Pipelining.bs.js)
```js
/* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */
```

***
**Reason Input** : [PipeIntoVariants.re](./src/10_Fast_Pipe/PipeIntoVariants.re)
```reason
let name = "";
let preprocess = arg => arg ++ "!";

/* let result = name |. preprocess |. Some; */
```


**Javascript Output** : [PipeIntoVariants.bs.js](./src/10_Fast_Pipe/PipeIntoVariants.bs.js)
```js
'use strict';


function preprocess(arg) {
  return arg + "!";
}

var name = "";

exports.name = name;
exports.preprocess = preprocess;
/* No side effect */
```

***
**Reason Input** : [JSMethodChaining.re](./src/10_Fast_Pipe/JSMethodChaining.re)
```reason
[@bs.send] external map : (array('a), 'a => 'b) => array('b) = "";
[@bs.send] external filter : (array('a), 'a => 'b) => array('b) = "";

type request;
external asyncRequest: unit => request = "";
[@bs.send] external setWaitDuration: (request, int) => request = "";
[@bs.send] external send: request => unit = "";

/* Use like this */
let result = filter(map([|1, 2, 3|], a => a + 1), a => a mod 2 == 0);
send(setWaitDuration(asyncRequest(), 4000));
```


**Javascript Output** : [JSMethodChaining.bs.js](./src/10_Fast_Pipe/JSMethodChaining.bs.js)
```js
'use strict';

var Caml_missing_polyfill = require("bs-platform/lib/js/caml_missing_polyfill.js");

var result = /* array */[
      1,
      2,
      3
    ].map((function (a) {
          return a + 1 | 0;
        })).filter((function (a) {
        return a % 2 === 0;
      }));

Caml_missing_polyfill.not_implemented("").setWaitDuration(4000).send();

exports.result = result;
/* result Not a pure module */
```

***
**Reason Input** : [GetMultipleResults.re](./src/10_Fast_Pipe/GetMultipleResults.re)
```reason
let random = [%raw "Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);"];

let myData = "abc";

let getLeft = data => random ++ data ++ "_left";
let getMiddle = data => random ++ data ++ "_middle";
let getRight = data => random ++ data ++ "_right";

let (left, middle, right) = myData |. (getLeft, getMiddle, getRight);
```


**Javascript Output** : [GetMultipleResults.bs.js](./src/10_Fast_Pipe/GetMultipleResults.bs.js)
```js
'use strict';


var random = (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5););

var myData = "abc";

function getLeft(data) {
  return random + (data + "_left");
}

function getMiddle(data) {
  return random + (data + "_middle");
}

function getRight(data) {
  return random + (data + "_right");
}

var left = getLeft(myData);

var middle = getMiddle(myData);

var right = getRight(myData);

exports.random = random;
exports.myData = myData;
exports.getLeft = getLeft;
exports.getMiddle = getMiddle;
exports.getRight = getRight;
exports.left = left;
exports.middle = middle;
exports.right = right;
/* random Not a pure module */
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
**Reason Input** : [Record_mode.re](./src/5_Object/Record_mode.re)
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


**Javascript Output** : [Record_mode.bs.js](./src/5_Object/Record_mode.bs.js)
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
**Reason Input** : [New_instance.re](./src/5_Object/New_instance.re)
```reason
type t;
[@bs.new] external createDate : unit => t = "Date";

/* example */
let date = createDate();
```


**Javascript Output** : [New_instance.bs.js](./src/5_Object/New_instance.bs.js)
```js
'use strict';


var date = new Date();

exports.date = date;
/* date Not a pure module */
```

***
**Reason Input** : [Hash_map_mode.re](./src/5_Object/Hash_map_mode.re)
```reason
let myMap = Js.Dict.empty();
Js.Dict.set(myMap, "Allison", 10);
```


**Javascript Output** : [Hash_map_mode.bs.js](./src/5_Object/Hash_map_mode.bs.js)
```js
'use strict';


var myMap = { };

myMap["Allison"] = 10;

exports.myMap = myMap;
/*  Not a pure module */
```



### Import

***
**Reason Input** : [Import_second_default_value.re](./src/6_Import/Import_second_default_value.re)
```reason
[@bs.module "./student"] external studentName : string = "default";
Js.log(studentName);
```


**Javascript Output** : [Import_second_default_value.bs.js](./src/6_Import/Import_second_default_value.bs.js)
```js
'use strict';

var Student = require("./student");

console.log(Student.default);

/*  Not a pure module */
```

***
**Reason Input** : [Import_default_value.re](./src/6_Import/Import_default_value.re)
```reason
[@bs.module] external leftPad : string => int => string = "./leftPad";
let paddedResult = leftPad("hi", 5);
```


**Javascript Output** : [Import_default_value.bs.js](./src/6_Import/Import_default_value.bs.js)
```js
'use strict';

var LeftPad = require("./leftPad");

var paddedResult = LeftPad("hi", 5);

exports.paddedResult = paddedResult;
/* paddedResult Not a pure module */
```

***
**Reason Input** : [Import.re](./src/6_Import/Import.re)
```reason
[@bs.module "path"] external dirname : string => string = "dirname";
let root = dirname("/User/chenglou");
```


**Javascript Output** : [Import.bs.js](./src/6_Import/Import.bs.js)
```js
'use strict';

var Path = require("path");

var root = Path.dirname("/User/chenglou");

exports.root = root;
/* root Not a pure module */
```



### Regular Expression

***
**Reason Input** : [RegularExpression.re](./src/7_Regular_Expression/RegularExpression.re)
```reason
let f = [%bs.re "/b/g"]
```


**Javascript Output** : [RegularExpression.bs.js](./src/7_Regular_Expression/RegularExpression.bs.js)
```js
'use strict';


var f = (/b/g);

exports.f = f;
/* f Not a pure module */
```



### Exceptions

***
**Reason Input** : [PromiseExceptions.re](./src/8_Exceptions/PromiseExceptions.re)
```reason
exception UnhandledPromise;

let handlePromiseFailure =
  [@bs.open]
  (
    fun
    | Not_found => {
        Js.log("Not found");
        Js.Promise.resolve()
      }
  );

Js.Promise.reject(Not_found)
  |> Js.Promise.catch(
     (error) =>
       switch (handlePromiseFailure(error)) {
       | Some(x) => x
       | None => raise(UnhandledPromise)
       }
   );
```


**Javascript Output** : [PromiseExceptions.bs.js](./src/8_Exceptions/PromiseExceptions.bs.js)
```js
'use strict';

var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var UnhandledPromise = Caml_exceptions.create("PromiseExceptions.UnhandledPromise");

function handlePromiseFailure(match) {
  if (Caml_exceptions.isCamlExceptionOrOpenVariant(match) && match === Caml_builtin_exceptions.not_found) {
    return /* Some */[(console.log("Not found"), Promise.resolve(/* () */0))];
  } else {
    return /* None */0;
  }
}

Promise.reject(Caml_builtin_exceptions.not_found).catch((function (error) {
        var match = handlePromiseFailure(error);
        if (match) {
          return match[0];
        } else {
          throw UnhandledPromise;
        }
      }));

exports.UnhandledPromise = UnhandledPromise;
exports.handlePromiseFailure = handlePromiseFailure;
/*  Not a pure module */
```

***
**Reason Input** : [Exceptions.re](./src/8_Exceptions/Exceptions.re)
```reason
try (
  Js.Exn.raiseError("oops!")
) {
| Js.Exn.Error(e) =>
  switch (Js.Exn.message(e)) {
  | Some(message) => Js.log({j|Error: $message|j})
  | None => Js.log("An unknown error occurred")
  }
};
```


**Javascript Output** : [Exceptions.bs.js](./src/8_Exceptions/Exceptions.bs.js)
```js
'use strict';

var Js_exn = require("bs-platform/lib/js/js_exn.js");

try {
  Js_exn.raiseError("oops!");
}
catch (raw_exn){
  var exn = Js_exn.internalToOCamlException(raw_exn);
  if (exn[0] === Js_exn.$$Error) {
    var match = exn[1].message;
    if (match !== undefined) {
      console.log("Error: " + (String(match) + ""));
    } else {
      console.log("An unknown error occurred");
    }
  } else {
    throw exn;
  }
}

/*  Not a pure module */
```



### JSON

***
**Reason Input** : [UnsafeConversion.re](./src/9_JSON/UnsafeConversion.re)
```reason
[@bs.deriving abstract]
type data = {name: string};

[@bs.scope "JSON"] [@bs.val]
external parseIntoMyData : string => data = "parse";

let result = parseIntoMyData("{\"name\": \"Luke\"}");
let n = result |. name;
```


**Javascript Output** : [UnsafeConversion.bs.js](./src/9_JSON/UnsafeConversion.bs.js)
```js
'use strict';


var result = JSON.parse("{\"name\": \"Luke\"}");

var n = result.name;

exports.result = result;
exports.n = n;
/* result Not a pure module */
```

