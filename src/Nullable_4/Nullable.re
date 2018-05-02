let jsNull = Js.Nullable.null;
let jsUndefined = Js.Nullable.undefined;

let result1: Js.Nullable.t(string) = Js.Nullable.return("hello");
let result2: Js.Nullable.t(int) = Js.Nullable.fromOption(Some(10));
let result3: option(int) = Js.Nullable.toOption(Js.Nullable.return(10));
