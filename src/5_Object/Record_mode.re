[@bs.deriving abstract]
type person = {
  [@bs.optional] name: string,
  age: int,
  mutable job: string,
};

[@bs.send] external getNickname : person => string = "getNickname";

[@bs.val] external john : person = "john";

let age = john |. age;
john |. jobSet("Accountant");
let nick = john |. getNickname;
