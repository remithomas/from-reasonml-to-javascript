'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");

var div = document.getElementById("myId");

var div$1 = (div == null) ? undefined : Caml_option.some(div);

exports.div = div$1;
/* div Not a pure module */
