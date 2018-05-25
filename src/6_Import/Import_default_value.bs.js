'use strict';

var LeftPad = require("./leftPad");

var paddedResult = LeftPad("hi", 5);

exports.paddedResult = paddedResult;
/* paddedResult Not a pure module */
