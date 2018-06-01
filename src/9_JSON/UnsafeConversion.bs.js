'use strict';


var result = JSON.parse("{\"name\": \"Luke\"}");

var n = result.name;

exports.result = result;
exports.n = n;
/* result Not a pure module */
