[@bs.deriving abstract]
type data = {name: string};

[@bs.scope "JSON"] [@bs.val]
external parseIntoMyData : string => data = "parse";

let result = parseIntoMyData("{\"name\": \"Luke\"}");
let n = result |. nameGet;
