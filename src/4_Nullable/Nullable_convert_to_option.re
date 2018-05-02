type element;

[@bs.val][@bs.scope "document"] [@bs.return nullable] external getElementById : string => option(element) = "getElementById";
let div = getElementById("myId");
