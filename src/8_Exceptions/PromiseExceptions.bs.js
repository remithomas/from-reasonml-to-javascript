'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var UnhandledPromise = Caml_exceptions.create("PromiseExceptions.UnhandledPromise");

function handlePromiseFailure(match) {
  if (Caml_exceptions.caml_is_extension(match) && match === Caml_builtin_exceptions.not_found) {
    return Caml_option.some((console.log("Not found"), Promise.resolve(/* () */0)));
  }
  
}

Promise.reject(Caml_builtin_exceptions.not_found).catch((function (error) {
        var match = handlePromiseFailure(error);
        if (match !== undefined) {
          return Caml_option.valFromOption(match);
        } else {
          throw UnhandledPromise;
        }
      }));

exports.UnhandledPromise = UnhandledPromise;
exports.handlePromiseFailure = handlePromiseFailure;
/*  Not a pure module */
