let random = [%raw "Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);"];

let myData = "abc";

let getLeft = data => random ++ data ++ "_left";
let getMiddle = data => random ++ data ++ "_middle";
let getRight = data => random ++ data ++ "_right";

let (left, middle, right) = myData |. (getLeft, getMiddle, getRight);
