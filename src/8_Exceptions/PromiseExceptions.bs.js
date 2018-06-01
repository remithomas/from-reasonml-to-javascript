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
