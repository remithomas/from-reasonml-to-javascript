'use strict';


var someNumber = Math.random();

var ancestorOriginsLength = window.location.ancestorOrigins.length;

exports.someNumber = someNumber;
exports.ancestorOriginsLength = ancestorOriginsLength;
/* someNumber Not a pure module */
