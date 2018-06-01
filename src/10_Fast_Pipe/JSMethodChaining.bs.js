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
