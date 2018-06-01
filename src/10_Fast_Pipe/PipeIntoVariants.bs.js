'use strict';


function preprocess(arg) {
  return arg + "!";
}

var name = "";

exports.name = name;
exports.preprocess = preprocess;
/* No side effect */
