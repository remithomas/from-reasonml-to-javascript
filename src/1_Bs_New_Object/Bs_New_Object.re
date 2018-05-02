type t;
[@bs.new] external create_date : unit => t = "Date";
let date = create_date();
