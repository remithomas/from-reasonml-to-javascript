[@bs.val] [@bs.scope "Math"] external random : unit => float = "random";
let someNumber = random();

[@bs.val] [@bs.scope ("window", "location", "ancestorOrigins")] external length : int = "length";
let ancestorOriginsLength = length;
