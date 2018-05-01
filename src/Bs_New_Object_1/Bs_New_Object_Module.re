type t;
[@bs.module "myLib"] [@bs.new] external create_date_with_module : unit => t = "Date";
let date = create_date_with_module();
