# from-reasonml-to-javascript

> Samples of bucklescript's ReasonMl transpils to javascript 

## Development

```bash
yarn install
```

## Samples

* [Sample_0](Sample_0)
* [Sample_0_1](Sample_0_1)

### Sample_0

```re
let sample = "sample";
```

```js
'use strict';


var sample = "sample";

exports.sample = sample;
/* No side effect */
```

### Sample_0_1

```re
let sample = 2;
```

```js
'use strict';


var sample = 2;

exports.sample = sample;
/* No side effect */
```