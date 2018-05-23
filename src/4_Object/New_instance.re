type t;
[@bs.new] external createDate : unit => t = "Date";

/* example */
let date = createDate();
