'use strict';

var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

try {
  Js_exn.raiseError("oops!");
}
catch (raw_exn){
  var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
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
