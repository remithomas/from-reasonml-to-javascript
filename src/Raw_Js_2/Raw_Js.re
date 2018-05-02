let add = [%raw "a + b"];
[%%raw "var a = 1"];
let myFunction = [%raw (a, b) => "return a + b"];
