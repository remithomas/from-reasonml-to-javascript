'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");

var result2 = Js_null_undefined.fromOption(10);

var jsNull = null;

var jsUndefined = undefined;

var result1 = "hello";

var result3 = Caml_option.nullable_to_opt(10);

exports.jsNull = jsNull;
exports.jsUndefined = jsUndefined;
exports.result1 = result1;
exports.result2 = result2;
exports.result3 = result3;
/* result2 Not a pure module */
